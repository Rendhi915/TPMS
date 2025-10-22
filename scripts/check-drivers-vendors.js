// Check current Drivers and Vendors in database
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function checkDriversAndVendors() {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('🔍 CHECKING DRIVERS & VENDORS IN DATABASE');
    console.log('='.repeat(70));

    // 1. Check Vendors
    console.log('\n🏢 VENDORS:');
    console.log('-'.repeat(70));
    
    const vendors = await prisma.vendors.findMany({
      include: {
        _count: {
          select: {
            trucks: true,
            drivers: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    if (vendors.length === 0) {
      console.log('   ⚠️  No vendors found in database');
    } else {
      console.log(`   Total vendors: ${vendors.length}\n`);
      vendors.forEach((vendor, index) => {
        console.log(`   ${index + 1}. ${vendor.name} (ID: ${vendor.id})`);
        console.log(`      Address: ${vendor.address || 'N/A'}`);
        console.log(`      Phone: ${vendor.phone || 'N/A'}`);
        console.log(`      Email: ${vendor.email || 'N/A'}`);
        console.log(`      Contact Person: ${vendor.contactPerson || 'N/A'}`);
        console.log(`      Trucks: ${vendor._count.trucks}`);
        console.log(`      Drivers: ${vendor._count.drivers}`);
        console.log(`      Created: ${vendor.createdAt}`);
        console.log();
      });
    }

    // 2. Check Drivers
    console.log('👤 DRIVERS:');
    console.log('-'.repeat(70));
    
    const drivers = await prisma.drivers.findMany({
      include: {
        vendor: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    if (drivers.length === 0) {
      console.log('   ⚠️  No drivers found in database');
    } else {
      console.log(`   Total drivers: ${drivers.length}\n`);
      
      // Group by status
      const activeDrivers = drivers.filter(d => d.status === 'aktif');
      const inactiveDrivers = drivers.filter(d => d.status === 'nonaktif');
      
      console.log(`   Active drivers: ${activeDrivers.length}`);
      console.log(`   Inactive drivers: ${inactiveDrivers.length}\n`);

      drivers.forEach((driver, index) => {
        console.log(`   ${index + 1}. ${driver.name} (ID: ${driver.id})`);
        console.log(`      Status: ${driver.status}`);
        console.log(`      Phone: ${driver.phone || 'N/A'}`);
        console.log(`      Email: ${driver.email || 'N/A'}`);
        console.log(`      License: ${driver.licenseNumber} (${driver.licenseType})`);
        console.log(`      License Expiry: ${driver.licenseExpiry ? new Date(driver.licenseExpiry).toLocaleDateString() : 'N/A'}`);
        console.log(`      ID Card: ${driver.idCardNumber}`);
        console.log(`      Vendor: ${driver.vendor ? driver.vendor.name : 'No vendor'}`);
        console.log(`      Address: ${driver.address || 'N/A'}`);
        console.log();
      });

      // Check for expiring licenses
      console.log('⚠️  LICENSE EXPIRY CHECK:');
      console.log('-'.repeat(70));
      
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      const expiringLicenses = drivers.filter(driver => {
        if (!driver.licenseExpiry) return false;
        const expiryDate = new Date(driver.licenseExpiry);
        return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
      });

      const expiredLicenses = drivers.filter(driver => {
        if (!driver.licenseExpiry) return false;
        const expiryDate = new Date(driver.licenseExpiry);
        return expiryDate < today;
      });

      if (expiredLicenses.length > 0) {
        console.log(`\n   🔴 EXPIRED licenses: ${expiredLicenses.length}`);
        expiredLicenses.forEach(driver => {
          console.log(`      - ${driver.name}: Expired on ${new Date(driver.licenseExpiry).toLocaleDateString()}`);
        });
      }

      if (expiringLicenses.length > 0) {
        console.log(`\n   🟡 EXPIRING in 30 days: ${expiringLicenses.length}`);
        expiringLicenses.forEach(driver => {
          console.log(`      - ${driver.name}: Expires on ${new Date(driver.licenseExpiry).toLocaleDateString()}`);
        });
      }

      if (expiredLicenses.length === 0 && expiringLicenses.length === 0) {
        console.log(`\n   ✅ All licenses are valid (no expired or expiring soon)`);
      }
    }

    // 3. Summary Statistics
    console.log('\n📊 SUMMARY STATISTICS:');
    console.log('-'.repeat(70));
    console.log(`   Total Vendors: ${vendors.length}`);
    console.log(`   Total Drivers: ${drivers.length}`);
    console.log(`   Active Drivers: ${drivers.filter(d => d.status === 'aktif').length}`);
    console.log(`   Inactive Drivers: ${drivers.filter(d => d.status === 'nonaktif').length}`);
    console.log(`   Drivers with Vendors: ${drivers.filter(d => d.vendorId !== null).length}`);
    console.log(`   Drivers without Vendors: ${drivers.filter(d => d.vendorId === null).length}`);

    // Vendor with most trucks
    const vendorWithMostTrucks = vendors.reduce((max, vendor) => 
      vendor._count.trucks > (max?._count.trucks || 0) ? vendor : max, null);
    
    if (vendorWithMostTrucks) {
      console.log(`   Vendor with most trucks: ${vendorWithMostTrucks.name} (${vendorWithMostTrucks._count.trucks} trucks)`);
    }

    // Vendor with most drivers
    const vendorWithMostDrivers = vendors.reduce((max, vendor) => 
      vendor._count.drivers > (max?._count.drivers || 0) ? vendor : max, null);
    
    if (vendorWithMostDrivers) {
      console.log(`   Vendor with most drivers: ${vendorWithMostDrivers.name} (${vendorWithMostDrivers._count.drivers} drivers)`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ CHECK COMPLETE\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDriversAndVendors();
