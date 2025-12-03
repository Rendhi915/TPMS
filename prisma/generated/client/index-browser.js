
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

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  description: 'description',
  severity: 'severity',
  threshold_min: 'threshold_min',
  threshold_max: 'threshold_max',
  created_at: 'created_at',
  updated_at: 'updated_at',
  deleted_at: 'deleted_at'
};

exports.Prisma.Alert_eventsScalarFieldEnum = {
  id: 'id',
  alert_id: 'alert_id',
  device_id: 'device_id',
  sensor_id: 'sensor_id',
  truck_id: 'truck_id',
  value: 'value',
  message: 'message',
  status: 'status',
  created_at: 'created_at',
  resolved_at: 'resolved_at'
};

exports.Prisma.DeviceScalarFieldEnum = {
  id: 'id',
  truck_id: 'truck_id',
  sn: 'sn',
  sim_number: 'sim_number',
  installed_at: 'installed_at',
  bat1: 'bat1',
  bat2: 'bat2',
  bat3: 'bat3',
  created_at: 'created_at',
  deleted_at: 'deleted_at',
  lock: 'lock',
  status: 'status',
  updated_at: 'updated_at'
};

exports.Prisma.DriversScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  license_number: 'license_number',
  license_type: 'license_type',
  license_expiry: 'license_expiry',
  vendor_id: 'vendor_id',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  deleted_at: 'deleted_at'
};

exports.Prisma.LocationScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  lat: 'lat',
  long: 'long',
  created_at: 'created_at',
  recorded_at: 'recorded_at'
};

exports.Prisma.SensorScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  sn: 'sn',
  tireNo: 'tireNo',
  simNumber: 'simNumber',
  sensorNo: 'sensorNo',
  sensor_lock: 'sensor_lock',
  status: 'status',
  tempValue: 'tempValue',
  tirepValue: 'tirepValue',
  exType: 'exType',
  bat: 'bat',
  created_at: 'created_at',
  updated_at: 'updated_at',
  deleted_at: 'deleted_at'
};

exports.Prisma.TruckScalarFieldEnum = {
  id: 'id',
  vin: 'vin',
  name: 'name',
  model: 'model',
  year: 'year',
  vendor_id: 'vendor_id',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_by: 'updated_by',
  deleted_at: 'deleted_at',
  driver_id: 'driver_id',
  image: 'image',
  plate: 'plate',
  status: 'status',
  type: 'type',
  updated_at: 'updated_at'
};

exports.Prisma.User_adminScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  role: 'role',
  last_login: 'last_login',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  deleted_at: 'deleted_at'
};

exports.Prisma.VendorsScalarFieldEnum = {
  id: 'id',
  address: 'address',
  email: 'email',
  contact_person: 'contact_person',
  created_at: 'created_at',
  updated_at: 'updated_at',
  deleted_at: 'deleted_at',
  name_vendor: 'name_vendor',
  telephone: 'telephone'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  alert: 'alert',
  alert_events: 'alert_events',
  device: 'device',
  drivers: 'drivers',
  location: 'location',
  sensor: 'sensor',
  truck: 'truck',
  user_admin: 'user_admin',
  vendors: 'vendors'
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
