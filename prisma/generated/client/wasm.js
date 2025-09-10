
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Alert_eventScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  type: 'type',
  severity: 'severity',
  detail: 'detail',
  occurred_at: 'occurred_at',
  acknowledged: 'acknowledged',
  created_by: 'created_by'
};

exports.Prisma.Daily_routeScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  route_date: 'route_date',
  point_count: 'point_count',
  generated_at: 'generated_at',
  created_by: 'created_by'
};

exports.Prisma.DeviceScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  sn: 'sn',
  sim_number: 'sim_number',
  installed_at: 'installed_at',
  removed_at: 'removed_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.Device_status_eventScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  truck_id: 'truck_id',
  host_bat: 'host_bat',
  repeater1_bat: 'repeater1_bat',
  repeater2_bat: 'repeater2_bat',
  lock_state: 'lock_state',
  reported_at: 'reported_at',
  created_by: 'created_by'
};

exports.Prisma.Device_truck_assignmentScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  truck_id: 'truck_id',
  assigned_at: 'assigned_at',
  assigned_by: 'assigned_by',
  removed_at: 'removed_at',
  removed_by: 'removed_by',
  is_active: 'is_active'
};

exports.Prisma.Fleet_groupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  site: 'site',
  description: 'description',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.Fuel_level_eventScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  fuel_percent: 'fuel_percent',
  changed_at: 'changed_at',
  source: 'source',
  created_by: 'created_by'
};

exports.Prisma.GeofenceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_by: 'created_by',
  created_at: 'created_at'
};

exports.Prisma.Gps_positionScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  truck_id: 'truck_id',
  ts: 'ts',
  speed_kph: 'speed_kph',
  heading_deg: 'heading_deg',
  hdop: 'hdop',
  source: 'source'
};

exports.Prisma.Hub_temperature_eventScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  truck_id: 'truck_id',
  hub_no: 'hub_no',
  temp_celsius: 'temp_celsius',
  ex_type: 'ex_type',
  battery_level: 'battery_level',
  changed_at: 'changed_at',
  created_by: 'created_by'
};

exports.Prisma.Lock_eventScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  truck_id: 'truck_id',
  is_lock: 'is_lock',
  reported_at: 'reported_at',
  created_by: 'created_by'
};

exports.Prisma.SensorScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  type: 'type',
  position_no: 'position_no',
  sn: 'sn',
  installed_at: 'installed_at',
  removed_at: 'removed_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.Sensor_data_rawScalarFieldEnum = {
  id: 'id',
  device_sn: 'device_sn',
  cmd_type: 'cmd_type',
  truck_id: 'truck_id',
  tire_no: 'tire_no',
  raw_json: 'raw_json',
  processed: 'processed',
  received_at: 'received_at',
  processed_at: 'processed_at'
};

exports.Prisma.Sensor_processing_queueScalarFieldEnum = {
  id: 'id',
  raw_data_id: 'raw_data_id',
  priority: 'priority',
  attempts: 'attempts',
  max_attempts: 'max_attempts',
  error_message: 'error_message',
  created_at: 'created_at',
  processed_at: 'processed_at'
};

exports.Prisma.Spatial_ref_sysScalarFieldEnum = {
  srid: 'srid',
  auth_name: 'auth_name',
  auth_srid: 'auth_srid',
  srtext: 'srtext',
  proj4text: 'proj4text'
};

exports.Prisma.Speed_eventScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  speed_kph: 'speed_kph',
  changed_at: 'changed_at',
  source: 'source',
  created_by: 'created_by'
};

exports.Prisma.Tire_error_codeScalarFieldEnum = {
  code: 'code',
  description: 'description'
};

exports.Prisma.Tire_position_configScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  tire_no: 'tire_no',
  position_name: 'position_name',
  wheel_type: 'wheel_type',
  is_active: 'is_active',
  created_at: 'created_at'
};

exports.Prisma.Tire_pressure_eventScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  truck_id: 'truck_id',
  tire_no: 'tire_no',
  pressure_kpa: 'pressure_kpa',
  temp_celsius: 'temp_celsius',
  ex_type: 'ex_type',
  battery_level: 'battery_level',
  changed_at: 'changed_at',
  created_by: 'created_by'
};

exports.Prisma.TripScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  start_ts: 'start_ts',
  end_ts: 'end_ts'
};

exports.Prisma.TruckScalarFieldEnum = {
  id: 'id',
  code: 'code',
  vin: 'vin',
  name: 'name',
  model: 'model',
  year: 'year',
  tire_config: 'tire_config',
  fleet_group_id: 'fleet_group_id',
  vendor_id: 'vendor_id',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.Truck_status_eventScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  status: 'status',
  note: 'note',
  changed_at: 'changed_at',
  created_by: 'created_by'
};

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  password_hash: 'password_hash',
  role: 'role',
  is_active: 'is_active',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.VendorsScalarFieldEnum = {
  id: 'id',
  nama_vendor: 'nama_vendor',
  address: 'address',
  nomor_telepon: 'nomor_telepon',
  email: 'email',
  kontak_person: 'kontak_person',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DriversScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  address: 'address',
  license_number: 'license_number',
  license_type: 'license_type',
  license_expiry: 'license_expiry',
  id_card_number: 'id_card_number',
  vendor_id: 'vendor_id',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.alert_type = exports.$Enums.alert_type = {
  LOW_TIRE: 'LOW_TIRE',
  SPEEDING: 'SPEEDING',
  IDLE: 'IDLE',
  GEOFENCE_IN: 'GEOFENCE_IN',
  GEOFENCE_OUT: 'GEOFENCE_OUT',
  FUEL_DROP: 'FUEL_DROP',
  HIGH_TEMP: 'HIGH_TEMP',
  DEVICE_LOST: 'DEVICE_LOST'
};

exports.truck_status = exports.$Enums.truck_status = {
  active: 'active',
  inactive: 'inactive',
  maintenance: 'maintenance'
};

exports.Prisma.ModelName = {
  alert_event: 'alert_event',
  daily_route: 'daily_route',
  device: 'device',
  device_status_event: 'device_status_event',
  device_truck_assignment: 'device_truck_assignment',
  fleet_group: 'fleet_group',
  fuel_level_event: 'fuel_level_event',
  geofence: 'geofence',
  gps_position: 'gps_position',
  hub_temperature_event: 'hub_temperature_event',
  lock_event: 'lock_event',
  sensor: 'sensor',
  sensor_data_raw: 'sensor_data_raw',
  sensor_processing_queue: 'sensor_processing_queue',
  spatial_ref_sys: 'spatial_ref_sys',
  speed_event: 'speed_event',
  tire_error_code: 'tire_error_code',
  tire_position_config: 'tire_position_config',
  tire_pressure_event: 'tire_pressure_event',
  trip: 'trip',
  truck: 'truck',
  truck_status_event: 'truck_status_event',
  users: 'users',
  vendors: 'vendors',
  drivers: 'drivers'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
