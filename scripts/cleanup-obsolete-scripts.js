const fs = require('fs');
const path = require('path');
// const { execSync } = require('child_process'); // Unused import

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backup', 'obsolete_scripts');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`✅ Created backup directory: ${backupDir}`);
}

// Files to remove (relative to scripts directory)
const filesToRemove = [
  'assign-trucks-to-vendors.js',
  'create-vendor-truck-snapshots.js',
  'migrate-truck-ids.js',
  'update-database-schema.js',
  'migrate-add-truck-code.js',
  'update-truck-id-schema.sql',
  'remove-plate-number.sql',
  'recreate-with-numeric-ids.js',
  'ensure-truck-ids-0001-1000.js',
  'seed-tire-pressure-dummy.js',
];

// Backup and remove files
console.log('🚀 Starting cleanup of obsolete scripts...');

filesToRemove.forEach((file) => {
  const filePath = path.join(__dirname, file);
  const backupPath = path.join(backupDir, file);

  try {
    if (fs.existsSync(filePath)) {
      // Create backup
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(filePath, backupPath);

      // Remove file
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
      console.log(`   Backup saved to: ${backupPath}`);
    } else {
      console.log(`ℹ️  Not found (skipped): ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

// Update package.json scripts
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const scripts = packageJson.scripts || {};

    // Remove any scripts that reference the deleted files
    const scriptsToRemove = Object.entries(scripts)
      .filter(([, cmd]) => filesToRemove.some((file) => cmd.includes(file)))
      .map(([name]) => name);

    if (scriptsToRemove.length > 0) {
      scriptsToRemove.forEach((script) => {
        delete scripts[script];
        console.log(`🗑️  Removed script: ${script}`);
      });

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Updated package.json');
    }
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
  }
}

console.log('\n✨ Cleanup complete!');
console.log(`💾 Backups saved to: ${backupDir}`);
console.log('\nNext steps:');
console.log('1. Review the changes and backups');
console.log('2. Run tests to ensure everything still works');
console.log('3. Commit the changes to version control');
