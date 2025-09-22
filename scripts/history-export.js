// scripts/history-export.js
// Export location history data to various formats

const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const moment = require('moment');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

const prisma = new PrismaClient();
const gzip = promisify(zlib.gzip);

class HistoryExporter {
  constructor(options = {}) {
    this.options = {
      format: options.format || 'json', // json, csv, sql
      dateRange: options.dateRange || null,
      truckIds: options.truckIds || null,
      outputDir: options.outputDir || './exports',
      batchSize: options.batchSize || 5000,
      compress: options.compress || false,
      ...options,
    };
  }

  async export() {
    console.log('📤 Starting History Export');
    console.log('='.repeat(50));
    console.log(`Format: ${this.options.format}`);
    console.log(`Output Directory: ${this.options.outputDir}`);

    try {
      await this.ensureOutputDir();

      const totalRecords = await this.getTotalRecords();
      console.log(`Total records to export: ${totalRecords.toLocaleString()}`);

      if (totalRecords === 0) {
        console.log('⚠️  No records found to export');
        return;
      }

      const startTime = Date.now();
      let exportedRecords = 0;

      switch (this.options.format.toLowerCase()) {
        case 'json':
          exportedRecords = await this.exportToJSON();
          break;
        case 'csv':
          exportedRecords = await this.exportToCSV();
          break;
        case 'sql':
          exportedRecords = await this.exportToSQL();
          break;
        case 'geojson':
          exportedRecords = await this.exportToGeoJSON();
          break;
        default:
          throw new Error(`Unsupported format: ${this.options.format}`);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log('\n✅ Export completed successfully!');
      console.log(`   • Records exported: ${exportedRecords.toLocaleString()}`);
      console.log(`   • Processing time: ${duration}s`);
      console.log(`   • Rate: ${Math.round(exportedRecords / parseFloat(duration))} records/sec`);
    } catch (error) {
      console.error('❌ Export failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async getTotalRecords() {
    const where = this.buildWhereClause();
    return await prisma.locationHistory.count({ where });
  }

  buildWhereClause() {
    const where = {};

    if (this.options.truckIds && this.options.truckIds.length > 0) {
      where.truckId = { in: this.options.truckIds };
    }

    if (this.options.dateRange) {
      where.recordedAt = {};
      if (this.options.dateRange.start) {
        where.recordedAt.gte = new Date(this.options.dateRange.start);
      }
      if (this.options.dateRange.end) {
        where.recordedAt.lte = new Date(this.options.dateRange.end);
      }
    }

    return where;
  }

  async ensureOutputDir() {
    try {
      await fs.mkdir(this.options.outputDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
    }
  }

  async exportToJSON() {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `fleet-history-${timestamp}.json`;
    const filepath = path.join(this.options.outputDir, filename);

    console.log(`🔄 Exporting to JSON: ${filename}`);

    const where = this.buildWhereClause();
    let skip = 0;
    let totalExported = 0;
    let isFirstBatch = true;

    // Start JSON array
    await fs.writeFile(filepath, '[\n');

    let hasMoreData = true;
    while (hasMoreData) {
      const batch = await prisma.locationHistory.findMany({
        where,
        skip,
        take: this.options.batchSize,
        include: {
          truck: {
            select: {
              truckNumber: true,
              status: true,
              model: {
                select: {
                  name: true,
                  manufacturer: true,
                },
              },
            },
          },
        },
        orderBy: { recordedAt: 'asc' },
      });

      if (batch.length === 0) {
        hasMoreData = false;
        break;
      }

      const jsonData = batch.map((record) => ({
        id: record.id,
        truckId: record.truckId,
        truckNumber: record.truck?.truckNumber,
        truckStatus: record.truck?.status,
        truckModel: record.truck?.model?.name,
        manufacturer: record.truck?.model?.manufacturer,
        latitude: parseFloat(record.latitude),
        longitude: parseFloat(record.longitude),
        speed: parseFloat(record.speed),
        heading: record.heading,
        fuelPercentage: parseFloat(record.fuelPercentage),
        recordedAt: record.recordedAt.toISOString(),
      }));

      const jsonString = jsonData
        .map((record) => (isFirstBatch ? '' : ',\n') + '  ' + JSON.stringify(record))
        .join('');

      await fs.appendFile(filepath, jsonString);

      totalExported += batch.length;
      skip += this.options.batchSize;
      isFirstBatch = false;

      process.stdout.write(`\r⏳ Exported ${totalExported.toLocaleString()} records`);
    }

    // Close JSON array
    await fs.appendFile(filepath, '\n]');

    if (this.options.compress) {
      await this.compressFile(filepath);
    }

    console.log(`\n📁 JSON export saved: ${filepath}`);
    return totalExported;
  }

  async exportToCSV() {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `fleet-history-${timestamp}.csv`;
    const filepath = path.join(this.options.outputDir, filename);

    console.log(`🔄 Exporting to CSV: ${filename}`);

    // Write CSV header
    // Remove unused headers variable - using inline array instead
    await fs.writeFile(
      filepath,
      [
        'id',
        'truck_id',
        'truck_number',
        'truck_status',
        'truck_model',
        'latitude',
        'longitude',
        'speed',
        'heading',
        'fuel_percentage',
        'recorded_at',
      ].join(',') + '\n'
    );

    const where = this.buildWhereClause();
    let skip = 0;
    let totalExported = 0;

    let hasMoreData = true;
    while (hasMoreData) {
      const batch = await prisma.locationHistory.findMany({
        where,
        skip,
        take: this.options.batchSize,
        include: {
          truck: {
            select: {
              truckNumber: true,
              status: true,
              model: { select: { name: true } },
            },
          },
        },
        orderBy: { recordedAt: 'asc' },
      });

      if (batch.length === 0) {
        hasMoreData = false;
        break;
      }

      const csvRows = batch.map((record) =>
        [
          record.id,
          record.truckId,
          `"${record.truck?.truckNumber || ''}"`,
          `"${record.truck?.status || ''}"`,
          `"${record.truck?.model?.name || ''}"`,
          parseFloat(record.latitude).toFixed(8),
          parseFloat(record.longitude).toFixed(8),
          parseFloat(record.speed).toFixed(2),
          record.heading,
          parseFloat(record.fuelPercentage).toFixed(2),
          record.recordedAt.toISOString(),
        ].join(',')
      );

      await fs.appendFile(filepath, csvRows.join('\n') + '\n');

      totalExported += batch.length;
      skip += this.options.batchSize;

      process.stdout.write(`\r⏳ Exported ${totalExported.toLocaleString()} records`);
    }

    if (this.options.compress) {
      await this.compressFile(filepath);
    }

    console.log(`\n📁 CSV export saved: ${filepath}`);
    return totalExported;
  }

  async exportToSQL() {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `fleet-history-${timestamp}.sql`;
    const filepath = path.join(this.options.outputDir, filename);

    console.log(`🔄 Exporting to SQL: ${filename}`);

    // Write SQL header
    const sqlHeader = `-- Fleet Management Location History Export
-- Generated: ${moment().format('YYYY-MM-DD HH:mm:ss')}
-- Total records: ${await this.getTotalRecords()}

-- Disable foreign key checks during import
SET foreign_key_checks = 0;

-- Clear existing data (optional)
-- DELETE FROM location_history;

-- Insert location history data
`;
    await fs.writeFile(filepath, sqlHeader);

    const where = this.buildWhereClause();
    let skip = 0;
    let totalExported = 0;

    let hasMoreData = true;
    while (hasMoreData) {
      const batch = await prisma.locationHistory.findMany({
        where,
        skip,
        take: this.options.batchSize,
        orderBy: { recordedAt: 'asc' },
      });

      if (batch.length === 0) {
        hasMoreData = false;
        break;
      }

      const sqlInserts = batch.map(
        (record) =>
          `INSERT INTO location_history (truck_id, latitude, longitude, speed, heading, fuel_percentage, recorded_at) VALUES (${record.truckId}, ${parseFloat(record.latitude)}, ${parseFloat(record.longitude)}, ${parseFloat(record.speed)}, ${record.heading}, ${parseFloat(record.fuelPercentage)}, '${record.recordedAt.toISOString()}');`
      );

      await fs.appendFile(filepath, sqlInserts.join('\n') + '\n');

      totalExported += batch.length;
      skip += this.options.batchSize;

      process.stdout.write(`\r⏳ Exported ${totalExported.toLocaleString()} records`);
    }

    await fs.appendFile(
      filepath,
      '\n-- Re-enable foreign key checks\nSET foreign_key_checks = 1;\n'
    );

    if (this.options.compress) {
      await this.compressFile(filepath);
    }

    console.log(`\n📁 SQL export saved: ${filepath}`);
    return totalExported;
  }

  async exportToGeoJSON() {
    const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `fleet-history-${timestamp}.geojson`;
    const filepath = path.join(this.options.outputDir, filename);

    console.log(`🔄 Exporting to GeoJSON: ${filename}`);

    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };

    const where = this.buildWhereClause();
    let skip = 0;
    let totalExported = 0;

    let hasMoreData = true;
    while (hasMoreData) {
      const batch = await prisma.locationHistory.findMany({
        where,
        skip,
        take: this.options.batchSize,
        include: {
          truck: {
            select: {
              truckNumber: true,
              status: true,
              model: { select: { name: true } },
            },
          },
        },
        orderBy: { recordedAt: 'asc' },
      });

      if (batch.length === 0) {
        hasMoreData = false;
        break;
      }

      const features = batch.map((record) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(record.longitude), parseFloat(record.latitude)],
        },
        properties: {
          id: record.id,
          truckId: record.truckId,
          truckNumber: record.truck?.truckNumber,
          truckStatus: record.truck?.status,
          truckModel: record.truck?.model?.name,
          speed: parseFloat(record.speed),
          heading: record.heading,
          fuelPercentage: parseFloat(record.fuelPercentage),
          recordedAt: record.recordedAt.toISOString(),
        },
      }));

      geoJSON.features.push(...features);

      totalExported += batch.length;
      skip += this.options.batchSize;

      process.stdout.write(`\r⏳ Exported ${totalExported.toLocaleString()} records`);
    }

    await fs.writeFile(filepath, JSON.stringify(geoJSON, null, 2));

    if (this.options.compress) {
      await this.compressFile(filepath);
    }

    console.log(`\n📁 GeoJSON export saved: ${filepath}`);
    return totalExported;
  }

  async compressFile(filepath) {
    console.log('🗜️  Compressing file...');

    const data = await fs.readFile(filepath);
    const compressed = await gzip(data);
    const compressedPath = filepath + '.gz';

    await fs.writeFile(compressedPath, compressed);
    await fs.unlink(filepath); // Remove original file

    const originalSize = data.length;
    const compressedSize = compressed.length;
    const compressionRatio = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);

    console.log(`✅ File compressed: ${compressionRatio}% smaller (${compressedPath})`);
  }
}

// History Importer Class
class HistoryImporter {
  constructor(options = {}) {
    this.options = {
      filepath: options.filepath,
      format: options.format || 'json',
      batchSize: options.batchSize || 1000,
      clearExisting: options.clearExisting || false,
      skipDuplicates: options.skipDuplicates || true,
      ...options,
    };
  }

  async import() {
    console.log('📥 Starting History Import');
    console.log('='.repeat(50));
    console.log(`File: ${this.options.filepath}`);
    console.log(`Format: ${this.options.format}`);

    try {
      if (this.options.clearExisting) {
        console.log('🗑️  Clearing existing data...');
        const deleted = await prisma.locationHistory.deleteMany();
        console.log(`✅ Deleted ${deleted.count} existing records`);
      }

      const startTime = Date.now();
      let importedRecords = 0;

      switch (this.options.format.toLowerCase()) {
        case 'json':
          importedRecords = await this.importFromJSON();
          break;
        case 'csv':
          importedRecords = await this.importFromCSV();
          break;
        case 'sql':
          importedRecords = await this.importFromSQL();
          break;
        default:
          throw new Error(`Unsupported import format: ${this.options.format}`);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log('\n✅ Import completed successfully!');
      console.log(`   • Records imported: ${importedRecords.toLocaleString()}`);
      console.log(`   • Processing time: ${duration}s`);
      console.log(`   • Rate: ${Math.round(importedRecords / parseFloat(duration))} records/sec`);
    } catch (error) {
      console.error('❌ Import failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async importFromJSON() {
    console.log('🔄 Importing from JSON...');

    const data = await fs.readFile(this.options.filepath, 'utf8');
    const records = JSON.parse(data);

    console.log(`Found ${records.length.toLocaleString()} records to import`);

    let imported = 0;

    for (let i = 0; i < records.length; i += this.options.batchSize) {
      const batch = records.slice(i, i + this.options.batchSize);

      const insertData = batch.map((record) => ({
        truckId: parseInt(record.truckId),
        latitude: parseFloat(record.latitude),
        longitude: parseFloat(record.longitude),
        speed: parseFloat(record.speed),
        heading: parseInt(record.heading),
        fuelPercentage: parseFloat(record.fuelPercentage),
        recordedAt: new Date(record.recordedAt),
      }));

      const result = await prisma.locationHistory.createMany({
        data: insertData,
        skipDuplicates: this.options.skipDuplicates,
      });

      imported += result.count;

      process.stdout.write(`\r⏳ Imported ${imported.toLocaleString()} records`);
    }

    return imported;
  }

  async importFromCSV() {
    console.log('🔄 Importing from CSV...');

    const data = await fs.readFile(this.options.filepath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim());
    const records = lines.slice(1);

    console.log(`Found ${records.length.toLocaleString()} records to import`);

    let imported = 0;

    for (let i = 0; i < records.length; i += this.options.batchSize) {
      const batch = records.slice(i, i + this.options.batchSize);

      const insertData = batch
        .map((line) => {
          const values = line.split(',');
          return {
            truckId: parseInt(values[1]),
            latitude: parseFloat(values[5]),
            longitude: parseFloat(values[6]),
            speed: parseFloat(values[7]),
            heading: parseInt(values[8]),
            fuelPercentage: parseFloat(values[9]),
            recordedAt: new Date(values[10]),
          };
        })
        .filter((record) => !isNaN(record.truckId)); // Filter invalid records

      if (insertData.length > 0) {
        const result = await prisma.locationHistory.createMany({
          data: insertData,
          skipDuplicates: this.options.skipDuplicates,
        });

        imported += result.count;
      }

      process.stdout.write(`\r⏳ Imported ${imported.toLocaleString()} records`);
    }

    return imported;
  }

  async importFromSQL() {
    console.log('🔄 Importing from SQL...');
    console.log('⚠️  SQL import requires direct database execution');
    console.log('Run the following command:');
    console.log(`psql -h localhost -U postgres -d fleet_management -f "${this.options.filepath}"`);

    return 0;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help') {
    console.log(`
Fleet Management History Export/Import Tool

Usage:
  Export: node scripts/history-export.js export [options]
  Import: node scripts/history-import.js import [options]

Export Options:
  --format json|csv|sql|geojson    Export format (default: json)
  --days <number>                  Export last N days
  --trucks <ids>                   Comma-separated truck IDs
  --output <dir>                   Output directory (default: ./exports)
  --compress                       Compress output files

Import Options:
  --file <path>                    Input file path
  --format json|csv|sql           Import format
  --clear                         Clear existing data first
  --batch <size>                  Batch size (default: 1000)

Examples:
  node scripts/history-export.js export --format csv --days 7 --compress
  node scripts/history-export.js export --format geojson --trucks 1,2,3
  node scripts/history-import.js import --file exports/data.json --clear
    `);
    return;
  }

  const options = {};

  // Parse arguments
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, '');
    const value = args[i + 1];

    switch (key) {
      case 'format':
        options.format = value;
        break;
      case 'days':
        options.dateRange = {
          start: moment().subtract(parseInt(value), 'days').toDate(),
        };
        break;
      case 'trucks':
        options.truckIds = value.split(',').map((id) => parseInt(id.trim()));
        break;
      case 'output':
        options.outputDir = value;
        break;
      case 'file':
        options.filepath = value;
        break;
      case 'batch':
        options.batchSize = parseInt(value);
        break;
      case 'compress':
        options.compress = true;
        i--; // No value for this flag
        break;
      case 'clear':
        options.clearExisting = true;
        i--; // No value for this flag
        break;
    }
  }

  if (command === 'export') {
    const exporter = new HistoryExporter(options);
    await exporter.export();
  } else if (command === 'import') {
    if (!options.filepath) {
      console.error('❌ --file option is required for import');
      process.exit(1);
    }
    const importer = new HistoryImporter(options);
    await importer.import();
  } else {
    console.error(`❌ Unknown command: ${command}`);
    process.exit(1);
  }
}

module.exports = { HistoryExporter, HistoryImporter };

if (require.main === module) {
  main().catch((error) => {
    console.error('Operation failed:', error);
    process.exit(1);
  });
}
