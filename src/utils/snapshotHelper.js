/**
 * SNAPSHOT HELPER
 *
 * Helper functions untuk membuat snapshot data pada saat recording
 * Ini memastikan bahwa historical data tetap utuh meskipun master data dihapus
 *
 * Konsep: Data yang di-record harus "freeze" pada saat itu juga
 * Sehingga jika master data diubah/dihapus, history tetap menampilkan data yang benar
 */

/**
 * Membuat snapshot lengkap dari data sensor, device, truck, driver, dan vendor
 * pada saat data tracking direkam
 *
 * @param {Object} sensor - Sensor object dengan relasi lengkap
 * @returns {Object} Snapshot data untuk disimpan di sensor_history
 */
const createSensorHistorySnapshot = (sensor, device, truck, driver = null, vendor = null) => {
  const snapshot = {
    // Sensor snapshot
    sensor_sn: sensor?.sn || null,
    sensor_status: sensor?.status || null,

    // Device snapshot
    device_sn: device?.sn || null,
    device_sim_number: device?.sim_number || null,
    device_status: device?.status || null,
    device_bat1: device?.bat1 || null,
    device_bat2: device?.bat2 || null,
    device_bat3: device?.bat3 || null,

    // Truck snapshot
    truck_vin: truck?.vin || null,
    truck_name: truck?.name || null,
    truck_plate: truck?.plate || null,
    truck_model: truck?.model || null,
    truck_year: truck?.year || null,
    truck_type: truck?.type || null,
    truck_status: truck?.status || null,

    // Driver snapshot (if available)
    driver_id: driver?.id || null,
    driver_name: driver?.name || null,
    driver_phone: driver?.phone || null,
    driver_license: driver?.license_number || null,

    // Vendor snapshot (if available)
    vendor_id: vendor?.id || null,
    vendor_name: vendor?.name_vendor || null,
    vendor_contact: vendor?.contact_person || null,
  };

  return snapshot;
};

/**
 * Membuat snapshot untuk alert_events
 *
 * @param {Object} alert - Alert object
 * @param {Object} truck - Truck object
 * @param {Object} device - Device object
 * @param {Object} sensor - Sensor object
 * @param {Object} driver - Driver object (optional)
 * @param {Object} vendor - Vendor object (optional)
 * @returns {Object} Snapshot data untuk disimpan di alert_events
 */
const createAlertEventSnapshot = (
  alert,
  truck,
  device = null,
  sensor = null,
  driver = null,
  vendor = null
) => {
  const snapshot = {
    // Alert snapshot
    alert_code: alert?.code || null,
    alert_name: alert?.name || null,
    alert_severity: alert?.severity || null,

    // Truck snapshot
    truck_plate: truck?.plate || null,
    truck_name: truck?.name || null,
    truck_vin: truck?.vin || null,

    // Device snapshot
    device_sn: device?.sn || null,

    // Sensor snapshot
    sensor_sn: sensor?.sn || null,
    sensor_tire_no: sensor?.tireNo || null,

    // Driver snapshot
    driver_name: driver?.name || null,

    // Vendor snapshot
    vendor_name: vendor?.name_vendor || null,
  };

  return snapshot;
};

/**
 * Fetch full related data untuk snapshot
 * Mengambil semua data yang diperlukan dengan satu query
 *
 * @param {Object} prisma - Prisma client
 * @param {Number} deviceId - Device ID
 * @returns {Object} Object berisi device, truck, driver, vendor
 */
const fetchSnapshotRelatedData = async (prisma, deviceId) => {
  const device = await prisma.device.findUnique({
    where: { id: deviceId },
    include: {
      truck: {
        include: {
          drivers: true, // Get driver info
          vendors: true, // Get vendor info
        },
      },
    },
  });

  if (!device) {
    return null;
  }

  return {
    device,
    truck: device.truck,
    driver: device.truck?.drivers || null,
    vendor: device.truck?.vendors || null,
  };
};

/**
 * Validasi bahwa snapshot data tidak null untuk field critical
 *
 * @param {Object} snapshot - Snapshot object
 * @returns {Boolean} true jika valid
 */
const validateSnapshot = (snapshot) => {
  // At minimum, truck data harus ada
  return snapshot.truck_plate || snapshot.truck_name || snapshot.truck_vin;
};

module.exports = {
  createSensorHistorySnapshot,
  createAlertEventSnapshot,
  fetchSnapshotRelatedData,
  validateSnapshot,
};
