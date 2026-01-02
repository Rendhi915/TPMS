
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model alert
 * 
 */
export type alert = $Result.DefaultSelection<Prisma.$alertPayload>
/**
 * Model alert_events
 * 
 */
export type alert_events = $Result.DefaultSelection<Prisma.$alert_eventsPayload>
/**
 * Model device
 * 
 */
export type device = $Result.DefaultSelection<Prisma.$devicePayload>
/**
 * Model drivers
 * 
 */
export type drivers = $Result.DefaultSelection<Prisma.$driversPayload>
/**
 * Model location
 * 
 */
export type location = $Result.DefaultSelection<Prisma.$locationPayload>
/**
 * Model sensor
 * 
 */
export type sensor = $Result.DefaultSelection<Prisma.$sensorPayload>
/**
 * Model sensor_history
 * 
 */
export type sensor_history = $Result.DefaultSelection<Prisma.$sensor_historyPayload>
/**
 * Model truck
 * 
 */
export type truck = $Result.DefaultSelection<Prisma.$truckPayload>
/**
 * Model user_admin
 * 
 */
export type user_admin = $Result.DefaultSelection<Prisma.$user_adminPayload>
/**
 * Model vendors
 * 
 */
export type vendors = $Result.DefaultSelection<Prisma.$vendorsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Alerts
 * const alerts = await prisma.alert.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Alerts
   * const alerts = await prisma.alert.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.alert`: Exposes CRUD operations for the **alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.alertDelegate<ExtArgs>;

  /**
   * `prisma.alert_events`: Exposes CRUD operations for the **alert_events** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alert_events
    * const alert_events = await prisma.alert_events.findMany()
    * ```
    */
  get alert_events(): Prisma.alert_eventsDelegate<ExtArgs>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.deviceDelegate<ExtArgs>;

  /**
   * `prisma.drivers`: Exposes CRUD operations for the **drivers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.drivers.findMany()
    * ```
    */
  get drivers(): Prisma.driversDelegate<ExtArgs>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.locationDelegate<ExtArgs>;

  /**
   * `prisma.sensor`: Exposes CRUD operations for the **sensor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sensors
    * const sensors = await prisma.sensor.findMany()
    * ```
    */
  get sensor(): Prisma.sensorDelegate<ExtArgs>;

  /**
   * `prisma.sensor_history`: Exposes CRUD operations for the **sensor_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sensor_histories
    * const sensor_histories = await prisma.sensor_history.findMany()
    * ```
    */
  get sensor_history(): Prisma.sensor_historyDelegate<ExtArgs>;

  /**
   * `prisma.truck`: Exposes CRUD operations for the **truck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trucks
    * const trucks = await prisma.truck.findMany()
    * ```
    */
  get truck(): Prisma.truckDelegate<ExtArgs>;

  /**
   * `prisma.user_admin`: Exposes CRUD operations for the **user_admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_admins
    * const user_admins = await prisma.user_admin.findMany()
    * ```
    */
  get user_admin(): Prisma.user_adminDelegate<ExtArgs>;

  /**
   * `prisma.vendors`: Exposes CRUD operations for the **vendors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendors.findMany()
    * ```
    */
  get vendors(): Prisma.vendorsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    alert: 'alert',
    alert_events: 'alert_events',
    device: 'device',
    drivers: 'drivers',
    location: 'location',
    sensor: 'sensor',
    sensor_history: 'sensor_history',
    truck: 'truck',
    user_admin: 'user_admin',
    vendors: 'vendors'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "alert" | "alert_events" | "device" | "drivers" | "location" | "sensor" | "sensor_history" | "truck" | "user_admin" | "vendors"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      alert: {
        payload: Prisma.$alertPayload<ExtArgs>
        fields: Prisma.alertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.alertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.alertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>
          }
          findFirst: {
            args: Prisma.alertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.alertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>
          }
          findMany: {
            args: Prisma.alertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>[]
          }
          create: {
            args: Prisma.alertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>
          }
          createMany: {
            args: Prisma.alertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.alertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>[]
          }
          delete: {
            args: Prisma.alertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>
          }
          update: {
            args: Prisma.alertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>
          }
          deleteMany: {
            args: Prisma.alertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.alertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.alertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.alertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.alertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      alert_events: {
        payload: Prisma.$alert_eventsPayload<ExtArgs>
        fields: Prisma.alert_eventsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.alert_eventsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.alert_eventsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>
          }
          findFirst: {
            args: Prisma.alert_eventsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.alert_eventsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>
          }
          findMany: {
            args: Prisma.alert_eventsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>[]
          }
          create: {
            args: Prisma.alert_eventsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>
          }
          createMany: {
            args: Prisma.alert_eventsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.alert_eventsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>[]
          }
          delete: {
            args: Prisma.alert_eventsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>
          }
          update: {
            args: Prisma.alert_eventsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>
          }
          deleteMany: {
            args: Prisma.alert_eventsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.alert_eventsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.alert_eventsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>
          }
          aggregate: {
            args: Prisma.Alert_eventsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert_events>
          }
          groupBy: {
            args: Prisma.alert_eventsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Alert_eventsGroupByOutputType>[]
          }
          count: {
            args: Prisma.alert_eventsCountArgs<ExtArgs>
            result: $Utils.Optional<Alert_eventsCountAggregateOutputType> | number
          }
        }
      }
      device: {
        payload: Prisma.$devicePayload<ExtArgs>
        fields: Prisma.deviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.deviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.deviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>
          }
          findFirst: {
            args: Prisma.deviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.deviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>
          }
          findMany: {
            args: Prisma.deviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>[]
          }
          create: {
            args: Prisma.deviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>
          }
          createMany: {
            args: Prisma.deviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.deviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>[]
          }
          delete: {
            args: Prisma.deviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>
          }
          update: {
            args: Prisma.deviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>
          }
          deleteMany: {
            args: Prisma.deviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.deviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.deviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.deviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.deviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      drivers: {
        payload: Prisma.$driversPayload<ExtArgs>
        fields: Prisma.driversFieldRefs
        operations: {
          findUnique: {
            args: Prisma.driversFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.driversFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          findFirst: {
            args: Prisma.driversFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.driversFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          findMany: {
            args: Prisma.driversFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          create: {
            args: Prisma.driversCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          createMany: {
            args: Prisma.driversCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.driversCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[]
          }
          delete: {
            args: Prisma.driversDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          update: {
            args: Prisma.driversUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          deleteMany: {
            args: Prisma.driversDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.driversUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.driversUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$driversPayload>
          }
          aggregate: {
            args: Prisma.DriversAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrivers>
          }
          groupBy: {
            args: Prisma.driversGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriversGroupByOutputType>[]
          }
          count: {
            args: Prisma.driversCountArgs<ExtArgs>
            result: $Utils.Optional<DriversCountAggregateOutputType> | number
          }
        }
      }
      location: {
        payload: Prisma.$locationPayload<ExtArgs>
        fields: Prisma.locationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.locationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.locationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          findFirst: {
            args: Prisma.locationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.locationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          findMany: {
            args: Prisma.locationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>[]
          }
          create: {
            args: Prisma.locationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          createMany: {
            args: Prisma.locationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.locationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>[]
          }
          delete: {
            args: Prisma.locationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          update: {
            args: Prisma.locationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          deleteMany: {
            args: Prisma.locationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.locationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.locationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.locationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.locationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      sensor: {
        payload: Prisma.$sensorPayload<ExtArgs>
        fields: Prisma.sensorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sensorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sensorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>
          }
          findFirst: {
            args: Prisma.sensorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sensorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>
          }
          findMany: {
            args: Prisma.sensorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>[]
          }
          create: {
            args: Prisma.sensorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>
          }
          createMany: {
            args: Prisma.sensorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sensorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>[]
          }
          delete: {
            args: Prisma.sensorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>
          }
          update: {
            args: Prisma.sensorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>
          }
          deleteMany: {
            args: Prisma.sensorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sensorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.sensorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>
          }
          aggregate: {
            args: Prisma.SensorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensor>
          }
          groupBy: {
            args: Prisma.sensorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorGroupByOutputType>[]
          }
          count: {
            args: Prisma.sensorCountArgs<ExtArgs>
            result: $Utils.Optional<SensorCountAggregateOutputType> | number
          }
        }
      }
      sensor_history: {
        payload: Prisma.$sensor_historyPayload<ExtArgs>
        fields: Prisma.sensor_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sensor_historyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sensor_historyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>
          }
          findFirst: {
            args: Prisma.sensor_historyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sensor_historyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>
          }
          findMany: {
            args: Prisma.sensor_historyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>[]
          }
          create: {
            args: Prisma.sensor_historyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>
          }
          createMany: {
            args: Prisma.sensor_historyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sensor_historyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>[]
          }
          delete: {
            args: Prisma.sensor_historyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>
          }
          update: {
            args: Prisma.sensor_historyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>
          }
          deleteMany: {
            args: Prisma.sensor_historyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sensor_historyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.sensor_historyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sensor_historyPayload>
          }
          aggregate: {
            args: Prisma.Sensor_historyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensor_history>
          }
          groupBy: {
            args: Prisma.sensor_historyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sensor_historyGroupByOutputType>[]
          }
          count: {
            args: Prisma.sensor_historyCountArgs<ExtArgs>
            result: $Utils.Optional<Sensor_historyCountAggregateOutputType> | number
          }
        }
      }
      truck: {
        payload: Prisma.$truckPayload<ExtArgs>
        fields: Prisma.truckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.truckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.truckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>
          }
          findFirst: {
            args: Prisma.truckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.truckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>
          }
          findMany: {
            args: Prisma.truckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>[]
          }
          create: {
            args: Prisma.truckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>
          }
          createMany: {
            args: Prisma.truckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.truckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>[]
          }
          delete: {
            args: Prisma.truckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>
          }
          update: {
            args: Prisma.truckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>
          }
          deleteMany: {
            args: Prisma.truckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.truckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.truckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$truckPayload>
          }
          aggregate: {
            args: Prisma.TruckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTruck>
          }
          groupBy: {
            args: Prisma.truckGroupByArgs<ExtArgs>
            result: $Utils.Optional<TruckGroupByOutputType>[]
          }
          count: {
            args: Prisma.truckCountArgs<ExtArgs>
            result: $Utils.Optional<TruckCountAggregateOutputType> | number
          }
        }
      }
      user_admin: {
        payload: Prisma.$user_adminPayload<ExtArgs>
        fields: Prisma.user_adminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_adminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_adminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>
          }
          findFirst: {
            args: Prisma.user_adminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_adminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>
          }
          findMany: {
            args: Prisma.user_adminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>[]
          }
          create: {
            args: Prisma.user_adminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>
          }
          createMany: {
            args: Prisma.user_adminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_adminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>[]
          }
          delete: {
            args: Prisma.user_adminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>
          }
          update: {
            args: Prisma.user_adminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>
          }
          deleteMany: {
            args: Prisma.user_adminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_adminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.user_adminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>
          }
          aggregate: {
            args: Prisma.User_adminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_admin>
          }
          groupBy: {
            args: Prisma.user_adminGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_adminGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_adminCountArgs<ExtArgs>
            result: $Utils.Optional<User_adminCountAggregateOutputType> | number
          }
        }
      }
      vendors: {
        payload: Prisma.$vendorsPayload<ExtArgs>
        fields: Prisma.vendorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.vendorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.vendorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>
          }
          findFirst: {
            args: Prisma.vendorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.vendorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>
          }
          findMany: {
            args: Prisma.vendorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>[]
          }
          create: {
            args: Prisma.vendorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>
          }
          createMany: {
            args: Prisma.vendorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.vendorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>[]
          }
          delete: {
            args: Prisma.vendorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>
          }
          update: {
            args: Prisma.vendorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>
          }
          deleteMany: {
            args: Prisma.vendorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.vendorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.vendorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>
          }
          aggregate: {
            args: Prisma.VendorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendors>
          }
          groupBy: {
            args: Prisma.vendorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.vendorsCountArgs<ExtArgs>
            result: $Utils.Optional<VendorsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AlertCountOutputType
   */

  export type AlertCountOutputType = {
    alert_events: number
  }

  export type AlertCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | AlertCountOutputTypeCountAlert_eventsArgs
  }

  // Custom InputTypes
  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertCountOutputType
     */
    select?: AlertCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeCountAlert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alert_eventsWhereInput
  }


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    alert_events: number
    location: number
    sensor: number
    sensor_history: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | DeviceCountOutputTypeCountAlert_eventsArgs
    location?: boolean | DeviceCountOutputTypeCountLocationArgs
    sensor?: boolean | DeviceCountOutputTypeCountSensorArgs
    sensor_history?: boolean | DeviceCountOutputTypeCountSensor_historyArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountAlert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alert_eventsWhereInput
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: locationWhereInput
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountSensorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensorWhereInput
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountSensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensor_historyWhereInput
  }


  /**
   * Count Type DriversCountOutputType
   */

  export type DriversCountOutputType = {
    truck: number
  }

  export type DriversCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    truck?: boolean | DriversCountOutputTypeCountTruckArgs
  }

  // Custom InputTypes
  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DriversCountOutputType
     */
    select?: DriversCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeCountTruckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: truckWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    sensor_history: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor_history?: boolean | LocationCountOutputTypeCountSensor_historyArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountSensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensor_historyWhereInput
  }


  /**
   * Count Type SensorCountOutputType
   */

  export type SensorCountOutputType = {
    alert_events: number
    sensor_history: number
  }

  export type SensorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | SensorCountOutputTypeCountAlert_eventsArgs
    sensor_history?: boolean | SensorCountOutputTypeCountSensor_historyArgs
  }

  // Custom InputTypes
  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorCountOutputType
     */
    select?: SensorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountAlert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alert_eventsWhereInput
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountSensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensor_historyWhereInput
  }


  /**
   * Count Type TruckCountOutputType
   */

  export type TruckCountOutputType = {
    alert_events: number
    device: number
    location: number
    sensor_history: number
  }

  export type TruckCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | TruckCountOutputTypeCountAlert_eventsArgs
    device?: boolean | TruckCountOutputTypeCountDeviceArgs
    location?: boolean | TruckCountOutputTypeCountLocationArgs
    sensor_history?: boolean | TruckCountOutputTypeCountSensor_historyArgs
  }

  // Custom InputTypes
  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TruckCountOutputType
     */
    select?: TruckCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeCountAlert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alert_eventsWhereInput
  }

  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeCountDeviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: deviceWhereInput
  }

  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeCountLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: locationWhereInput
  }

  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeCountSensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensor_historyWhereInput
  }


  /**
   * Count Type VendorsCountOutputType
   */

  export type VendorsCountOutputType = {
    drivers: number
    truck: number
  }

  export type VendorsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | VendorsCountOutputTypeCountDriversArgs
    truck?: boolean | VendorsCountOutputTypeCountTruckArgs
  }

  // Custom InputTypes
  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorsCountOutputType
     */
    select?: VendorsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeCountDriversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: driversWhereInput
  }

  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeCountTruckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: truckWhereInput
  }


  /**
   * Models
   */

  /**
   * Model alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertAvgAggregateOutputType = {
    id: number | null
    threshold_min: number | null
    threshold_max: number | null
  }

  export type AlertSumAggregateOutputType = {
    id: number | null
    threshold_min: number | null
    threshold_max: number | null
  }

  export type AlertMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    description: string | null
    severity: string | null
    threshold_min: number | null
    threshold_max: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    description: string | null
    severity: string | null
    threshold_min: number | null
    threshold_max: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    severity: number
    threshold_min: number
    threshold_max: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type AlertAvgAggregateInputType = {
    id?: true
    threshold_min?: true
    threshold_max?: true
  }

  export type AlertSumAggregateInputType = {
    id?: true
    threshold_min?: true
    threshold_max?: true
  }

  export type AlertMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    severity?: true
    threshold_min?: true
    threshold_max?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    severity?: true
    threshold_min?: true
    threshold_max?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    severity?: true
    threshold_min?: true
    threshold_max?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alert to aggregate.
     */
    where?: alertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: alertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type alertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alertWhereInput
    orderBy?: alertOrderByWithAggregationInput | alertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: alertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _avg?: AlertAvgAggregateInputType
    _sum?: AlertSumAggregateInputType
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: number
    code: string
    name: string
    description: string | null
    severity: string
    threshold_min: number | null
    threshold_max: number | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends alertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type alertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    severity?: boolean
    threshold_min?: boolean
    threshold_max?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    alert_events?: boolean | alert$alert_eventsArgs<ExtArgs>
    _count?: boolean | AlertCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type alertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    severity?: boolean
    threshold_min?: boolean
    threshold_max?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["alert"]>

  export type alertSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    severity?: boolean
    threshold_min?: boolean
    threshold_max?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type alertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | alert$alert_eventsArgs<ExtArgs>
    _count?: boolean | AlertCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type alertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $alertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "alert"
    objects: {
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
      description: string | null
      severity: string
      threshold_min: number | null
      threshold_max: number | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type alertGetPayload<S extends boolean | null | undefined | alertDefaultArgs> = $Result.GetResult<Prisma.$alertPayload, S>

  type alertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<alertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface alertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['alert'], meta: { name: 'alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {alertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends alertFindUniqueArgs>(args: SelectSubset<T, alertFindUniqueArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {alertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends alertFindUniqueOrThrowArgs>(args: SelectSubset<T, alertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends alertFindFirstArgs>(args?: SelectSubset<T, alertFindFirstArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends alertFindFirstOrThrowArgs>(args?: SelectSubset<T, alertFindFirstOrThrowArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends alertFindManyArgs>(args?: SelectSubset<T, alertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Alert.
     * @param {alertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends alertCreateArgs>(args: SelectSubset<T, alertCreateArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Alerts.
     * @param {alertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends alertCreateManyArgs>(args?: SelectSubset<T, alertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {alertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends alertCreateManyAndReturnArgs>(args?: SelectSubset<T, alertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Alert.
     * @param {alertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends alertDeleteArgs>(args: SelectSubset<T, alertDeleteArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Alert.
     * @param {alertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends alertUpdateArgs>(args: SelectSubset<T, alertUpdateArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Alerts.
     * @param {alertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends alertDeleteManyArgs>(args?: SelectSubset<T, alertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends alertUpdateManyArgs>(args: SelectSubset<T, alertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert.
     * @param {alertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends alertUpsertArgs>(args: SelectSubset<T, alertUpsertArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends alertCountArgs>(
      args?: Subset<T, alertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends alertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: alertGroupByArgs['orderBy'] }
        : { orderBy?: alertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, alertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the alert model
   */
  readonly fields: alertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__alertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert_events<T extends alert$alert_eventsArgs<ExtArgs> = {}>(args?: Subset<T, alert$alert_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the alert model
   */ 
  interface alertFieldRefs {
    readonly id: FieldRef<"alert", 'Int'>
    readonly code: FieldRef<"alert", 'String'>
    readonly name: FieldRef<"alert", 'String'>
    readonly description: FieldRef<"alert", 'String'>
    readonly severity: FieldRef<"alert", 'String'>
    readonly threshold_min: FieldRef<"alert", 'Float'>
    readonly threshold_max: FieldRef<"alert", 'Float'>
    readonly created_at: FieldRef<"alert", 'DateTime'>
    readonly updated_at: FieldRef<"alert", 'DateTime'>
    readonly deleted_at: FieldRef<"alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * alert findUnique
   */
  export type alertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * Filter, which alert to fetch.
     */
    where: alertWhereUniqueInput
  }

  /**
   * alert findUniqueOrThrow
   */
  export type alertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * Filter, which alert to fetch.
     */
    where: alertWhereUniqueInput
  }

  /**
   * alert findFirst
   */
  export type alertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * Filter, which alert to fetch.
     */
    where?: alertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alerts.
     */
    cursor?: alertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * alert findFirstOrThrow
   */
  export type alertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * Filter, which alert to fetch.
     */
    where?: alertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alerts.
     */
    cursor?: alertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * alert findMany
   */
  export type alertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * Filter, which alerts to fetch.
     */
    where?: alertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing alerts.
     */
    cursor?: alertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * alert create
   */
  export type alertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * The data needed to create a alert.
     */
    data: XOR<alertCreateInput, alertUncheckedCreateInput>
  }

  /**
   * alert createMany
   */
  export type alertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many alerts.
     */
    data: alertCreateManyInput | alertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * alert createManyAndReturn
   */
  export type alertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many alerts.
     */
    data: alertCreateManyInput | alertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * alert update
   */
  export type alertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * The data needed to update a alert.
     */
    data: XOR<alertUpdateInput, alertUncheckedUpdateInput>
    /**
     * Choose, which alert to update.
     */
    where: alertWhereUniqueInput
  }

  /**
   * alert updateMany
   */
  export type alertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update alerts.
     */
    data: XOR<alertUpdateManyMutationInput, alertUncheckedUpdateManyInput>
    /**
     * Filter which alerts to update
     */
    where?: alertWhereInput
  }

  /**
   * alert upsert
   */
  export type alertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * The filter to search for the alert to update in case it exists.
     */
    where: alertWhereUniqueInput
    /**
     * In case the alert found by the `where` argument doesn't exist, create a new alert with this data.
     */
    create: XOR<alertCreateInput, alertUncheckedCreateInput>
    /**
     * In case the alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<alertUpdateInput, alertUncheckedUpdateInput>
  }

  /**
   * alert delete
   */
  export type alertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
    /**
     * Filter which alert to delete.
     */
    where: alertWhereUniqueInput
  }

  /**
   * alert deleteMany
   */
  export type alertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alerts to delete
     */
    where?: alertWhereInput
  }

  /**
   * alert.alert_events
   */
  export type alert$alert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    where?: alert_eventsWhereInput
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    cursor?: alert_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * alert without action
   */
  export type alertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null
  }


  /**
   * Model alert_events
   */

  export type AggregateAlert_events = {
    _count: Alert_eventsCountAggregateOutputType | null
    _avg: Alert_eventsAvgAggregateOutputType | null
    _sum: Alert_eventsSumAggregateOutputType | null
    _min: Alert_eventsMinAggregateOutputType | null
    _max: Alert_eventsMaxAggregateOutputType | null
  }

  export type Alert_eventsAvgAggregateOutputType = {
    id: number | null
    alert_id: number | null
    device_id: number | null
    sensor_id: number | null
    truck_id: number | null
    value: number | null
    sensor_tire_no: number | null
  }

  export type Alert_eventsSumAggregateOutputType = {
    id: number | null
    alert_id: number | null
    device_id: number | null
    sensor_id: number | null
    truck_id: number | null
    value: number | null
    sensor_tire_no: number | null
  }

  export type Alert_eventsMinAggregateOutputType = {
    id: number | null
    alert_id: number | null
    device_id: number | null
    sensor_id: number | null
    truck_id: number | null
    value: number | null
    message: string | null
    status: string | null
    alert_code: string | null
    alert_name: string | null
    alert_severity: string | null
    truck_plate: string | null
    truck_name: string | null
    truck_vin: string | null
    device_sn: string | null
    sensor_sn: string | null
    sensor_tire_no: number | null
    driver_name: string | null
    vendor_name: string | null
    created_at: Date | null
    resolved_at: Date | null
  }

  export type Alert_eventsMaxAggregateOutputType = {
    id: number | null
    alert_id: number | null
    device_id: number | null
    sensor_id: number | null
    truck_id: number | null
    value: number | null
    message: string | null
    status: string | null
    alert_code: string | null
    alert_name: string | null
    alert_severity: string | null
    truck_plate: string | null
    truck_name: string | null
    truck_vin: string | null
    device_sn: string | null
    sensor_sn: string | null
    sensor_tire_no: number | null
    driver_name: string | null
    vendor_name: string | null
    created_at: Date | null
    resolved_at: Date | null
  }

  export type Alert_eventsCountAggregateOutputType = {
    id: number
    alert_id: number
    device_id: number
    sensor_id: number
    truck_id: number
    value: number
    message: number
    status: number
    alert_code: number
    alert_name: number
    alert_severity: number
    truck_plate: number
    truck_name: number
    truck_vin: number
    device_sn: number
    sensor_sn: number
    sensor_tire_no: number
    driver_name: number
    vendor_name: number
    created_at: number
    resolved_at: number
    _all: number
  }


  export type Alert_eventsAvgAggregateInputType = {
    id?: true
    alert_id?: true
    device_id?: true
    sensor_id?: true
    truck_id?: true
    value?: true
    sensor_tire_no?: true
  }

  export type Alert_eventsSumAggregateInputType = {
    id?: true
    alert_id?: true
    device_id?: true
    sensor_id?: true
    truck_id?: true
    value?: true
    sensor_tire_no?: true
  }

  export type Alert_eventsMinAggregateInputType = {
    id?: true
    alert_id?: true
    device_id?: true
    sensor_id?: true
    truck_id?: true
    value?: true
    message?: true
    status?: true
    alert_code?: true
    alert_name?: true
    alert_severity?: true
    truck_plate?: true
    truck_name?: true
    truck_vin?: true
    device_sn?: true
    sensor_sn?: true
    sensor_tire_no?: true
    driver_name?: true
    vendor_name?: true
    created_at?: true
    resolved_at?: true
  }

  export type Alert_eventsMaxAggregateInputType = {
    id?: true
    alert_id?: true
    device_id?: true
    sensor_id?: true
    truck_id?: true
    value?: true
    message?: true
    status?: true
    alert_code?: true
    alert_name?: true
    alert_severity?: true
    truck_plate?: true
    truck_name?: true
    truck_vin?: true
    device_sn?: true
    sensor_sn?: true
    sensor_tire_no?: true
    driver_name?: true
    vendor_name?: true
    created_at?: true
    resolved_at?: true
  }

  export type Alert_eventsCountAggregateInputType = {
    id?: true
    alert_id?: true
    device_id?: true
    sensor_id?: true
    truck_id?: true
    value?: true
    message?: true
    status?: true
    alert_code?: true
    alert_name?: true
    alert_severity?: true
    truck_plate?: true
    truck_name?: true
    truck_vin?: true
    device_sn?: true
    sensor_sn?: true
    sensor_tire_no?: true
    driver_name?: true
    vendor_name?: true
    created_at?: true
    resolved_at?: true
    _all?: true
  }

  export type Alert_eventsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alert_events to aggregate.
     */
    where?: alert_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: alert_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned alert_events
    **/
    _count?: true | Alert_eventsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Alert_eventsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Alert_eventsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Alert_eventsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Alert_eventsMaxAggregateInputType
  }

  export type GetAlert_eventsAggregateType<T extends Alert_eventsAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert_events]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert_events[P]>
      : GetScalarType<T[P], AggregateAlert_events[P]>
  }




  export type alert_eventsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alert_eventsWhereInput
    orderBy?: alert_eventsOrderByWithAggregationInput | alert_eventsOrderByWithAggregationInput[]
    by: Alert_eventsScalarFieldEnum[] | Alert_eventsScalarFieldEnum
    having?: alert_eventsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Alert_eventsCountAggregateInputType | true
    _avg?: Alert_eventsAvgAggregateInputType
    _sum?: Alert_eventsSumAggregateInputType
    _min?: Alert_eventsMinAggregateInputType
    _max?: Alert_eventsMaxAggregateInputType
  }

  export type Alert_eventsGroupByOutputType = {
    id: number
    alert_id: number
    device_id: number | null
    sensor_id: number | null
    truck_id: number | null
    value: number | null
    message: string | null
    status: string
    alert_code: string | null
    alert_name: string | null
    alert_severity: string | null
    truck_plate: string | null
    truck_name: string | null
    truck_vin: string | null
    device_sn: string | null
    sensor_sn: string | null
    sensor_tire_no: number | null
    driver_name: string | null
    vendor_name: string | null
    created_at: Date
    resolved_at: Date | null
    _count: Alert_eventsCountAggregateOutputType | null
    _avg: Alert_eventsAvgAggregateOutputType | null
    _sum: Alert_eventsSumAggregateOutputType | null
    _min: Alert_eventsMinAggregateOutputType | null
    _max: Alert_eventsMaxAggregateOutputType | null
  }

  type GetAlert_eventsGroupByPayload<T extends alert_eventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Alert_eventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Alert_eventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Alert_eventsGroupByOutputType[P]>
            : GetScalarType<T[P], Alert_eventsGroupByOutputType[P]>
        }
      >
    >


  export type alert_eventsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alert_id?: boolean
    device_id?: boolean
    sensor_id?: boolean
    truck_id?: boolean
    value?: boolean
    message?: boolean
    status?: boolean
    alert_code?: boolean
    alert_name?: boolean
    alert_severity?: boolean
    truck_plate?: boolean
    truck_name?: boolean
    truck_vin?: boolean
    device_sn?: boolean
    sensor_sn?: boolean
    sensor_tire_no?: boolean
    driver_name?: boolean
    vendor_name?: boolean
    created_at?: boolean
    resolved_at?: boolean
    alert?: boolean | alertDefaultArgs<ExtArgs>
    device?: boolean | alert_events$deviceArgs<ExtArgs>
    sensor?: boolean | alert_events$sensorArgs<ExtArgs>
    truck?: boolean | alert_events$truckArgs<ExtArgs>
  }, ExtArgs["result"]["alert_events"]>

  export type alert_eventsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alert_id?: boolean
    device_id?: boolean
    sensor_id?: boolean
    truck_id?: boolean
    value?: boolean
    message?: boolean
    status?: boolean
    alert_code?: boolean
    alert_name?: boolean
    alert_severity?: boolean
    truck_plate?: boolean
    truck_name?: boolean
    truck_vin?: boolean
    device_sn?: boolean
    sensor_sn?: boolean
    sensor_tire_no?: boolean
    driver_name?: boolean
    vendor_name?: boolean
    created_at?: boolean
    resolved_at?: boolean
    alert?: boolean | alertDefaultArgs<ExtArgs>
    device?: boolean | alert_events$deviceArgs<ExtArgs>
    sensor?: boolean | alert_events$sensorArgs<ExtArgs>
    truck?: boolean | alert_events$truckArgs<ExtArgs>
  }, ExtArgs["result"]["alert_events"]>

  export type alert_eventsSelectScalar = {
    id?: boolean
    alert_id?: boolean
    device_id?: boolean
    sensor_id?: boolean
    truck_id?: boolean
    value?: boolean
    message?: boolean
    status?: boolean
    alert_code?: boolean
    alert_name?: boolean
    alert_severity?: boolean
    truck_plate?: boolean
    truck_name?: boolean
    truck_vin?: boolean
    device_sn?: boolean
    sensor_sn?: boolean
    sensor_tire_no?: boolean
    driver_name?: boolean
    vendor_name?: boolean
    created_at?: boolean
    resolved_at?: boolean
  }

  export type alert_eventsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert?: boolean | alertDefaultArgs<ExtArgs>
    device?: boolean | alert_events$deviceArgs<ExtArgs>
    sensor?: boolean | alert_events$sensorArgs<ExtArgs>
    truck?: boolean | alert_events$truckArgs<ExtArgs>
  }
  export type alert_eventsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert?: boolean | alertDefaultArgs<ExtArgs>
    device?: boolean | alert_events$deviceArgs<ExtArgs>
    sensor?: boolean | alert_events$sensorArgs<ExtArgs>
    truck?: boolean | alert_events$truckArgs<ExtArgs>
  }

  export type $alert_eventsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "alert_events"
    objects: {
      alert: Prisma.$alertPayload<ExtArgs>
      device: Prisma.$devicePayload<ExtArgs> | null
      sensor: Prisma.$sensorPayload<ExtArgs> | null
      truck: Prisma.$truckPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      alert_id: number
      device_id: number | null
      sensor_id: number | null
      truck_id: number | null
      value: number | null
      message: string | null
      status: string
      alert_code: string | null
      alert_name: string | null
      alert_severity: string | null
      truck_plate: string | null
      truck_name: string | null
      truck_vin: string | null
      device_sn: string | null
      sensor_sn: string | null
      sensor_tire_no: number | null
      driver_name: string | null
      vendor_name: string | null
      created_at: Date
      resolved_at: Date | null
    }, ExtArgs["result"]["alert_events"]>
    composites: {}
  }

  type alert_eventsGetPayload<S extends boolean | null | undefined | alert_eventsDefaultArgs> = $Result.GetResult<Prisma.$alert_eventsPayload, S>

  type alert_eventsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<alert_eventsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Alert_eventsCountAggregateInputType | true
    }

  export interface alert_eventsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['alert_events'], meta: { name: 'alert_events' } }
    /**
     * Find zero or one Alert_events that matches the filter.
     * @param {alert_eventsFindUniqueArgs} args - Arguments to find a Alert_events
     * @example
     * // Get one Alert_events
     * const alert_events = await prisma.alert_events.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends alert_eventsFindUniqueArgs>(args: SelectSubset<T, alert_eventsFindUniqueArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Alert_events that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {alert_eventsFindUniqueOrThrowArgs} args - Arguments to find a Alert_events
     * @example
     * // Get one Alert_events
     * const alert_events = await prisma.alert_events.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends alert_eventsFindUniqueOrThrowArgs>(args: SelectSubset<T, alert_eventsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Alert_events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_eventsFindFirstArgs} args - Arguments to find a Alert_events
     * @example
     * // Get one Alert_events
     * const alert_events = await prisma.alert_events.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends alert_eventsFindFirstArgs>(args?: SelectSubset<T, alert_eventsFindFirstArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Alert_events that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_eventsFindFirstOrThrowArgs} args - Arguments to find a Alert_events
     * @example
     * // Get one Alert_events
     * const alert_events = await prisma.alert_events.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends alert_eventsFindFirstOrThrowArgs>(args?: SelectSubset<T, alert_eventsFindFirstOrThrowArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Alert_events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_eventsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alert_events
     * const alert_events = await prisma.alert_events.findMany()
     * 
     * // Get first 10 Alert_events
     * const alert_events = await prisma.alert_events.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alert_eventsWithIdOnly = await prisma.alert_events.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends alert_eventsFindManyArgs>(args?: SelectSubset<T, alert_eventsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Alert_events.
     * @param {alert_eventsCreateArgs} args - Arguments to create a Alert_events.
     * @example
     * // Create one Alert_events
     * const Alert_events = await prisma.alert_events.create({
     *   data: {
     *     // ... data to create a Alert_events
     *   }
     * })
     * 
     */
    create<T extends alert_eventsCreateArgs>(args: SelectSubset<T, alert_eventsCreateArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Alert_events.
     * @param {alert_eventsCreateManyArgs} args - Arguments to create many Alert_events.
     * @example
     * // Create many Alert_events
     * const alert_events = await prisma.alert_events.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends alert_eventsCreateManyArgs>(args?: SelectSubset<T, alert_eventsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alert_events and returns the data saved in the database.
     * @param {alert_eventsCreateManyAndReturnArgs} args - Arguments to create many Alert_events.
     * @example
     * // Create many Alert_events
     * const alert_events = await prisma.alert_events.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alert_events and only return the `id`
     * const alert_eventsWithIdOnly = await prisma.alert_events.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends alert_eventsCreateManyAndReturnArgs>(args?: SelectSubset<T, alert_eventsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Alert_events.
     * @param {alert_eventsDeleteArgs} args - Arguments to delete one Alert_events.
     * @example
     * // Delete one Alert_events
     * const Alert_events = await prisma.alert_events.delete({
     *   where: {
     *     // ... filter to delete one Alert_events
     *   }
     * })
     * 
     */
    delete<T extends alert_eventsDeleteArgs>(args: SelectSubset<T, alert_eventsDeleteArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Alert_events.
     * @param {alert_eventsUpdateArgs} args - Arguments to update one Alert_events.
     * @example
     * // Update one Alert_events
     * const alert_events = await prisma.alert_events.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends alert_eventsUpdateArgs>(args: SelectSubset<T, alert_eventsUpdateArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Alert_events.
     * @param {alert_eventsDeleteManyArgs} args - Arguments to filter Alert_events to delete.
     * @example
     * // Delete a few Alert_events
     * const { count } = await prisma.alert_events.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends alert_eventsDeleteManyArgs>(args?: SelectSubset<T, alert_eventsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alert_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_eventsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alert_events
     * const alert_events = await prisma.alert_events.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends alert_eventsUpdateManyArgs>(args: SelectSubset<T, alert_eventsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert_events.
     * @param {alert_eventsUpsertArgs} args - Arguments to update or create a Alert_events.
     * @example
     * // Update or create a Alert_events
     * const alert_events = await prisma.alert_events.upsert({
     *   create: {
     *     // ... data to create a Alert_events
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert_events we want to update
     *   }
     * })
     */
    upsert<T extends alert_eventsUpsertArgs>(args: SelectSubset<T, alert_eventsUpsertArgs<ExtArgs>>): Prisma__alert_eventsClient<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Alert_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_eventsCountArgs} args - Arguments to filter Alert_events to count.
     * @example
     * // Count the number of Alert_events
     * const count = await prisma.alert_events.count({
     *   where: {
     *     // ... the filter for the Alert_events we want to count
     *   }
     * })
    **/
    count<T extends alert_eventsCountArgs>(
      args?: Subset<T, alert_eventsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Alert_eventsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Alert_eventsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Alert_eventsAggregateArgs>(args: Subset<T, Alert_eventsAggregateArgs>): Prisma.PrismaPromise<GetAlert_eventsAggregateType<T>>

    /**
     * Group by Alert_events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_eventsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends alert_eventsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: alert_eventsGroupByArgs['orderBy'] }
        : { orderBy?: alert_eventsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, alert_eventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlert_eventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the alert_events model
   */
  readonly fields: alert_eventsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for alert_events.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__alert_eventsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert<T extends alertDefaultArgs<ExtArgs> = {}>(args?: Subset<T, alertDefaultArgs<ExtArgs>>): Prisma__alertClient<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    device<T extends alert_events$deviceArgs<ExtArgs> = {}>(args?: Subset<T, alert_events$deviceArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    sensor<T extends alert_events$sensorArgs<ExtArgs> = {}>(args?: Subset<T, alert_events$sensorArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    truck<T extends alert_events$truckArgs<ExtArgs> = {}>(args?: Subset<T, alert_events$truckArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the alert_events model
   */ 
  interface alert_eventsFieldRefs {
    readonly id: FieldRef<"alert_events", 'Int'>
    readonly alert_id: FieldRef<"alert_events", 'Int'>
    readonly device_id: FieldRef<"alert_events", 'Int'>
    readonly sensor_id: FieldRef<"alert_events", 'Int'>
    readonly truck_id: FieldRef<"alert_events", 'Int'>
    readonly value: FieldRef<"alert_events", 'Float'>
    readonly message: FieldRef<"alert_events", 'String'>
    readonly status: FieldRef<"alert_events", 'String'>
    readonly alert_code: FieldRef<"alert_events", 'String'>
    readonly alert_name: FieldRef<"alert_events", 'String'>
    readonly alert_severity: FieldRef<"alert_events", 'String'>
    readonly truck_plate: FieldRef<"alert_events", 'String'>
    readonly truck_name: FieldRef<"alert_events", 'String'>
    readonly truck_vin: FieldRef<"alert_events", 'String'>
    readonly device_sn: FieldRef<"alert_events", 'String'>
    readonly sensor_sn: FieldRef<"alert_events", 'String'>
    readonly sensor_tire_no: FieldRef<"alert_events", 'Int'>
    readonly driver_name: FieldRef<"alert_events", 'String'>
    readonly vendor_name: FieldRef<"alert_events", 'String'>
    readonly created_at: FieldRef<"alert_events", 'DateTime'>
    readonly resolved_at: FieldRef<"alert_events", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * alert_events findUnique
   */
  export type alert_eventsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * Filter, which alert_events to fetch.
     */
    where: alert_eventsWhereUniqueInput
  }

  /**
   * alert_events findUniqueOrThrow
   */
  export type alert_eventsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * Filter, which alert_events to fetch.
     */
    where: alert_eventsWhereUniqueInput
  }

  /**
   * alert_events findFirst
   */
  export type alert_eventsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * Filter, which alert_events to fetch.
     */
    where?: alert_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alert_events.
     */
    cursor?: alert_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alert_events.
     */
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * alert_events findFirstOrThrow
   */
  export type alert_eventsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * Filter, which alert_events to fetch.
     */
    where?: alert_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alert_events.
     */
    cursor?: alert_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alert_events.
     */
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * alert_events findMany
   */
  export type alert_eventsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * Filter, which alert_events to fetch.
     */
    where?: alert_eventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing alert_events.
     */
    cursor?: alert_eventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_events.
     */
    skip?: number
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * alert_events create
   */
  export type alert_eventsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * The data needed to create a alert_events.
     */
    data: XOR<alert_eventsCreateInput, alert_eventsUncheckedCreateInput>
  }

  /**
   * alert_events createMany
   */
  export type alert_eventsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many alert_events.
     */
    data: alert_eventsCreateManyInput | alert_eventsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * alert_events createManyAndReturn
   */
  export type alert_eventsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many alert_events.
     */
    data: alert_eventsCreateManyInput | alert_eventsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * alert_events update
   */
  export type alert_eventsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * The data needed to update a alert_events.
     */
    data: XOR<alert_eventsUpdateInput, alert_eventsUncheckedUpdateInput>
    /**
     * Choose, which alert_events to update.
     */
    where: alert_eventsWhereUniqueInput
  }

  /**
   * alert_events updateMany
   */
  export type alert_eventsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update alert_events.
     */
    data: XOR<alert_eventsUpdateManyMutationInput, alert_eventsUncheckedUpdateManyInput>
    /**
     * Filter which alert_events to update
     */
    where?: alert_eventsWhereInput
  }

  /**
   * alert_events upsert
   */
  export type alert_eventsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * The filter to search for the alert_events to update in case it exists.
     */
    where: alert_eventsWhereUniqueInput
    /**
     * In case the alert_events found by the `where` argument doesn't exist, create a new alert_events with this data.
     */
    create: XOR<alert_eventsCreateInput, alert_eventsUncheckedCreateInput>
    /**
     * In case the alert_events was found with the provided `where` argument, update it with this data.
     */
    update: XOR<alert_eventsUpdateInput, alert_eventsUncheckedUpdateInput>
  }

  /**
   * alert_events delete
   */
  export type alert_eventsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    /**
     * Filter which alert_events to delete.
     */
    where: alert_eventsWhereUniqueInput
  }

  /**
   * alert_events deleteMany
   */
  export type alert_eventsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alert_events to delete
     */
    where?: alert_eventsWhereInput
  }

  /**
   * alert_events.device
   */
  export type alert_events$deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    where?: deviceWhereInput
  }

  /**
   * alert_events.sensor
   */
  export type alert_events$sensorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    where?: sensorWhereInput
  }

  /**
   * alert_events.truck
   */
  export type alert_events$truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    where?: truckWhereInput
  }

  /**
   * alert_events without action
   */
  export type alert_eventsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
  }


  /**
   * Model device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceAvgAggregateOutputType = {
    id: number | null
    truck_id: number | null
    bat1: number | null
    bat2: number | null
    bat3: number | null
    lock: number | null
  }

  export type DeviceSumAggregateOutputType = {
    id: number | null
    truck_id: number | null
    bat1: number | null
    bat2: number | null
    bat3: number | null
    lock: number | null
  }

  export type DeviceMinAggregateOutputType = {
    id: number | null
    truck_id: number | null
    sn: string | null
    sim_number: string | null
    installed_at: Date | null
    bat1: number | null
    bat2: number | null
    bat3: number | null
    created_at: Date | null
    deleted_at: Date | null
    lock: number | null
    status: string | null
    updated_at: Date | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: number | null
    truck_id: number | null
    sn: string | null
    sim_number: string | null
    installed_at: Date | null
    bat1: number | null
    bat2: number | null
    bat3: number | null
    created_at: Date | null
    deleted_at: Date | null
    lock: number | null
    status: string | null
    updated_at: Date | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    truck_id: number
    sn: number
    sim_number: number
    installed_at: number
    bat1: number
    bat2: number
    bat3: number
    created_at: number
    deleted_at: number
    lock: number
    status: number
    updated_at: number
    _all: number
  }


  export type DeviceAvgAggregateInputType = {
    id?: true
    truck_id?: true
    bat1?: true
    bat2?: true
    bat3?: true
    lock?: true
  }

  export type DeviceSumAggregateInputType = {
    id?: true
    truck_id?: true
    bat1?: true
    bat2?: true
    bat3?: true
    lock?: true
  }

  export type DeviceMinAggregateInputType = {
    id?: true
    truck_id?: true
    sn?: true
    sim_number?: true
    installed_at?: true
    bat1?: true
    bat2?: true
    bat3?: true
    created_at?: true
    deleted_at?: true
    lock?: true
    status?: true
    updated_at?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    truck_id?: true
    sn?: true
    sim_number?: true
    installed_at?: true
    bat1?: true
    bat2?: true
    bat3?: true
    created_at?: true
    deleted_at?: true
    lock?: true
    status?: true
    updated_at?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    truck_id?: true
    sn?: true
    sim_number?: true
    installed_at?: true
    bat1?: true
    bat2?: true
    bat3?: true
    created_at?: true
    deleted_at?: true
    lock?: true
    status?: true
    updated_at?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which device to aggregate.
     */
    where?: deviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: deviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type deviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: deviceWhereInput
    orderBy?: deviceOrderByWithAggregationInput | deviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: deviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _avg?: DeviceAvgAggregateInputType
    _sum?: DeviceSumAggregateInputType
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: number
    truck_id: number
    sn: string
    sim_number: string | null
    installed_at: Date
    bat1: number | null
    bat2: number | null
    bat3: number | null
    created_at: Date
    deleted_at: Date | null
    lock: number
    status: string
    updated_at: Date
    _count: DeviceCountAggregateOutputType | null
    _avg: DeviceAvgAggregateOutputType | null
    _sum: DeviceSumAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends deviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type deviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    truck_id?: boolean
    sn?: boolean
    sim_number?: boolean
    installed_at?: boolean
    bat1?: boolean
    bat2?: boolean
    bat3?: boolean
    created_at?: boolean
    deleted_at?: boolean
    lock?: boolean
    status?: boolean
    updated_at?: boolean
    alert_events?: boolean | device$alert_eventsArgs<ExtArgs>
    truck?: boolean | truckDefaultArgs<ExtArgs>
    location?: boolean | device$locationArgs<ExtArgs>
    sensor?: boolean | device$sensorArgs<ExtArgs>
    sensor_history?: boolean | device$sensor_historyArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type deviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    truck_id?: boolean
    sn?: boolean
    sim_number?: boolean
    installed_at?: boolean
    bat1?: boolean
    bat2?: boolean
    bat3?: boolean
    created_at?: boolean
    deleted_at?: boolean
    lock?: boolean
    status?: boolean
    updated_at?: boolean
    truck?: boolean | truckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type deviceSelectScalar = {
    id?: boolean
    truck_id?: boolean
    sn?: boolean
    sim_number?: boolean
    installed_at?: boolean
    bat1?: boolean
    bat2?: boolean
    bat3?: boolean
    created_at?: boolean
    deleted_at?: boolean
    lock?: boolean
    status?: boolean
    updated_at?: boolean
  }

  export type deviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | device$alert_eventsArgs<ExtArgs>
    truck?: boolean | truckDefaultArgs<ExtArgs>
    location?: boolean | device$locationArgs<ExtArgs>
    sensor?: boolean | device$sensorArgs<ExtArgs>
    sensor_history?: boolean | device$sensor_historyArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type deviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    truck?: boolean | truckDefaultArgs<ExtArgs>
  }

  export type $devicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "device"
    objects: {
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[]
      truck: Prisma.$truckPayload<ExtArgs>
      location: Prisma.$locationPayload<ExtArgs>[]
      sensor: Prisma.$sensorPayload<ExtArgs>[]
      sensor_history: Prisma.$sensor_historyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      truck_id: number
      sn: string
      sim_number: string | null
      installed_at: Date
      bat1: number | null
      bat2: number | null
      bat3: number | null
      created_at: Date
      deleted_at: Date | null
      lock: number
      status: string
      updated_at: Date
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type deviceGetPayload<S extends boolean | null | undefined | deviceDefaultArgs> = $Result.GetResult<Prisma.$devicePayload, S>

  type deviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<deviceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface deviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['device'], meta: { name: 'device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {deviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends deviceFindUniqueArgs>(args: SelectSubset<T, deviceFindUniqueArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {deviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends deviceFindUniqueOrThrowArgs>(args: SelectSubset<T, deviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends deviceFindFirstArgs>(args?: SelectSubset<T, deviceFindFirstArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends deviceFindFirstOrThrowArgs>(args?: SelectSubset<T, deviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends deviceFindManyArgs>(args?: SelectSubset<T, deviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Device.
     * @param {deviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends deviceCreateArgs>(args: SelectSubset<T, deviceCreateArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Devices.
     * @param {deviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends deviceCreateManyArgs>(args?: SelectSubset<T, deviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {deviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends deviceCreateManyAndReturnArgs>(args?: SelectSubset<T, deviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Device.
     * @param {deviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends deviceDeleteArgs>(args: SelectSubset<T, deviceDeleteArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Device.
     * @param {deviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends deviceUpdateArgs>(args: SelectSubset<T, deviceUpdateArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Devices.
     * @param {deviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends deviceDeleteManyArgs>(args?: SelectSubset<T, deviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends deviceUpdateManyArgs>(args: SelectSubset<T, deviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Device.
     * @param {deviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends deviceUpsertArgs>(args: SelectSubset<T, deviceUpsertArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends deviceCountArgs>(
      args?: Subset<T, deviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {deviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends deviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: deviceGroupByArgs['orderBy'] }
        : { orderBy?: deviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, deviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the device model
   */
  readonly fields: deviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__deviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert_events<T extends device$alert_eventsArgs<ExtArgs> = {}>(args?: Subset<T, device$alert_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findMany"> | Null>
    truck<T extends truckDefaultArgs<ExtArgs> = {}>(args?: Subset<T, truckDefaultArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    location<T extends device$locationArgs<ExtArgs> = {}>(args?: Subset<T, device$locationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findMany"> | Null>
    sensor<T extends device$sensorArgs<ExtArgs> = {}>(args?: Subset<T, device$sensorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findMany"> | Null>
    sensor_history<T extends device$sensor_historyArgs<ExtArgs> = {}>(args?: Subset<T, device$sensor_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the device model
   */ 
  interface deviceFieldRefs {
    readonly id: FieldRef<"device", 'Int'>
    readonly truck_id: FieldRef<"device", 'Int'>
    readonly sn: FieldRef<"device", 'String'>
    readonly sim_number: FieldRef<"device", 'String'>
    readonly installed_at: FieldRef<"device", 'DateTime'>
    readonly bat1: FieldRef<"device", 'Int'>
    readonly bat2: FieldRef<"device", 'Int'>
    readonly bat3: FieldRef<"device", 'Int'>
    readonly created_at: FieldRef<"device", 'DateTime'>
    readonly deleted_at: FieldRef<"device", 'DateTime'>
    readonly lock: FieldRef<"device", 'Int'>
    readonly status: FieldRef<"device", 'String'>
    readonly updated_at: FieldRef<"device", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * device findUnique
   */
  export type deviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * Filter, which device to fetch.
     */
    where: deviceWhereUniqueInput
  }

  /**
   * device findUniqueOrThrow
   */
  export type deviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * Filter, which device to fetch.
     */
    where: deviceWhereUniqueInput
  }

  /**
   * device findFirst
   */
  export type deviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * Filter, which device to fetch.
     */
    where?: deviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for devices.
     */
    cursor?: deviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * device findFirstOrThrow
   */
  export type deviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * Filter, which device to fetch.
     */
    where?: deviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for devices.
     */
    cursor?: deviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * device findMany
   */
  export type deviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * Filter, which devices to fetch.
     */
    where?: deviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing devices.
     */
    cursor?: deviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * device create
   */
  export type deviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * The data needed to create a device.
     */
    data: XOR<deviceCreateInput, deviceUncheckedCreateInput>
  }

  /**
   * device createMany
   */
  export type deviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many devices.
     */
    data: deviceCreateManyInput | deviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * device createManyAndReturn
   */
  export type deviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many devices.
     */
    data: deviceCreateManyInput | deviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * device update
   */
  export type deviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * The data needed to update a device.
     */
    data: XOR<deviceUpdateInput, deviceUncheckedUpdateInput>
    /**
     * Choose, which device to update.
     */
    where: deviceWhereUniqueInput
  }

  /**
   * device updateMany
   */
  export type deviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update devices.
     */
    data: XOR<deviceUpdateManyMutationInput, deviceUncheckedUpdateManyInput>
    /**
     * Filter which devices to update
     */
    where?: deviceWhereInput
  }

  /**
   * device upsert
   */
  export type deviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * The filter to search for the device to update in case it exists.
     */
    where: deviceWhereUniqueInput
    /**
     * In case the device found by the `where` argument doesn't exist, create a new device with this data.
     */
    create: XOR<deviceCreateInput, deviceUncheckedCreateInput>
    /**
     * In case the device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<deviceUpdateInput, deviceUncheckedUpdateInput>
  }

  /**
   * device delete
   */
  export type deviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    /**
     * Filter which device to delete.
     */
    where: deviceWhereUniqueInput
  }

  /**
   * device deleteMany
   */
  export type deviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which devices to delete
     */
    where?: deviceWhereInput
  }

  /**
   * device.alert_events
   */
  export type device$alert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    where?: alert_eventsWhereInput
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    cursor?: alert_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * device.location
   */
  export type device$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    where?: locationWhereInput
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    cursor?: locationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * device.sensor
   */
  export type device$sensorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    where?: sensorWhereInput
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[]
    cursor?: sensorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * device.sensor_history
   */
  export type device$sensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    where?: sensor_historyWhereInput
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    cursor?: sensor_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * device without action
   */
  export type deviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
  }


  /**
   * Model drivers
   */

  export type AggregateDrivers = {
    _count: DriversCountAggregateOutputType | null
    _avg: DriversAvgAggregateOutputType | null
    _sum: DriversSumAggregateOutputType | null
    _min: DriversMinAggregateOutputType | null
    _max: DriversMaxAggregateOutputType | null
  }

  export type DriversAvgAggregateOutputType = {
    id: number | null
    vendor_id: number | null
  }

  export type DriversSumAggregateOutputType = {
    id: number | null
    vendor_id: number | null
  }

  export type DriversMinAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    license_number: string | null
    license_type: string | null
    license_expiry: Date | null
    vendor_id: number | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type DriversMaxAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    license_number: string | null
    license_type: string | null
    license_expiry: Date | null
    vendor_id: number | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type DriversCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    license_number: number
    license_type: number
    license_expiry: number
    vendor_id: number
    status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type DriversAvgAggregateInputType = {
    id?: true
    vendor_id?: true
  }

  export type DriversSumAggregateInputType = {
    id?: true
    vendor_id?: true
  }

  export type DriversMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    license_number?: true
    license_type?: true
    license_expiry?: true
    vendor_id?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type DriversMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    license_number?: true
    license_type?: true
    license_expiry?: true
    vendor_id?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type DriversCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    license_number?: true
    license_type?: true
    license_expiry?: true
    vendor_id?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type DriversAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drivers to aggregate.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned drivers
    **/
    _count?: true | DriversCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriversAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriversSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriversMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriversMaxAggregateInputType
  }

  export type GetDriversAggregateType<T extends DriversAggregateArgs> = {
        [P in keyof T & keyof AggregateDrivers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrivers[P]>
      : GetScalarType<T[P], AggregateDrivers[P]>
  }




  export type driversGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: driversWhereInput
    orderBy?: driversOrderByWithAggregationInput | driversOrderByWithAggregationInput[]
    by: DriversScalarFieldEnum[] | DriversScalarFieldEnum
    having?: driversScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriversCountAggregateInputType | true
    _avg?: DriversAvgAggregateInputType
    _sum?: DriversSumAggregateInputType
    _min?: DriversMinAggregateInputType
    _max?: DriversMaxAggregateInputType
  }

  export type DriversGroupByOutputType = {
    id: number
    name: string
    phone: string | null
    email: string | null
    license_number: string
    license_type: string
    license_expiry: Date
    vendor_id: number | null
    status: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: DriversCountAggregateOutputType | null
    _avg: DriversAvgAggregateOutputType | null
    _sum: DriversSumAggregateOutputType | null
    _min: DriversMinAggregateOutputType | null
    _max: DriversMaxAggregateOutputType | null
  }

  type GetDriversGroupByPayload<T extends driversGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriversGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriversGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriversGroupByOutputType[P]>
            : GetScalarType<T[P], DriversGroupByOutputType[P]>
        }
      >
    >


  export type driversSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    license_number?: boolean
    license_type?: boolean
    license_expiry?: boolean
    vendor_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    vendors?: boolean | drivers$vendorsArgs<ExtArgs>
    truck?: boolean | drivers$truckArgs<ExtArgs>
    _count?: boolean | DriversCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    license_number?: boolean
    license_type?: boolean
    license_expiry?: boolean
    vendor_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    vendors?: boolean | drivers$vendorsArgs<ExtArgs>
  }, ExtArgs["result"]["drivers"]>

  export type driversSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    license_number?: boolean
    license_type?: boolean
    license_expiry?: boolean
    vendor_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type driversInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendors?: boolean | drivers$vendorsArgs<ExtArgs>
    truck?: boolean | drivers$truckArgs<ExtArgs>
    _count?: boolean | DriversCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type driversIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendors?: boolean | drivers$vendorsArgs<ExtArgs>
  }

  export type $driversPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "drivers"
    objects: {
      vendors: Prisma.$vendorsPayload<ExtArgs> | null
      truck: Prisma.$truckPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      phone: string | null
      email: string | null
      license_number: string
      license_type: string
      license_expiry: Date
      vendor_id: number | null
      status: string
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["drivers"]>
    composites: {}
  }

  type driversGetPayload<S extends boolean | null | undefined | driversDefaultArgs> = $Result.GetResult<Prisma.$driversPayload, S>

  type driversCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<driversFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DriversCountAggregateInputType | true
    }

  export interface driversDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['drivers'], meta: { name: 'drivers' } }
    /**
     * Find zero or one Drivers that matches the filter.
     * @param {driversFindUniqueArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends driversFindUniqueArgs>(args: SelectSubset<T, driversFindUniqueArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Drivers that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {driversFindUniqueOrThrowArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends driversFindUniqueOrThrowArgs>(args: SelectSubset<T, driversFindUniqueOrThrowArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindFirstArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends driversFindFirstArgs>(args?: SelectSubset<T, driversFindFirstArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Drivers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindFirstOrThrowArgs} args - Arguments to find a Drivers
     * @example
     * // Get one Drivers
     * const drivers = await prisma.drivers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends driversFindFirstOrThrowArgs>(args?: SelectSubset<T, driversFindFirstOrThrowArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.drivers.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.drivers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driversWithIdOnly = await prisma.drivers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends driversFindManyArgs>(args?: SelectSubset<T, driversFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Drivers.
     * @param {driversCreateArgs} args - Arguments to create a Drivers.
     * @example
     * // Create one Drivers
     * const Drivers = await prisma.drivers.create({
     *   data: {
     *     // ... data to create a Drivers
     *   }
     * })
     * 
     */
    create<T extends driversCreateArgs>(args: SelectSubset<T, driversCreateArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Drivers.
     * @param {driversCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const drivers = await prisma.drivers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends driversCreateManyArgs>(args?: SelectSubset<T, driversCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {driversCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const drivers = await prisma.drivers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driversWithIdOnly = await prisma.drivers.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends driversCreateManyAndReturnArgs>(args?: SelectSubset<T, driversCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Drivers.
     * @param {driversDeleteArgs} args - Arguments to delete one Drivers.
     * @example
     * // Delete one Drivers
     * const Drivers = await prisma.drivers.delete({
     *   where: {
     *     // ... filter to delete one Drivers
     *   }
     * })
     * 
     */
    delete<T extends driversDeleteArgs>(args: SelectSubset<T, driversDeleteArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Drivers.
     * @param {driversUpdateArgs} args - Arguments to update one Drivers.
     * @example
     * // Update one Drivers
     * const drivers = await prisma.drivers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends driversUpdateArgs>(args: SelectSubset<T, driversUpdateArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Drivers.
     * @param {driversDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.drivers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends driversDeleteManyArgs>(args?: SelectSubset<T, driversDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const drivers = await prisma.drivers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends driversUpdateManyArgs>(args: SelectSubset<T, driversUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Drivers.
     * @param {driversUpsertArgs} args - Arguments to update or create a Drivers.
     * @example
     * // Update or create a Drivers
     * const drivers = await prisma.drivers.upsert({
     *   create: {
     *     // ... data to create a Drivers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drivers we want to update
     *   }
     * })
     */
    upsert<T extends driversUpsertArgs>(args: SelectSubset<T, driversUpsertArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.drivers.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends driversCountArgs>(
      args?: Subset<T, driversCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriversCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriversAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriversAggregateArgs>(args: Subset<T, DriversAggregateArgs>): Prisma.PrismaPromise<GetDriversAggregateType<T>>

    /**
     * Group by Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {driversGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends driversGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: driversGroupByArgs['orderBy'] }
        : { orderBy?: driversGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, driversGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriversGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the drivers model
   */
  readonly fields: driversFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for drivers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__driversClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendors<T extends drivers$vendorsArgs<ExtArgs> = {}>(args?: Subset<T, drivers$vendorsArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    truck<T extends drivers$truckArgs<ExtArgs> = {}>(args?: Subset<T, drivers$truckArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the drivers model
   */ 
  interface driversFieldRefs {
    readonly id: FieldRef<"drivers", 'Int'>
    readonly name: FieldRef<"drivers", 'String'>
    readonly phone: FieldRef<"drivers", 'String'>
    readonly email: FieldRef<"drivers", 'String'>
    readonly license_number: FieldRef<"drivers", 'String'>
    readonly license_type: FieldRef<"drivers", 'String'>
    readonly license_expiry: FieldRef<"drivers", 'DateTime'>
    readonly vendor_id: FieldRef<"drivers", 'Int'>
    readonly status: FieldRef<"drivers", 'String'>
    readonly created_at: FieldRef<"drivers", 'DateTime'>
    readonly updated_at: FieldRef<"drivers", 'DateTime'>
    readonly deleted_at: FieldRef<"drivers", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * drivers findUnique
   */
  export type driversFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers findUniqueOrThrow
   */
  export type driversFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers findFirst
   */
  export type driversFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers findFirstOrThrow
   */
  export type driversFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers findMany
   */
  export type driversFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing drivers.
     */
    cursor?: driversWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` drivers.
     */
    skip?: number
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * drivers create
   */
  export type driversCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * The data needed to create a drivers.
     */
    data: XOR<driversCreateInput, driversUncheckedCreateInput>
  }

  /**
   * drivers createMany
   */
  export type driversCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * drivers createManyAndReturn
   */
  export type driversCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * drivers update
   */
  export type driversUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * The data needed to update a drivers.
     */
    data: XOR<driversUpdateInput, driversUncheckedUpdateInput>
    /**
     * Choose, which drivers to update.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers updateMany
   */
  export type driversUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update drivers.
     */
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyInput>
    /**
     * Filter which drivers to update
     */
    where?: driversWhereInput
  }

  /**
   * drivers upsert
   */
  export type driversUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * The filter to search for the drivers to update in case it exists.
     */
    where: driversWhereUniqueInput
    /**
     * In case the drivers found by the `where` argument doesn't exist, create a new drivers with this data.
     */
    create: XOR<driversCreateInput, driversUncheckedCreateInput>
    /**
     * In case the drivers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<driversUpdateInput, driversUncheckedUpdateInput>
  }

  /**
   * drivers delete
   */
  export type driversDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    /**
     * Filter which drivers to delete.
     */
    where: driversWhereUniqueInput
  }

  /**
   * drivers deleteMany
   */
  export type driversDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which drivers to delete
     */
    where?: driversWhereInput
  }

  /**
   * drivers.vendors
   */
  export type drivers$vendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    where?: vendorsWhereInput
  }

  /**
   * drivers.truck
   */
  export type drivers$truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    where?: truckWhereInput
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[]
    cursor?: truckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[]
  }

  /**
   * drivers without action
   */
  export type driversDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
  }


  /**
   * Model location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    id: number | null
    device_id: number | null
    truck_id: number | null
    lat: number | null
    long: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
  }

  export type LocationSumAggregateOutputType = {
    id: number | null
    device_id: number | null
    truck_id: number | null
    lat: number | null
    long: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: number | null
    device_id: number | null
    truck_id: number | null
    lat: number | null
    long: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    created_at: Date | null
    recorded_at: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: number | null
    device_id: number | null
    truck_id: number | null
    lat: number | null
    long: number | null
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    created_at: Date | null
    recorded_at: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    device_id: number
    truck_id: number
    lat: number
    long: number
    speed: number
    heading: number
    altitude: number
    accuracy: number
    created_at: number
    recorded_at: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    id?: true
    device_id?: true
    truck_id?: true
    lat?: true
    long?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
  }

  export type LocationSumAggregateInputType = {
    id?: true
    device_id?: true
    truck_id?: true
    lat?: true
    long?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    device_id?: true
    truck_id?: true
    lat?: true
    long?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    created_at?: true
    recorded_at?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    device_id?: true
    truck_id?: true
    lat?: true
    long?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    created_at?: true
    recorded_at?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    device_id?: true
    truck_id?: true
    lat?: true
    long?: true
    speed?: true
    heading?: true
    altitude?: true
    accuracy?: true
    created_at?: true
    recorded_at?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which location to aggregate.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type locationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: locationWhereInput
    orderBy?: locationOrderByWithAggregationInput | locationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: locationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: number
    device_id: number
    truck_id: number | null
    lat: number
    long: number
    speed: number | null
    heading: number | null
    altitude: number | null
    accuracy: number | null
    created_at: Date
    recorded_at: Date
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends locationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type locationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    truck_id?: boolean
    lat?: boolean
    long?: boolean
    speed?: boolean
    heading?: boolean
    altitude?: boolean
    accuracy?: boolean
    created_at?: boolean
    recorded_at?: boolean
    device?: boolean | deviceDefaultArgs<ExtArgs>
    truck?: boolean | location$truckArgs<ExtArgs>
    sensor_history?: boolean | location$sensor_historyArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type locationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    truck_id?: boolean
    lat?: boolean
    long?: boolean
    speed?: boolean
    heading?: boolean
    altitude?: boolean
    accuracy?: boolean
    created_at?: boolean
    recorded_at?: boolean
    device?: boolean | deviceDefaultArgs<ExtArgs>
    truck?: boolean | location$truckArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type locationSelectScalar = {
    id?: boolean
    device_id?: boolean
    truck_id?: boolean
    lat?: boolean
    long?: boolean
    speed?: boolean
    heading?: boolean
    altitude?: boolean
    accuracy?: boolean
    created_at?: boolean
    recorded_at?: boolean
  }

  export type locationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | deviceDefaultArgs<ExtArgs>
    truck?: boolean | location$truckArgs<ExtArgs>
    sensor_history?: boolean | location$sensor_historyArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type locationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | deviceDefaultArgs<ExtArgs>
    truck?: boolean | location$truckArgs<ExtArgs>
  }

  export type $locationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "location"
    objects: {
      device: Prisma.$devicePayload<ExtArgs>
      truck: Prisma.$truckPayload<ExtArgs> | null
      sensor_history: Prisma.$sensor_historyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      device_id: number
      truck_id: number | null
      lat: number
      long: number
      speed: number | null
      heading: number | null
      altitude: number | null
      accuracy: number | null
      created_at: Date
      recorded_at: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type locationGetPayload<S extends boolean | null | undefined | locationDefaultArgs> = $Result.GetResult<Prisma.$locationPayload, S>

  type locationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<locationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface locationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['location'], meta: { name: 'location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {locationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends locationFindUniqueArgs>(args: SelectSubset<T, locationFindUniqueArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {locationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends locationFindUniqueOrThrowArgs>(args: SelectSubset<T, locationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends locationFindFirstArgs>(args?: SelectSubset<T, locationFindFirstArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends locationFindFirstOrThrowArgs>(args?: SelectSubset<T, locationFindFirstOrThrowArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends locationFindManyArgs>(args?: SelectSubset<T, locationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Location.
     * @param {locationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends locationCreateArgs>(args: SelectSubset<T, locationCreateArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Locations.
     * @param {locationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends locationCreateManyArgs>(args?: SelectSubset<T, locationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {locationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends locationCreateManyAndReturnArgs>(args?: SelectSubset<T, locationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Location.
     * @param {locationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends locationDeleteArgs>(args: SelectSubset<T, locationDeleteArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Location.
     * @param {locationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends locationUpdateArgs>(args: SelectSubset<T, locationUpdateArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Locations.
     * @param {locationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends locationDeleteManyArgs>(args?: SelectSubset<T, locationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends locationUpdateManyArgs>(args: SelectSubset<T, locationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Location.
     * @param {locationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends locationUpsertArgs>(args: SelectSubset<T, locationUpsertArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends locationCountArgs>(
      args?: Subset<T, locationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends locationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: locationGroupByArgs['orderBy'] }
        : { orderBy?: locationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, locationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the location model
   */
  readonly fields: locationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__locationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    device<T extends deviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, deviceDefaultArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    truck<T extends location$truckArgs<ExtArgs> = {}>(args?: Subset<T, location$truckArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    sensor_history<T extends location$sensor_historyArgs<ExtArgs> = {}>(args?: Subset<T, location$sensor_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the location model
   */ 
  interface locationFieldRefs {
    readonly id: FieldRef<"location", 'Int'>
    readonly device_id: FieldRef<"location", 'Int'>
    readonly truck_id: FieldRef<"location", 'Int'>
    readonly lat: FieldRef<"location", 'Float'>
    readonly long: FieldRef<"location", 'Float'>
    readonly speed: FieldRef<"location", 'Float'>
    readonly heading: FieldRef<"location", 'Float'>
    readonly altitude: FieldRef<"location", 'Float'>
    readonly accuracy: FieldRef<"location", 'Float'>
    readonly created_at: FieldRef<"location", 'DateTime'>
    readonly recorded_at: FieldRef<"location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * location findUnique
   */
  export type locationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location findUniqueOrThrow
   */
  export type locationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location findFirst
   */
  export type locationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for locations.
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * location findFirstOrThrow
   */
  export type locationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for locations.
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * location findMany
   */
  export type locationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing locations.
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * location create
   */
  export type locationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * The data needed to create a location.
     */
    data: XOR<locationCreateInput, locationUncheckedCreateInput>
  }

  /**
   * location createMany
   */
  export type locationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many locations.
     */
    data: locationCreateManyInput | locationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * location createManyAndReturn
   */
  export type locationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many locations.
     */
    data: locationCreateManyInput | locationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * location update
   */
  export type locationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * The data needed to update a location.
     */
    data: XOR<locationUpdateInput, locationUncheckedUpdateInput>
    /**
     * Choose, which location to update.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location updateMany
   */
  export type locationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update locations.
     */
    data: XOR<locationUpdateManyMutationInput, locationUncheckedUpdateManyInput>
    /**
     * Filter which locations to update
     */
    where?: locationWhereInput
  }

  /**
   * location upsert
   */
  export type locationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * The filter to search for the location to update in case it exists.
     */
    where: locationWhereUniqueInput
    /**
     * In case the location found by the `where` argument doesn't exist, create a new location with this data.
     */
    create: XOR<locationCreateInput, locationUncheckedCreateInput>
    /**
     * In case the location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<locationUpdateInput, locationUncheckedUpdateInput>
  }

  /**
   * location delete
   */
  export type locationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter which location to delete.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location deleteMany
   */
  export type locationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which locations to delete
     */
    where?: locationWhereInput
  }

  /**
   * location.truck
   */
  export type location$truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    where?: truckWhereInput
  }

  /**
   * location.sensor_history
   */
  export type location$sensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    where?: sensor_historyWhereInput
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    cursor?: sensor_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * location without action
   */
  export type locationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
  }


  /**
   * Model sensor
   */

  export type AggregateSensor = {
    _count: SensorCountAggregateOutputType | null
    _avg: SensorAvgAggregateOutputType | null
    _sum: SensorSumAggregateOutputType | null
    _min: SensorMinAggregateOutputType | null
    _max: SensorMaxAggregateOutputType | null
  }

  export type SensorAvgAggregateOutputType = {
    id: number | null
    device_id: number | null
    tireNo: number | null
    sensorNo: number | null
    sensor_lock: number | null
    tempValue: number | null
    tirepValue: number | null
    bat: number | null
  }

  export type SensorSumAggregateOutputType = {
    id: number | null
    device_id: number | null
    tireNo: number | null
    sensorNo: number | null
    sensor_lock: number | null
    tempValue: number | null
    tirepValue: number | null
    bat: number | null
  }

  export type SensorMinAggregateOutputType = {
    id: number | null
    device_id: number | null
    sn: string | null
    tireNo: number | null
    simNumber: string | null
    sensorNo: number | null
    sensor_lock: number | null
    status: string | null
    tempValue: number | null
    tirepValue: number | null
    exType: string | null
    bat: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type SensorMaxAggregateOutputType = {
    id: number | null
    device_id: number | null
    sn: string | null
    tireNo: number | null
    simNumber: string | null
    sensorNo: number | null
    sensor_lock: number | null
    status: string | null
    tempValue: number | null
    tirepValue: number | null
    exType: string | null
    bat: number | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type SensorCountAggregateOutputType = {
    id: number
    device_id: number
    sn: number
    tireNo: number
    simNumber: number
    sensorNo: number
    sensor_lock: number
    status: number
    tempValue: number
    tirepValue: number
    exType: number
    bat: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type SensorAvgAggregateInputType = {
    id?: true
    device_id?: true
    tireNo?: true
    sensorNo?: true
    sensor_lock?: true
    tempValue?: true
    tirepValue?: true
    bat?: true
  }

  export type SensorSumAggregateInputType = {
    id?: true
    device_id?: true
    tireNo?: true
    sensorNo?: true
    sensor_lock?: true
    tempValue?: true
    tirepValue?: true
    bat?: true
  }

  export type SensorMinAggregateInputType = {
    id?: true
    device_id?: true
    sn?: true
    tireNo?: true
    simNumber?: true
    sensorNo?: true
    sensor_lock?: true
    status?: true
    tempValue?: true
    tirepValue?: true
    exType?: true
    bat?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type SensorMaxAggregateInputType = {
    id?: true
    device_id?: true
    sn?: true
    tireNo?: true
    simNumber?: true
    sensorNo?: true
    sensor_lock?: true
    status?: true
    tempValue?: true
    tirepValue?: true
    exType?: true
    bat?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type SensorCountAggregateInputType = {
    id?: true
    device_id?: true
    sn?: true
    tireNo?: true
    simNumber?: true
    sensorNo?: true
    sensor_lock?: true
    status?: true
    tempValue?: true
    tirepValue?: true
    exType?: true
    bat?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type SensorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sensor to aggregate.
     */
    where?: sensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sensors
    **/
    _count?: true | SensorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMaxAggregateInputType
  }

  export type GetSensorAggregateType<T extends SensorAggregateArgs> = {
        [P in keyof T & keyof AggregateSensor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensor[P]>
      : GetScalarType<T[P], AggregateSensor[P]>
  }




  export type sensorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensorWhereInput
    orderBy?: sensorOrderByWithAggregationInput | sensorOrderByWithAggregationInput[]
    by: SensorScalarFieldEnum[] | SensorScalarFieldEnum
    having?: sensorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorCountAggregateInputType | true
    _avg?: SensorAvgAggregateInputType
    _sum?: SensorSumAggregateInputType
    _min?: SensorMinAggregateInputType
    _max?: SensorMaxAggregateInputType
  }

  export type SensorGroupByOutputType = {
    id: number
    device_id: number
    sn: string
    tireNo: number
    simNumber: string | null
    sensorNo: number | null
    sensor_lock: number
    status: string
    tempValue: number | null
    tirepValue: number | null
    exType: string | null
    bat: number | null
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    _count: SensorCountAggregateOutputType | null
    _avg: SensorAvgAggregateOutputType | null
    _sum: SensorSumAggregateOutputType | null
    _min: SensorMinAggregateOutputType | null
    _max: SensorMaxAggregateOutputType | null
  }

  type GetSensorGroupByPayload<T extends sensorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorGroupByOutputType[P]>
            : GetScalarType<T[P], SensorGroupByOutputType[P]>
        }
      >
    >


  export type sensorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    sn?: boolean
    tireNo?: boolean
    simNumber?: boolean
    sensorNo?: boolean
    sensor_lock?: boolean
    status?: boolean
    tempValue?: boolean
    tirepValue?: boolean
    exType?: boolean
    bat?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    alert_events?: boolean | sensor$alert_eventsArgs<ExtArgs>
    sensor_history?: boolean | sensor$sensor_historyArgs<ExtArgs>
    device?: boolean | deviceDefaultArgs<ExtArgs>
    _count?: boolean | SensorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensor"]>

  export type sensorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    sn?: boolean
    tireNo?: boolean
    simNumber?: boolean
    sensorNo?: boolean
    sensor_lock?: boolean
    status?: boolean
    tempValue?: boolean
    tirepValue?: boolean
    exType?: boolean
    bat?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    device?: boolean | deviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensor"]>

  export type sensorSelectScalar = {
    id?: boolean
    device_id?: boolean
    sn?: boolean
    tireNo?: boolean
    simNumber?: boolean
    sensorNo?: boolean
    sensor_lock?: boolean
    status?: boolean
    tempValue?: boolean
    tirepValue?: boolean
    exType?: boolean
    bat?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type sensorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | sensor$alert_eventsArgs<ExtArgs>
    sensor_history?: boolean | sensor$sensor_historyArgs<ExtArgs>
    device?: boolean | deviceDefaultArgs<ExtArgs>
    _count?: boolean | SensorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sensorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | deviceDefaultArgs<ExtArgs>
  }

  export type $sensorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sensor"
    objects: {
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[]
      sensor_history: Prisma.$sensor_historyPayload<ExtArgs>[]
      device: Prisma.$devicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      device_id: number
      sn: string
      tireNo: number
      simNumber: string | null
      sensorNo: number | null
      sensor_lock: number
      status: string
      tempValue: number | null
      tirepValue: number | null
      exType: string | null
      bat: number | null
      created_at: Date
      updated_at: Date | null
      deleted_at: Date | null
    }, ExtArgs["result"]["sensor"]>
    composites: {}
  }

  type sensorGetPayload<S extends boolean | null | undefined | sensorDefaultArgs> = $Result.GetResult<Prisma.$sensorPayload, S>

  type sensorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<sensorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SensorCountAggregateInputType | true
    }

  export interface sensorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sensor'], meta: { name: 'sensor' } }
    /**
     * Find zero or one Sensor that matches the filter.
     * @param {sensorFindUniqueArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sensorFindUniqueArgs>(args: SelectSubset<T, sensorFindUniqueArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sensor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {sensorFindUniqueOrThrowArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sensorFindUniqueOrThrowArgs>(args: SelectSubset<T, sensorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sensor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensorFindFirstArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sensorFindFirstArgs>(args?: SelectSubset<T, sensorFindFirstArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sensor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensorFindFirstOrThrowArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sensorFindFirstOrThrowArgs>(args?: SelectSubset<T, sensorFindFirstOrThrowArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sensors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sensors
     * const sensors = await prisma.sensor.findMany()
     * 
     * // Get first 10 Sensors
     * const sensors = await prisma.sensor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sensorWithIdOnly = await prisma.sensor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sensorFindManyArgs>(args?: SelectSubset<T, sensorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sensor.
     * @param {sensorCreateArgs} args - Arguments to create a Sensor.
     * @example
     * // Create one Sensor
     * const Sensor = await prisma.sensor.create({
     *   data: {
     *     // ... data to create a Sensor
     *   }
     * })
     * 
     */
    create<T extends sensorCreateArgs>(args: SelectSubset<T, sensorCreateArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sensors.
     * @param {sensorCreateManyArgs} args - Arguments to create many Sensors.
     * @example
     * // Create many Sensors
     * const sensor = await prisma.sensor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sensorCreateManyArgs>(args?: SelectSubset<T, sensorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sensors and returns the data saved in the database.
     * @param {sensorCreateManyAndReturnArgs} args - Arguments to create many Sensors.
     * @example
     * // Create many Sensors
     * const sensor = await prisma.sensor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sensors and only return the `id`
     * const sensorWithIdOnly = await prisma.sensor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sensorCreateManyAndReturnArgs>(args?: SelectSubset<T, sensorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sensor.
     * @param {sensorDeleteArgs} args - Arguments to delete one Sensor.
     * @example
     * // Delete one Sensor
     * const Sensor = await prisma.sensor.delete({
     *   where: {
     *     // ... filter to delete one Sensor
     *   }
     * })
     * 
     */
    delete<T extends sensorDeleteArgs>(args: SelectSubset<T, sensorDeleteArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sensor.
     * @param {sensorUpdateArgs} args - Arguments to update one Sensor.
     * @example
     * // Update one Sensor
     * const sensor = await prisma.sensor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sensorUpdateArgs>(args: SelectSubset<T, sensorUpdateArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sensors.
     * @param {sensorDeleteManyArgs} args - Arguments to filter Sensors to delete.
     * @example
     * // Delete a few Sensors
     * const { count } = await prisma.sensor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sensorDeleteManyArgs>(args?: SelectSubset<T, sensorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sensors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sensors
     * const sensor = await prisma.sensor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sensorUpdateManyArgs>(args: SelectSubset<T, sensorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sensor.
     * @param {sensorUpsertArgs} args - Arguments to update or create a Sensor.
     * @example
     * // Update or create a Sensor
     * const sensor = await prisma.sensor.upsert({
     *   create: {
     *     // ... data to create a Sensor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sensor we want to update
     *   }
     * })
     */
    upsert<T extends sensorUpsertArgs>(args: SelectSubset<T, sensorUpsertArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sensors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensorCountArgs} args - Arguments to filter Sensors to count.
     * @example
     * // Count the number of Sensors
     * const count = await prisma.sensor.count({
     *   where: {
     *     // ... the filter for the Sensors we want to count
     *   }
     * })
    **/
    count<T extends sensorCountArgs>(
      args?: Subset<T, sensorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sensor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorAggregateArgs>(args: Subset<T, SensorAggregateArgs>): Prisma.PrismaPromise<GetSensorAggregateType<T>>

    /**
     * Group by Sensor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sensorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sensorGroupByArgs['orderBy'] }
        : { orderBy?: sensorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sensorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sensor model
   */
  readonly fields: sensorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sensor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sensorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert_events<T extends sensor$alert_eventsArgs<ExtArgs> = {}>(args?: Subset<T, sensor$alert_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findMany"> | Null>
    sensor_history<T extends sensor$sensor_historyArgs<ExtArgs> = {}>(args?: Subset<T, sensor$sensor_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findMany"> | Null>
    device<T extends deviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, deviceDefaultArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sensor model
   */ 
  interface sensorFieldRefs {
    readonly id: FieldRef<"sensor", 'Int'>
    readonly device_id: FieldRef<"sensor", 'Int'>
    readonly sn: FieldRef<"sensor", 'String'>
    readonly tireNo: FieldRef<"sensor", 'Int'>
    readonly simNumber: FieldRef<"sensor", 'String'>
    readonly sensorNo: FieldRef<"sensor", 'Int'>
    readonly sensor_lock: FieldRef<"sensor", 'Int'>
    readonly status: FieldRef<"sensor", 'String'>
    readonly tempValue: FieldRef<"sensor", 'Float'>
    readonly tirepValue: FieldRef<"sensor", 'Float'>
    readonly exType: FieldRef<"sensor", 'String'>
    readonly bat: FieldRef<"sensor", 'Int'>
    readonly created_at: FieldRef<"sensor", 'DateTime'>
    readonly updated_at: FieldRef<"sensor", 'DateTime'>
    readonly deleted_at: FieldRef<"sensor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sensor findUnique
   */
  export type sensorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * Filter, which sensor to fetch.
     */
    where: sensorWhereUniqueInput
  }

  /**
   * sensor findUniqueOrThrow
   */
  export type sensorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * Filter, which sensor to fetch.
     */
    where: sensorWhereUniqueInput
  }

  /**
   * sensor findFirst
   */
  export type sensorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * Filter, which sensor to fetch.
     */
    where?: sensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sensors.
     */
    cursor?: sensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sensors.
     */
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * sensor findFirstOrThrow
   */
  export type sensorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * Filter, which sensor to fetch.
     */
    where?: sensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sensors.
     */
    cursor?: sensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sensors.
     */
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * sensor findMany
   */
  export type sensorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * Filter, which sensors to fetch.
     */
    where?: sensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sensors.
     */
    cursor?: sensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensors.
     */
    skip?: number
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * sensor create
   */
  export type sensorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * The data needed to create a sensor.
     */
    data: XOR<sensorCreateInput, sensorUncheckedCreateInput>
  }

  /**
   * sensor createMany
   */
  export type sensorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sensors.
     */
    data: sensorCreateManyInput | sensorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sensor createManyAndReturn
   */
  export type sensorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many sensors.
     */
    data: sensorCreateManyInput | sensorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sensor update
   */
  export type sensorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * The data needed to update a sensor.
     */
    data: XOR<sensorUpdateInput, sensorUncheckedUpdateInput>
    /**
     * Choose, which sensor to update.
     */
    where: sensorWhereUniqueInput
  }

  /**
   * sensor updateMany
   */
  export type sensorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sensors.
     */
    data: XOR<sensorUpdateManyMutationInput, sensorUncheckedUpdateManyInput>
    /**
     * Filter which sensors to update
     */
    where?: sensorWhereInput
  }

  /**
   * sensor upsert
   */
  export type sensorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * The filter to search for the sensor to update in case it exists.
     */
    where: sensorWhereUniqueInput
    /**
     * In case the sensor found by the `where` argument doesn't exist, create a new sensor with this data.
     */
    create: XOR<sensorCreateInput, sensorUncheckedCreateInput>
    /**
     * In case the sensor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sensorUpdateInput, sensorUncheckedUpdateInput>
  }

  /**
   * sensor delete
   */
  export type sensorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    /**
     * Filter which sensor to delete.
     */
    where: sensorWhereUniqueInput
  }

  /**
   * sensor deleteMany
   */
  export type sensorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sensors to delete
     */
    where?: sensorWhereInput
  }

  /**
   * sensor.alert_events
   */
  export type sensor$alert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    where?: alert_eventsWhereInput
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    cursor?: alert_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * sensor.sensor_history
   */
  export type sensor$sensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    where?: sensor_historyWhereInput
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    cursor?: sensor_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * sensor without action
   */
  export type sensorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
  }


  /**
   * Model sensor_history
   */

  export type AggregateSensor_history = {
    _count: Sensor_historyCountAggregateOutputType | null
    _avg: Sensor_historyAvgAggregateOutputType | null
    _sum: Sensor_historySumAggregateOutputType | null
    _min: Sensor_historyMinAggregateOutputType | null
    _max: Sensor_historyMaxAggregateOutputType | null
  }

  export type Sensor_historyAvgAggregateOutputType = {
    id: number | null
    location_id: number | null
    sensor_id: number | null
    device_id: number | null
    truck_id: number | null
    tireNo: number | null
    sensorNo: number | null
    tempValue: number | null
    tirepValue: number | null
    bat: number | null
    device_bat1: number | null
    device_bat2: number | null
    device_bat3: number | null
    truck_year: number | null
    driver_id: number | null
    vendor_id: number | null
  }

  export type Sensor_historySumAggregateOutputType = {
    id: number | null
    location_id: number | null
    sensor_id: number | null
    device_id: number | null
    truck_id: number | null
    tireNo: number | null
    sensorNo: number | null
    tempValue: number | null
    tirepValue: number | null
    bat: number | null
    device_bat1: number | null
    device_bat2: number | null
    device_bat3: number | null
    truck_year: number | null
    driver_id: number | null
    vendor_id: number | null
  }

  export type Sensor_historyMinAggregateOutputType = {
    id: number | null
    location_id: number | null
    sensor_id: number | null
    device_id: number | null
    truck_id: number | null
    tireNo: number | null
    sensorNo: number | null
    tempValue: number | null
    tirepValue: number | null
    exType: string | null
    bat: number | null
    sensor_sn: string | null
    sensor_status: string | null
    device_sn: string | null
    device_sim_number: string | null
    device_status: string | null
    device_bat1: number | null
    device_bat2: number | null
    device_bat3: number | null
    truck_vin: string | null
    truck_name: string | null
    truck_plate: string | null
    truck_model: string | null
    truck_year: number | null
    truck_type: string | null
    truck_status: string | null
    driver_id: number | null
    driver_name: string | null
    driver_phone: string | null
    driver_license: string | null
    vendor_id: number | null
    vendor_name: string | null
    vendor_contact: string | null
    recorded_at: Date | null
    created_at: Date | null
  }

  export type Sensor_historyMaxAggregateOutputType = {
    id: number | null
    location_id: number | null
    sensor_id: number | null
    device_id: number | null
    truck_id: number | null
    tireNo: number | null
    sensorNo: number | null
    tempValue: number | null
    tirepValue: number | null
    exType: string | null
    bat: number | null
    sensor_sn: string | null
    sensor_status: string | null
    device_sn: string | null
    device_sim_number: string | null
    device_status: string | null
    device_bat1: number | null
    device_bat2: number | null
    device_bat3: number | null
    truck_vin: string | null
    truck_name: string | null
    truck_plate: string | null
    truck_model: string | null
    truck_year: number | null
    truck_type: string | null
    truck_status: string | null
    driver_id: number | null
    driver_name: string | null
    driver_phone: string | null
    driver_license: string | null
    vendor_id: number | null
    vendor_name: string | null
    vendor_contact: string | null
    recorded_at: Date | null
    created_at: Date | null
  }

  export type Sensor_historyCountAggregateOutputType = {
    id: number
    location_id: number
    sensor_id: number
    device_id: number
    truck_id: number
    tireNo: number
    sensorNo: number
    tempValue: number
    tirepValue: number
    exType: number
    bat: number
    sensor_sn: number
    sensor_status: number
    device_sn: number
    device_sim_number: number
    device_status: number
    device_bat1: number
    device_bat2: number
    device_bat3: number
    truck_vin: number
    truck_name: number
    truck_plate: number
    truck_model: number
    truck_year: number
    truck_type: number
    truck_status: number
    driver_id: number
    driver_name: number
    driver_phone: number
    driver_license: number
    vendor_id: number
    vendor_name: number
    vendor_contact: number
    recorded_at: number
    created_at: number
    _all: number
  }


  export type Sensor_historyAvgAggregateInputType = {
    id?: true
    location_id?: true
    sensor_id?: true
    device_id?: true
    truck_id?: true
    tireNo?: true
    sensorNo?: true
    tempValue?: true
    tirepValue?: true
    bat?: true
    device_bat1?: true
    device_bat2?: true
    device_bat3?: true
    truck_year?: true
    driver_id?: true
    vendor_id?: true
  }

  export type Sensor_historySumAggregateInputType = {
    id?: true
    location_id?: true
    sensor_id?: true
    device_id?: true
    truck_id?: true
    tireNo?: true
    sensorNo?: true
    tempValue?: true
    tirepValue?: true
    bat?: true
    device_bat1?: true
    device_bat2?: true
    device_bat3?: true
    truck_year?: true
    driver_id?: true
    vendor_id?: true
  }

  export type Sensor_historyMinAggregateInputType = {
    id?: true
    location_id?: true
    sensor_id?: true
    device_id?: true
    truck_id?: true
    tireNo?: true
    sensorNo?: true
    tempValue?: true
    tirepValue?: true
    exType?: true
    bat?: true
    sensor_sn?: true
    sensor_status?: true
    device_sn?: true
    device_sim_number?: true
    device_status?: true
    device_bat1?: true
    device_bat2?: true
    device_bat3?: true
    truck_vin?: true
    truck_name?: true
    truck_plate?: true
    truck_model?: true
    truck_year?: true
    truck_type?: true
    truck_status?: true
    driver_id?: true
    driver_name?: true
    driver_phone?: true
    driver_license?: true
    vendor_id?: true
    vendor_name?: true
    vendor_contact?: true
    recorded_at?: true
    created_at?: true
  }

  export type Sensor_historyMaxAggregateInputType = {
    id?: true
    location_id?: true
    sensor_id?: true
    device_id?: true
    truck_id?: true
    tireNo?: true
    sensorNo?: true
    tempValue?: true
    tirepValue?: true
    exType?: true
    bat?: true
    sensor_sn?: true
    sensor_status?: true
    device_sn?: true
    device_sim_number?: true
    device_status?: true
    device_bat1?: true
    device_bat2?: true
    device_bat3?: true
    truck_vin?: true
    truck_name?: true
    truck_plate?: true
    truck_model?: true
    truck_year?: true
    truck_type?: true
    truck_status?: true
    driver_id?: true
    driver_name?: true
    driver_phone?: true
    driver_license?: true
    vendor_id?: true
    vendor_name?: true
    vendor_contact?: true
    recorded_at?: true
    created_at?: true
  }

  export type Sensor_historyCountAggregateInputType = {
    id?: true
    location_id?: true
    sensor_id?: true
    device_id?: true
    truck_id?: true
    tireNo?: true
    sensorNo?: true
    tempValue?: true
    tirepValue?: true
    exType?: true
    bat?: true
    sensor_sn?: true
    sensor_status?: true
    device_sn?: true
    device_sim_number?: true
    device_status?: true
    device_bat1?: true
    device_bat2?: true
    device_bat3?: true
    truck_vin?: true
    truck_name?: true
    truck_plate?: true
    truck_model?: true
    truck_year?: true
    truck_type?: true
    truck_status?: true
    driver_id?: true
    driver_name?: true
    driver_phone?: true
    driver_license?: true
    vendor_id?: true
    vendor_name?: true
    vendor_contact?: true
    recorded_at?: true
    created_at?: true
    _all?: true
  }

  export type Sensor_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sensor_history to aggregate.
     */
    where?: sensor_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_histories to fetch.
     */
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sensor_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sensor_histories
    **/
    _count?: true | Sensor_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sensor_historyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sensor_historySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sensor_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sensor_historyMaxAggregateInputType
  }

  export type GetSensor_historyAggregateType<T extends Sensor_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateSensor_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensor_history[P]>
      : GetScalarType<T[P], AggregateSensor_history[P]>
  }




  export type sensor_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sensor_historyWhereInput
    orderBy?: sensor_historyOrderByWithAggregationInput | sensor_historyOrderByWithAggregationInput[]
    by: Sensor_historyScalarFieldEnum[] | Sensor_historyScalarFieldEnum
    having?: sensor_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sensor_historyCountAggregateInputType | true
    _avg?: Sensor_historyAvgAggregateInputType
    _sum?: Sensor_historySumAggregateInputType
    _min?: Sensor_historyMinAggregateInputType
    _max?: Sensor_historyMaxAggregateInputType
  }

  export type Sensor_historyGroupByOutputType = {
    id: number
    location_id: number
    sensor_id: number | null
    device_id: number | null
    truck_id: number | null
    tireNo: number
    sensorNo: number | null
    tempValue: number
    tirepValue: number
    exType: string
    bat: number | null
    sensor_sn: string | null
    sensor_status: string | null
    device_sn: string | null
    device_sim_number: string | null
    device_status: string | null
    device_bat1: number | null
    device_bat2: number | null
    device_bat3: number | null
    truck_vin: string | null
    truck_name: string | null
    truck_plate: string | null
    truck_model: string | null
    truck_year: number | null
    truck_type: string | null
    truck_status: string | null
    driver_id: number | null
    driver_name: string | null
    driver_phone: string | null
    driver_license: string | null
    vendor_id: number | null
    vendor_name: string | null
    vendor_contact: string | null
    recorded_at: Date
    created_at: Date
    _count: Sensor_historyCountAggregateOutputType | null
    _avg: Sensor_historyAvgAggregateOutputType | null
    _sum: Sensor_historySumAggregateOutputType | null
    _min: Sensor_historyMinAggregateOutputType | null
    _max: Sensor_historyMaxAggregateOutputType | null
  }

  type GetSensor_historyGroupByPayload<T extends sensor_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sensor_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sensor_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sensor_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Sensor_historyGroupByOutputType[P]>
        }
      >
    >


  export type sensor_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location_id?: boolean
    sensor_id?: boolean
    device_id?: boolean
    truck_id?: boolean
    tireNo?: boolean
    sensorNo?: boolean
    tempValue?: boolean
    tirepValue?: boolean
    exType?: boolean
    bat?: boolean
    sensor_sn?: boolean
    sensor_status?: boolean
    device_sn?: boolean
    device_sim_number?: boolean
    device_status?: boolean
    device_bat1?: boolean
    device_bat2?: boolean
    device_bat3?: boolean
    truck_vin?: boolean
    truck_name?: boolean
    truck_plate?: boolean
    truck_model?: boolean
    truck_year?: boolean
    truck_type?: boolean
    truck_status?: boolean
    driver_id?: boolean
    driver_name?: boolean
    driver_phone?: boolean
    driver_license?: boolean
    vendor_id?: boolean
    vendor_name?: boolean
    vendor_contact?: boolean
    recorded_at?: boolean
    created_at?: boolean
    location?: boolean | locationDefaultArgs<ExtArgs>
    sensor?: boolean | sensor_history$sensorArgs<ExtArgs>
    device?: boolean | sensor_history$deviceArgs<ExtArgs>
    truck?: boolean | sensor_history$truckArgs<ExtArgs>
  }, ExtArgs["result"]["sensor_history"]>

  export type sensor_historySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    location_id?: boolean
    sensor_id?: boolean
    device_id?: boolean
    truck_id?: boolean
    tireNo?: boolean
    sensorNo?: boolean
    tempValue?: boolean
    tirepValue?: boolean
    exType?: boolean
    bat?: boolean
    sensor_sn?: boolean
    sensor_status?: boolean
    device_sn?: boolean
    device_sim_number?: boolean
    device_status?: boolean
    device_bat1?: boolean
    device_bat2?: boolean
    device_bat3?: boolean
    truck_vin?: boolean
    truck_name?: boolean
    truck_plate?: boolean
    truck_model?: boolean
    truck_year?: boolean
    truck_type?: boolean
    truck_status?: boolean
    driver_id?: boolean
    driver_name?: boolean
    driver_phone?: boolean
    driver_license?: boolean
    vendor_id?: boolean
    vendor_name?: boolean
    vendor_contact?: boolean
    recorded_at?: boolean
    created_at?: boolean
    location?: boolean | locationDefaultArgs<ExtArgs>
    sensor?: boolean | sensor_history$sensorArgs<ExtArgs>
    device?: boolean | sensor_history$deviceArgs<ExtArgs>
    truck?: boolean | sensor_history$truckArgs<ExtArgs>
  }, ExtArgs["result"]["sensor_history"]>

  export type sensor_historySelectScalar = {
    id?: boolean
    location_id?: boolean
    sensor_id?: boolean
    device_id?: boolean
    truck_id?: boolean
    tireNo?: boolean
    sensorNo?: boolean
    tempValue?: boolean
    tirepValue?: boolean
    exType?: boolean
    bat?: boolean
    sensor_sn?: boolean
    sensor_status?: boolean
    device_sn?: boolean
    device_sim_number?: boolean
    device_status?: boolean
    device_bat1?: boolean
    device_bat2?: boolean
    device_bat3?: boolean
    truck_vin?: boolean
    truck_name?: boolean
    truck_plate?: boolean
    truck_model?: boolean
    truck_year?: boolean
    truck_type?: boolean
    truck_status?: boolean
    driver_id?: boolean
    driver_name?: boolean
    driver_phone?: boolean
    driver_license?: boolean
    vendor_id?: boolean
    vendor_name?: boolean
    vendor_contact?: boolean
    recorded_at?: boolean
    created_at?: boolean
  }

  export type sensor_historyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | locationDefaultArgs<ExtArgs>
    sensor?: boolean | sensor_history$sensorArgs<ExtArgs>
    device?: boolean | sensor_history$deviceArgs<ExtArgs>
    truck?: boolean | sensor_history$truckArgs<ExtArgs>
  }
  export type sensor_historyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | locationDefaultArgs<ExtArgs>
    sensor?: boolean | sensor_history$sensorArgs<ExtArgs>
    device?: boolean | sensor_history$deviceArgs<ExtArgs>
    truck?: boolean | sensor_history$truckArgs<ExtArgs>
  }

  export type $sensor_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sensor_history"
    objects: {
      location: Prisma.$locationPayload<ExtArgs>
      sensor: Prisma.$sensorPayload<ExtArgs> | null
      device: Prisma.$devicePayload<ExtArgs> | null
      truck: Prisma.$truckPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      location_id: number
      sensor_id: number | null
      device_id: number | null
      truck_id: number | null
      tireNo: number
      sensorNo: number | null
      tempValue: number
      tirepValue: number
      exType: string
      bat: number | null
      sensor_sn: string | null
      sensor_status: string | null
      device_sn: string | null
      device_sim_number: string | null
      device_status: string | null
      device_bat1: number | null
      device_bat2: number | null
      device_bat3: number | null
      truck_vin: string | null
      truck_name: string | null
      truck_plate: string | null
      truck_model: string | null
      truck_year: number | null
      truck_type: string | null
      truck_status: string | null
      driver_id: number | null
      driver_name: string | null
      driver_phone: string | null
      driver_license: string | null
      vendor_id: number | null
      vendor_name: string | null
      vendor_contact: string | null
      recorded_at: Date
      created_at: Date
    }, ExtArgs["result"]["sensor_history"]>
    composites: {}
  }

  type sensor_historyGetPayload<S extends boolean | null | undefined | sensor_historyDefaultArgs> = $Result.GetResult<Prisma.$sensor_historyPayload, S>

  type sensor_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<sensor_historyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Sensor_historyCountAggregateInputType | true
    }

  export interface sensor_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sensor_history'], meta: { name: 'sensor_history' } }
    /**
     * Find zero or one Sensor_history that matches the filter.
     * @param {sensor_historyFindUniqueArgs} args - Arguments to find a Sensor_history
     * @example
     * // Get one Sensor_history
     * const sensor_history = await prisma.sensor_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sensor_historyFindUniqueArgs>(args: SelectSubset<T, sensor_historyFindUniqueArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sensor_history that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {sensor_historyFindUniqueOrThrowArgs} args - Arguments to find a Sensor_history
     * @example
     * // Get one Sensor_history
     * const sensor_history = await prisma.sensor_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sensor_historyFindUniqueOrThrowArgs>(args: SelectSubset<T, sensor_historyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sensor_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_historyFindFirstArgs} args - Arguments to find a Sensor_history
     * @example
     * // Get one Sensor_history
     * const sensor_history = await prisma.sensor_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sensor_historyFindFirstArgs>(args?: SelectSubset<T, sensor_historyFindFirstArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sensor_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_historyFindFirstOrThrowArgs} args - Arguments to find a Sensor_history
     * @example
     * // Get one Sensor_history
     * const sensor_history = await prisma.sensor_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sensor_historyFindFirstOrThrowArgs>(args?: SelectSubset<T, sensor_historyFindFirstOrThrowArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sensor_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sensor_histories
     * const sensor_histories = await prisma.sensor_history.findMany()
     * 
     * // Get first 10 Sensor_histories
     * const sensor_histories = await prisma.sensor_history.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sensor_historyWithIdOnly = await prisma.sensor_history.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sensor_historyFindManyArgs>(args?: SelectSubset<T, sensor_historyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sensor_history.
     * @param {sensor_historyCreateArgs} args - Arguments to create a Sensor_history.
     * @example
     * // Create one Sensor_history
     * const Sensor_history = await prisma.sensor_history.create({
     *   data: {
     *     // ... data to create a Sensor_history
     *   }
     * })
     * 
     */
    create<T extends sensor_historyCreateArgs>(args: SelectSubset<T, sensor_historyCreateArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sensor_histories.
     * @param {sensor_historyCreateManyArgs} args - Arguments to create many Sensor_histories.
     * @example
     * // Create many Sensor_histories
     * const sensor_history = await prisma.sensor_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sensor_historyCreateManyArgs>(args?: SelectSubset<T, sensor_historyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sensor_histories and returns the data saved in the database.
     * @param {sensor_historyCreateManyAndReturnArgs} args - Arguments to create many Sensor_histories.
     * @example
     * // Create many Sensor_histories
     * const sensor_history = await prisma.sensor_history.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sensor_histories and only return the `id`
     * const sensor_historyWithIdOnly = await prisma.sensor_history.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sensor_historyCreateManyAndReturnArgs>(args?: SelectSubset<T, sensor_historyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sensor_history.
     * @param {sensor_historyDeleteArgs} args - Arguments to delete one Sensor_history.
     * @example
     * // Delete one Sensor_history
     * const Sensor_history = await prisma.sensor_history.delete({
     *   where: {
     *     // ... filter to delete one Sensor_history
     *   }
     * })
     * 
     */
    delete<T extends sensor_historyDeleteArgs>(args: SelectSubset<T, sensor_historyDeleteArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sensor_history.
     * @param {sensor_historyUpdateArgs} args - Arguments to update one Sensor_history.
     * @example
     * // Update one Sensor_history
     * const sensor_history = await prisma.sensor_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sensor_historyUpdateArgs>(args: SelectSubset<T, sensor_historyUpdateArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sensor_histories.
     * @param {sensor_historyDeleteManyArgs} args - Arguments to filter Sensor_histories to delete.
     * @example
     * // Delete a few Sensor_histories
     * const { count } = await prisma.sensor_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sensor_historyDeleteManyArgs>(args?: SelectSubset<T, sensor_historyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sensor_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sensor_histories
     * const sensor_history = await prisma.sensor_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sensor_historyUpdateManyArgs>(args: SelectSubset<T, sensor_historyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sensor_history.
     * @param {sensor_historyUpsertArgs} args - Arguments to update or create a Sensor_history.
     * @example
     * // Update or create a Sensor_history
     * const sensor_history = await prisma.sensor_history.upsert({
     *   create: {
     *     // ... data to create a Sensor_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sensor_history we want to update
     *   }
     * })
     */
    upsert<T extends sensor_historyUpsertArgs>(args: SelectSubset<T, sensor_historyUpsertArgs<ExtArgs>>): Prisma__sensor_historyClient<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sensor_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_historyCountArgs} args - Arguments to filter Sensor_histories to count.
     * @example
     * // Count the number of Sensor_histories
     * const count = await prisma.sensor_history.count({
     *   where: {
     *     // ... the filter for the Sensor_histories we want to count
     *   }
     * })
    **/
    count<T extends sensor_historyCountArgs>(
      args?: Subset<T, sensor_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sensor_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sensor_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sensor_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sensor_historyAggregateArgs>(args: Subset<T, Sensor_historyAggregateArgs>): Prisma.PrismaPromise<GetSensor_historyAggregateType<T>>

    /**
     * Group by Sensor_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sensor_historyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sensor_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sensor_historyGroupByArgs['orderBy'] }
        : { orderBy?: sensor_historyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sensor_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensor_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sensor_history model
   */
  readonly fields: sensor_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sensor_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sensor_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends locationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, locationDefaultArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sensor<T extends sensor_history$sensorArgs<ExtArgs> = {}>(args?: Subset<T, sensor_history$sensorArgs<ExtArgs>>): Prisma__sensorClient<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    device<T extends sensor_history$deviceArgs<ExtArgs> = {}>(args?: Subset<T, sensor_history$deviceArgs<ExtArgs>>): Prisma__deviceClient<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    truck<T extends sensor_history$truckArgs<ExtArgs> = {}>(args?: Subset<T, sensor_history$truckArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sensor_history model
   */ 
  interface sensor_historyFieldRefs {
    readonly id: FieldRef<"sensor_history", 'Int'>
    readonly location_id: FieldRef<"sensor_history", 'Int'>
    readonly sensor_id: FieldRef<"sensor_history", 'Int'>
    readonly device_id: FieldRef<"sensor_history", 'Int'>
    readonly truck_id: FieldRef<"sensor_history", 'Int'>
    readonly tireNo: FieldRef<"sensor_history", 'Int'>
    readonly sensorNo: FieldRef<"sensor_history", 'Int'>
    readonly tempValue: FieldRef<"sensor_history", 'Float'>
    readonly tirepValue: FieldRef<"sensor_history", 'Float'>
    readonly exType: FieldRef<"sensor_history", 'String'>
    readonly bat: FieldRef<"sensor_history", 'Int'>
    readonly sensor_sn: FieldRef<"sensor_history", 'String'>
    readonly sensor_status: FieldRef<"sensor_history", 'String'>
    readonly device_sn: FieldRef<"sensor_history", 'String'>
    readonly device_sim_number: FieldRef<"sensor_history", 'String'>
    readonly device_status: FieldRef<"sensor_history", 'String'>
    readonly device_bat1: FieldRef<"sensor_history", 'Int'>
    readonly device_bat2: FieldRef<"sensor_history", 'Int'>
    readonly device_bat3: FieldRef<"sensor_history", 'Int'>
    readonly truck_vin: FieldRef<"sensor_history", 'String'>
    readonly truck_name: FieldRef<"sensor_history", 'String'>
    readonly truck_plate: FieldRef<"sensor_history", 'String'>
    readonly truck_model: FieldRef<"sensor_history", 'String'>
    readonly truck_year: FieldRef<"sensor_history", 'Int'>
    readonly truck_type: FieldRef<"sensor_history", 'String'>
    readonly truck_status: FieldRef<"sensor_history", 'String'>
    readonly driver_id: FieldRef<"sensor_history", 'Int'>
    readonly driver_name: FieldRef<"sensor_history", 'String'>
    readonly driver_phone: FieldRef<"sensor_history", 'String'>
    readonly driver_license: FieldRef<"sensor_history", 'String'>
    readonly vendor_id: FieldRef<"sensor_history", 'Int'>
    readonly vendor_name: FieldRef<"sensor_history", 'String'>
    readonly vendor_contact: FieldRef<"sensor_history", 'String'>
    readonly recorded_at: FieldRef<"sensor_history", 'DateTime'>
    readonly created_at: FieldRef<"sensor_history", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * sensor_history findUnique
   */
  export type sensor_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * Filter, which sensor_history to fetch.
     */
    where: sensor_historyWhereUniqueInput
  }

  /**
   * sensor_history findUniqueOrThrow
   */
  export type sensor_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * Filter, which sensor_history to fetch.
     */
    where: sensor_historyWhereUniqueInput
  }

  /**
   * sensor_history findFirst
   */
  export type sensor_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * Filter, which sensor_history to fetch.
     */
    where?: sensor_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_histories to fetch.
     */
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sensor_histories.
     */
    cursor?: sensor_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sensor_histories.
     */
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * sensor_history findFirstOrThrow
   */
  export type sensor_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * Filter, which sensor_history to fetch.
     */
    where?: sensor_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_histories to fetch.
     */
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sensor_histories.
     */
    cursor?: sensor_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sensor_histories.
     */
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * sensor_history findMany
   */
  export type sensor_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * Filter, which sensor_histories to fetch.
     */
    where?: sensor_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sensor_histories to fetch.
     */
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sensor_histories.
     */
    cursor?: sensor_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sensor_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sensor_histories.
     */
    skip?: number
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * sensor_history create
   */
  export type sensor_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * The data needed to create a sensor_history.
     */
    data: XOR<sensor_historyCreateInput, sensor_historyUncheckedCreateInput>
  }

  /**
   * sensor_history createMany
   */
  export type sensor_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sensor_histories.
     */
    data: sensor_historyCreateManyInput | sensor_historyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sensor_history createManyAndReturn
   */
  export type sensor_historyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many sensor_histories.
     */
    data: sensor_historyCreateManyInput | sensor_historyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sensor_history update
   */
  export type sensor_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * The data needed to update a sensor_history.
     */
    data: XOR<sensor_historyUpdateInput, sensor_historyUncheckedUpdateInput>
    /**
     * Choose, which sensor_history to update.
     */
    where: sensor_historyWhereUniqueInput
  }

  /**
   * sensor_history updateMany
   */
  export type sensor_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sensor_histories.
     */
    data: XOR<sensor_historyUpdateManyMutationInput, sensor_historyUncheckedUpdateManyInput>
    /**
     * Filter which sensor_histories to update
     */
    where?: sensor_historyWhereInput
  }

  /**
   * sensor_history upsert
   */
  export type sensor_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * The filter to search for the sensor_history to update in case it exists.
     */
    where: sensor_historyWhereUniqueInput
    /**
     * In case the sensor_history found by the `where` argument doesn't exist, create a new sensor_history with this data.
     */
    create: XOR<sensor_historyCreateInput, sensor_historyUncheckedCreateInput>
    /**
     * In case the sensor_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sensor_historyUpdateInput, sensor_historyUncheckedUpdateInput>
  }

  /**
   * sensor_history delete
   */
  export type sensor_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    /**
     * Filter which sensor_history to delete.
     */
    where: sensor_historyWhereUniqueInput
  }

  /**
   * sensor_history deleteMany
   */
  export type sensor_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sensor_histories to delete
     */
    where?: sensor_historyWhereInput
  }

  /**
   * sensor_history.sensor
   */
  export type sensor_history$sensorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null
    where?: sensorWhereInput
  }

  /**
   * sensor_history.device
   */
  export type sensor_history$deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    where?: deviceWhereInput
  }

  /**
   * sensor_history.truck
   */
  export type sensor_history$truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    where?: truckWhereInput
  }

  /**
   * sensor_history without action
   */
  export type sensor_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
  }


  /**
   * Model truck
   */

  export type AggregateTruck = {
    _count: TruckCountAggregateOutputType | null
    _avg: TruckAvgAggregateOutputType | null
    _sum: TruckSumAggregateOutputType | null
    _min: TruckMinAggregateOutputType | null
    _max: TruckMaxAggregateOutputType | null
  }

  export type TruckAvgAggregateOutputType = {
    id: number | null
    year: number | null
    vendor_id: number | null
    created_by: number | null
    updated_by: number | null
    driver_id: number | null
  }

  export type TruckSumAggregateOutputType = {
    id: number | null
    year: number | null
    vendor_id: number | null
    created_by: number | null
    updated_by: number | null
    driver_id: number | null
  }

  export type TruckMinAggregateOutputType = {
    id: number | null
    vin: string | null
    name: string | null
    model: string | null
    year: number | null
    vendor_id: number | null
    created_at: Date | null
    created_by: number | null
    updated_by: number | null
    deleted_at: Date | null
    driver_id: number | null
    image: string | null
    plate: string | null
    status: string | null
    type: string | null
    updated_at: Date | null
  }

  export type TruckMaxAggregateOutputType = {
    id: number | null
    vin: string | null
    name: string | null
    model: string | null
    year: number | null
    vendor_id: number | null
    created_at: Date | null
    created_by: number | null
    updated_by: number | null
    deleted_at: Date | null
    driver_id: number | null
    image: string | null
    plate: string | null
    status: string | null
    type: string | null
    updated_at: Date | null
  }

  export type TruckCountAggregateOutputType = {
    id: number
    vin: number
    name: number
    model: number
    year: number
    vendor_id: number
    created_at: number
    created_by: number
    updated_by: number
    deleted_at: number
    driver_id: number
    image: number
    plate: number
    status: number
    type: number
    updated_at: number
    _all: number
  }


  export type TruckAvgAggregateInputType = {
    id?: true
    year?: true
    vendor_id?: true
    created_by?: true
    updated_by?: true
    driver_id?: true
  }

  export type TruckSumAggregateInputType = {
    id?: true
    year?: true
    vendor_id?: true
    created_by?: true
    updated_by?: true
    driver_id?: true
  }

  export type TruckMinAggregateInputType = {
    id?: true
    vin?: true
    name?: true
    model?: true
    year?: true
    vendor_id?: true
    created_at?: true
    created_by?: true
    updated_by?: true
    deleted_at?: true
    driver_id?: true
    image?: true
    plate?: true
    status?: true
    type?: true
    updated_at?: true
  }

  export type TruckMaxAggregateInputType = {
    id?: true
    vin?: true
    name?: true
    model?: true
    year?: true
    vendor_id?: true
    created_at?: true
    created_by?: true
    updated_by?: true
    deleted_at?: true
    driver_id?: true
    image?: true
    plate?: true
    status?: true
    type?: true
    updated_at?: true
  }

  export type TruckCountAggregateInputType = {
    id?: true
    vin?: true
    name?: true
    model?: true
    year?: true
    vendor_id?: true
    created_at?: true
    created_by?: true
    updated_by?: true
    deleted_at?: true
    driver_id?: true
    image?: true
    plate?: true
    status?: true
    type?: true
    updated_at?: true
    _all?: true
  }

  export type TruckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which truck to aggregate.
     */
    where?: truckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: truckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trucks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned trucks
    **/
    _count?: true | TruckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TruckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TruckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TruckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TruckMaxAggregateInputType
  }

  export type GetTruckAggregateType<T extends TruckAggregateArgs> = {
        [P in keyof T & keyof AggregateTruck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTruck[P]>
      : GetScalarType<T[P], AggregateTruck[P]>
  }




  export type truckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: truckWhereInput
    orderBy?: truckOrderByWithAggregationInput | truckOrderByWithAggregationInput[]
    by: TruckScalarFieldEnum[] | TruckScalarFieldEnum
    having?: truckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TruckCountAggregateInputType | true
    _avg?: TruckAvgAggregateInputType
    _sum?: TruckSumAggregateInputType
    _min?: TruckMinAggregateInputType
    _max?: TruckMaxAggregateInputType
  }

  export type TruckGroupByOutputType = {
    id: number
    vin: string | null
    name: string
    model: string | null
    year: number | null
    vendor_id: number | null
    created_at: Date
    created_by: number | null
    updated_by: number | null
    deleted_at: Date | null
    driver_id: number | null
    image: string | null
    plate: string | null
    status: string
    type: string | null
    updated_at: Date
    _count: TruckCountAggregateOutputType | null
    _avg: TruckAvgAggregateOutputType | null
    _sum: TruckSumAggregateOutputType | null
    _min: TruckMinAggregateOutputType | null
    _max: TruckMaxAggregateOutputType | null
  }

  type GetTruckGroupByPayload<T extends truckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TruckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TruckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TruckGroupByOutputType[P]>
            : GetScalarType<T[P], TruckGroupByOutputType[P]>
        }
      >
    >


  export type truckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vin?: boolean
    name?: boolean
    model?: boolean
    year?: boolean
    vendor_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_at?: boolean
    driver_id?: boolean
    image?: boolean
    plate?: boolean
    status?: boolean
    type?: boolean
    updated_at?: boolean
    alert_events?: boolean | truck$alert_eventsArgs<ExtArgs>
    device?: boolean | truck$deviceArgs<ExtArgs>
    location?: boolean | truck$locationArgs<ExtArgs>
    sensor_history?: boolean | truck$sensor_historyArgs<ExtArgs>
    drivers?: boolean | truck$driversArgs<ExtArgs>
    vendors?: boolean | truck$vendorsArgs<ExtArgs>
    _count?: boolean | TruckCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["truck"]>

  export type truckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vin?: boolean
    name?: boolean
    model?: boolean
    year?: boolean
    vendor_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_at?: boolean
    driver_id?: boolean
    image?: boolean
    plate?: boolean
    status?: boolean
    type?: boolean
    updated_at?: boolean
    drivers?: boolean | truck$driversArgs<ExtArgs>
    vendors?: boolean | truck$vendorsArgs<ExtArgs>
  }, ExtArgs["result"]["truck"]>

  export type truckSelectScalar = {
    id?: boolean
    vin?: boolean
    name?: boolean
    model?: boolean
    year?: boolean
    vendor_id?: boolean
    created_at?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_at?: boolean
    driver_id?: boolean
    image?: boolean
    plate?: boolean
    status?: boolean
    type?: boolean
    updated_at?: boolean
  }

  export type truckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | truck$alert_eventsArgs<ExtArgs>
    device?: boolean | truck$deviceArgs<ExtArgs>
    location?: boolean | truck$locationArgs<ExtArgs>
    sensor_history?: boolean | truck$sensor_historyArgs<ExtArgs>
    drivers?: boolean | truck$driversArgs<ExtArgs>
    vendors?: boolean | truck$vendorsArgs<ExtArgs>
    _count?: boolean | TruckCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type truckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | truck$driversArgs<ExtArgs>
    vendors?: boolean | truck$vendorsArgs<ExtArgs>
  }

  export type $truckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "truck"
    objects: {
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[]
      device: Prisma.$devicePayload<ExtArgs>[]
      location: Prisma.$locationPayload<ExtArgs>[]
      sensor_history: Prisma.$sensor_historyPayload<ExtArgs>[]
      drivers: Prisma.$driversPayload<ExtArgs> | null
      vendors: Prisma.$vendorsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      vin: string | null
      name: string
      model: string | null
      year: number | null
      vendor_id: number | null
      created_at: Date
      created_by: number | null
      updated_by: number | null
      deleted_at: Date | null
      driver_id: number | null
      image: string | null
      plate: string | null
      status: string
      type: string | null
      updated_at: Date
    }, ExtArgs["result"]["truck"]>
    composites: {}
  }

  type truckGetPayload<S extends boolean | null | undefined | truckDefaultArgs> = $Result.GetResult<Prisma.$truckPayload, S>

  type truckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<truckFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TruckCountAggregateInputType | true
    }

  export interface truckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['truck'], meta: { name: 'truck' } }
    /**
     * Find zero or one Truck that matches the filter.
     * @param {truckFindUniqueArgs} args - Arguments to find a Truck
     * @example
     * // Get one Truck
     * const truck = await prisma.truck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends truckFindUniqueArgs>(args: SelectSubset<T, truckFindUniqueArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Truck that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {truckFindUniqueOrThrowArgs} args - Arguments to find a Truck
     * @example
     * // Get one Truck
     * const truck = await prisma.truck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends truckFindUniqueOrThrowArgs>(args: SelectSubset<T, truckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Truck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {truckFindFirstArgs} args - Arguments to find a Truck
     * @example
     * // Get one Truck
     * const truck = await prisma.truck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends truckFindFirstArgs>(args?: SelectSubset<T, truckFindFirstArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Truck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {truckFindFirstOrThrowArgs} args - Arguments to find a Truck
     * @example
     * // Get one Truck
     * const truck = await prisma.truck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends truckFindFirstOrThrowArgs>(args?: SelectSubset<T, truckFindFirstOrThrowArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Trucks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {truckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trucks
     * const trucks = await prisma.truck.findMany()
     * 
     * // Get first 10 Trucks
     * const trucks = await prisma.truck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const truckWithIdOnly = await prisma.truck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends truckFindManyArgs>(args?: SelectSubset<T, truckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Truck.
     * @param {truckCreateArgs} args - Arguments to create a Truck.
     * @example
     * // Create one Truck
     * const Truck = await prisma.truck.create({
     *   data: {
     *     // ... data to create a Truck
     *   }
     * })
     * 
     */
    create<T extends truckCreateArgs>(args: SelectSubset<T, truckCreateArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Trucks.
     * @param {truckCreateManyArgs} args - Arguments to create many Trucks.
     * @example
     * // Create many Trucks
     * const truck = await prisma.truck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends truckCreateManyArgs>(args?: SelectSubset<T, truckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trucks and returns the data saved in the database.
     * @param {truckCreateManyAndReturnArgs} args - Arguments to create many Trucks.
     * @example
     * // Create many Trucks
     * const truck = await prisma.truck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trucks and only return the `id`
     * const truckWithIdOnly = await prisma.truck.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends truckCreateManyAndReturnArgs>(args?: SelectSubset<T, truckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Truck.
     * @param {truckDeleteArgs} args - Arguments to delete one Truck.
     * @example
     * // Delete one Truck
     * const Truck = await prisma.truck.delete({
     *   where: {
     *     // ... filter to delete one Truck
     *   }
     * })
     * 
     */
    delete<T extends truckDeleteArgs>(args: SelectSubset<T, truckDeleteArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Truck.
     * @param {truckUpdateArgs} args - Arguments to update one Truck.
     * @example
     * // Update one Truck
     * const truck = await prisma.truck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends truckUpdateArgs>(args: SelectSubset<T, truckUpdateArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Trucks.
     * @param {truckDeleteManyArgs} args - Arguments to filter Trucks to delete.
     * @example
     * // Delete a few Trucks
     * const { count } = await prisma.truck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends truckDeleteManyArgs>(args?: SelectSubset<T, truckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trucks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {truckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trucks
     * const truck = await prisma.truck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends truckUpdateManyArgs>(args: SelectSubset<T, truckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Truck.
     * @param {truckUpsertArgs} args - Arguments to update or create a Truck.
     * @example
     * // Update or create a Truck
     * const truck = await prisma.truck.upsert({
     *   create: {
     *     // ... data to create a Truck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Truck we want to update
     *   }
     * })
     */
    upsert<T extends truckUpsertArgs>(args: SelectSubset<T, truckUpsertArgs<ExtArgs>>): Prisma__truckClient<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Trucks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {truckCountArgs} args - Arguments to filter Trucks to count.
     * @example
     * // Count the number of Trucks
     * const count = await prisma.truck.count({
     *   where: {
     *     // ... the filter for the Trucks we want to count
     *   }
     * })
    **/
    count<T extends truckCountArgs>(
      args?: Subset<T, truckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TruckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Truck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TruckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TruckAggregateArgs>(args: Subset<T, TruckAggregateArgs>): Prisma.PrismaPromise<GetTruckAggregateType<T>>

    /**
     * Group by Truck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {truckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends truckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: truckGroupByArgs['orderBy'] }
        : { orderBy?: truckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, truckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTruckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the truck model
   */
  readonly fields: truckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for truck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__truckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert_events<T extends truck$alert_eventsArgs<ExtArgs> = {}>(args?: Subset<T, truck$alert_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, "findMany"> | Null>
    device<T extends truck$deviceArgs<ExtArgs> = {}>(args?: Subset<T, truck$deviceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, "findMany"> | Null>
    location<T extends truck$locationArgs<ExtArgs> = {}>(args?: Subset<T, truck$locationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findMany"> | Null>
    sensor_history<T extends truck$sensor_historyArgs<ExtArgs> = {}>(args?: Subset<T, truck$sensor_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensor_historyPayload<ExtArgs>, T, "findMany"> | Null>
    drivers<T extends truck$driversArgs<ExtArgs> = {}>(args?: Subset<T, truck$driversArgs<ExtArgs>>): Prisma__driversClient<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    vendors<T extends truck$vendorsArgs<ExtArgs> = {}>(args?: Subset<T, truck$vendorsArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the truck model
   */ 
  interface truckFieldRefs {
    readonly id: FieldRef<"truck", 'Int'>
    readonly vin: FieldRef<"truck", 'String'>
    readonly name: FieldRef<"truck", 'String'>
    readonly model: FieldRef<"truck", 'String'>
    readonly year: FieldRef<"truck", 'Int'>
    readonly vendor_id: FieldRef<"truck", 'Int'>
    readonly created_at: FieldRef<"truck", 'DateTime'>
    readonly created_by: FieldRef<"truck", 'Int'>
    readonly updated_by: FieldRef<"truck", 'Int'>
    readonly deleted_at: FieldRef<"truck", 'DateTime'>
    readonly driver_id: FieldRef<"truck", 'Int'>
    readonly image: FieldRef<"truck", 'String'>
    readonly plate: FieldRef<"truck", 'String'>
    readonly status: FieldRef<"truck", 'String'>
    readonly type: FieldRef<"truck", 'String'>
    readonly updated_at: FieldRef<"truck", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * truck findUnique
   */
  export type truckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * Filter, which truck to fetch.
     */
    where: truckWhereUniqueInput
  }

  /**
   * truck findUniqueOrThrow
   */
  export type truckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * Filter, which truck to fetch.
     */
    where: truckWhereUniqueInput
  }

  /**
   * truck findFirst
   */
  export type truckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * Filter, which truck to fetch.
     */
    where?: truckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trucks.
     */
    cursor?: truckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trucks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trucks.
     */
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[]
  }

  /**
   * truck findFirstOrThrow
   */
  export type truckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * Filter, which truck to fetch.
     */
    where?: truckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for trucks.
     */
    cursor?: truckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trucks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of trucks.
     */
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[]
  }

  /**
   * truck findMany
   */
  export type truckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * Filter, which trucks to fetch.
     */
    where?: truckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing trucks.
     */
    cursor?: truckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` trucks.
     */
    skip?: number
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[]
  }

  /**
   * truck create
   */
  export type truckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * The data needed to create a truck.
     */
    data: XOR<truckCreateInput, truckUncheckedCreateInput>
  }

  /**
   * truck createMany
   */
  export type truckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many trucks.
     */
    data: truckCreateManyInput | truckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * truck createManyAndReturn
   */
  export type truckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many trucks.
     */
    data: truckCreateManyInput | truckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * truck update
   */
  export type truckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * The data needed to update a truck.
     */
    data: XOR<truckUpdateInput, truckUncheckedUpdateInput>
    /**
     * Choose, which truck to update.
     */
    where: truckWhereUniqueInput
  }

  /**
   * truck updateMany
   */
  export type truckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update trucks.
     */
    data: XOR<truckUpdateManyMutationInput, truckUncheckedUpdateManyInput>
    /**
     * Filter which trucks to update
     */
    where?: truckWhereInput
  }

  /**
   * truck upsert
   */
  export type truckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * The filter to search for the truck to update in case it exists.
     */
    where: truckWhereUniqueInput
    /**
     * In case the truck found by the `where` argument doesn't exist, create a new truck with this data.
     */
    create: XOR<truckCreateInput, truckUncheckedCreateInput>
    /**
     * In case the truck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<truckUpdateInput, truckUncheckedUpdateInput>
  }

  /**
   * truck delete
   */
  export type truckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    /**
     * Filter which truck to delete.
     */
    where: truckWhereUniqueInput
  }

  /**
   * truck deleteMany
   */
  export type truckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which trucks to delete
     */
    where?: truckWhereInput
  }

  /**
   * truck.alert_events
   */
  export type truck$alert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null
    where?: alert_eventsWhereInput
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[]
    cursor?: alert_eventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[]
  }

  /**
   * truck.device
   */
  export type truck$deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null
    where?: deviceWhereInput
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[]
    cursor?: deviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * truck.location
   */
  export type truck$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    where?: locationWhereInput
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    cursor?: locationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * truck.sensor_history
   */
  export type truck$sensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sensor_history
     */
    select?: sensor_historySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensor_historyInclude<ExtArgs> | null
    where?: sensor_historyWhereInput
    orderBy?: sensor_historyOrderByWithRelationInput | sensor_historyOrderByWithRelationInput[]
    cursor?: sensor_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sensor_historyScalarFieldEnum | Sensor_historyScalarFieldEnum[]
  }

  /**
   * truck.drivers
   */
  export type truck$driversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    where?: driversWhereInput
  }

  /**
   * truck.vendors
   */
  export type truck$vendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    where?: vendorsWhereInput
  }

  /**
   * truck without action
   */
  export type truckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
  }


  /**
   * Model user_admin
   */

  export type AggregateUser_admin = {
    _count: User_adminCountAggregateOutputType | null
    _avg: User_adminAvgAggregateOutputType | null
    _sum: User_adminSumAggregateOutputType | null
    _min: User_adminMinAggregateOutputType | null
    _max: User_adminMaxAggregateOutputType | null
  }

  export type User_adminAvgAggregateOutputType = {
    id: number | null
  }

  export type User_adminSumAggregateOutputType = {
    id: number | null
  }

  export type User_adminMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    phone: string | null
    department: string | null
    bio: string | null
    avatar: string | null
    two_factor_enabled: boolean | null
    last_login: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type User_adminMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    phone: string | null
    department: string | null
    bio: string | null
    avatar: string | null
    two_factor_enabled: boolean | null
    last_login: Date | null
    status: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type User_adminCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    phone: number
    department: number
    bio: number
    avatar: number
    two_factor_enabled: number
    last_login: number
    status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type User_adminAvgAggregateInputType = {
    id?: true
  }

  export type User_adminSumAggregateInputType = {
    id?: true
  }

  export type User_adminMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    department?: true
    bio?: true
    avatar?: true
    two_factor_enabled?: true
    last_login?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type User_adminMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    department?: true
    bio?: true
    avatar?: true
    two_factor_enabled?: true
    last_login?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type User_adminCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    department?: true
    bio?: true
    avatar?: true
    two_factor_enabled?: true
    last_login?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type User_adminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_admin to aggregate.
     */
    where?: user_adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_admins
    **/
    _count?: true | User_adminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_adminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_adminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_adminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_adminMaxAggregateInputType
  }

  export type GetUser_adminAggregateType<T extends User_adminAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_admin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_admin[P]>
      : GetScalarType<T[P], AggregateUser_admin[P]>
  }




  export type user_adminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_adminWhereInput
    orderBy?: user_adminOrderByWithAggregationInput | user_adminOrderByWithAggregationInput[]
    by: User_adminScalarFieldEnum[] | User_adminScalarFieldEnum
    having?: user_adminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_adminCountAggregateInputType | true
    _avg?: User_adminAvgAggregateInputType
    _sum?: User_adminSumAggregateInputType
    _min?: User_adminMinAggregateInputType
    _max?: User_adminMaxAggregateInputType
  }

  export type User_adminGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: string
    phone: string | null
    department: string | null
    bio: string | null
    avatar: string | null
    two_factor_enabled: boolean
    last_login: Date | null
    status: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: User_adminCountAggregateOutputType | null
    _avg: User_adminAvgAggregateOutputType | null
    _sum: User_adminSumAggregateOutputType | null
    _min: User_adminMinAggregateOutputType | null
    _max: User_adminMaxAggregateOutputType | null
  }

  type GetUser_adminGroupByPayload<T extends user_adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_adminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_adminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_adminGroupByOutputType[P]>
            : GetScalarType<T[P], User_adminGroupByOutputType[P]>
        }
      >
    >


  export type user_adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    department?: boolean
    bio?: boolean
    avatar?: boolean
    two_factor_enabled?: boolean
    last_login?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user_admin"]>

  export type user_adminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    department?: boolean
    bio?: boolean
    avatar?: boolean
    two_factor_enabled?: boolean
    last_login?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }, ExtArgs["result"]["user_admin"]>

  export type user_adminSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    department?: boolean
    bio?: boolean
    avatar?: boolean
    two_factor_enabled?: boolean
    last_login?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }


  export type $user_adminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: string
      phone: string | null
      department: string | null
      bio: string | null
      avatar: string | null
      two_factor_enabled: boolean
      last_login: Date | null
      status: string
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["user_admin"]>
    composites: {}
  }

  type user_adminGetPayload<S extends boolean | null | undefined | user_adminDefaultArgs> = $Result.GetResult<Prisma.$user_adminPayload, S>

  type user_adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<user_adminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: User_adminCountAggregateInputType | true
    }

  export interface user_adminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_admin'], meta: { name: 'user_admin' } }
    /**
     * Find zero or one User_admin that matches the filter.
     * @param {user_adminFindUniqueArgs} args - Arguments to find a User_admin
     * @example
     * // Get one User_admin
     * const user_admin = await prisma.user_admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_adminFindUniqueArgs>(args: SelectSubset<T, user_adminFindUniqueArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User_admin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {user_adminFindUniqueOrThrowArgs} args - Arguments to find a User_admin
     * @example
     * // Get one User_admin
     * const user_admin = await prisma.user_admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_adminFindUniqueOrThrowArgs>(args: SelectSubset<T, user_adminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User_admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_adminFindFirstArgs} args - Arguments to find a User_admin
     * @example
     * // Get one User_admin
     * const user_admin = await prisma.user_admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_adminFindFirstArgs>(args?: SelectSubset<T, user_adminFindFirstArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User_admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_adminFindFirstOrThrowArgs} args - Arguments to find a User_admin
     * @example
     * // Get one User_admin
     * const user_admin = await prisma.user_admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_adminFindFirstOrThrowArgs>(args?: SelectSubset<T, user_adminFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more User_admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_adminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_admins
     * const user_admins = await prisma.user_admin.findMany()
     * 
     * // Get first 10 User_admins
     * const user_admins = await prisma.user_admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_adminWithIdOnly = await prisma.user_admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_adminFindManyArgs>(args?: SelectSubset<T, user_adminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User_admin.
     * @param {user_adminCreateArgs} args - Arguments to create a User_admin.
     * @example
     * // Create one User_admin
     * const User_admin = await prisma.user_admin.create({
     *   data: {
     *     // ... data to create a User_admin
     *   }
     * })
     * 
     */
    create<T extends user_adminCreateArgs>(args: SelectSubset<T, user_adminCreateArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many User_admins.
     * @param {user_adminCreateManyArgs} args - Arguments to create many User_admins.
     * @example
     * // Create many User_admins
     * const user_admin = await prisma.user_admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_adminCreateManyArgs>(args?: SelectSubset<T, user_adminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_admins and returns the data saved in the database.
     * @param {user_adminCreateManyAndReturnArgs} args - Arguments to create many User_admins.
     * @example
     * // Create many User_admins
     * const user_admin = await prisma.user_admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_admins and only return the `id`
     * const user_adminWithIdOnly = await prisma.user_admin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_adminCreateManyAndReturnArgs>(args?: SelectSubset<T, user_adminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User_admin.
     * @param {user_adminDeleteArgs} args - Arguments to delete one User_admin.
     * @example
     * // Delete one User_admin
     * const User_admin = await prisma.user_admin.delete({
     *   where: {
     *     // ... filter to delete one User_admin
     *   }
     * })
     * 
     */
    delete<T extends user_adminDeleteArgs>(args: SelectSubset<T, user_adminDeleteArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User_admin.
     * @param {user_adminUpdateArgs} args - Arguments to update one User_admin.
     * @example
     * // Update one User_admin
     * const user_admin = await prisma.user_admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_adminUpdateArgs>(args: SelectSubset<T, user_adminUpdateArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more User_admins.
     * @param {user_adminDeleteManyArgs} args - Arguments to filter User_admins to delete.
     * @example
     * // Delete a few User_admins
     * const { count } = await prisma.user_admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_adminDeleteManyArgs>(args?: SelectSubset<T, user_adminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_adminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_admins
     * const user_admin = await prisma.user_admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_adminUpdateManyArgs>(args: SelectSubset<T, user_adminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User_admin.
     * @param {user_adminUpsertArgs} args - Arguments to update or create a User_admin.
     * @example
     * // Update or create a User_admin
     * const user_admin = await prisma.user_admin.upsert({
     *   create: {
     *     // ... data to create a User_admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_admin we want to update
     *   }
     * })
     */
    upsert<T extends user_adminUpsertArgs>(args: SelectSubset<T, user_adminUpsertArgs<ExtArgs>>): Prisma__user_adminClient<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of User_admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_adminCountArgs} args - Arguments to filter User_admins to count.
     * @example
     * // Count the number of User_admins
     * const count = await prisma.user_admin.count({
     *   where: {
     *     // ... the filter for the User_admins we want to count
     *   }
     * })
    **/
    count<T extends user_adminCountArgs>(
      args?: Subset<T, user_adminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_adminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_adminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_adminAggregateArgs>(args: Subset<T, User_adminAggregateArgs>): Prisma.PrismaPromise<GetUser_adminAggregateType<T>>

    /**
     * Group by User_admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_adminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_adminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_adminGroupByArgs['orderBy'] }
        : { orderBy?: user_adminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_adminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_adminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_admin model
   */
  readonly fields: user_adminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_adminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_admin model
   */ 
  interface user_adminFieldRefs {
    readonly id: FieldRef<"user_admin", 'Int'>
    readonly name: FieldRef<"user_admin", 'String'>
    readonly email: FieldRef<"user_admin", 'String'>
    readonly password: FieldRef<"user_admin", 'String'>
    readonly role: FieldRef<"user_admin", 'String'>
    readonly phone: FieldRef<"user_admin", 'String'>
    readonly department: FieldRef<"user_admin", 'String'>
    readonly bio: FieldRef<"user_admin", 'String'>
    readonly avatar: FieldRef<"user_admin", 'String'>
    readonly two_factor_enabled: FieldRef<"user_admin", 'Boolean'>
    readonly last_login: FieldRef<"user_admin", 'DateTime'>
    readonly status: FieldRef<"user_admin", 'String'>
    readonly created_at: FieldRef<"user_admin", 'DateTime'>
    readonly updated_at: FieldRef<"user_admin", 'DateTime'>
    readonly deleted_at: FieldRef<"user_admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_admin findUnique
   */
  export type user_adminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * Filter, which user_admin to fetch.
     */
    where: user_adminWhereUniqueInput
  }

  /**
   * user_admin findUniqueOrThrow
   */
  export type user_adminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * Filter, which user_admin to fetch.
     */
    where: user_adminWhereUniqueInput
  }

  /**
   * user_admin findFirst
   */
  export type user_adminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * Filter, which user_admin to fetch.
     */
    where?: user_adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_admins.
     */
    cursor?: user_adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_admins.
     */
    distinct?: User_adminScalarFieldEnum | User_adminScalarFieldEnum[]
  }

  /**
   * user_admin findFirstOrThrow
   */
  export type user_adminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * Filter, which user_admin to fetch.
     */
    where?: user_adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_admins.
     */
    cursor?: user_adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_admins.
     */
    distinct?: User_adminScalarFieldEnum | User_adminScalarFieldEnum[]
  }

  /**
   * user_admin findMany
   */
  export type user_adminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * Filter, which user_admins to fetch.
     */
    where?: user_adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_admins.
     */
    cursor?: user_adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_admins.
     */
    skip?: number
    distinct?: User_adminScalarFieldEnum | User_adminScalarFieldEnum[]
  }

  /**
   * user_admin create
   */
  export type user_adminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * The data needed to create a user_admin.
     */
    data: XOR<user_adminCreateInput, user_adminUncheckedCreateInput>
  }

  /**
   * user_admin createMany
   */
  export type user_adminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_admins.
     */
    data: user_adminCreateManyInput | user_adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_admin createManyAndReturn
   */
  export type user_adminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many user_admins.
     */
    data: user_adminCreateManyInput | user_adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_admin update
   */
  export type user_adminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * The data needed to update a user_admin.
     */
    data: XOR<user_adminUpdateInput, user_adminUncheckedUpdateInput>
    /**
     * Choose, which user_admin to update.
     */
    where: user_adminWhereUniqueInput
  }

  /**
   * user_admin updateMany
   */
  export type user_adminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_admins.
     */
    data: XOR<user_adminUpdateManyMutationInput, user_adminUncheckedUpdateManyInput>
    /**
     * Filter which user_admins to update
     */
    where?: user_adminWhereInput
  }

  /**
   * user_admin upsert
   */
  export type user_adminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * The filter to search for the user_admin to update in case it exists.
     */
    where: user_adminWhereUniqueInput
    /**
     * In case the user_admin found by the `where` argument doesn't exist, create a new user_admin with this data.
     */
    create: XOR<user_adminCreateInput, user_adminUncheckedCreateInput>
    /**
     * In case the user_admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_adminUpdateInput, user_adminUncheckedUpdateInput>
  }

  /**
   * user_admin delete
   */
  export type user_adminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
    /**
     * Filter which user_admin to delete.
     */
    where: user_adminWhereUniqueInput
  }

  /**
   * user_admin deleteMany
   */
  export type user_adminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_admins to delete
     */
    where?: user_adminWhereInput
  }

  /**
   * user_admin without action
   */
  export type user_adminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null
  }


  /**
   * Model vendors
   */

  export type AggregateVendors = {
    _count: VendorsCountAggregateOutputType | null
    _avg: VendorsAvgAggregateOutputType | null
    _sum: VendorsSumAggregateOutputType | null
    _min: VendorsMinAggregateOutputType | null
    _max: VendorsMaxAggregateOutputType | null
  }

  export type VendorsAvgAggregateOutputType = {
    id: number | null
  }

  export type VendorsSumAggregateOutputType = {
    id: number | null
  }

  export type VendorsMinAggregateOutputType = {
    id: number | null
    address: string | null
    email: string | null
    contact_person: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    name_vendor: string | null
    telephone: string | null
  }

  export type VendorsMaxAggregateOutputType = {
    id: number | null
    address: string | null
    email: string | null
    contact_person: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    name_vendor: string | null
    telephone: string | null
  }

  export type VendorsCountAggregateOutputType = {
    id: number
    address: number
    email: number
    contact_person: number
    created_at: number
    updated_at: number
    deleted_at: number
    name_vendor: number
    telephone: number
    _all: number
  }


  export type VendorsAvgAggregateInputType = {
    id?: true
  }

  export type VendorsSumAggregateInputType = {
    id?: true
  }

  export type VendorsMinAggregateInputType = {
    id?: true
    address?: true
    email?: true
    contact_person?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    name_vendor?: true
    telephone?: true
  }

  export type VendorsMaxAggregateInputType = {
    id?: true
    address?: true
    email?: true
    contact_person?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    name_vendor?: true
    telephone?: true
  }

  export type VendorsCountAggregateInputType = {
    id?: true
    address?: true
    email?: true
    contact_person?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    name_vendor?: true
    telephone?: true
    _all?: true
  }

  export type VendorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which vendors to aggregate.
     */
    where?: vendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: vendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned vendors
    **/
    _count?: true | VendorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorsMaxAggregateInputType
  }

  export type GetVendorsAggregateType<T extends VendorsAggregateArgs> = {
        [P in keyof T & keyof AggregateVendors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendors[P]>
      : GetScalarType<T[P], AggregateVendors[P]>
  }




  export type vendorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: vendorsWhereInput
    orderBy?: vendorsOrderByWithAggregationInput | vendorsOrderByWithAggregationInput[]
    by: VendorsScalarFieldEnum[] | VendorsScalarFieldEnum
    having?: vendorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorsCountAggregateInputType | true
    _avg?: VendorsAvgAggregateInputType
    _sum?: VendorsSumAggregateInputType
    _min?: VendorsMinAggregateInputType
    _max?: VendorsMaxAggregateInputType
  }

  export type VendorsGroupByOutputType = {
    id: number
    address: string | null
    email: string | null
    contact_person: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    name_vendor: string
    telephone: string | null
    _count: VendorsCountAggregateOutputType | null
    _avg: VendorsAvgAggregateOutputType | null
    _sum: VendorsSumAggregateOutputType | null
    _min: VendorsMinAggregateOutputType | null
    _max: VendorsMaxAggregateOutputType | null
  }

  type GetVendorsGroupByPayload<T extends vendorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorsGroupByOutputType[P]>
            : GetScalarType<T[P], VendorsGroupByOutputType[P]>
        }
      >
    >


  export type vendorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    email?: boolean
    contact_person?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    name_vendor?: boolean
    telephone?: boolean
    drivers?: boolean | vendors$driversArgs<ExtArgs>
    truck?: boolean | vendors$truckArgs<ExtArgs>
    _count?: boolean | VendorsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendors"]>

  export type vendorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    email?: boolean
    contact_person?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    name_vendor?: boolean
    telephone?: boolean
  }, ExtArgs["result"]["vendors"]>

  export type vendorsSelectScalar = {
    id?: boolean
    address?: boolean
    email?: boolean
    contact_person?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    name_vendor?: boolean
    telephone?: boolean
  }

  export type vendorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | vendors$driversArgs<ExtArgs>
    truck?: boolean | vendors$truckArgs<ExtArgs>
    _count?: boolean | VendorsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type vendorsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $vendorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "vendors"
    objects: {
      drivers: Prisma.$driversPayload<ExtArgs>[]
      truck: Prisma.$truckPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      address: string | null
      email: string | null
      contact_person: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      name_vendor: string
      telephone: string | null
    }, ExtArgs["result"]["vendors"]>
    composites: {}
  }

  type vendorsGetPayload<S extends boolean | null | undefined | vendorsDefaultArgs> = $Result.GetResult<Prisma.$vendorsPayload, S>

  type vendorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<vendorsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VendorsCountAggregateInputType | true
    }

  export interface vendorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['vendors'], meta: { name: 'vendors' } }
    /**
     * Find zero or one Vendors that matches the filter.
     * @param {vendorsFindUniqueArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends vendorsFindUniqueArgs>(args: SelectSubset<T, vendorsFindUniqueArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Vendors that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {vendorsFindUniqueOrThrowArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends vendorsFindUniqueOrThrowArgs>(args: SelectSubset<T, vendorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vendorsFindFirstArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends vendorsFindFirstArgs>(args?: SelectSubset<T, vendorsFindFirstArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Vendors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vendorsFindFirstOrThrowArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends vendorsFindFirstOrThrowArgs>(args?: SelectSubset<T, vendorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vendorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendors.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendors.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorsWithIdOnly = await prisma.vendors.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends vendorsFindManyArgs>(args?: SelectSubset<T, vendorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Vendors.
     * @param {vendorsCreateArgs} args - Arguments to create a Vendors.
     * @example
     * // Create one Vendors
     * const Vendors = await prisma.vendors.create({
     *   data: {
     *     // ... data to create a Vendors
     *   }
     * })
     * 
     */
    create<T extends vendorsCreateArgs>(args: SelectSubset<T, vendorsCreateArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Vendors.
     * @param {vendorsCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendors = await prisma.vendors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends vendorsCreateManyArgs>(args?: SelectSubset<T, vendorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {vendorsCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendors = await prisma.vendors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `id`
     * const vendorsWithIdOnly = await prisma.vendors.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends vendorsCreateManyAndReturnArgs>(args?: SelectSubset<T, vendorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Vendors.
     * @param {vendorsDeleteArgs} args - Arguments to delete one Vendors.
     * @example
     * // Delete one Vendors
     * const Vendors = await prisma.vendors.delete({
     *   where: {
     *     // ... filter to delete one Vendors
     *   }
     * })
     * 
     */
    delete<T extends vendorsDeleteArgs>(args: SelectSubset<T, vendorsDeleteArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Vendors.
     * @param {vendorsUpdateArgs} args - Arguments to update one Vendors.
     * @example
     * // Update one Vendors
     * const vendors = await prisma.vendors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends vendorsUpdateArgs>(args: SelectSubset<T, vendorsUpdateArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Vendors.
     * @param {vendorsDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends vendorsDeleteManyArgs>(args?: SelectSubset<T, vendorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vendorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendors = await prisma.vendors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends vendorsUpdateManyArgs>(args: SelectSubset<T, vendorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vendors.
     * @param {vendorsUpsertArgs} args - Arguments to update or create a Vendors.
     * @example
     * // Update or create a Vendors
     * const vendors = await prisma.vendors.upsert({
     *   create: {
     *     // ... data to create a Vendors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendors we want to update
     *   }
     * })
     */
    upsert<T extends vendorsUpsertArgs>(args: SelectSubset<T, vendorsUpsertArgs<ExtArgs>>): Prisma__vendorsClient<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vendorsCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendors.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends vendorsCountArgs>(
      args?: Subset<T, vendorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorsAggregateArgs>(args: Subset<T, VendorsAggregateArgs>): Prisma.PrismaPromise<GetVendorsAggregateType<T>>

    /**
     * Group by Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {vendorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends vendorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: vendorsGroupByArgs['orderBy'] }
        : { orderBy?: vendorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, vendorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the vendors model
   */
  readonly fields: vendorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for vendors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__vendorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    drivers<T extends vendors$driversArgs<ExtArgs> = {}>(args?: Subset<T, vendors$driversArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, "findMany"> | Null>
    truck<T extends vendors$truckArgs<ExtArgs> = {}>(args?: Subset<T, vendors$truckArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the vendors model
   */ 
  interface vendorsFieldRefs {
    readonly id: FieldRef<"vendors", 'Int'>
    readonly address: FieldRef<"vendors", 'String'>
    readonly email: FieldRef<"vendors", 'String'>
    readonly contact_person: FieldRef<"vendors", 'String'>
    readonly created_at: FieldRef<"vendors", 'DateTime'>
    readonly updated_at: FieldRef<"vendors", 'DateTime'>
    readonly deleted_at: FieldRef<"vendors", 'DateTime'>
    readonly name_vendor: FieldRef<"vendors", 'String'>
    readonly telephone: FieldRef<"vendors", 'String'>
  }
    

  // Custom InputTypes
  /**
   * vendors findUnique
   */
  export type vendorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * Filter, which vendors to fetch.
     */
    where: vendorsWhereUniqueInput
  }

  /**
   * vendors findUniqueOrThrow
   */
  export type vendorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * Filter, which vendors to fetch.
     */
    where: vendorsWhereUniqueInput
  }

  /**
   * vendors findFirst
   */
  export type vendorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * Filter, which vendors to fetch.
     */
    where?: vendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for vendors.
     */
    cursor?: vendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of vendors.
     */
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[]
  }

  /**
   * vendors findFirstOrThrow
   */
  export type vendorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * Filter, which vendors to fetch.
     */
    where?: vendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for vendors.
     */
    cursor?: vendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of vendors.
     */
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[]
  }

  /**
   * vendors findMany
   */
  export type vendorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * Filter, which vendors to fetch.
     */
    where?: vendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing vendors.
     */
    cursor?: vendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` vendors.
     */
    skip?: number
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[]
  }

  /**
   * vendors create
   */
  export type vendorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * The data needed to create a vendors.
     */
    data: XOR<vendorsCreateInput, vendorsUncheckedCreateInput>
  }

  /**
   * vendors createMany
   */
  export type vendorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many vendors.
     */
    data: vendorsCreateManyInput | vendorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * vendors createManyAndReturn
   */
  export type vendorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many vendors.
     */
    data: vendorsCreateManyInput | vendorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * vendors update
   */
  export type vendorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * The data needed to update a vendors.
     */
    data: XOR<vendorsUpdateInput, vendorsUncheckedUpdateInput>
    /**
     * Choose, which vendors to update.
     */
    where: vendorsWhereUniqueInput
  }

  /**
   * vendors updateMany
   */
  export type vendorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update vendors.
     */
    data: XOR<vendorsUpdateManyMutationInput, vendorsUncheckedUpdateManyInput>
    /**
     * Filter which vendors to update
     */
    where?: vendorsWhereInput
  }

  /**
   * vendors upsert
   */
  export type vendorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * The filter to search for the vendors to update in case it exists.
     */
    where: vendorsWhereUniqueInput
    /**
     * In case the vendors found by the `where` argument doesn't exist, create a new vendors with this data.
     */
    create: XOR<vendorsCreateInput, vendorsUncheckedCreateInput>
    /**
     * In case the vendors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<vendorsUpdateInput, vendorsUncheckedUpdateInput>
  }

  /**
   * vendors delete
   */
  export type vendorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
    /**
     * Filter which vendors to delete.
     */
    where: vendorsWhereUniqueInput
  }

  /**
   * vendors deleteMany
   */
  export type vendorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which vendors to delete
     */
    where?: vendorsWhereInput
  }

  /**
   * vendors.drivers
   */
  export type vendors$driversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null
    where?: driversWhereInput
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[]
    cursor?: driversWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[]
  }

  /**
   * vendors.truck
   */
  export type vendors$truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null
    where?: truckWhereInput
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[]
    cursor?: truckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[]
  }

  /**
   * vendors without action
   */
  export type vendorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AlertScalarFieldEnum: {
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

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const Alert_eventsScalarFieldEnum: {
    id: 'id',
    alert_id: 'alert_id',
    device_id: 'device_id',
    sensor_id: 'sensor_id',
    truck_id: 'truck_id',
    value: 'value',
    message: 'message',
    status: 'status',
    alert_code: 'alert_code',
    alert_name: 'alert_name',
    alert_severity: 'alert_severity',
    truck_plate: 'truck_plate',
    truck_name: 'truck_name',
    truck_vin: 'truck_vin',
    device_sn: 'device_sn',
    sensor_sn: 'sensor_sn',
    sensor_tire_no: 'sensor_tire_no',
    driver_name: 'driver_name',
    vendor_name: 'vendor_name',
    created_at: 'created_at',
    resolved_at: 'resolved_at'
  };

  export type Alert_eventsScalarFieldEnum = (typeof Alert_eventsScalarFieldEnum)[keyof typeof Alert_eventsScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
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

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const DriversScalarFieldEnum: {
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

  export type DriversScalarFieldEnum = (typeof DriversScalarFieldEnum)[keyof typeof DriversScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    device_id: 'device_id',
    truck_id: 'truck_id',
    lat: 'lat',
    long: 'long',
    speed: 'speed',
    heading: 'heading',
    altitude: 'altitude',
    accuracy: 'accuracy',
    created_at: 'created_at',
    recorded_at: 'recorded_at'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const SensorScalarFieldEnum: {
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

  export type SensorScalarFieldEnum = (typeof SensorScalarFieldEnum)[keyof typeof SensorScalarFieldEnum]


  export const Sensor_historyScalarFieldEnum: {
    id: 'id',
    location_id: 'location_id',
    sensor_id: 'sensor_id',
    device_id: 'device_id',
    truck_id: 'truck_id',
    tireNo: 'tireNo',
    sensorNo: 'sensorNo',
    tempValue: 'tempValue',
    tirepValue: 'tirepValue',
    exType: 'exType',
    bat: 'bat',
    sensor_sn: 'sensor_sn',
    sensor_status: 'sensor_status',
    device_sn: 'device_sn',
    device_sim_number: 'device_sim_number',
    device_status: 'device_status',
    device_bat1: 'device_bat1',
    device_bat2: 'device_bat2',
    device_bat3: 'device_bat3',
    truck_vin: 'truck_vin',
    truck_name: 'truck_name',
    truck_plate: 'truck_plate',
    truck_model: 'truck_model',
    truck_year: 'truck_year',
    truck_type: 'truck_type',
    truck_status: 'truck_status',
    driver_id: 'driver_id',
    driver_name: 'driver_name',
    driver_phone: 'driver_phone',
    driver_license: 'driver_license',
    vendor_id: 'vendor_id',
    vendor_name: 'vendor_name',
    vendor_contact: 'vendor_contact',
    recorded_at: 'recorded_at',
    created_at: 'created_at'
  };

  export type Sensor_historyScalarFieldEnum = (typeof Sensor_historyScalarFieldEnum)[keyof typeof Sensor_historyScalarFieldEnum]


  export const TruckScalarFieldEnum: {
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

  export type TruckScalarFieldEnum = (typeof TruckScalarFieldEnum)[keyof typeof TruckScalarFieldEnum]


  export const User_adminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    phone: 'phone',
    department: 'department',
    bio: 'bio',
    avatar: 'avatar',
    two_factor_enabled: 'two_factor_enabled',
    last_login: 'last_login',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type User_adminScalarFieldEnum = (typeof User_adminScalarFieldEnum)[keyof typeof User_adminScalarFieldEnum]


  export const VendorsScalarFieldEnum: {
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

  export type VendorsScalarFieldEnum = (typeof VendorsScalarFieldEnum)[keyof typeof VendorsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type alertWhereInput = {
    AND?: alertWhereInput | alertWhereInput[]
    OR?: alertWhereInput[]
    NOT?: alertWhereInput | alertWhereInput[]
    id?: IntFilter<"alert"> | number
    code?: StringFilter<"alert"> | string
    name?: StringFilter<"alert"> | string
    description?: StringNullableFilter<"alert"> | string | null
    severity?: StringFilter<"alert"> | string
    threshold_min?: FloatNullableFilter<"alert"> | number | null
    threshold_max?: FloatNullableFilter<"alert"> | number | null
    created_at?: DateTimeFilter<"alert"> | Date | string
    updated_at?: DateTimeFilter<"alert"> | Date | string
    deleted_at?: DateTimeNullableFilter<"alert"> | Date | string | null
    alert_events?: Alert_eventsListRelationFilter
  }

  export type alertOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    severity?: SortOrder
    threshold_min?: SortOrderInput | SortOrder
    threshold_max?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    alert_events?: alert_eventsOrderByRelationAggregateInput
  }

  export type alertWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: alertWhereInput | alertWhereInput[]
    OR?: alertWhereInput[]
    NOT?: alertWhereInput | alertWhereInput[]
    name?: StringFilter<"alert"> | string
    description?: StringNullableFilter<"alert"> | string | null
    severity?: StringFilter<"alert"> | string
    threshold_min?: FloatNullableFilter<"alert"> | number | null
    threshold_max?: FloatNullableFilter<"alert"> | number | null
    created_at?: DateTimeFilter<"alert"> | Date | string
    updated_at?: DateTimeFilter<"alert"> | Date | string
    deleted_at?: DateTimeNullableFilter<"alert"> | Date | string | null
    alert_events?: Alert_eventsListRelationFilter
  }, "id" | "code">

  export type alertOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    severity?: SortOrder
    threshold_min?: SortOrderInput | SortOrder
    threshold_max?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: alertCountOrderByAggregateInput
    _avg?: alertAvgOrderByAggregateInput
    _max?: alertMaxOrderByAggregateInput
    _min?: alertMinOrderByAggregateInput
    _sum?: alertSumOrderByAggregateInput
  }

  export type alertScalarWhereWithAggregatesInput = {
    AND?: alertScalarWhereWithAggregatesInput | alertScalarWhereWithAggregatesInput[]
    OR?: alertScalarWhereWithAggregatesInput[]
    NOT?: alertScalarWhereWithAggregatesInput | alertScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"alert"> | number
    code?: StringWithAggregatesFilter<"alert"> | string
    name?: StringWithAggregatesFilter<"alert"> | string
    description?: StringNullableWithAggregatesFilter<"alert"> | string | null
    severity?: StringWithAggregatesFilter<"alert"> | string
    threshold_min?: FloatNullableWithAggregatesFilter<"alert"> | number | null
    threshold_max?: FloatNullableWithAggregatesFilter<"alert"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"alert"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"alert"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"alert"> | Date | string | null
  }

  export type alert_eventsWhereInput = {
    AND?: alert_eventsWhereInput | alert_eventsWhereInput[]
    OR?: alert_eventsWhereInput[]
    NOT?: alert_eventsWhereInput | alert_eventsWhereInput[]
    id?: IntFilter<"alert_events"> | number
    alert_id?: IntFilter<"alert_events"> | number
    device_id?: IntNullableFilter<"alert_events"> | number | null
    sensor_id?: IntNullableFilter<"alert_events"> | number | null
    truck_id?: IntNullableFilter<"alert_events"> | number | null
    value?: FloatNullableFilter<"alert_events"> | number | null
    message?: StringNullableFilter<"alert_events"> | string | null
    status?: StringFilter<"alert_events"> | string
    alert_code?: StringNullableFilter<"alert_events"> | string | null
    alert_name?: StringNullableFilter<"alert_events"> | string | null
    alert_severity?: StringNullableFilter<"alert_events"> | string | null
    truck_plate?: StringNullableFilter<"alert_events"> | string | null
    truck_name?: StringNullableFilter<"alert_events"> | string | null
    truck_vin?: StringNullableFilter<"alert_events"> | string | null
    device_sn?: StringNullableFilter<"alert_events"> | string | null
    sensor_sn?: StringNullableFilter<"alert_events"> | string | null
    sensor_tire_no?: IntNullableFilter<"alert_events"> | number | null
    driver_name?: StringNullableFilter<"alert_events"> | string | null
    vendor_name?: StringNullableFilter<"alert_events"> | string | null
    created_at?: DateTimeFilter<"alert_events"> | Date | string
    resolved_at?: DateTimeNullableFilter<"alert_events"> | Date | string | null
    alert?: XOR<AlertRelationFilter, alertWhereInput>
    device?: XOR<DeviceNullableRelationFilter, deviceWhereInput> | null
    sensor?: XOR<SensorNullableRelationFilter, sensorWhereInput> | null
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null
  }

  export type alert_eventsOrderByWithRelationInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrderInput | SortOrder
    sensor_id?: SortOrderInput | SortOrder
    truck_id?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    status?: SortOrder
    alert_code?: SortOrderInput | SortOrder
    alert_name?: SortOrderInput | SortOrder
    alert_severity?: SortOrderInput | SortOrder
    truck_plate?: SortOrderInput | SortOrder
    truck_name?: SortOrderInput | SortOrder
    truck_vin?: SortOrderInput | SortOrder
    device_sn?: SortOrderInput | SortOrder
    sensor_sn?: SortOrderInput | SortOrder
    sensor_tire_no?: SortOrderInput | SortOrder
    driver_name?: SortOrderInput | SortOrder
    vendor_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrderInput | SortOrder
    alert?: alertOrderByWithRelationInput
    device?: deviceOrderByWithRelationInput
    sensor?: sensorOrderByWithRelationInput
    truck?: truckOrderByWithRelationInput
  }

  export type alert_eventsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: alert_eventsWhereInput | alert_eventsWhereInput[]
    OR?: alert_eventsWhereInput[]
    NOT?: alert_eventsWhereInput | alert_eventsWhereInput[]
    alert_id?: IntFilter<"alert_events"> | number
    device_id?: IntNullableFilter<"alert_events"> | number | null
    sensor_id?: IntNullableFilter<"alert_events"> | number | null
    truck_id?: IntNullableFilter<"alert_events"> | number | null
    value?: FloatNullableFilter<"alert_events"> | number | null
    message?: StringNullableFilter<"alert_events"> | string | null
    status?: StringFilter<"alert_events"> | string
    alert_code?: StringNullableFilter<"alert_events"> | string | null
    alert_name?: StringNullableFilter<"alert_events"> | string | null
    alert_severity?: StringNullableFilter<"alert_events"> | string | null
    truck_plate?: StringNullableFilter<"alert_events"> | string | null
    truck_name?: StringNullableFilter<"alert_events"> | string | null
    truck_vin?: StringNullableFilter<"alert_events"> | string | null
    device_sn?: StringNullableFilter<"alert_events"> | string | null
    sensor_sn?: StringNullableFilter<"alert_events"> | string | null
    sensor_tire_no?: IntNullableFilter<"alert_events"> | number | null
    driver_name?: StringNullableFilter<"alert_events"> | string | null
    vendor_name?: StringNullableFilter<"alert_events"> | string | null
    created_at?: DateTimeFilter<"alert_events"> | Date | string
    resolved_at?: DateTimeNullableFilter<"alert_events"> | Date | string | null
    alert?: XOR<AlertRelationFilter, alertWhereInput>
    device?: XOR<DeviceNullableRelationFilter, deviceWhereInput> | null
    sensor?: XOR<SensorNullableRelationFilter, sensorWhereInput> | null
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null
  }, "id">

  export type alert_eventsOrderByWithAggregationInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrderInput | SortOrder
    sensor_id?: SortOrderInput | SortOrder
    truck_id?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    status?: SortOrder
    alert_code?: SortOrderInput | SortOrder
    alert_name?: SortOrderInput | SortOrder
    alert_severity?: SortOrderInput | SortOrder
    truck_plate?: SortOrderInput | SortOrder
    truck_name?: SortOrderInput | SortOrder
    truck_vin?: SortOrderInput | SortOrder
    device_sn?: SortOrderInput | SortOrder
    sensor_sn?: SortOrderInput | SortOrder
    sensor_tire_no?: SortOrderInput | SortOrder
    driver_name?: SortOrderInput | SortOrder
    vendor_name?: SortOrderInput | SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrderInput | SortOrder
    _count?: alert_eventsCountOrderByAggregateInput
    _avg?: alert_eventsAvgOrderByAggregateInput
    _max?: alert_eventsMaxOrderByAggregateInput
    _min?: alert_eventsMinOrderByAggregateInput
    _sum?: alert_eventsSumOrderByAggregateInput
  }

  export type alert_eventsScalarWhereWithAggregatesInput = {
    AND?: alert_eventsScalarWhereWithAggregatesInput | alert_eventsScalarWhereWithAggregatesInput[]
    OR?: alert_eventsScalarWhereWithAggregatesInput[]
    NOT?: alert_eventsScalarWhereWithAggregatesInput | alert_eventsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"alert_events"> | number
    alert_id?: IntWithAggregatesFilter<"alert_events"> | number
    device_id?: IntNullableWithAggregatesFilter<"alert_events"> | number | null
    sensor_id?: IntNullableWithAggregatesFilter<"alert_events"> | number | null
    truck_id?: IntNullableWithAggregatesFilter<"alert_events"> | number | null
    value?: FloatNullableWithAggregatesFilter<"alert_events"> | number | null
    message?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    status?: StringWithAggregatesFilter<"alert_events"> | string
    alert_code?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    alert_name?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    alert_severity?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    truck_plate?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    truck_name?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    truck_vin?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    device_sn?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    sensor_sn?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    sensor_tire_no?: IntNullableWithAggregatesFilter<"alert_events"> | number | null
    driver_name?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    vendor_name?: StringNullableWithAggregatesFilter<"alert_events"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"alert_events"> | Date | string
    resolved_at?: DateTimeNullableWithAggregatesFilter<"alert_events"> | Date | string | null
  }

  export type deviceWhereInput = {
    AND?: deviceWhereInput | deviceWhereInput[]
    OR?: deviceWhereInput[]
    NOT?: deviceWhereInput | deviceWhereInput[]
    id?: IntFilter<"device"> | number
    truck_id?: IntFilter<"device"> | number
    sn?: StringFilter<"device"> | string
    sim_number?: StringNullableFilter<"device"> | string | null
    installed_at?: DateTimeFilter<"device"> | Date | string
    bat1?: IntNullableFilter<"device"> | number | null
    bat2?: IntNullableFilter<"device"> | number | null
    bat3?: IntNullableFilter<"device"> | number | null
    created_at?: DateTimeFilter<"device"> | Date | string
    deleted_at?: DateTimeNullableFilter<"device"> | Date | string | null
    lock?: IntFilter<"device"> | number
    status?: StringFilter<"device"> | string
    updated_at?: DateTimeFilter<"device"> | Date | string
    alert_events?: Alert_eventsListRelationFilter
    truck?: XOR<TruckRelationFilter, truckWhereInput>
    location?: LocationListRelationFilter
    sensor?: SensorListRelationFilter
    sensor_history?: Sensor_historyListRelationFilter
  }

  export type deviceOrderByWithRelationInput = {
    id?: SortOrder
    truck_id?: SortOrder
    sn?: SortOrder
    sim_number?: SortOrderInput | SortOrder
    installed_at?: SortOrder
    bat1?: SortOrderInput | SortOrder
    bat2?: SortOrderInput | SortOrder
    bat3?: SortOrderInput | SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    lock?: SortOrder
    status?: SortOrder
    updated_at?: SortOrder
    alert_events?: alert_eventsOrderByRelationAggregateInput
    truck?: truckOrderByWithRelationInput
    location?: locationOrderByRelationAggregateInput
    sensor?: sensorOrderByRelationAggregateInput
    sensor_history?: sensor_historyOrderByRelationAggregateInput
  }

  export type deviceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sn?: string
    AND?: deviceWhereInput | deviceWhereInput[]
    OR?: deviceWhereInput[]
    NOT?: deviceWhereInput | deviceWhereInput[]
    truck_id?: IntFilter<"device"> | number
    sim_number?: StringNullableFilter<"device"> | string | null
    installed_at?: DateTimeFilter<"device"> | Date | string
    bat1?: IntNullableFilter<"device"> | number | null
    bat2?: IntNullableFilter<"device"> | number | null
    bat3?: IntNullableFilter<"device"> | number | null
    created_at?: DateTimeFilter<"device"> | Date | string
    deleted_at?: DateTimeNullableFilter<"device"> | Date | string | null
    lock?: IntFilter<"device"> | number
    status?: StringFilter<"device"> | string
    updated_at?: DateTimeFilter<"device"> | Date | string
    alert_events?: Alert_eventsListRelationFilter
    truck?: XOR<TruckRelationFilter, truckWhereInput>
    location?: LocationListRelationFilter
    sensor?: SensorListRelationFilter
    sensor_history?: Sensor_historyListRelationFilter
  }, "id" | "sn">

  export type deviceOrderByWithAggregationInput = {
    id?: SortOrder
    truck_id?: SortOrder
    sn?: SortOrder
    sim_number?: SortOrderInput | SortOrder
    installed_at?: SortOrder
    bat1?: SortOrderInput | SortOrder
    bat2?: SortOrderInput | SortOrder
    bat3?: SortOrderInput | SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    lock?: SortOrder
    status?: SortOrder
    updated_at?: SortOrder
    _count?: deviceCountOrderByAggregateInput
    _avg?: deviceAvgOrderByAggregateInput
    _max?: deviceMaxOrderByAggregateInput
    _min?: deviceMinOrderByAggregateInput
    _sum?: deviceSumOrderByAggregateInput
  }

  export type deviceScalarWhereWithAggregatesInput = {
    AND?: deviceScalarWhereWithAggregatesInput | deviceScalarWhereWithAggregatesInput[]
    OR?: deviceScalarWhereWithAggregatesInput[]
    NOT?: deviceScalarWhereWithAggregatesInput | deviceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"device"> | number
    truck_id?: IntWithAggregatesFilter<"device"> | number
    sn?: StringWithAggregatesFilter<"device"> | string
    sim_number?: StringNullableWithAggregatesFilter<"device"> | string | null
    installed_at?: DateTimeWithAggregatesFilter<"device"> | Date | string
    bat1?: IntNullableWithAggregatesFilter<"device"> | number | null
    bat2?: IntNullableWithAggregatesFilter<"device"> | number | null
    bat3?: IntNullableWithAggregatesFilter<"device"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"device"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"device"> | Date | string | null
    lock?: IntWithAggregatesFilter<"device"> | number
    status?: StringWithAggregatesFilter<"device"> | string
    updated_at?: DateTimeWithAggregatesFilter<"device"> | Date | string
  }

  export type driversWhereInput = {
    AND?: driversWhereInput | driversWhereInput[]
    OR?: driversWhereInput[]
    NOT?: driversWhereInput | driversWhereInput[]
    id?: IntFilter<"drivers"> | number
    name?: StringFilter<"drivers"> | string
    phone?: StringNullableFilter<"drivers"> | string | null
    email?: StringNullableFilter<"drivers"> | string | null
    license_number?: StringFilter<"drivers"> | string
    license_type?: StringFilter<"drivers"> | string
    license_expiry?: DateTimeFilter<"drivers"> | Date | string
    vendor_id?: IntNullableFilter<"drivers"> | number | null
    status?: StringFilter<"drivers"> | string
    created_at?: DateTimeFilter<"drivers"> | Date | string
    updated_at?: DateTimeFilter<"drivers"> | Date | string
    deleted_at?: DateTimeNullableFilter<"drivers"> | Date | string | null
    vendors?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null
    truck?: TruckListRelationFilter
  }

  export type driversOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    license_number?: SortOrder
    license_type?: SortOrder
    license_expiry?: SortOrder
    vendor_id?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    vendors?: vendorsOrderByWithRelationInput
    truck?: truckOrderByRelationAggregateInput
  }

  export type driversWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: driversWhereInput | driversWhereInput[]
    OR?: driversWhereInput[]
    NOT?: driversWhereInput | driversWhereInput[]
    name?: StringFilter<"drivers"> | string
    phone?: StringNullableFilter<"drivers"> | string | null
    email?: StringNullableFilter<"drivers"> | string | null
    license_number?: StringFilter<"drivers"> | string
    license_type?: StringFilter<"drivers"> | string
    license_expiry?: DateTimeFilter<"drivers"> | Date | string
    vendor_id?: IntNullableFilter<"drivers"> | number | null
    status?: StringFilter<"drivers"> | string
    created_at?: DateTimeFilter<"drivers"> | Date | string
    updated_at?: DateTimeFilter<"drivers"> | Date | string
    deleted_at?: DateTimeNullableFilter<"drivers"> | Date | string | null
    vendors?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null
    truck?: TruckListRelationFilter
  }, "id">

  export type driversOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    license_number?: SortOrder
    license_type?: SortOrder
    license_expiry?: SortOrder
    vendor_id?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: driversCountOrderByAggregateInput
    _avg?: driversAvgOrderByAggregateInput
    _max?: driversMaxOrderByAggregateInput
    _min?: driversMinOrderByAggregateInput
    _sum?: driversSumOrderByAggregateInput
  }

  export type driversScalarWhereWithAggregatesInput = {
    AND?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[]
    OR?: driversScalarWhereWithAggregatesInput[]
    NOT?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"drivers"> | number
    name?: StringWithAggregatesFilter<"drivers"> | string
    phone?: StringNullableWithAggregatesFilter<"drivers"> | string | null
    email?: StringNullableWithAggregatesFilter<"drivers"> | string | null
    license_number?: StringWithAggregatesFilter<"drivers"> | string
    license_type?: StringWithAggregatesFilter<"drivers"> | string
    license_expiry?: DateTimeWithAggregatesFilter<"drivers"> | Date | string
    vendor_id?: IntNullableWithAggregatesFilter<"drivers"> | number | null
    status?: StringWithAggregatesFilter<"drivers"> | string
    created_at?: DateTimeWithAggregatesFilter<"drivers"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"drivers"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"drivers"> | Date | string | null
  }

  export type locationWhereInput = {
    AND?: locationWhereInput | locationWhereInput[]
    OR?: locationWhereInput[]
    NOT?: locationWhereInput | locationWhereInput[]
    id?: IntFilter<"location"> | number
    device_id?: IntFilter<"location"> | number
    truck_id?: IntNullableFilter<"location"> | number | null
    lat?: FloatFilter<"location"> | number
    long?: FloatFilter<"location"> | number
    speed?: FloatNullableFilter<"location"> | number | null
    heading?: FloatNullableFilter<"location"> | number | null
    altitude?: FloatNullableFilter<"location"> | number | null
    accuracy?: FloatNullableFilter<"location"> | number | null
    created_at?: DateTimeFilter<"location"> | Date | string
    recorded_at?: DateTimeFilter<"location"> | Date | string
    device?: XOR<DeviceRelationFilter, deviceWhereInput>
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null
    sensor_history?: Sensor_historyListRelationFilter
  }

  export type locationOrderByWithRelationInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrderInput | SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    created_at?: SortOrder
    recorded_at?: SortOrder
    device?: deviceOrderByWithRelationInput
    truck?: truckOrderByWithRelationInput
    sensor_history?: sensor_historyOrderByRelationAggregateInput
  }

  export type locationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: locationWhereInput | locationWhereInput[]
    OR?: locationWhereInput[]
    NOT?: locationWhereInput | locationWhereInput[]
    device_id?: IntFilter<"location"> | number
    truck_id?: IntNullableFilter<"location"> | number | null
    lat?: FloatFilter<"location"> | number
    long?: FloatFilter<"location"> | number
    speed?: FloatNullableFilter<"location"> | number | null
    heading?: FloatNullableFilter<"location"> | number | null
    altitude?: FloatNullableFilter<"location"> | number | null
    accuracy?: FloatNullableFilter<"location"> | number | null
    created_at?: DateTimeFilter<"location"> | Date | string
    recorded_at?: DateTimeFilter<"location"> | Date | string
    device?: XOR<DeviceRelationFilter, deviceWhereInput>
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null
    sensor_history?: Sensor_historyListRelationFilter
  }, "id">

  export type locationOrderByWithAggregationInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrderInput | SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrderInput | SortOrder
    heading?: SortOrderInput | SortOrder
    altitude?: SortOrderInput | SortOrder
    accuracy?: SortOrderInput | SortOrder
    created_at?: SortOrder
    recorded_at?: SortOrder
    _count?: locationCountOrderByAggregateInput
    _avg?: locationAvgOrderByAggregateInput
    _max?: locationMaxOrderByAggregateInput
    _min?: locationMinOrderByAggregateInput
    _sum?: locationSumOrderByAggregateInput
  }

  export type locationScalarWhereWithAggregatesInput = {
    AND?: locationScalarWhereWithAggregatesInput | locationScalarWhereWithAggregatesInput[]
    OR?: locationScalarWhereWithAggregatesInput[]
    NOT?: locationScalarWhereWithAggregatesInput | locationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"location"> | number
    device_id?: IntWithAggregatesFilter<"location"> | number
    truck_id?: IntNullableWithAggregatesFilter<"location"> | number | null
    lat?: FloatWithAggregatesFilter<"location"> | number
    long?: FloatWithAggregatesFilter<"location"> | number
    speed?: FloatNullableWithAggregatesFilter<"location"> | number | null
    heading?: FloatNullableWithAggregatesFilter<"location"> | number | null
    altitude?: FloatNullableWithAggregatesFilter<"location"> | number | null
    accuracy?: FloatNullableWithAggregatesFilter<"location"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"location"> | Date | string
    recorded_at?: DateTimeWithAggregatesFilter<"location"> | Date | string
  }

  export type sensorWhereInput = {
    AND?: sensorWhereInput | sensorWhereInput[]
    OR?: sensorWhereInput[]
    NOT?: sensorWhereInput | sensorWhereInput[]
    id?: IntFilter<"sensor"> | number
    device_id?: IntFilter<"sensor"> | number
    sn?: StringFilter<"sensor"> | string
    tireNo?: IntFilter<"sensor"> | number
    simNumber?: StringNullableFilter<"sensor"> | string | null
    sensorNo?: IntNullableFilter<"sensor"> | number | null
    sensor_lock?: IntFilter<"sensor"> | number
    status?: StringFilter<"sensor"> | string
    tempValue?: FloatNullableFilter<"sensor"> | number | null
    tirepValue?: FloatNullableFilter<"sensor"> | number | null
    exType?: StringNullableFilter<"sensor"> | string | null
    bat?: IntNullableFilter<"sensor"> | number | null
    created_at?: DateTimeFilter<"sensor"> | Date | string
    updated_at?: DateTimeNullableFilter<"sensor"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"sensor"> | Date | string | null
    alert_events?: Alert_eventsListRelationFilter
    sensor_history?: Sensor_historyListRelationFilter
    device?: XOR<DeviceRelationFilter, deviceWhereInput>
  }

  export type sensorOrderByWithRelationInput = {
    id?: SortOrder
    device_id?: SortOrder
    sn?: SortOrder
    tireNo?: SortOrder
    simNumber?: SortOrderInput | SortOrder
    sensorNo?: SortOrderInput | SortOrder
    sensor_lock?: SortOrder
    status?: SortOrder
    tempValue?: SortOrderInput | SortOrder
    tirepValue?: SortOrderInput | SortOrder
    exType?: SortOrderInput | SortOrder
    bat?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    alert_events?: alert_eventsOrderByRelationAggregateInput
    sensor_history?: sensor_historyOrderByRelationAggregateInput
    device?: deviceOrderByWithRelationInput
  }

  export type sensorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sn?: string
    AND?: sensorWhereInput | sensorWhereInput[]
    OR?: sensorWhereInput[]
    NOT?: sensorWhereInput | sensorWhereInput[]
    device_id?: IntFilter<"sensor"> | number
    tireNo?: IntFilter<"sensor"> | number
    simNumber?: StringNullableFilter<"sensor"> | string | null
    sensorNo?: IntNullableFilter<"sensor"> | number | null
    sensor_lock?: IntFilter<"sensor"> | number
    status?: StringFilter<"sensor"> | string
    tempValue?: FloatNullableFilter<"sensor"> | number | null
    tirepValue?: FloatNullableFilter<"sensor"> | number | null
    exType?: StringNullableFilter<"sensor"> | string | null
    bat?: IntNullableFilter<"sensor"> | number | null
    created_at?: DateTimeFilter<"sensor"> | Date | string
    updated_at?: DateTimeNullableFilter<"sensor"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"sensor"> | Date | string | null
    alert_events?: Alert_eventsListRelationFilter
    sensor_history?: Sensor_historyListRelationFilter
    device?: XOR<DeviceRelationFilter, deviceWhereInput>
  }, "id" | "sn">

  export type sensorOrderByWithAggregationInput = {
    id?: SortOrder
    device_id?: SortOrder
    sn?: SortOrder
    tireNo?: SortOrder
    simNumber?: SortOrderInput | SortOrder
    sensorNo?: SortOrderInput | SortOrder
    sensor_lock?: SortOrder
    status?: SortOrder
    tempValue?: SortOrderInput | SortOrder
    tirepValue?: SortOrderInput | SortOrder
    exType?: SortOrderInput | SortOrder
    bat?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: sensorCountOrderByAggregateInput
    _avg?: sensorAvgOrderByAggregateInput
    _max?: sensorMaxOrderByAggregateInput
    _min?: sensorMinOrderByAggregateInput
    _sum?: sensorSumOrderByAggregateInput
  }

  export type sensorScalarWhereWithAggregatesInput = {
    AND?: sensorScalarWhereWithAggregatesInput | sensorScalarWhereWithAggregatesInput[]
    OR?: sensorScalarWhereWithAggregatesInput[]
    NOT?: sensorScalarWhereWithAggregatesInput | sensorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"sensor"> | number
    device_id?: IntWithAggregatesFilter<"sensor"> | number
    sn?: StringWithAggregatesFilter<"sensor"> | string
    tireNo?: IntWithAggregatesFilter<"sensor"> | number
    simNumber?: StringNullableWithAggregatesFilter<"sensor"> | string | null
    sensorNo?: IntNullableWithAggregatesFilter<"sensor"> | number | null
    sensor_lock?: IntWithAggregatesFilter<"sensor"> | number
    status?: StringWithAggregatesFilter<"sensor"> | string
    tempValue?: FloatNullableWithAggregatesFilter<"sensor"> | number | null
    tirepValue?: FloatNullableWithAggregatesFilter<"sensor"> | number | null
    exType?: StringNullableWithAggregatesFilter<"sensor"> | string | null
    bat?: IntNullableWithAggregatesFilter<"sensor"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"sensor"> | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter<"sensor"> | Date | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"sensor"> | Date | string | null
  }

  export type sensor_historyWhereInput = {
    AND?: sensor_historyWhereInput | sensor_historyWhereInput[]
    OR?: sensor_historyWhereInput[]
    NOT?: sensor_historyWhereInput | sensor_historyWhereInput[]
    id?: IntFilter<"sensor_history"> | number
    location_id?: IntFilter<"sensor_history"> | number
    sensor_id?: IntNullableFilter<"sensor_history"> | number | null
    device_id?: IntNullableFilter<"sensor_history"> | number | null
    truck_id?: IntNullableFilter<"sensor_history"> | number | null
    tireNo?: IntFilter<"sensor_history"> | number
    sensorNo?: IntNullableFilter<"sensor_history"> | number | null
    tempValue?: FloatFilter<"sensor_history"> | number
    tirepValue?: FloatFilter<"sensor_history"> | number
    exType?: StringFilter<"sensor_history"> | string
    bat?: IntNullableFilter<"sensor_history"> | number | null
    sensor_sn?: StringNullableFilter<"sensor_history"> | string | null
    sensor_status?: StringNullableFilter<"sensor_history"> | string | null
    device_sn?: StringNullableFilter<"sensor_history"> | string | null
    device_sim_number?: StringNullableFilter<"sensor_history"> | string | null
    device_status?: StringNullableFilter<"sensor_history"> | string | null
    device_bat1?: IntNullableFilter<"sensor_history"> | number | null
    device_bat2?: IntNullableFilter<"sensor_history"> | number | null
    device_bat3?: IntNullableFilter<"sensor_history"> | number | null
    truck_vin?: StringNullableFilter<"sensor_history"> | string | null
    truck_name?: StringNullableFilter<"sensor_history"> | string | null
    truck_plate?: StringNullableFilter<"sensor_history"> | string | null
    truck_model?: StringNullableFilter<"sensor_history"> | string | null
    truck_year?: IntNullableFilter<"sensor_history"> | number | null
    truck_type?: StringNullableFilter<"sensor_history"> | string | null
    truck_status?: StringNullableFilter<"sensor_history"> | string | null
    driver_id?: IntNullableFilter<"sensor_history"> | number | null
    driver_name?: StringNullableFilter<"sensor_history"> | string | null
    driver_phone?: StringNullableFilter<"sensor_history"> | string | null
    driver_license?: StringNullableFilter<"sensor_history"> | string | null
    vendor_id?: IntNullableFilter<"sensor_history"> | number | null
    vendor_name?: StringNullableFilter<"sensor_history"> | string | null
    vendor_contact?: StringNullableFilter<"sensor_history"> | string | null
    recorded_at?: DateTimeFilter<"sensor_history"> | Date | string
    created_at?: DateTimeFilter<"sensor_history"> | Date | string
    location?: XOR<LocationRelationFilter, locationWhereInput>
    sensor?: XOR<SensorNullableRelationFilter, sensorWhereInput> | null
    device?: XOR<DeviceNullableRelationFilter, deviceWhereInput> | null
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null
  }

  export type sensor_historyOrderByWithRelationInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrderInput | SortOrder
    device_id?: SortOrderInput | SortOrder
    truck_id?: SortOrderInput | SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrderInput | SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrderInput | SortOrder
    sensor_sn?: SortOrderInput | SortOrder
    sensor_status?: SortOrderInput | SortOrder
    device_sn?: SortOrderInput | SortOrder
    device_sim_number?: SortOrderInput | SortOrder
    device_status?: SortOrderInput | SortOrder
    device_bat1?: SortOrderInput | SortOrder
    device_bat2?: SortOrderInput | SortOrder
    device_bat3?: SortOrderInput | SortOrder
    truck_vin?: SortOrderInput | SortOrder
    truck_name?: SortOrderInput | SortOrder
    truck_plate?: SortOrderInput | SortOrder
    truck_model?: SortOrderInput | SortOrder
    truck_year?: SortOrderInput | SortOrder
    truck_type?: SortOrderInput | SortOrder
    truck_status?: SortOrderInput | SortOrder
    driver_id?: SortOrderInput | SortOrder
    driver_name?: SortOrderInput | SortOrder
    driver_phone?: SortOrderInput | SortOrder
    driver_license?: SortOrderInput | SortOrder
    vendor_id?: SortOrderInput | SortOrder
    vendor_name?: SortOrderInput | SortOrder
    vendor_contact?: SortOrderInput | SortOrder
    recorded_at?: SortOrder
    created_at?: SortOrder
    location?: locationOrderByWithRelationInput
    sensor?: sensorOrderByWithRelationInput
    device?: deviceOrderByWithRelationInput
    truck?: truckOrderByWithRelationInput
  }

  export type sensor_historyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: sensor_historyWhereInput | sensor_historyWhereInput[]
    OR?: sensor_historyWhereInput[]
    NOT?: sensor_historyWhereInput | sensor_historyWhereInput[]
    location_id?: IntFilter<"sensor_history"> | number
    sensor_id?: IntNullableFilter<"sensor_history"> | number | null
    device_id?: IntNullableFilter<"sensor_history"> | number | null
    truck_id?: IntNullableFilter<"sensor_history"> | number | null
    tireNo?: IntFilter<"sensor_history"> | number
    sensorNo?: IntNullableFilter<"sensor_history"> | number | null
    tempValue?: FloatFilter<"sensor_history"> | number
    tirepValue?: FloatFilter<"sensor_history"> | number
    exType?: StringFilter<"sensor_history"> | string
    bat?: IntNullableFilter<"sensor_history"> | number | null
    sensor_sn?: StringNullableFilter<"sensor_history"> | string | null
    sensor_status?: StringNullableFilter<"sensor_history"> | string | null
    device_sn?: StringNullableFilter<"sensor_history"> | string | null
    device_sim_number?: StringNullableFilter<"sensor_history"> | string | null
    device_status?: StringNullableFilter<"sensor_history"> | string | null
    device_bat1?: IntNullableFilter<"sensor_history"> | number | null
    device_bat2?: IntNullableFilter<"sensor_history"> | number | null
    device_bat3?: IntNullableFilter<"sensor_history"> | number | null
    truck_vin?: StringNullableFilter<"sensor_history"> | string | null
    truck_name?: StringNullableFilter<"sensor_history"> | string | null
    truck_plate?: StringNullableFilter<"sensor_history"> | string | null
    truck_model?: StringNullableFilter<"sensor_history"> | string | null
    truck_year?: IntNullableFilter<"sensor_history"> | number | null
    truck_type?: StringNullableFilter<"sensor_history"> | string | null
    truck_status?: StringNullableFilter<"sensor_history"> | string | null
    driver_id?: IntNullableFilter<"sensor_history"> | number | null
    driver_name?: StringNullableFilter<"sensor_history"> | string | null
    driver_phone?: StringNullableFilter<"sensor_history"> | string | null
    driver_license?: StringNullableFilter<"sensor_history"> | string | null
    vendor_id?: IntNullableFilter<"sensor_history"> | number | null
    vendor_name?: StringNullableFilter<"sensor_history"> | string | null
    vendor_contact?: StringNullableFilter<"sensor_history"> | string | null
    recorded_at?: DateTimeFilter<"sensor_history"> | Date | string
    created_at?: DateTimeFilter<"sensor_history"> | Date | string
    location?: XOR<LocationRelationFilter, locationWhereInput>
    sensor?: XOR<SensorNullableRelationFilter, sensorWhereInput> | null
    device?: XOR<DeviceNullableRelationFilter, deviceWhereInput> | null
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null
  }, "id">

  export type sensor_historyOrderByWithAggregationInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrderInput | SortOrder
    device_id?: SortOrderInput | SortOrder
    truck_id?: SortOrderInput | SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrderInput | SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrderInput | SortOrder
    sensor_sn?: SortOrderInput | SortOrder
    sensor_status?: SortOrderInput | SortOrder
    device_sn?: SortOrderInput | SortOrder
    device_sim_number?: SortOrderInput | SortOrder
    device_status?: SortOrderInput | SortOrder
    device_bat1?: SortOrderInput | SortOrder
    device_bat2?: SortOrderInput | SortOrder
    device_bat3?: SortOrderInput | SortOrder
    truck_vin?: SortOrderInput | SortOrder
    truck_name?: SortOrderInput | SortOrder
    truck_plate?: SortOrderInput | SortOrder
    truck_model?: SortOrderInput | SortOrder
    truck_year?: SortOrderInput | SortOrder
    truck_type?: SortOrderInput | SortOrder
    truck_status?: SortOrderInput | SortOrder
    driver_id?: SortOrderInput | SortOrder
    driver_name?: SortOrderInput | SortOrder
    driver_phone?: SortOrderInput | SortOrder
    driver_license?: SortOrderInput | SortOrder
    vendor_id?: SortOrderInput | SortOrder
    vendor_name?: SortOrderInput | SortOrder
    vendor_contact?: SortOrderInput | SortOrder
    recorded_at?: SortOrder
    created_at?: SortOrder
    _count?: sensor_historyCountOrderByAggregateInput
    _avg?: sensor_historyAvgOrderByAggregateInput
    _max?: sensor_historyMaxOrderByAggregateInput
    _min?: sensor_historyMinOrderByAggregateInput
    _sum?: sensor_historySumOrderByAggregateInput
  }

  export type sensor_historyScalarWhereWithAggregatesInput = {
    AND?: sensor_historyScalarWhereWithAggregatesInput | sensor_historyScalarWhereWithAggregatesInput[]
    OR?: sensor_historyScalarWhereWithAggregatesInput[]
    NOT?: sensor_historyScalarWhereWithAggregatesInput | sensor_historyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"sensor_history"> | number
    location_id?: IntWithAggregatesFilter<"sensor_history"> | number
    sensor_id?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    device_id?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    truck_id?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    tireNo?: IntWithAggregatesFilter<"sensor_history"> | number
    sensorNo?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    tempValue?: FloatWithAggregatesFilter<"sensor_history"> | number
    tirepValue?: FloatWithAggregatesFilter<"sensor_history"> | number
    exType?: StringWithAggregatesFilter<"sensor_history"> | string
    bat?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    sensor_sn?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    sensor_status?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    device_sn?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    device_sim_number?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    device_status?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    device_bat1?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    device_bat2?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    device_bat3?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    truck_vin?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    truck_name?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    truck_plate?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    truck_model?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    truck_year?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    truck_type?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    truck_status?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    driver_id?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    driver_name?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    driver_phone?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    driver_license?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    vendor_id?: IntNullableWithAggregatesFilter<"sensor_history"> | number | null
    vendor_name?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    vendor_contact?: StringNullableWithAggregatesFilter<"sensor_history"> | string | null
    recorded_at?: DateTimeWithAggregatesFilter<"sensor_history"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"sensor_history"> | Date | string
  }

  export type truckWhereInput = {
    AND?: truckWhereInput | truckWhereInput[]
    OR?: truckWhereInput[]
    NOT?: truckWhereInput | truckWhereInput[]
    id?: IntFilter<"truck"> | number
    vin?: StringNullableFilter<"truck"> | string | null
    name?: StringFilter<"truck"> | string
    model?: StringNullableFilter<"truck"> | string | null
    year?: IntNullableFilter<"truck"> | number | null
    vendor_id?: IntNullableFilter<"truck"> | number | null
    created_at?: DateTimeFilter<"truck"> | Date | string
    created_by?: IntNullableFilter<"truck"> | number | null
    updated_by?: IntNullableFilter<"truck"> | number | null
    deleted_at?: DateTimeNullableFilter<"truck"> | Date | string | null
    driver_id?: IntNullableFilter<"truck"> | number | null
    image?: StringNullableFilter<"truck"> | string | null
    plate?: StringNullableFilter<"truck"> | string | null
    status?: StringFilter<"truck"> | string
    type?: StringNullableFilter<"truck"> | string | null
    updated_at?: DateTimeFilter<"truck"> | Date | string
    alert_events?: Alert_eventsListRelationFilter
    device?: DeviceListRelationFilter
    location?: LocationListRelationFilter
    sensor_history?: Sensor_historyListRelationFilter
    drivers?: XOR<DriversNullableRelationFilter, driversWhereInput> | null
    vendors?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null
  }

  export type truckOrderByWithRelationInput = {
    id?: SortOrder
    vin?: SortOrderInput | SortOrder
    name?: SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    vendor_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    driver_id?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    plate?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    alert_events?: alert_eventsOrderByRelationAggregateInput
    device?: deviceOrderByRelationAggregateInput
    location?: locationOrderByRelationAggregateInput
    sensor_history?: sensor_historyOrderByRelationAggregateInput
    drivers?: driversOrderByWithRelationInput
    vendors?: vendorsOrderByWithRelationInput
  }

  export type truckWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    vin?: string
    plate?: string
    AND?: truckWhereInput | truckWhereInput[]
    OR?: truckWhereInput[]
    NOT?: truckWhereInput | truckWhereInput[]
    name?: StringFilter<"truck"> | string
    model?: StringNullableFilter<"truck"> | string | null
    year?: IntNullableFilter<"truck"> | number | null
    vendor_id?: IntNullableFilter<"truck"> | number | null
    created_at?: DateTimeFilter<"truck"> | Date | string
    created_by?: IntNullableFilter<"truck"> | number | null
    updated_by?: IntNullableFilter<"truck"> | number | null
    deleted_at?: DateTimeNullableFilter<"truck"> | Date | string | null
    driver_id?: IntNullableFilter<"truck"> | number | null
    image?: StringNullableFilter<"truck"> | string | null
    status?: StringFilter<"truck"> | string
    type?: StringNullableFilter<"truck"> | string | null
    updated_at?: DateTimeFilter<"truck"> | Date | string
    alert_events?: Alert_eventsListRelationFilter
    device?: DeviceListRelationFilter
    location?: LocationListRelationFilter
    sensor_history?: Sensor_historyListRelationFilter
    drivers?: XOR<DriversNullableRelationFilter, driversWhereInput> | null
    vendors?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null
  }, "id" | "vin" | "plate">

  export type truckOrderByWithAggregationInput = {
    id?: SortOrder
    vin?: SortOrderInput | SortOrder
    name?: SortOrder
    model?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    vendor_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    driver_id?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    plate?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrderInput | SortOrder
    updated_at?: SortOrder
    _count?: truckCountOrderByAggregateInput
    _avg?: truckAvgOrderByAggregateInput
    _max?: truckMaxOrderByAggregateInput
    _min?: truckMinOrderByAggregateInput
    _sum?: truckSumOrderByAggregateInput
  }

  export type truckScalarWhereWithAggregatesInput = {
    AND?: truckScalarWhereWithAggregatesInput | truckScalarWhereWithAggregatesInput[]
    OR?: truckScalarWhereWithAggregatesInput[]
    NOT?: truckScalarWhereWithAggregatesInput | truckScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"truck"> | number
    vin?: StringNullableWithAggregatesFilter<"truck"> | string | null
    name?: StringWithAggregatesFilter<"truck"> | string
    model?: StringNullableWithAggregatesFilter<"truck"> | string | null
    year?: IntNullableWithAggregatesFilter<"truck"> | number | null
    vendor_id?: IntNullableWithAggregatesFilter<"truck"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"truck"> | Date | string
    created_by?: IntNullableWithAggregatesFilter<"truck"> | number | null
    updated_by?: IntNullableWithAggregatesFilter<"truck"> | number | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"truck"> | Date | string | null
    driver_id?: IntNullableWithAggregatesFilter<"truck"> | number | null
    image?: StringNullableWithAggregatesFilter<"truck"> | string | null
    plate?: StringNullableWithAggregatesFilter<"truck"> | string | null
    status?: StringWithAggregatesFilter<"truck"> | string
    type?: StringNullableWithAggregatesFilter<"truck"> | string | null
    updated_at?: DateTimeWithAggregatesFilter<"truck"> | Date | string
  }

  export type user_adminWhereInput = {
    AND?: user_adminWhereInput | user_adminWhereInput[]
    OR?: user_adminWhereInput[]
    NOT?: user_adminWhereInput | user_adminWhereInput[]
    id?: IntFilter<"user_admin"> | number
    name?: StringFilter<"user_admin"> | string
    email?: StringFilter<"user_admin"> | string
    password?: StringFilter<"user_admin"> | string
    role?: StringFilter<"user_admin"> | string
    phone?: StringNullableFilter<"user_admin"> | string | null
    department?: StringNullableFilter<"user_admin"> | string | null
    bio?: StringNullableFilter<"user_admin"> | string | null
    avatar?: StringNullableFilter<"user_admin"> | string | null
    two_factor_enabled?: BoolFilter<"user_admin"> | boolean
    last_login?: DateTimeNullableFilter<"user_admin"> | Date | string | null
    status?: StringFilter<"user_admin"> | string
    created_at?: DateTimeFilter<"user_admin"> | Date | string
    updated_at?: DateTimeFilter<"user_admin"> | Date | string
    deleted_at?: DateTimeNullableFilter<"user_admin"> | Date | string | null
  }

  export type user_adminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    two_factor_enabled?: SortOrder
    last_login?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
  }

  export type user_adminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: user_adminWhereInput | user_adminWhereInput[]
    OR?: user_adminWhereInput[]
    NOT?: user_adminWhereInput | user_adminWhereInput[]
    name?: StringFilter<"user_admin"> | string
    password?: StringFilter<"user_admin"> | string
    role?: StringFilter<"user_admin"> | string
    phone?: StringNullableFilter<"user_admin"> | string | null
    department?: StringNullableFilter<"user_admin"> | string | null
    bio?: StringNullableFilter<"user_admin"> | string | null
    avatar?: StringNullableFilter<"user_admin"> | string | null
    two_factor_enabled?: BoolFilter<"user_admin"> | boolean
    last_login?: DateTimeNullableFilter<"user_admin"> | Date | string | null
    status?: StringFilter<"user_admin"> | string
    created_at?: DateTimeFilter<"user_admin"> | Date | string
    updated_at?: DateTimeFilter<"user_admin"> | Date | string
    deleted_at?: DateTimeNullableFilter<"user_admin"> | Date | string | null
  }, "id" | "email">

  export type user_adminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    two_factor_enabled?: SortOrder
    last_login?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: user_adminCountOrderByAggregateInput
    _avg?: user_adminAvgOrderByAggregateInput
    _max?: user_adminMaxOrderByAggregateInput
    _min?: user_adminMinOrderByAggregateInput
    _sum?: user_adminSumOrderByAggregateInput
  }

  export type user_adminScalarWhereWithAggregatesInput = {
    AND?: user_adminScalarWhereWithAggregatesInput | user_adminScalarWhereWithAggregatesInput[]
    OR?: user_adminScalarWhereWithAggregatesInput[]
    NOT?: user_adminScalarWhereWithAggregatesInput | user_adminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user_admin"> | number
    name?: StringWithAggregatesFilter<"user_admin"> | string
    email?: StringWithAggregatesFilter<"user_admin"> | string
    password?: StringWithAggregatesFilter<"user_admin"> | string
    role?: StringWithAggregatesFilter<"user_admin"> | string
    phone?: StringNullableWithAggregatesFilter<"user_admin"> | string | null
    department?: StringNullableWithAggregatesFilter<"user_admin"> | string | null
    bio?: StringNullableWithAggregatesFilter<"user_admin"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"user_admin"> | string | null
    two_factor_enabled?: BoolWithAggregatesFilter<"user_admin"> | boolean
    last_login?: DateTimeNullableWithAggregatesFilter<"user_admin"> | Date | string | null
    status?: StringWithAggregatesFilter<"user_admin"> | string
    created_at?: DateTimeWithAggregatesFilter<"user_admin"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"user_admin"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"user_admin"> | Date | string | null
  }

  export type vendorsWhereInput = {
    AND?: vendorsWhereInput | vendorsWhereInput[]
    OR?: vendorsWhereInput[]
    NOT?: vendorsWhereInput | vendorsWhereInput[]
    id?: IntFilter<"vendors"> | number
    address?: StringNullableFilter<"vendors"> | string | null
    email?: StringNullableFilter<"vendors"> | string | null
    contact_person?: StringNullableFilter<"vendors"> | string | null
    created_at?: DateTimeFilter<"vendors"> | Date | string
    updated_at?: DateTimeFilter<"vendors"> | Date | string
    deleted_at?: DateTimeNullableFilter<"vendors"> | Date | string | null
    name_vendor?: StringFilter<"vendors"> | string
    telephone?: StringNullableFilter<"vendors"> | string | null
    drivers?: DriversListRelationFilter
    truck?: TruckListRelationFilter
  }

  export type vendorsOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    contact_person?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    name_vendor?: SortOrder
    telephone?: SortOrderInput | SortOrder
    drivers?: driversOrderByRelationAggregateInput
    truck?: truckOrderByRelationAggregateInput
  }

  export type vendorsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: vendorsWhereInput | vendorsWhereInput[]
    OR?: vendorsWhereInput[]
    NOT?: vendorsWhereInput | vendorsWhereInput[]
    address?: StringNullableFilter<"vendors"> | string | null
    email?: StringNullableFilter<"vendors"> | string | null
    contact_person?: StringNullableFilter<"vendors"> | string | null
    created_at?: DateTimeFilter<"vendors"> | Date | string
    updated_at?: DateTimeFilter<"vendors"> | Date | string
    deleted_at?: DateTimeNullableFilter<"vendors"> | Date | string | null
    name_vendor?: StringFilter<"vendors"> | string
    telephone?: StringNullableFilter<"vendors"> | string | null
    drivers?: DriversListRelationFilter
    truck?: TruckListRelationFilter
  }, "id">

  export type vendorsOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    contact_person?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    name_vendor?: SortOrder
    telephone?: SortOrderInput | SortOrder
    _count?: vendorsCountOrderByAggregateInput
    _avg?: vendorsAvgOrderByAggregateInput
    _max?: vendorsMaxOrderByAggregateInput
    _min?: vendorsMinOrderByAggregateInput
    _sum?: vendorsSumOrderByAggregateInput
  }

  export type vendorsScalarWhereWithAggregatesInput = {
    AND?: vendorsScalarWhereWithAggregatesInput | vendorsScalarWhereWithAggregatesInput[]
    OR?: vendorsScalarWhereWithAggregatesInput[]
    NOT?: vendorsScalarWhereWithAggregatesInput | vendorsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"vendors"> | number
    address?: StringNullableWithAggregatesFilter<"vendors"> | string | null
    email?: StringNullableWithAggregatesFilter<"vendors"> | string | null
    contact_person?: StringNullableWithAggregatesFilter<"vendors"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"vendors"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"vendors"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"vendors"> | Date | string | null
    name_vendor?: StringWithAggregatesFilter<"vendors"> | string
    telephone?: StringNullableWithAggregatesFilter<"vendors"> | string | null
  }

  export type alertCreateInput = {
    code: string
    name: string
    description?: string | null
    severity?: string
    threshold_min?: number | null
    threshold_max?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    alert_events?: alert_eventsCreateNestedManyWithoutAlertInput
  }

  export type alertUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    description?: string | null
    severity?: string
    threshold_min?: number | null
    threshold_max?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutAlertInput
  }

  export type alertUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: StringFieldUpdateOperationsInput | string
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUpdateManyWithoutAlertNestedInput
  }

  export type alertUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: StringFieldUpdateOperationsInput | string
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUncheckedUpdateManyWithoutAlertNestedInput
  }

  export type alertCreateManyInput = {
    id?: number
    code: string
    name: string
    description?: string | null
    severity?: string
    threshold_min?: number | null
    threshold_max?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type alertUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: StringFieldUpdateOperationsInput | string
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alertUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: StringFieldUpdateOperationsInput | string
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsCreateInput = {
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
    alert: alertCreateNestedOneWithoutAlert_eventsInput
    device?: deviceCreateNestedOneWithoutAlert_eventsInput
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput
    truck?: truckCreateNestedOneWithoutAlert_eventsInput
  }

  export type alert_eventsUncheckedCreateInput = {
    id?: number
    alert_id: number
    device_id?: number | null
    sensor_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsUpdateInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput
  }

  export type alert_eventsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsCreateManyInput = {
    id?: number
    alert_id: number
    device_id?: number | null
    sensor_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsUpdateManyMutationInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type deviceCreateInput = {
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput
    truck: truckCreateNestedOneWithoutDeviceInput
    location?: locationCreateNestedManyWithoutDeviceInput
    sensor?: sensorCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyCreateNestedManyWithoutDeviceInput
  }

  export type deviceUncheckedCreateInput = {
    id?: number
    truck_id: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput
    location?: locationUncheckedCreateNestedManyWithoutDeviceInput
    sensor?: sensorUncheckedCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type deviceUpdateInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput
    truck?: truckUpdateOneRequiredWithoutDeviceNestedInput
    location?: locationUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput
    location?: locationUncheckedUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUncheckedUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type deviceCreateManyInput = {
    id?: number
    truck_id: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
  }

  export type deviceUpdateManyMutationInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type deviceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type driversCreateInput = {
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    vendors?: vendorsCreateNestedOneWithoutDriversInput
    truck?: truckCreateNestedManyWithoutDriversInput
  }

  export type driversUncheckedCreateInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    vendor_id?: number | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    truck?: truckUncheckedCreateNestedManyWithoutDriversInput
  }

  export type driversUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vendors?: vendorsUpdateOneWithoutDriversNestedInput
    truck?: truckUpdateManyWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truck?: truckUncheckedUpdateManyWithoutDriversNestedInput
  }

  export type driversCreateManyInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    vendor_id?: number | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type driversUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type driversUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type locationCreateInput = {
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    device: deviceCreateNestedOneWithoutLocationInput
    truck?: truckCreateNestedOneWithoutLocationInput
    sensor_history?: sensor_historyCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateInput = {
    id?: number
    device_id: number
    truck_id?: number | null
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationUpdateInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: deviceUpdateOneRequiredWithoutLocationNestedInput
    truck?: truckUpdateOneWithoutLocationNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type locationCreateManyInput = {
    id?: number
    device_id: number
    truck_id?: number | null
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
  }

  export type locationUpdateManyMutationInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type locationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensorCreateInput = {
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    alert_events?: alert_eventsCreateNestedManyWithoutSensorInput
    sensor_history?: sensor_historyCreateNestedManyWithoutSensorInput
    device: deviceCreateNestedOneWithoutSensorInput
  }

  export type sensorUncheckedCreateInput = {
    id?: number
    device_id: number
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutSensorInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutSensorInput
  }

  export type sensorUpdateInput = {
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUpdateManyWithoutSensorNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutSensorNestedInput
    device?: deviceUpdateOneRequiredWithoutSensorNestedInput
  }

  export type sensorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUncheckedUpdateManyWithoutSensorNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type sensorCreateManyInput = {
    id?: number
    device_id: number
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
  }

  export type sensorUpdateManyMutationInput = {
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sensorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sensor_historyCreateInput = {
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
    location: locationCreateNestedOneWithoutSensor_historyInput
    sensor?: sensorCreateNestedOneWithoutSensor_historyInput
    device?: deviceCreateNestedOneWithoutSensor_historyInput
    truck?: truckCreateNestedOneWithoutSensor_historyInput
  }

  export type sensor_historyUncheckedCreateInput = {
    id?: number
    location_id: number
    sensor_id?: number | null
    device_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyUpdateInput = {
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: locationUpdateOneRequiredWithoutSensor_historyNestedInput
    sensor?: sensorUpdateOneWithoutSensor_historyNestedInput
    device?: deviceUpdateOneWithoutSensor_historyNestedInput
    truck?: truckUpdateOneWithoutSensor_historyNestedInput
  }

  export type sensor_historyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyCreateManyInput = {
    id?: number
    location_id: number
    sensor_id?: number | null
    device_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyUpdateManyMutationInput = {
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type truckCreateInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput
    device?: deviceCreateNestedManyWithoutTruckInput
    location?: locationCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyCreateNestedManyWithoutTruckInput
    drivers?: driversCreateNestedOneWithoutTruckInput
    vendors?: vendorsCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput
    device?: deviceUncheckedCreateNestedManyWithoutTruckInput
    location?: locationUncheckedCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckUpdateInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput
    device?: deviceUpdateManyWithoutTruckNestedInput
    location?: locationUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutTruckNestedInput
    drivers?: driversUpdateOneWithoutTruckNestedInput
    vendors?: vendorsUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput
    device?: deviceUncheckedUpdateManyWithoutTruckNestedInput
    location?: locationUncheckedUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type truckCreateManyInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
  }

  export type truckUpdateManyMutationInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type truckUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_adminCreateInput = {
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    department?: string | null
    bio?: string | null
    avatar?: string | null
    two_factor_enabled?: boolean
    last_login?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type user_adminUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    department?: string | null
    bio?: string | null
    avatar?: string | null
    two_factor_enabled?: boolean
    last_login?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type user_adminUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_adminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_adminCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: string
    phone?: string | null
    department?: string | null
    bio?: string | null
    avatar?: string | null
    two_factor_enabled?: boolean
    last_login?: Date | string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type user_adminUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_adminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type vendorsCreateInput = {
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
    drivers?: driversCreateNestedManyWithoutVendorsInput
    truck?: truckCreateNestedManyWithoutVendorsInput
  }

  export type vendorsUncheckedCreateInput = {
    id?: number
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
    drivers?: driversUncheckedCreateNestedManyWithoutVendorsInput
    truck?: truckUncheckedCreateNestedManyWithoutVendorsInput
  }

  export type vendorsUpdateInput = {
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    drivers?: driversUpdateManyWithoutVendorsNestedInput
    truck?: truckUpdateManyWithoutVendorsNestedInput
  }

  export type vendorsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    drivers?: driversUncheckedUpdateManyWithoutVendorsNestedInput
    truck?: truckUncheckedUpdateManyWithoutVendorsNestedInput
  }

  export type vendorsCreateManyInput = {
    id?: number
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
  }

  export type vendorsUpdateManyMutationInput = {
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type vendorsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Alert_eventsListRelationFilter = {
    every?: alert_eventsWhereInput
    some?: alert_eventsWhereInput
    none?: alert_eventsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type alert_eventsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type alertCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    severity?: SortOrder
    threshold_min?: SortOrder
    threshold_max?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type alertAvgOrderByAggregateInput = {
    id?: SortOrder
    threshold_min?: SortOrder
    threshold_max?: SortOrder
  }

  export type alertMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    severity?: SortOrder
    threshold_min?: SortOrder
    threshold_max?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type alertMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    severity?: SortOrder
    threshold_min?: SortOrder
    threshold_max?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type alertSumOrderByAggregateInput = {
    id?: SortOrder
    threshold_min?: SortOrder
    threshold_max?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AlertRelationFilter = {
    is?: alertWhereInput
    isNot?: alertWhereInput
  }

  export type DeviceNullableRelationFilter = {
    is?: deviceWhereInput | null
    isNot?: deviceWhereInput | null
  }

  export type SensorNullableRelationFilter = {
    is?: sensorWhereInput | null
    isNot?: sensorWhereInput | null
  }

  export type TruckNullableRelationFilter = {
    is?: truckWhereInput | null
    isNot?: truckWhereInput | null
  }

  export type alert_eventsCountOrderByAggregateInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrder
    sensor_id?: SortOrder
    truck_id?: SortOrder
    value?: SortOrder
    message?: SortOrder
    status?: SortOrder
    alert_code?: SortOrder
    alert_name?: SortOrder
    alert_severity?: SortOrder
    truck_plate?: SortOrder
    truck_name?: SortOrder
    truck_vin?: SortOrder
    device_sn?: SortOrder
    sensor_sn?: SortOrder
    sensor_tire_no?: SortOrder
    driver_name?: SortOrder
    vendor_name?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type alert_eventsAvgOrderByAggregateInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrder
    sensor_id?: SortOrder
    truck_id?: SortOrder
    value?: SortOrder
    sensor_tire_no?: SortOrder
  }

  export type alert_eventsMaxOrderByAggregateInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrder
    sensor_id?: SortOrder
    truck_id?: SortOrder
    value?: SortOrder
    message?: SortOrder
    status?: SortOrder
    alert_code?: SortOrder
    alert_name?: SortOrder
    alert_severity?: SortOrder
    truck_plate?: SortOrder
    truck_name?: SortOrder
    truck_vin?: SortOrder
    device_sn?: SortOrder
    sensor_sn?: SortOrder
    sensor_tire_no?: SortOrder
    driver_name?: SortOrder
    vendor_name?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type alert_eventsMinOrderByAggregateInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrder
    sensor_id?: SortOrder
    truck_id?: SortOrder
    value?: SortOrder
    message?: SortOrder
    status?: SortOrder
    alert_code?: SortOrder
    alert_name?: SortOrder
    alert_severity?: SortOrder
    truck_plate?: SortOrder
    truck_name?: SortOrder
    truck_vin?: SortOrder
    device_sn?: SortOrder
    sensor_sn?: SortOrder
    sensor_tire_no?: SortOrder
    driver_name?: SortOrder
    vendor_name?: SortOrder
    created_at?: SortOrder
    resolved_at?: SortOrder
  }

  export type alert_eventsSumOrderByAggregateInput = {
    id?: SortOrder
    alert_id?: SortOrder
    device_id?: SortOrder
    sensor_id?: SortOrder
    truck_id?: SortOrder
    value?: SortOrder
    sensor_tire_no?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TruckRelationFilter = {
    is?: truckWhereInput
    isNot?: truckWhereInput
  }

  export type LocationListRelationFilter = {
    every?: locationWhereInput
    some?: locationWhereInput
    none?: locationWhereInput
  }

  export type SensorListRelationFilter = {
    every?: sensorWhereInput
    some?: sensorWhereInput
    none?: sensorWhereInput
  }

  export type Sensor_historyListRelationFilter = {
    every?: sensor_historyWhereInput
    some?: sensor_historyWhereInput
    none?: sensor_historyWhereInput
  }

  export type locationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sensorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sensor_historyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type deviceCountOrderByAggregateInput = {
    id?: SortOrder
    truck_id?: SortOrder
    sn?: SortOrder
    sim_number?: SortOrder
    installed_at?: SortOrder
    bat1?: SortOrder
    bat2?: SortOrder
    bat3?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
    lock?: SortOrder
    status?: SortOrder
    updated_at?: SortOrder
  }

  export type deviceAvgOrderByAggregateInput = {
    id?: SortOrder
    truck_id?: SortOrder
    bat1?: SortOrder
    bat2?: SortOrder
    bat3?: SortOrder
    lock?: SortOrder
  }

  export type deviceMaxOrderByAggregateInput = {
    id?: SortOrder
    truck_id?: SortOrder
    sn?: SortOrder
    sim_number?: SortOrder
    installed_at?: SortOrder
    bat1?: SortOrder
    bat2?: SortOrder
    bat3?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
    lock?: SortOrder
    status?: SortOrder
    updated_at?: SortOrder
  }

  export type deviceMinOrderByAggregateInput = {
    id?: SortOrder
    truck_id?: SortOrder
    sn?: SortOrder
    sim_number?: SortOrder
    installed_at?: SortOrder
    bat1?: SortOrder
    bat2?: SortOrder
    bat3?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
    lock?: SortOrder
    status?: SortOrder
    updated_at?: SortOrder
  }

  export type deviceSumOrderByAggregateInput = {
    id?: SortOrder
    truck_id?: SortOrder
    bat1?: SortOrder
    bat2?: SortOrder
    bat3?: SortOrder
    lock?: SortOrder
  }

  export type VendorsNullableRelationFilter = {
    is?: vendorsWhereInput | null
    isNot?: vendorsWhereInput | null
  }

  export type TruckListRelationFilter = {
    every?: truckWhereInput
    some?: truckWhereInput
    none?: truckWhereInput
  }

  export type truckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type driversCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    license_number?: SortOrder
    license_type?: SortOrder
    license_expiry?: SortOrder
    vendor_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type driversAvgOrderByAggregateInput = {
    id?: SortOrder
    vendor_id?: SortOrder
  }

  export type driversMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    license_number?: SortOrder
    license_type?: SortOrder
    license_expiry?: SortOrder
    vendor_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type driversMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    license_number?: SortOrder
    license_type?: SortOrder
    license_expiry?: SortOrder
    vendor_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type driversSumOrderByAggregateInput = {
    id?: SortOrder
    vendor_id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DeviceRelationFilter = {
    is?: deviceWhereInput
    isNot?: deviceWhereInput
  }

  export type locationCountOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    created_at?: SortOrder
    recorded_at?: SortOrder
  }

  export type locationAvgOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
  }

  export type locationMaxOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    created_at?: SortOrder
    recorded_at?: SortOrder
  }

  export type locationMinOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
    created_at?: SortOrder
    recorded_at?: SortOrder
  }

  export type locationSumOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    lat?: SortOrder
    long?: SortOrder
    speed?: SortOrder
    heading?: SortOrder
    altitude?: SortOrder
    accuracy?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type sensorCountOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    sn?: SortOrder
    tireNo?: SortOrder
    simNumber?: SortOrder
    sensorNo?: SortOrder
    sensor_lock?: SortOrder
    status?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type sensorAvgOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    sensor_lock?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    bat?: SortOrder
  }

  export type sensorMaxOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    sn?: SortOrder
    tireNo?: SortOrder
    simNumber?: SortOrder
    sensorNo?: SortOrder
    sensor_lock?: SortOrder
    status?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type sensorMinOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    sn?: SortOrder
    tireNo?: SortOrder
    simNumber?: SortOrder
    sensorNo?: SortOrder
    sensor_lock?: SortOrder
    status?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type sensorSumOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    sensor_lock?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    bat?: SortOrder
  }

  export type LocationRelationFilter = {
    is?: locationWhereInput
    isNot?: locationWhereInput
  }

  export type sensor_historyCountOrderByAggregateInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrder
    sensor_sn?: SortOrder
    sensor_status?: SortOrder
    device_sn?: SortOrder
    device_sim_number?: SortOrder
    device_status?: SortOrder
    device_bat1?: SortOrder
    device_bat2?: SortOrder
    device_bat3?: SortOrder
    truck_vin?: SortOrder
    truck_name?: SortOrder
    truck_plate?: SortOrder
    truck_model?: SortOrder
    truck_year?: SortOrder
    truck_type?: SortOrder
    truck_status?: SortOrder
    driver_id?: SortOrder
    driver_name?: SortOrder
    driver_phone?: SortOrder
    driver_license?: SortOrder
    vendor_id?: SortOrder
    vendor_name?: SortOrder
    vendor_contact?: SortOrder
    recorded_at?: SortOrder
    created_at?: SortOrder
  }

  export type sensor_historyAvgOrderByAggregateInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    bat?: SortOrder
    device_bat1?: SortOrder
    device_bat2?: SortOrder
    device_bat3?: SortOrder
    truck_year?: SortOrder
    driver_id?: SortOrder
    vendor_id?: SortOrder
  }

  export type sensor_historyMaxOrderByAggregateInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrder
    sensor_sn?: SortOrder
    sensor_status?: SortOrder
    device_sn?: SortOrder
    device_sim_number?: SortOrder
    device_status?: SortOrder
    device_bat1?: SortOrder
    device_bat2?: SortOrder
    device_bat3?: SortOrder
    truck_vin?: SortOrder
    truck_name?: SortOrder
    truck_plate?: SortOrder
    truck_model?: SortOrder
    truck_year?: SortOrder
    truck_type?: SortOrder
    truck_status?: SortOrder
    driver_id?: SortOrder
    driver_name?: SortOrder
    driver_phone?: SortOrder
    driver_license?: SortOrder
    vendor_id?: SortOrder
    vendor_name?: SortOrder
    vendor_contact?: SortOrder
    recorded_at?: SortOrder
    created_at?: SortOrder
  }

  export type sensor_historyMinOrderByAggregateInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    exType?: SortOrder
    bat?: SortOrder
    sensor_sn?: SortOrder
    sensor_status?: SortOrder
    device_sn?: SortOrder
    device_sim_number?: SortOrder
    device_status?: SortOrder
    device_bat1?: SortOrder
    device_bat2?: SortOrder
    device_bat3?: SortOrder
    truck_vin?: SortOrder
    truck_name?: SortOrder
    truck_plate?: SortOrder
    truck_model?: SortOrder
    truck_year?: SortOrder
    truck_type?: SortOrder
    truck_status?: SortOrder
    driver_id?: SortOrder
    driver_name?: SortOrder
    driver_phone?: SortOrder
    driver_license?: SortOrder
    vendor_id?: SortOrder
    vendor_name?: SortOrder
    vendor_contact?: SortOrder
    recorded_at?: SortOrder
    created_at?: SortOrder
  }

  export type sensor_historySumOrderByAggregateInput = {
    id?: SortOrder
    location_id?: SortOrder
    sensor_id?: SortOrder
    device_id?: SortOrder
    truck_id?: SortOrder
    tireNo?: SortOrder
    sensorNo?: SortOrder
    tempValue?: SortOrder
    tirepValue?: SortOrder
    bat?: SortOrder
    device_bat1?: SortOrder
    device_bat2?: SortOrder
    device_bat3?: SortOrder
    truck_year?: SortOrder
    driver_id?: SortOrder
    vendor_id?: SortOrder
  }

  export type DeviceListRelationFilter = {
    every?: deviceWhereInput
    some?: deviceWhereInput
    none?: deviceWhereInput
  }

  export type DriversNullableRelationFilter = {
    is?: driversWhereInput | null
    isNot?: driversWhereInput | null
  }

  export type deviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type truckCountOrderByAggregateInput = {
    id?: SortOrder
    vin?: SortOrder
    name?: SortOrder
    model?: SortOrder
    year?: SortOrder
    vendor_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_at?: SortOrder
    driver_id?: SortOrder
    image?: SortOrder
    plate?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
  }

  export type truckAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    vendor_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    driver_id?: SortOrder
  }

  export type truckMaxOrderByAggregateInput = {
    id?: SortOrder
    vin?: SortOrder
    name?: SortOrder
    model?: SortOrder
    year?: SortOrder
    vendor_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_at?: SortOrder
    driver_id?: SortOrder
    image?: SortOrder
    plate?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
  }

  export type truckMinOrderByAggregateInput = {
    id?: SortOrder
    vin?: SortOrder
    name?: SortOrder
    model?: SortOrder
    year?: SortOrder
    vendor_id?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_at?: SortOrder
    driver_id?: SortOrder
    image?: SortOrder
    plate?: SortOrder
    status?: SortOrder
    type?: SortOrder
    updated_at?: SortOrder
  }

  export type truckSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    vendor_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    driver_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type user_adminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    two_factor_enabled?: SortOrder
    last_login?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type user_adminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type user_adminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    two_factor_enabled?: SortOrder
    last_login?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type user_adminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    two_factor_enabled?: SortOrder
    last_login?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type user_adminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DriversListRelationFilter = {
    every?: driversWhereInput
    some?: driversWhereInput
    none?: driversWhereInput
  }

  export type driversOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type vendorsCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    email?: SortOrder
    contact_person?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    name_vendor?: SortOrder
    telephone?: SortOrder
  }

  export type vendorsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type vendorsMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    email?: SortOrder
    contact_person?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    name_vendor?: SortOrder
    telephone?: SortOrder
  }

  export type vendorsMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    email?: SortOrder
    contact_person?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    name_vendor?: SortOrder
    telephone?: SortOrder
  }

  export type vendorsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type alert_eventsCreateNestedManyWithoutAlertInput = {
    create?: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput> | alert_eventsCreateWithoutAlertInput[] | alert_eventsUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutAlertInput | alert_eventsCreateOrConnectWithoutAlertInput[]
    createMany?: alert_eventsCreateManyAlertInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type alert_eventsUncheckedCreateNestedManyWithoutAlertInput = {
    create?: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput> | alert_eventsCreateWithoutAlertInput[] | alert_eventsUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutAlertInput | alert_eventsCreateOrConnectWithoutAlertInput[]
    createMany?: alert_eventsCreateManyAlertInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type alert_eventsUpdateManyWithoutAlertNestedInput = {
    create?: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput> | alert_eventsCreateWithoutAlertInput[] | alert_eventsUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutAlertInput | alert_eventsCreateOrConnectWithoutAlertInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutAlertInput | alert_eventsUpsertWithWhereUniqueWithoutAlertInput[]
    createMany?: alert_eventsCreateManyAlertInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutAlertInput | alert_eventsUpdateWithWhereUniqueWithoutAlertInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutAlertInput | alert_eventsUpdateManyWithWhereWithoutAlertInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type alert_eventsUncheckedUpdateManyWithoutAlertNestedInput = {
    create?: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput> | alert_eventsCreateWithoutAlertInput[] | alert_eventsUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutAlertInput | alert_eventsCreateOrConnectWithoutAlertInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutAlertInput | alert_eventsUpsertWithWhereUniqueWithoutAlertInput[]
    createMany?: alert_eventsCreateManyAlertInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutAlertInput | alert_eventsUpdateWithWhereUniqueWithoutAlertInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutAlertInput | alert_eventsUpdateManyWithWhereWithoutAlertInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type alertCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: alertCreateOrConnectWithoutAlert_eventsInput
    connect?: alertWhereUniqueInput
  }

  export type deviceCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<deviceCreateWithoutAlert_eventsInput, deviceUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: deviceCreateOrConnectWithoutAlert_eventsInput
    connect?: deviceWhereUniqueInput
  }

  export type sensorCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<sensorCreateWithoutAlert_eventsInput, sensorUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: sensorCreateOrConnectWithoutAlert_eventsInput
    connect?: sensorWhereUniqueInput
  }

  export type truckCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: truckCreateOrConnectWithoutAlert_eventsInput
    connect?: truckWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type alertUpdateOneRequiredWithoutAlert_eventsNestedInput = {
    create?: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: alertCreateOrConnectWithoutAlert_eventsInput
    upsert?: alertUpsertWithoutAlert_eventsInput
    connect?: alertWhereUniqueInput
    update?: XOR<XOR<alertUpdateToOneWithWhereWithoutAlert_eventsInput, alertUpdateWithoutAlert_eventsInput>, alertUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type deviceUpdateOneWithoutAlert_eventsNestedInput = {
    create?: XOR<deviceCreateWithoutAlert_eventsInput, deviceUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: deviceCreateOrConnectWithoutAlert_eventsInput
    upsert?: deviceUpsertWithoutAlert_eventsInput
    disconnect?: deviceWhereInput | boolean
    delete?: deviceWhereInput | boolean
    connect?: deviceWhereUniqueInput
    update?: XOR<XOR<deviceUpdateToOneWithWhereWithoutAlert_eventsInput, deviceUpdateWithoutAlert_eventsInput>, deviceUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type sensorUpdateOneWithoutAlert_eventsNestedInput = {
    create?: XOR<sensorCreateWithoutAlert_eventsInput, sensorUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: sensorCreateOrConnectWithoutAlert_eventsInput
    upsert?: sensorUpsertWithoutAlert_eventsInput
    disconnect?: sensorWhereInput | boolean
    delete?: sensorWhereInput | boolean
    connect?: sensorWhereUniqueInput
    update?: XOR<XOR<sensorUpdateToOneWithWhereWithoutAlert_eventsInput, sensorUpdateWithoutAlert_eventsInput>, sensorUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type truckUpdateOneWithoutAlert_eventsNestedInput = {
    create?: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>
    connectOrCreate?: truckCreateOrConnectWithoutAlert_eventsInput
    upsert?: truckUpsertWithoutAlert_eventsInput
    disconnect?: truckWhereInput | boolean
    delete?: truckWhereInput | boolean
    connect?: truckWhereUniqueInput
    update?: XOR<XOR<truckUpdateToOneWithWhereWithoutAlert_eventsInput, truckUpdateWithoutAlert_eventsInput>, truckUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type alert_eventsCreateNestedManyWithoutDeviceInput = {
    create?: XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput> | alert_eventsCreateWithoutDeviceInput[] | alert_eventsUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutDeviceInput | alert_eventsCreateOrConnectWithoutDeviceInput[]
    createMany?: alert_eventsCreateManyDeviceInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type truckCreateNestedOneWithoutDeviceInput = {
    create?: XOR<truckCreateWithoutDeviceInput, truckUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: truckCreateOrConnectWithoutDeviceInput
    connect?: truckWhereUniqueInput
  }

  export type locationCreateNestedManyWithoutDeviceInput = {
    create?: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput> | locationCreateWithoutDeviceInput[] | locationUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: locationCreateOrConnectWithoutDeviceInput | locationCreateOrConnectWithoutDeviceInput[]
    createMany?: locationCreateManyDeviceInputEnvelope
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
  }

  export type sensorCreateNestedManyWithoutDeviceInput = {
    create?: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput> | sensorCreateWithoutDeviceInput[] | sensorUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensorCreateOrConnectWithoutDeviceInput | sensorCreateOrConnectWithoutDeviceInput[]
    createMany?: sensorCreateManyDeviceInputEnvelope
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
  }

  export type sensor_historyCreateNestedManyWithoutDeviceInput = {
    create?: XOR<sensor_historyCreateWithoutDeviceInput, sensor_historyUncheckedCreateWithoutDeviceInput> | sensor_historyCreateWithoutDeviceInput[] | sensor_historyUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutDeviceInput | sensor_historyCreateOrConnectWithoutDeviceInput[]
    createMany?: sensor_historyCreateManyDeviceInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type alert_eventsUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput> | alert_eventsCreateWithoutDeviceInput[] | alert_eventsUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutDeviceInput | alert_eventsCreateOrConnectWithoutDeviceInput[]
    createMany?: alert_eventsCreateManyDeviceInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type locationUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput> | locationCreateWithoutDeviceInput[] | locationUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: locationCreateOrConnectWithoutDeviceInput | locationCreateOrConnectWithoutDeviceInput[]
    createMany?: locationCreateManyDeviceInputEnvelope
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
  }

  export type sensorUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput> | sensorCreateWithoutDeviceInput[] | sensorUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensorCreateOrConnectWithoutDeviceInput | sensorCreateOrConnectWithoutDeviceInput[]
    createMany?: sensorCreateManyDeviceInputEnvelope
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
  }

  export type sensor_historyUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<sensor_historyCreateWithoutDeviceInput, sensor_historyUncheckedCreateWithoutDeviceInput> | sensor_historyCreateWithoutDeviceInput[] | sensor_historyUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutDeviceInput | sensor_historyCreateOrConnectWithoutDeviceInput[]
    createMany?: sensor_historyCreateManyDeviceInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type alert_eventsUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput> | alert_eventsCreateWithoutDeviceInput[] | alert_eventsUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutDeviceInput | alert_eventsCreateOrConnectWithoutDeviceInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutDeviceInput | alert_eventsUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: alert_eventsCreateManyDeviceInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutDeviceInput | alert_eventsUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutDeviceInput | alert_eventsUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type truckUpdateOneRequiredWithoutDeviceNestedInput = {
    create?: XOR<truckCreateWithoutDeviceInput, truckUncheckedCreateWithoutDeviceInput>
    connectOrCreate?: truckCreateOrConnectWithoutDeviceInput
    upsert?: truckUpsertWithoutDeviceInput
    connect?: truckWhereUniqueInput
    update?: XOR<XOR<truckUpdateToOneWithWhereWithoutDeviceInput, truckUpdateWithoutDeviceInput>, truckUncheckedUpdateWithoutDeviceInput>
  }

  export type locationUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput> | locationCreateWithoutDeviceInput[] | locationUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: locationCreateOrConnectWithoutDeviceInput | locationCreateOrConnectWithoutDeviceInput[]
    upsert?: locationUpsertWithWhereUniqueWithoutDeviceInput | locationUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: locationCreateManyDeviceInputEnvelope
    set?: locationWhereUniqueInput | locationWhereUniqueInput[]
    disconnect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    delete?: locationWhereUniqueInput | locationWhereUniqueInput[]
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    update?: locationUpdateWithWhereUniqueWithoutDeviceInput | locationUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: locationUpdateManyWithWhereWithoutDeviceInput | locationUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: locationScalarWhereInput | locationScalarWhereInput[]
  }

  export type sensorUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput> | sensorCreateWithoutDeviceInput[] | sensorUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensorCreateOrConnectWithoutDeviceInput | sensorCreateOrConnectWithoutDeviceInput[]
    upsert?: sensorUpsertWithWhereUniqueWithoutDeviceInput | sensorUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: sensorCreateManyDeviceInputEnvelope
    set?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    disconnect?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    delete?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    update?: sensorUpdateWithWhereUniqueWithoutDeviceInput | sensorUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: sensorUpdateManyWithWhereWithoutDeviceInput | sensorUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: sensorScalarWhereInput | sensorScalarWhereInput[]
  }

  export type sensor_historyUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<sensor_historyCreateWithoutDeviceInput, sensor_historyUncheckedCreateWithoutDeviceInput> | sensor_historyCreateWithoutDeviceInput[] | sensor_historyUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutDeviceInput | sensor_historyCreateOrConnectWithoutDeviceInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutDeviceInput | sensor_historyUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: sensor_historyCreateManyDeviceInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutDeviceInput | sensor_historyUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutDeviceInput | sensor_historyUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput> | alert_eventsCreateWithoutDeviceInput[] | alert_eventsUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutDeviceInput | alert_eventsCreateOrConnectWithoutDeviceInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutDeviceInput | alert_eventsUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: alert_eventsCreateManyDeviceInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutDeviceInput | alert_eventsUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutDeviceInput | alert_eventsUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type locationUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput> | locationCreateWithoutDeviceInput[] | locationUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: locationCreateOrConnectWithoutDeviceInput | locationCreateOrConnectWithoutDeviceInput[]
    upsert?: locationUpsertWithWhereUniqueWithoutDeviceInput | locationUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: locationCreateManyDeviceInputEnvelope
    set?: locationWhereUniqueInput | locationWhereUniqueInput[]
    disconnect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    delete?: locationWhereUniqueInput | locationWhereUniqueInput[]
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    update?: locationUpdateWithWhereUniqueWithoutDeviceInput | locationUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: locationUpdateManyWithWhereWithoutDeviceInput | locationUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: locationScalarWhereInput | locationScalarWhereInput[]
  }

  export type sensorUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput> | sensorCreateWithoutDeviceInput[] | sensorUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensorCreateOrConnectWithoutDeviceInput | sensorCreateOrConnectWithoutDeviceInput[]
    upsert?: sensorUpsertWithWhereUniqueWithoutDeviceInput | sensorUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: sensorCreateManyDeviceInputEnvelope
    set?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    disconnect?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    delete?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[]
    update?: sensorUpdateWithWhereUniqueWithoutDeviceInput | sensorUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: sensorUpdateManyWithWhereWithoutDeviceInput | sensorUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: sensorScalarWhereInput | sensorScalarWhereInput[]
  }

  export type sensor_historyUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<sensor_historyCreateWithoutDeviceInput, sensor_historyUncheckedCreateWithoutDeviceInput> | sensor_historyCreateWithoutDeviceInput[] | sensor_historyUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutDeviceInput | sensor_historyCreateOrConnectWithoutDeviceInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutDeviceInput | sensor_historyUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: sensor_historyCreateManyDeviceInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutDeviceInput | sensor_historyUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutDeviceInput | sensor_historyUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type vendorsCreateNestedOneWithoutDriversInput = {
    create?: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>
    connectOrCreate?: vendorsCreateOrConnectWithoutDriversInput
    connect?: vendorsWhereUniqueInput
  }

  export type truckCreateNestedManyWithoutDriversInput = {
    create?: XOR<truckCreateWithoutDriversInput, truckUncheckedCreateWithoutDriversInput> | truckCreateWithoutDriversInput[] | truckUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: truckCreateOrConnectWithoutDriversInput | truckCreateOrConnectWithoutDriversInput[]
    createMany?: truckCreateManyDriversInputEnvelope
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
  }

  export type truckUncheckedCreateNestedManyWithoutDriversInput = {
    create?: XOR<truckCreateWithoutDriversInput, truckUncheckedCreateWithoutDriversInput> | truckCreateWithoutDriversInput[] | truckUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: truckCreateOrConnectWithoutDriversInput | truckCreateOrConnectWithoutDriversInput[]
    createMany?: truckCreateManyDriversInputEnvelope
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
  }

  export type vendorsUpdateOneWithoutDriversNestedInput = {
    create?: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>
    connectOrCreate?: vendorsCreateOrConnectWithoutDriversInput
    upsert?: vendorsUpsertWithoutDriversInput
    disconnect?: vendorsWhereInput | boolean
    delete?: vendorsWhereInput | boolean
    connect?: vendorsWhereUniqueInput
    update?: XOR<XOR<vendorsUpdateToOneWithWhereWithoutDriversInput, vendorsUpdateWithoutDriversInput>, vendorsUncheckedUpdateWithoutDriversInput>
  }

  export type truckUpdateManyWithoutDriversNestedInput = {
    create?: XOR<truckCreateWithoutDriversInput, truckUncheckedCreateWithoutDriversInput> | truckCreateWithoutDriversInput[] | truckUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: truckCreateOrConnectWithoutDriversInput | truckCreateOrConnectWithoutDriversInput[]
    upsert?: truckUpsertWithWhereUniqueWithoutDriversInput | truckUpsertWithWhereUniqueWithoutDriversInput[]
    createMany?: truckCreateManyDriversInputEnvelope
    set?: truckWhereUniqueInput | truckWhereUniqueInput[]
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[]
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    update?: truckUpdateWithWhereUniqueWithoutDriversInput | truckUpdateWithWhereUniqueWithoutDriversInput[]
    updateMany?: truckUpdateManyWithWhereWithoutDriversInput | truckUpdateManyWithWhereWithoutDriversInput[]
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[]
  }

  export type truckUncheckedUpdateManyWithoutDriversNestedInput = {
    create?: XOR<truckCreateWithoutDriversInput, truckUncheckedCreateWithoutDriversInput> | truckCreateWithoutDriversInput[] | truckUncheckedCreateWithoutDriversInput[]
    connectOrCreate?: truckCreateOrConnectWithoutDriversInput | truckCreateOrConnectWithoutDriversInput[]
    upsert?: truckUpsertWithWhereUniqueWithoutDriversInput | truckUpsertWithWhereUniqueWithoutDriversInput[]
    createMany?: truckCreateManyDriversInputEnvelope
    set?: truckWhereUniqueInput | truckWhereUniqueInput[]
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[]
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    update?: truckUpdateWithWhereUniqueWithoutDriversInput | truckUpdateWithWhereUniqueWithoutDriversInput[]
    updateMany?: truckUpdateManyWithWhereWithoutDriversInput | truckUpdateManyWithWhereWithoutDriversInput[]
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[]
  }

  export type deviceCreateNestedOneWithoutLocationInput = {
    create?: XOR<deviceCreateWithoutLocationInput, deviceUncheckedCreateWithoutLocationInput>
    connectOrCreate?: deviceCreateOrConnectWithoutLocationInput
    connect?: deviceWhereUniqueInput
  }

  export type truckCreateNestedOneWithoutLocationInput = {
    create?: XOR<truckCreateWithoutLocationInput, truckUncheckedCreateWithoutLocationInput>
    connectOrCreate?: truckCreateOrConnectWithoutLocationInput
    connect?: truckWhereUniqueInput
  }

  export type sensor_historyCreateNestedManyWithoutLocationInput = {
    create?: XOR<sensor_historyCreateWithoutLocationInput, sensor_historyUncheckedCreateWithoutLocationInput> | sensor_historyCreateWithoutLocationInput[] | sensor_historyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutLocationInput | sensor_historyCreateOrConnectWithoutLocationInput[]
    createMany?: sensor_historyCreateManyLocationInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type sensor_historyUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<sensor_historyCreateWithoutLocationInput, sensor_historyUncheckedCreateWithoutLocationInput> | sensor_historyCreateWithoutLocationInput[] | sensor_historyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutLocationInput | sensor_historyCreateOrConnectWithoutLocationInput[]
    createMany?: sensor_historyCreateManyLocationInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type deviceUpdateOneRequiredWithoutLocationNestedInput = {
    create?: XOR<deviceCreateWithoutLocationInput, deviceUncheckedCreateWithoutLocationInput>
    connectOrCreate?: deviceCreateOrConnectWithoutLocationInput
    upsert?: deviceUpsertWithoutLocationInput
    connect?: deviceWhereUniqueInput
    update?: XOR<XOR<deviceUpdateToOneWithWhereWithoutLocationInput, deviceUpdateWithoutLocationInput>, deviceUncheckedUpdateWithoutLocationInput>
  }

  export type truckUpdateOneWithoutLocationNestedInput = {
    create?: XOR<truckCreateWithoutLocationInput, truckUncheckedCreateWithoutLocationInput>
    connectOrCreate?: truckCreateOrConnectWithoutLocationInput
    upsert?: truckUpsertWithoutLocationInput
    disconnect?: truckWhereInput | boolean
    delete?: truckWhereInput | boolean
    connect?: truckWhereUniqueInput
    update?: XOR<XOR<truckUpdateToOneWithWhereWithoutLocationInput, truckUpdateWithoutLocationInput>, truckUncheckedUpdateWithoutLocationInput>
  }

  export type sensor_historyUpdateManyWithoutLocationNestedInput = {
    create?: XOR<sensor_historyCreateWithoutLocationInput, sensor_historyUncheckedCreateWithoutLocationInput> | sensor_historyCreateWithoutLocationInput[] | sensor_historyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutLocationInput | sensor_historyCreateOrConnectWithoutLocationInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutLocationInput | sensor_historyUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: sensor_historyCreateManyLocationInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutLocationInput | sensor_historyUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutLocationInput | sensor_historyUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type sensor_historyUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<sensor_historyCreateWithoutLocationInput, sensor_historyUncheckedCreateWithoutLocationInput> | sensor_historyCreateWithoutLocationInput[] | sensor_historyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutLocationInput | sensor_historyCreateOrConnectWithoutLocationInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutLocationInput | sensor_historyUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: sensor_historyCreateManyLocationInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutLocationInput | sensor_historyUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutLocationInput | sensor_historyUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type alert_eventsCreateNestedManyWithoutSensorInput = {
    create?: XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput> | alert_eventsCreateWithoutSensorInput[] | alert_eventsUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutSensorInput | alert_eventsCreateOrConnectWithoutSensorInput[]
    createMany?: alert_eventsCreateManySensorInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type sensor_historyCreateNestedManyWithoutSensorInput = {
    create?: XOR<sensor_historyCreateWithoutSensorInput, sensor_historyUncheckedCreateWithoutSensorInput> | sensor_historyCreateWithoutSensorInput[] | sensor_historyUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutSensorInput | sensor_historyCreateOrConnectWithoutSensorInput[]
    createMany?: sensor_historyCreateManySensorInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type deviceCreateNestedOneWithoutSensorInput = {
    create?: XOR<deviceCreateWithoutSensorInput, deviceUncheckedCreateWithoutSensorInput>
    connectOrCreate?: deviceCreateOrConnectWithoutSensorInput
    connect?: deviceWhereUniqueInput
  }

  export type alert_eventsUncheckedCreateNestedManyWithoutSensorInput = {
    create?: XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput> | alert_eventsCreateWithoutSensorInput[] | alert_eventsUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutSensorInput | alert_eventsCreateOrConnectWithoutSensorInput[]
    createMany?: alert_eventsCreateManySensorInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type sensor_historyUncheckedCreateNestedManyWithoutSensorInput = {
    create?: XOR<sensor_historyCreateWithoutSensorInput, sensor_historyUncheckedCreateWithoutSensorInput> | sensor_historyCreateWithoutSensorInput[] | sensor_historyUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutSensorInput | sensor_historyCreateOrConnectWithoutSensorInput[]
    createMany?: sensor_historyCreateManySensorInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type alert_eventsUpdateManyWithoutSensorNestedInput = {
    create?: XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput> | alert_eventsCreateWithoutSensorInput[] | alert_eventsUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutSensorInput | alert_eventsCreateOrConnectWithoutSensorInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutSensorInput | alert_eventsUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: alert_eventsCreateManySensorInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutSensorInput | alert_eventsUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutSensorInput | alert_eventsUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type sensor_historyUpdateManyWithoutSensorNestedInput = {
    create?: XOR<sensor_historyCreateWithoutSensorInput, sensor_historyUncheckedCreateWithoutSensorInput> | sensor_historyCreateWithoutSensorInput[] | sensor_historyUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutSensorInput | sensor_historyCreateOrConnectWithoutSensorInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutSensorInput | sensor_historyUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: sensor_historyCreateManySensorInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutSensorInput | sensor_historyUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutSensorInput | sensor_historyUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type deviceUpdateOneRequiredWithoutSensorNestedInput = {
    create?: XOR<deviceCreateWithoutSensorInput, deviceUncheckedCreateWithoutSensorInput>
    connectOrCreate?: deviceCreateOrConnectWithoutSensorInput
    upsert?: deviceUpsertWithoutSensorInput
    connect?: deviceWhereUniqueInput
    update?: XOR<XOR<deviceUpdateToOneWithWhereWithoutSensorInput, deviceUpdateWithoutSensorInput>, deviceUncheckedUpdateWithoutSensorInput>
  }

  export type alert_eventsUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput> | alert_eventsCreateWithoutSensorInput[] | alert_eventsUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutSensorInput | alert_eventsCreateOrConnectWithoutSensorInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutSensorInput | alert_eventsUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: alert_eventsCreateManySensorInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutSensorInput | alert_eventsUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutSensorInput | alert_eventsUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type sensor_historyUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<sensor_historyCreateWithoutSensorInput, sensor_historyUncheckedCreateWithoutSensorInput> | sensor_historyCreateWithoutSensorInput[] | sensor_historyUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutSensorInput | sensor_historyCreateOrConnectWithoutSensorInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutSensorInput | sensor_historyUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: sensor_historyCreateManySensorInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutSensorInput | sensor_historyUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutSensorInput | sensor_historyUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type locationCreateNestedOneWithoutSensor_historyInput = {
    create?: XOR<locationCreateWithoutSensor_historyInput, locationUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: locationCreateOrConnectWithoutSensor_historyInput
    connect?: locationWhereUniqueInput
  }

  export type sensorCreateNestedOneWithoutSensor_historyInput = {
    create?: XOR<sensorCreateWithoutSensor_historyInput, sensorUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: sensorCreateOrConnectWithoutSensor_historyInput
    connect?: sensorWhereUniqueInput
  }

  export type deviceCreateNestedOneWithoutSensor_historyInput = {
    create?: XOR<deviceCreateWithoutSensor_historyInput, deviceUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: deviceCreateOrConnectWithoutSensor_historyInput
    connect?: deviceWhereUniqueInput
  }

  export type truckCreateNestedOneWithoutSensor_historyInput = {
    create?: XOR<truckCreateWithoutSensor_historyInput, truckUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: truckCreateOrConnectWithoutSensor_historyInput
    connect?: truckWhereUniqueInput
  }

  export type locationUpdateOneRequiredWithoutSensor_historyNestedInput = {
    create?: XOR<locationCreateWithoutSensor_historyInput, locationUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: locationCreateOrConnectWithoutSensor_historyInput
    upsert?: locationUpsertWithoutSensor_historyInput
    connect?: locationWhereUniqueInput
    update?: XOR<XOR<locationUpdateToOneWithWhereWithoutSensor_historyInput, locationUpdateWithoutSensor_historyInput>, locationUncheckedUpdateWithoutSensor_historyInput>
  }

  export type sensorUpdateOneWithoutSensor_historyNestedInput = {
    create?: XOR<sensorCreateWithoutSensor_historyInput, sensorUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: sensorCreateOrConnectWithoutSensor_historyInput
    upsert?: sensorUpsertWithoutSensor_historyInput
    disconnect?: sensorWhereInput | boolean
    delete?: sensorWhereInput | boolean
    connect?: sensorWhereUniqueInput
    update?: XOR<XOR<sensorUpdateToOneWithWhereWithoutSensor_historyInput, sensorUpdateWithoutSensor_historyInput>, sensorUncheckedUpdateWithoutSensor_historyInput>
  }

  export type deviceUpdateOneWithoutSensor_historyNestedInput = {
    create?: XOR<deviceCreateWithoutSensor_historyInput, deviceUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: deviceCreateOrConnectWithoutSensor_historyInput
    upsert?: deviceUpsertWithoutSensor_historyInput
    disconnect?: deviceWhereInput | boolean
    delete?: deviceWhereInput | boolean
    connect?: deviceWhereUniqueInput
    update?: XOR<XOR<deviceUpdateToOneWithWhereWithoutSensor_historyInput, deviceUpdateWithoutSensor_historyInput>, deviceUncheckedUpdateWithoutSensor_historyInput>
  }

  export type truckUpdateOneWithoutSensor_historyNestedInput = {
    create?: XOR<truckCreateWithoutSensor_historyInput, truckUncheckedCreateWithoutSensor_historyInput>
    connectOrCreate?: truckCreateOrConnectWithoutSensor_historyInput
    upsert?: truckUpsertWithoutSensor_historyInput
    disconnect?: truckWhereInput | boolean
    delete?: truckWhereInput | boolean
    connect?: truckWhereUniqueInput
    update?: XOR<XOR<truckUpdateToOneWithWhereWithoutSensor_historyInput, truckUpdateWithoutSensor_historyInput>, truckUncheckedUpdateWithoutSensor_historyInput>
  }

  export type alert_eventsCreateNestedManyWithoutTruckInput = {
    create?: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput> | alert_eventsCreateWithoutTruckInput[] | alert_eventsUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutTruckInput | alert_eventsCreateOrConnectWithoutTruckInput[]
    createMany?: alert_eventsCreateManyTruckInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type deviceCreateNestedManyWithoutTruckInput = {
    create?: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput> | deviceCreateWithoutTruckInput[] | deviceUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: deviceCreateOrConnectWithoutTruckInput | deviceCreateOrConnectWithoutTruckInput[]
    createMany?: deviceCreateManyTruckInputEnvelope
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
  }

  export type locationCreateNestedManyWithoutTruckInput = {
    create?: XOR<locationCreateWithoutTruckInput, locationUncheckedCreateWithoutTruckInput> | locationCreateWithoutTruckInput[] | locationUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: locationCreateOrConnectWithoutTruckInput | locationCreateOrConnectWithoutTruckInput[]
    createMany?: locationCreateManyTruckInputEnvelope
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
  }

  export type sensor_historyCreateNestedManyWithoutTruckInput = {
    create?: XOR<sensor_historyCreateWithoutTruckInput, sensor_historyUncheckedCreateWithoutTruckInput> | sensor_historyCreateWithoutTruckInput[] | sensor_historyUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutTruckInput | sensor_historyCreateOrConnectWithoutTruckInput[]
    createMany?: sensor_historyCreateManyTruckInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type driversCreateNestedOneWithoutTruckInput = {
    create?: XOR<driversCreateWithoutTruckInput, driversUncheckedCreateWithoutTruckInput>
    connectOrCreate?: driversCreateOrConnectWithoutTruckInput
    connect?: driversWhereUniqueInput
  }

  export type vendorsCreateNestedOneWithoutTruckInput = {
    create?: XOR<vendorsCreateWithoutTruckInput, vendorsUncheckedCreateWithoutTruckInput>
    connectOrCreate?: vendorsCreateOrConnectWithoutTruckInput
    connect?: vendorsWhereUniqueInput
  }

  export type alert_eventsUncheckedCreateNestedManyWithoutTruckInput = {
    create?: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput> | alert_eventsCreateWithoutTruckInput[] | alert_eventsUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutTruckInput | alert_eventsCreateOrConnectWithoutTruckInput[]
    createMany?: alert_eventsCreateManyTruckInputEnvelope
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
  }

  export type deviceUncheckedCreateNestedManyWithoutTruckInput = {
    create?: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput> | deviceCreateWithoutTruckInput[] | deviceUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: deviceCreateOrConnectWithoutTruckInput | deviceCreateOrConnectWithoutTruckInput[]
    createMany?: deviceCreateManyTruckInputEnvelope
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
  }

  export type locationUncheckedCreateNestedManyWithoutTruckInput = {
    create?: XOR<locationCreateWithoutTruckInput, locationUncheckedCreateWithoutTruckInput> | locationCreateWithoutTruckInput[] | locationUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: locationCreateOrConnectWithoutTruckInput | locationCreateOrConnectWithoutTruckInput[]
    createMany?: locationCreateManyTruckInputEnvelope
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
  }

  export type sensor_historyUncheckedCreateNestedManyWithoutTruckInput = {
    create?: XOR<sensor_historyCreateWithoutTruckInput, sensor_historyUncheckedCreateWithoutTruckInput> | sensor_historyCreateWithoutTruckInput[] | sensor_historyUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutTruckInput | sensor_historyCreateOrConnectWithoutTruckInput[]
    createMany?: sensor_historyCreateManyTruckInputEnvelope
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
  }

  export type alert_eventsUpdateManyWithoutTruckNestedInput = {
    create?: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput> | alert_eventsCreateWithoutTruckInput[] | alert_eventsUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutTruckInput | alert_eventsCreateOrConnectWithoutTruckInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutTruckInput | alert_eventsUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: alert_eventsCreateManyTruckInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutTruckInput | alert_eventsUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutTruckInput | alert_eventsUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type deviceUpdateManyWithoutTruckNestedInput = {
    create?: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput> | deviceCreateWithoutTruckInput[] | deviceUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: deviceCreateOrConnectWithoutTruckInput | deviceCreateOrConnectWithoutTruckInput[]
    upsert?: deviceUpsertWithWhereUniqueWithoutTruckInput | deviceUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: deviceCreateManyTruckInputEnvelope
    set?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    disconnect?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    delete?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    update?: deviceUpdateWithWhereUniqueWithoutTruckInput | deviceUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: deviceUpdateManyWithWhereWithoutTruckInput | deviceUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: deviceScalarWhereInput | deviceScalarWhereInput[]
  }

  export type locationUpdateManyWithoutTruckNestedInput = {
    create?: XOR<locationCreateWithoutTruckInput, locationUncheckedCreateWithoutTruckInput> | locationCreateWithoutTruckInput[] | locationUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: locationCreateOrConnectWithoutTruckInput | locationCreateOrConnectWithoutTruckInput[]
    upsert?: locationUpsertWithWhereUniqueWithoutTruckInput | locationUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: locationCreateManyTruckInputEnvelope
    set?: locationWhereUniqueInput | locationWhereUniqueInput[]
    disconnect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    delete?: locationWhereUniqueInput | locationWhereUniqueInput[]
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    update?: locationUpdateWithWhereUniqueWithoutTruckInput | locationUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: locationUpdateManyWithWhereWithoutTruckInput | locationUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: locationScalarWhereInput | locationScalarWhereInput[]
  }

  export type sensor_historyUpdateManyWithoutTruckNestedInput = {
    create?: XOR<sensor_historyCreateWithoutTruckInput, sensor_historyUncheckedCreateWithoutTruckInput> | sensor_historyCreateWithoutTruckInput[] | sensor_historyUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutTruckInput | sensor_historyCreateOrConnectWithoutTruckInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutTruckInput | sensor_historyUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: sensor_historyCreateManyTruckInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutTruckInput | sensor_historyUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutTruckInput | sensor_historyUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type driversUpdateOneWithoutTruckNestedInput = {
    create?: XOR<driversCreateWithoutTruckInput, driversUncheckedCreateWithoutTruckInput>
    connectOrCreate?: driversCreateOrConnectWithoutTruckInput
    upsert?: driversUpsertWithoutTruckInput
    disconnect?: driversWhereInput | boolean
    delete?: driversWhereInput | boolean
    connect?: driversWhereUniqueInput
    update?: XOR<XOR<driversUpdateToOneWithWhereWithoutTruckInput, driversUpdateWithoutTruckInput>, driversUncheckedUpdateWithoutTruckInput>
  }

  export type vendorsUpdateOneWithoutTruckNestedInput = {
    create?: XOR<vendorsCreateWithoutTruckInput, vendorsUncheckedCreateWithoutTruckInput>
    connectOrCreate?: vendorsCreateOrConnectWithoutTruckInput
    upsert?: vendorsUpsertWithoutTruckInput
    disconnect?: vendorsWhereInput | boolean
    delete?: vendorsWhereInput | boolean
    connect?: vendorsWhereUniqueInput
    update?: XOR<XOR<vendorsUpdateToOneWithWhereWithoutTruckInput, vendorsUpdateWithoutTruckInput>, vendorsUncheckedUpdateWithoutTruckInput>
  }

  export type alert_eventsUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput> | alert_eventsCreateWithoutTruckInput[] | alert_eventsUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: alert_eventsCreateOrConnectWithoutTruckInput | alert_eventsCreateOrConnectWithoutTruckInput[]
    upsert?: alert_eventsUpsertWithWhereUniqueWithoutTruckInput | alert_eventsUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: alert_eventsCreateManyTruckInputEnvelope
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[]
    update?: alert_eventsUpdateWithWhereUniqueWithoutTruckInput | alert_eventsUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: alert_eventsUpdateManyWithWhereWithoutTruckInput | alert_eventsUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
  }

  export type deviceUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput> | deviceCreateWithoutTruckInput[] | deviceUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: deviceCreateOrConnectWithoutTruckInput | deviceCreateOrConnectWithoutTruckInput[]
    upsert?: deviceUpsertWithWhereUniqueWithoutTruckInput | deviceUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: deviceCreateManyTruckInputEnvelope
    set?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    disconnect?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    delete?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[]
    update?: deviceUpdateWithWhereUniqueWithoutTruckInput | deviceUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: deviceUpdateManyWithWhereWithoutTruckInput | deviceUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: deviceScalarWhereInput | deviceScalarWhereInput[]
  }

  export type locationUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: XOR<locationCreateWithoutTruckInput, locationUncheckedCreateWithoutTruckInput> | locationCreateWithoutTruckInput[] | locationUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: locationCreateOrConnectWithoutTruckInput | locationCreateOrConnectWithoutTruckInput[]
    upsert?: locationUpsertWithWhereUniqueWithoutTruckInput | locationUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: locationCreateManyTruckInputEnvelope
    set?: locationWhereUniqueInput | locationWhereUniqueInput[]
    disconnect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    delete?: locationWhereUniqueInput | locationWhereUniqueInput[]
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[]
    update?: locationUpdateWithWhereUniqueWithoutTruckInput | locationUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: locationUpdateManyWithWhereWithoutTruckInput | locationUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: locationScalarWhereInput | locationScalarWhereInput[]
  }

  export type sensor_historyUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: XOR<sensor_historyCreateWithoutTruckInput, sensor_historyUncheckedCreateWithoutTruckInput> | sensor_historyCreateWithoutTruckInput[] | sensor_historyUncheckedCreateWithoutTruckInput[]
    connectOrCreate?: sensor_historyCreateOrConnectWithoutTruckInput | sensor_historyCreateOrConnectWithoutTruckInput[]
    upsert?: sensor_historyUpsertWithWhereUniqueWithoutTruckInput | sensor_historyUpsertWithWhereUniqueWithoutTruckInput[]
    createMany?: sensor_historyCreateManyTruckInputEnvelope
    set?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    disconnect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    delete?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    connect?: sensor_historyWhereUniqueInput | sensor_historyWhereUniqueInput[]
    update?: sensor_historyUpdateWithWhereUniqueWithoutTruckInput | sensor_historyUpdateWithWhereUniqueWithoutTruckInput[]
    updateMany?: sensor_historyUpdateManyWithWhereWithoutTruckInput | sensor_historyUpdateManyWithWhereWithoutTruckInput[]
    deleteMany?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type driversCreateNestedManyWithoutVendorsInput = {
    create?: XOR<driversCreateWithoutVendorsInput, driversUncheckedCreateWithoutVendorsInput> | driversCreateWithoutVendorsInput[] | driversUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: driversCreateOrConnectWithoutVendorsInput | driversCreateOrConnectWithoutVendorsInput[]
    createMany?: driversCreateManyVendorsInputEnvelope
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[]
  }

  export type truckCreateNestedManyWithoutVendorsInput = {
    create?: XOR<truckCreateWithoutVendorsInput, truckUncheckedCreateWithoutVendorsInput> | truckCreateWithoutVendorsInput[] | truckUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: truckCreateOrConnectWithoutVendorsInput | truckCreateOrConnectWithoutVendorsInput[]
    createMany?: truckCreateManyVendorsInputEnvelope
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
  }

  export type driversUncheckedCreateNestedManyWithoutVendorsInput = {
    create?: XOR<driversCreateWithoutVendorsInput, driversUncheckedCreateWithoutVendorsInput> | driversCreateWithoutVendorsInput[] | driversUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: driversCreateOrConnectWithoutVendorsInput | driversCreateOrConnectWithoutVendorsInput[]
    createMany?: driversCreateManyVendorsInputEnvelope
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[]
  }

  export type truckUncheckedCreateNestedManyWithoutVendorsInput = {
    create?: XOR<truckCreateWithoutVendorsInput, truckUncheckedCreateWithoutVendorsInput> | truckCreateWithoutVendorsInput[] | truckUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: truckCreateOrConnectWithoutVendorsInput | truckCreateOrConnectWithoutVendorsInput[]
    createMany?: truckCreateManyVendorsInputEnvelope
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
  }

  export type driversUpdateManyWithoutVendorsNestedInput = {
    create?: XOR<driversCreateWithoutVendorsInput, driversUncheckedCreateWithoutVendorsInput> | driversCreateWithoutVendorsInput[] | driversUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: driversCreateOrConnectWithoutVendorsInput | driversCreateOrConnectWithoutVendorsInput[]
    upsert?: driversUpsertWithWhereUniqueWithoutVendorsInput | driversUpsertWithWhereUniqueWithoutVendorsInput[]
    createMany?: driversCreateManyVendorsInputEnvelope
    set?: driversWhereUniqueInput | driversWhereUniqueInput[]
    disconnect?: driversWhereUniqueInput | driversWhereUniqueInput[]
    delete?: driversWhereUniqueInput | driversWhereUniqueInput[]
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[]
    update?: driversUpdateWithWhereUniqueWithoutVendorsInput | driversUpdateWithWhereUniqueWithoutVendorsInput[]
    updateMany?: driversUpdateManyWithWhereWithoutVendorsInput | driversUpdateManyWithWhereWithoutVendorsInput[]
    deleteMany?: driversScalarWhereInput | driversScalarWhereInput[]
  }

  export type truckUpdateManyWithoutVendorsNestedInput = {
    create?: XOR<truckCreateWithoutVendorsInput, truckUncheckedCreateWithoutVendorsInput> | truckCreateWithoutVendorsInput[] | truckUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: truckCreateOrConnectWithoutVendorsInput | truckCreateOrConnectWithoutVendorsInput[]
    upsert?: truckUpsertWithWhereUniqueWithoutVendorsInput | truckUpsertWithWhereUniqueWithoutVendorsInput[]
    createMany?: truckCreateManyVendorsInputEnvelope
    set?: truckWhereUniqueInput | truckWhereUniqueInput[]
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[]
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    update?: truckUpdateWithWhereUniqueWithoutVendorsInput | truckUpdateWithWhereUniqueWithoutVendorsInput[]
    updateMany?: truckUpdateManyWithWhereWithoutVendorsInput | truckUpdateManyWithWhereWithoutVendorsInput[]
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[]
  }

  export type driversUncheckedUpdateManyWithoutVendorsNestedInput = {
    create?: XOR<driversCreateWithoutVendorsInput, driversUncheckedCreateWithoutVendorsInput> | driversCreateWithoutVendorsInput[] | driversUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: driversCreateOrConnectWithoutVendorsInput | driversCreateOrConnectWithoutVendorsInput[]
    upsert?: driversUpsertWithWhereUniqueWithoutVendorsInput | driversUpsertWithWhereUniqueWithoutVendorsInput[]
    createMany?: driversCreateManyVendorsInputEnvelope
    set?: driversWhereUniqueInput | driversWhereUniqueInput[]
    disconnect?: driversWhereUniqueInput | driversWhereUniqueInput[]
    delete?: driversWhereUniqueInput | driversWhereUniqueInput[]
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[]
    update?: driversUpdateWithWhereUniqueWithoutVendorsInput | driversUpdateWithWhereUniqueWithoutVendorsInput[]
    updateMany?: driversUpdateManyWithWhereWithoutVendorsInput | driversUpdateManyWithWhereWithoutVendorsInput[]
    deleteMany?: driversScalarWhereInput | driversScalarWhereInput[]
  }

  export type truckUncheckedUpdateManyWithoutVendorsNestedInput = {
    create?: XOR<truckCreateWithoutVendorsInput, truckUncheckedCreateWithoutVendorsInput> | truckCreateWithoutVendorsInput[] | truckUncheckedCreateWithoutVendorsInput[]
    connectOrCreate?: truckCreateOrConnectWithoutVendorsInput | truckCreateOrConnectWithoutVendorsInput[]
    upsert?: truckUpsertWithWhereUniqueWithoutVendorsInput | truckUpsertWithWhereUniqueWithoutVendorsInput[]
    createMany?: truckCreateManyVendorsInputEnvelope
    set?: truckWhereUniqueInput | truckWhereUniqueInput[]
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[]
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[]
    update?: truckUpdateWithWhereUniqueWithoutVendorsInput | truckUpdateWithWhereUniqueWithoutVendorsInput[]
    updateMany?: truckUpdateManyWithWhereWithoutVendorsInput | truckUpdateManyWithWhereWithoutVendorsInput[]
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type alert_eventsCreateWithoutAlertInput = {
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
    device?: deviceCreateNestedOneWithoutAlert_eventsInput
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput
    truck?: truckCreateNestedOneWithoutAlert_eventsInput
  }

  export type alert_eventsUncheckedCreateWithoutAlertInput = {
    id?: number
    device_id?: number | null
    sensor_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsCreateOrConnectWithoutAlertInput = {
    where: alert_eventsWhereUniqueInput
    create: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>
  }

  export type alert_eventsCreateManyAlertInputEnvelope = {
    data: alert_eventsCreateManyAlertInput | alert_eventsCreateManyAlertInput[]
    skipDuplicates?: boolean
  }

  export type alert_eventsUpsertWithWhereUniqueWithoutAlertInput = {
    where: alert_eventsWhereUniqueInput
    update: XOR<alert_eventsUpdateWithoutAlertInput, alert_eventsUncheckedUpdateWithoutAlertInput>
    create: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>
  }

  export type alert_eventsUpdateWithWhereUniqueWithoutAlertInput = {
    where: alert_eventsWhereUniqueInput
    data: XOR<alert_eventsUpdateWithoutAlertInput, alert_eventsUncheckedUpdateWithoutAlertInput>
  }

  export type alert_eventsUpdateManyWithWhereWithoutAlertInput = {
    where: alert_eventsScalarWhereInput
    data: XOR<alert_eventsUpdateManyMutationInput, alert_eventsUncheckedUpdateManyWithoutAlertInput>
  }

  export type alert_eventsScalarWhereInput = {
    AND?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
    OR?: alert_eventsScalarWhereInput[]
    NOT?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[]
    id?: IntFilter<"alert_events"> | number
    alert_id?: IntFilter<"alert_events"> | number
    device_id?: IntNullableFilter<"alert_events"> | number | null
    sensor_id?: IntNullableFilter<"alert_events"> | number | null
    truck_id?: IntNullableFilter<"alert_events"> | number | null
    value?: FloatNullableFilter<"alert_events"> | number | null
    message?: StringNullableFilter<"alert_events"> | string | null
    status?: StringFilter<"alert_events"> | string
    alert_code?: StringNullableFilter<"alert_events"> | string | null
    alert_name?: StringNullableFilter<"alert_events"> | string | null
    alert_severity?: StringNullableFilter<"alert_events"> | string | null
    truck_plate?: StringNullableFilter<"alert_events"> | string | null
    truck_name?: StringNullableFilter<"alert_events"> | string | null
    truck_vin?: StringNullableFilter<"alert_events"> | string | null
    device_sn?: StringNullableFilter<"alert_events"> | string | null
    sensor_sn?: StringNullableFilter<"alert_events"> | string | null
    sensor_tire_no?: IntNullableFilter<"alert_events"> | number | null
    driver_name?: StringNullableFilter<"alert_events"> | string | null
    vendor_name?: StringNullableFilter<"alert_events"> | string | null
    created_at?: DateTimeFilter<"alert_events"> | Date | string
    resolved_at?: DateTimeNullableFilter<"alert_events"> | Date | string | null
  }

  export type alertCreateWithoutAlert_eventsInput = {
    code: string
    name: string
    description?: string | null
    severity?: string
    threshold_min?: number | null
    threshold_max?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type alertUncheckedCreateWithoutAlert_eventsInput = {
    id?: number
    code: string
    name: string
    description?: string | null
    severity?: string
    threshold_min?: number | null
    threshold_max?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type alertCreateOrConnectWithoutAlert_eventsInput = {
    where: alertWhereUniqueInput
    create: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>
  }

  export type deviceCreateWithoutAlert_eventsInput = {
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    truck: truckCreateNestedOneWithoutDeviceInput
    location?: locationCreateNestedManyWithoutDeviceInput
    sensor?: sensorCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyCreateNestedManyWithoutDeviceInput
  }

  export type deviceUncheckedCreateWithoutAlert_eventsInput = {
    id?: number
    truck_id: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    location?: locationUncheckedCreateNestedManyWithoutDeviceInput
    sensor?: sensorUncheckedCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type deviceCreateOrConnectWithoutAlert_eventsInput = {
    where: deviceWhereUniqueInput
    create: XOR<deviceCreateWithoutAlert_eventsInput, deviceUncheckedCreateWithoutAlert_eventsInput>
  }

  export type sensorCreateWithoutAlert_eventsInput = {
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    sensor_history?: sensor_historyCreateNestedManyWithoutSensorInput
    device: deviceCreateNestedOneWithoutSensorInput
  }

  export type sensorUncheckedCreateWithoutAlert_eventsInput = {
    id?: number
    device_id: number
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutSensorInput
  }

  export type sensorCreateOrConnectWithoutAlert_eventsInput = {
    where: sensorWhereUniqueInput
    create: XOR<sensorCreateWithoutAlert_eventsInput, sensorUncheckedCreateWithoutAlert_eventsInput>
  }

  export type truckCreateWithoutAlert_eventsInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    device?: deviceCreateNestedManyWithoutTruckInput
    location?: locationCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyCreateNestedManyWithoutTruckInput
    drivers?: driversCreateNestedOneWithoutTruckInput
    vendors?: vendorsCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateWithoutAlert_eventsInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    device?: deviceUncheckedCreateNestedManyWithoutTruckInput
    location?: locationUncheckedCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckCreateOrConnectWithoutAlert_eventsInput = {
    where: truckWhereUniqueInput
    create: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>
  }

  export type alertUpsertWithoutAlert_eventsInput = {
    update: XOR<alertUpdateWithoutAlert_eventsInput, alertUncheckedUpdateWithoutAlert_eventsInput>
    create: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>
    where?: alertWhereInput
  }

  export type alertUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: alertWhereInput
    data: XOR<alertUpdateWithoutAlert_eventsInput, alertUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type alertUpdateWithoutAlert_eventsInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: StringFieldUpdateOperationsInput | string
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alertUncheckedUpdateWithoutAlert_eventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    severity?: StringFieldUpdateOperationsInput | string
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type deviceUpsertWithoutAlert_eventsInput = {
    update: XOR<deviceUpdateWithoutAlert_eventsInput, deviceUncheckedUpdateWithoutAlert_eventsInput>
    create: XOR<deviceCreateWithoutAlert_eventsInput, deviceUncheckedCreateWithoutAlert_eventsInput>
    where?: deviceWhereInput
  }

  export type deviceUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: deviceWhereInput
    data: XOR<deviceUpdateWithoutAlert_eventsInput, deviceUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type deviceUpdateWithoutAlert_eventsInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    truck?: truckUpdateOneRequiredWithoutDeviceNestedInput
    location?: locationUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateWithoutAlert_eventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: locationUncheckedUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUncheckedUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type sensorUpsertWithoutAlert_eventsInput = {
    update: XOR<sensorUpdateWithoutAlert_eventsInput, sensorUncheckedUpdateWithoutAlert_eventsInput>
    create: XOR<sensorCreateWithoutAlert_eventsInput, sensorUncheckedCreateWithoutAlert_eventsInput>
    where?: sensorWhereInput
  }

  export type sensorUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: sensorWhereInput
    data: XOR<sensorUpdateWithoutAlert_eventsInput, sensorUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type sensorUpdateWithoutAlert_eventsInput = {
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sensor_history?: sensor_historyUpdateManyWithoutSensorNestedInput
    device?: deviceUpdateOneRequiredWithoutSensorNestedInput
  }

  export type sensorUncheckedUpdateWithoutAlert_eventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type truckUpsertWithoutAlert_eventsInput = {
    update: XOR<truckUpdateWithoutAlert_eventsInput, truckUncheckedUpdateWithoutAlert_eventsInput>
    create: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>
    where?: truckWhereInput
  }

  export type truckUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: truckWhereInput
    data: XOR<truckUpdateWithoutAlert_eventsInput, truckUncheckedUpdateWithoutAlert_eventsInput>
  }

  export type truckUpdateWithoutAlert_eventsInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: deviceUpdateManyWithoutTruckNestedInput
    location?: locationUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutTruckNestedInput
    drivers?: driversUpdateOneWithoutTruckNestedInput
    vendors?: vendorsUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateWithoutAlert_eventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: deviceUncheckedUpdateManyWithoutTruckNestedInput
    location?: locationUncheckedUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type alert_eventsCreateWithoutDeviceInput = {
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
    alert: alertCreateNestedOneWithoutAlert_eventsInput
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput
    truck?: truckCreateNestedOneWithoutAlert_eventsInput
  }

  export type alert_eventsUncheckedCreateWithoutDeviceInput = {
    id?: number
    alert_id: number
    sensor_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsCreateOrConnectWithoutDeviceInput = {
    where: alert_eventsWhereUniqueInput
    create: XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput>
  }

  export type alert_eventsCreateManyDeviceInputEnvelope = {
    data: alert_eventsCreateManyDeviceInput | alert_eventsCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type truckCreateWithoutDeviceInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput
    location?: locationCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyCreateNestedManyWithoutTruckInput
    drivers?: driversCreateNestedOneWithoutTruckInput
    vendors?: vendorsCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateWithoutDeviceInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput
    location?: locationUncheckedCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckCreateOrConnectWithoutDeviceInput = {
    where: truckWhereUniqueInput
    create: XOR<truckCreateWithoutDeviceInput, truckUncheckedCreateWithoutDeviceInput>
  }

  export type locationCreateWithoutDeviceInput = {
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    truck?: truckCreateNestedOneWithoutLocationInput
    sensor_history?: sensor_historyCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateWithoutDeviceInput = {
    id?: number
    truck_id?: number | null
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationCreateOrConnectWithoutDeviceInput = {
    where: locationWhereUniqueInput
    create: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>
  }

  export type locationCreateManyDeviceInputEnvelope = {
    data: locationCreateManyDeviceInput | locationCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type sensorCreateWithoutDeviceInput = {
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    alert_events?: alert_eventsCreateNestedManyWithoutSensorInput
    sensor_history?: sensor_historyCreateNestedManyWithoutSensorInput
  }

  export type sensorUncheckedCreateWithoutDeviceInput = {
    id?: number
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutSensorInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutSensorInput
  }

  export type sensorCreateOrConnectWithoutDeviceInput = {
    where: sensorWhereUniqueInput
    create: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>
  }

  export type sensorCreateManyDeviceInputEnvelope = {
    data: sensorCreateManyDeviceInput | sensorCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type sensor_historyCreateWithoutDeviceInput = {
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
    location: locationCreateNestedOneWithoutSensor_historyInput
    sensor?: sensorCreateNestedOneWithoutSensor_historyInput
    truck?: truckCreateNestedOneWithoutSensor_historyInput
  }

  export type sensor_historyUncheckedCreateWithoutDeviceInput = {
    id?: number
    location_id: number
    sensor_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyCreateOrConnectWithoutDeviceInput = {
    where: sensor_historyWhereUniqueInput
    create: XOR<sensor_historyCreateWithoutDeviceInput, sensor_historyUncheckedCreateWithoutDeviceInput>
  }

  export type sensor_historyCreateManyDeviceInputEnvelope = {
    data: sensor_historyCreateManyDeviceInput | sensor_historyCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type alert_eventsUpsertWithWhereUniqueWithoutDeviceInput = {
    where: alert_eventsWhereUniqueInput
    update: XOR<alert_eventsUpdateWithoutDeviceInput, alert_eventsUncheckedUpdateWithoutDeviceInput>
    create: XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput>
  }

  export type alert_eventsUpdateWithWhereUniqueWithoutDeviceInput = {
    where: alert_eventsWhereUniqueInput
    data: XOR<alert_eventsUpdateWithoutDeviceInput, alert_eventsUncheckedUpdateWithoutDeviceInput>
  }

  export type alert_eventsUpdateManyWithWhereWithoutDeviceInput = {
    where: alert_eventsScalarWhereInput
    data: XOR<alert_eventsUpdateManyMutationInput, alert_eventsUncheckedUpdateManyWithoutDeviceInput>
  }

  export type truckUpsertWithoutDeviceInput = {
    update: XOR<truckUpdateWithoutDeviceInput, truckUncheckedUpdateWithoutDeviceInput>
    create: XOR<truckCreateWithoutDeviceInput, truckUncheckedCreateWithoutDeviceInput>
    where?: truckWhereInput
  }

  export type truckUpdateToOneWithWhereWithoutDeviceInput = {
    where?: truckWhereInput
    data: XOR<truckUpdateWithoutDeviceInput, truckUncheckedUpdateWithoutDeviceInput>
  }

  export type truckUpdateWithoutDeviceInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput
    location?: locationUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutTruckNestedInput
    drivers?: driversUpdateOneWithoutTruckNestedInput
    vendors?: vendorsUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput
    location?: locationUncheckedUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type locationUpsertWithWhereUniqueWithoutDeviceInput = {
    where: locationWhereUniqueInput
    update: XOR<locationUpdateWithoutDeviceInput, locationUncheckedUpdateWithoutDeviceInput>
    create: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>
  }

  export type locationUpdateWithWhereUniqueWithoutDeviceInput = {
    where: locationWhereUniqueInput
    data: XOR<locationUpdateWithoutDeviceInput, locationUncheckedUpdateWithoutDeviceInput>
  }

  export type locationUpdateManyWithWhereWithoutDeviceInput = {
    where: locationScalarWhereInput
    data: XOR<locationUpdateManyMutationInput, locationUncheckedUpdateManyWithoutDeviceInput>
  }

  export type locationScalarWhereInput = {
    AND?: locationScalarWhereInput | locationScalarWhereInput[]
    OR?: locationScalarWhereInput[]
    NOT?: locationScalarWhereInput | locationScalarWhereInput[]
    id?: IntFilter<"location"> | number
    device_id?: IntFilter<"location"> | number
    truck_id?: IntNullableFilter<"location"> | number | null
    lat?: FloatFilter<"location"> | number
    long?: FloatFilter<"location"> | number
    speed?: FloatNullableFilter<"location"> | number | null
    heading?: FloatNullableFilter<"location"> | number | null
    altitude?: FloatNullableFilter<"location"> | number | null
    accuracy?: FloatNullableFilter<"location"> | number | null
    created_at?: DateTimeFilter<"location"> | Date | string
    recorded_at?: DateTimeFilter<"location"> | Date | string
  }

  export type sensorUpsertWithWhereUniqueWithoutDeviceInput = {
    where: sensorWhereUniqueInput
    update: XOR<sensorUpdateWithoutDeviceInput, sensorUncheckedUpdateWithoutDeviceInput>
    create: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>
  }

  export type sensorUpdateWithWhereUniqueWithoutDeviceInput = {
    where: sensorWhereUniqueInput
    data: XOR<sensorUpdateWithoutDeviceInput, sensorUncheckedUpdateWithoutDeviceInput>
  }

  export type sensorUpdateManyWithWhereWithoutDeviceInput = {
    where: sensorScalarWhereInput
    data: XOR<sensorUpdateManyMutationInput, sensorUncheckedUpdateManyWithoutDeviceInput>
  }

  export type sensorScalarWhereInput = {
    AND?: sensorScalarWhereInput | sensorScalarWhereInput[]
    OR?: sensorScalarWhereInput[]
    NOT?: sensorScalarWhereInput | sensorScalarWhereInput[]
    id?: IntFilter<"sensor"> | number
    device_id?: IntFilter<"sensor"> | number
    sn?: StringFilter<"sensor"> | string
    tireNo?: IntFilter<"sensor"> | number
    simNumber?: StringNullableFilter<"sensor"> | string | null
    sensorNo?: IntNullableFilter<"sensor"> | number | null
    sensor_lock?: IntFilter<"sensor"> | number
    status?: StringFilter<"sensor"> | string
    tempValue?: FloatNullableFilter<"sensor"> | number | null
    tirepValue?: FloatNullableFilter<"sensor"> | number | null
    exType?: StringNullableFilter<"sensor"> | string | null
    bat?: IntNullableFilter<"sensor"> | number | null
    created_at?: DateTimeFilter<"sensor"> | Date | string
    updated_at?: DateTimeNullableFilter<"sensor"> | Date | string | null
    deleted_at?: DateTimeNullableFilter<"sensor"> | Date | string | null
  }

  export type sensor_historyUpsertWithWhereUniqueWithoutDeviceInput = {
    where: sensor_historyWhereUniqueInput
    update: XOR<sensor_historyUpdateWithoutDeviceInput, sensor_historyUncheckedUpdateWithoutDeviceInput>
    create: XOR<sensor_historyCreateWithoutDeviceInput, sensor_historyUncheckedCreateWithoutDeviceInput>
  }

  export type sensor_historyUpdateWithWhereUniqueWithoutDeviceInput = {
    where: sensor_historyWhereUniqueInput
    data: XOR<sensor_historyUpdateWithoutDeviceInput, sensor_historyUncheckedUpdateWithoutDeviceInput>
  }

  export type sensor_historyUpdateManyWithWhereWithoutDeviceInput = {
    where: sensor_historyScalarWhereInput
    data: XOR<sensor_historyUpdateManyMutationInput, sensor_historyUncheckedUpdateManyWithoutDeviceInput>
  }

  export type sensor_historyScalarWhereInput = {
    AND?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
    OR?: sensor_historyScalarWhereInput[]
    NOT?: sensor_historyScalarWhereInput | sensor_historyScalarWhereInput[]
    id?: IntFilter<"sensor_history"> | number
    location_id?: IntFilter<"sensor_history"> | number
    sensor_id?: IntNullableFilter<"sensor_history"> | number | null
    device_id?: IntNullableFilter<"sensor_history"> | number | null
    truck_id?: IntNullableFilter<"sensor_history"> | number | null
    tireNo?: IntFilter<"sensor_history"> | number
    sensorNo?: IntNullableFilter<"sensor_history"> | number | null
    tempValue?: FloatFilter<"sensor_history"> | number
    tirepValue?: FloatFilter<"sensor_history"> | number
    exType?: StringFilter<"sensor_history"> | string
    bat?: IntNullableFilter<"sensor_history"> | number | null
    sensor_sn?: StringNullableFilter<"sensor_history"> | string | null
    sensor_status?: StringNullableFilter<"sensor_history"> | string | null
    device_sn?: StringNullableFilter<"sensor_history"> | string | null
    device_sim_number?: StringNullableFilter<"sensor_history"> | string | null
    device_status?: StringNullableFilter<"sensor_history"> | string | null
    device_bat1?: IntNullableFilter<"sensor_history"> | number | null
    device_bat2?: IntNullableFilter<"sensor_history"> | number | null
    device_bat3?: IntNullableFilter<"sensor_history"> | number | null
    truck_vin?: StringNullableFilter<"sensor_history"> | string | null
    truck_name?: StringNullableFilter<"sensor_history"> | string | null
    truck_plate?: StringNullableFilter<"sensor_history"> | string | null
    truck_model?: StringNullableFilter<"sensor_history"> | string | null
    truck_year?: IntNullableFilter<"sensor_history"> | number | null
    truck_type?: StringNullableFilter<"sensor_history"> | string | null
    truck_status?: StringNullableFilter<"sensor_history"> | string | null
    driver_id?: IntNullableFilter<"sensor_history"> | number | null
    driver_name?: StringNullableFilter<"sensor_history"> | string | null
    driver_phone?: StringNullableFilter<"sensor_history"> | string | null
    driver_license?: StringNullableFilter<"sensor_history"> | string | null
    vendor_id?: IntNullableFilter<"sensor_history"> | number | null
    vendor_name?: StringNullableFilter<"sensor_history"> | string | null
    vendor_contact?: StringNullableFilter<"sensor_history"> | string | null
    recorded_at?: DateTimeFilter<"sensor_history"> | Date | string
    created_at?: DateTimeFilter<"sensor_history"> | Date | string
  }

  export type vendorsCreateWithoutDriversInput = {
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
    truck?: truckCreateNestedManyWithoutVendorsInput
  }

  export type vendorsUncheckedCreateWithoutDriversInput = {
    id?: number
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
    truck?: truckUncheckedCreateNestedManyWithoutVendorsInput
  }

  export type vendorsCreateOrConnectWithoutDriversInput = {
    where: vendorsWhereUniqueInput
    create: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>
  }

  export type truckCreateWithoutDriversInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput
    device?: deviceCreateNestedManyWithoutTruckInput
    location?: locationCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyCreateNestedManyWithoutTruckInput
    vendors?: vendorsCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateWithoutDriversInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput
    device?: deviceUncheckedCreateNestedManyWithoutTruckInput
    location?: locationUncheckedCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckCreateOrConnectWithoutDriversInput = {
    where: truckWhereUniqueInput
    create: XOR<truckCreateWithoutDriversInput, truckUncheckedCreateWithoutDriversInput>
  }

  export type truckCreateManyDriversInputEnvelope = {
    data: truckCreateManyDriversInput | truckCreateManyDriversInput[]
    skipDuplicates?: boolean
  }

  export type vendorsUpsertWithoutDriversInput = {
    update: XOR<vendorsUpdateWithoutDriversInput, vendorsUncheckedUpdateWithoutDriversInput>
    create: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>
    where?: vendorsWhereInput
  }

  export type vendorsUpdateToOneWithWhereWithoutDriversInput = {
    where?: vendorsWhereInput
    data: XOR<vendorsUpdateWithoutDriversInput, vendorsUncheckedUpdateWithoutDriversInput>
  }

  export type vendorsUpdateWithoutDriversInput = {
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    truck?: truckUpdateManyWithoutVendorsNestedInput
  }

  export type vendorsUncheckedUpdateWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    truck?: truckUncheckedUpdateManyWithoutVendorsNestedInput
  }

  export type truckUpsertWithWhereUniqueWithoutDriversInput = {
    where: truckWhereUniqueInput
    update: XOR<truckUpdateWithoutDriversInput, truckUncheckedUpdateWithoutDriversInput>
    create: XOR<truckCreateWithoutDriversInput, truckUncheckedCreateWithoutDriversInput>
  }

  export type truckUpdateWithWhereUniqueWithoutDriversInput = {
    where: truckWhereUniqueInput
    data: XOR<truckUpdateWithoutDriversInput, truckUncheckedUpdateWithoutDriversInput>
  }

  export type truckUpdateManyWithWhereWithoutDriversInput = {
    where: truckScalarWhereInput
    data: XOR<truckUpdateManyMutationInput, truckUncheckedUpdateManyWithoutDriversInput>
  }

  export type truckScalarWhereInput = {
    AND?: truckScalarWhereInput | truckScalarWhereInput[]
    OR?: truckScalarWhereInput[]
    NOT?: truckScalarWhereInput | truckScalarWhereInput[]
    id?: IntFilter<"truck"> | number
    vin?: StringNullableFilter<"truck"> | string | null
    name?: StringFilter<"truck"> | string
    model?: StringNullableFilter<"truck"> | string | null
    year?: IntNullableFilter<"truck"> | number | null
    vendor_id?: IntNullableFilter<"truck"> | number | null
    created_at?: DateTimeFilter<"truck"> | Date | string
    created_by?: IntNullableFilter<"truck"> | number | null
    updated_by?: IntNullableFilter<"truck"> | number | null
    deleted_at?: DateTimeNullableFilter<"truck"> | Date | string | null
    driver_id?: IntNullableFilter<"truck"> | number | null
    image?: StringNullableFilter<"truck"> | string | null
    plate?: StringNullableFilter<"truck"> | string | null
    status?: StringFilter<"truck"> | string
    type?: StringNullableFilter<"truck"> | string | null
    updated_at?: DateTimeFilter<"truck"> | Date | string
  }

  export type deviceCreateWithoutLocationInput = {
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput
    truck: truckCreateNestedOneWithoutDeviceInput
    sensor?: sensorCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyCreateNestedManyWithoutDeviceInput
  }

  export type deviceUncheckedCreateWithoutLocationInput = {
    id?: number
    truck_id: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput
    sensor?: sensorUncheckedCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type deviceCreateOrConnectWithoutLocationInput = {
    where: deviceWhereUniqueInput
    create: XOR<deviceCreateWithoutLocationInput, deviceUncheckedCreateWithoutLocationInput>
  }

  export type truckCreateWithoutLocationInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput
    device?: deviceCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyCreateNestedManyWithoutTruckInput
    drivers?: driversCreateNestedOneWithoutTruckInput
    vendors?: vendorsCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateWithoutLocationInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput
    device?: deviceUncheckedCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckCreateOrConnectWithoutLocationInput = {
    where: truckWhereUniqueInput
    create: XOR<truckCreateWithoutLocationInput, truckUncheckedCreateWithoutLocationInput>
  }

  export type sensor_historyCreateWithoutLocationInput = {
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
    sensor?: sensorCreateNestedOneWithoutSensor_historyInput
    device?: deviceCreateNestedOneWithoutSensor_historyInput
    truck?: truckCreateNestedOneWithoutSensor_historyInput
  }

  export type sensor_historyUncheckedCreateWithoutLocationInput = {
    id?: number
    sensor_id?: number | null
    device_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyCreateOrConnectWithoutLocationInput = {
    where: sensor_historyWhereUniqueInput
    create: XOR<sensor_historyCreateWithoutLocationInput, sensor_historyUncheckedCreateWithoutLocationInput>
  }

  export type sensor_historyCreateManyLocationInputEnvelope = {
    data: sensor_historyCreateManyLocationInput | sensor_historyCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type deviceUpsertWithoutLocationInput = {
    update: XOR<deviceUpdateWithoutLocationInput, deviceUncheckedUpdateWithoutLocationInput>
    create: XOR<deviceCreateWithoutLocationInput, deviceUncheckedCreateWithoutLocationInput>
    where?: deviceWhereInput
  }

  export type deviceUpdateToOneWithWhereWithoutLocationInput = {
    where?: deviceWhereInput
    data: XOR<deviceUpdateWithoutLocationInput, deviceUncheckedUpdateWithoutLocationInput>
  }

  export type deviceUpdateWithoutLocationInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput
    truck?: truckUpdateOneRequiredWithoutDeviceNestedInput
    sensor?: sensorUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUncheckedUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type truckUpsertWithoutLocationInput = {
    update: XOR<truckUpdateWithoutLocationInput, truckUncheckedUpdateWithoutLocationInput>
    create: XOR<truckCreateWithoutLocationInput, truckUncheckedCreateWithoutLocationInput>
    where?: truckWhereInput
  }

  export type truckUpdateToOneWithWhereWithoutLocationInput = {
    where?: truckWhereInput
    data: XOR<truckUpdateWithoutLocationInput, truckUncheckedUpdateWithoutLocationInput>
  }

  export type truckUpdateWithoutLocationInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput
    device?: deviceUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutTruckNestedInput
    drivers?: driversUpdateOneWithoutTruckNestedInput
    vendors?: vendorsUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput
    device?: deviceUncheckedUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type sensor_historyUpsertWithWhereUniqueWithoutLocationInput = {
    where: sensor_historyWhereUniqueInput
    update: XOR<sensor_historyUpdateWithoutLocationInput, sensor_historyUncheckedUpdateWithoutLocationInput>
    create: XOR<sensor_historyCreateWithoutLocationInput, sensor_historyUncheckedCreateWithoutLocationInput>
  }

  export type sensor_historyUpdateWithWhereUniqueWithoutLocationInput = {
    where: sensor_historyWhereUniqueInput
    data: XOR<sensor_historyUpdateWithoutLocationInput, sensor_historyUncheckedUpdateWithoutLocationInput>
  }

  export type sensor_historyUpdateManyWithWhereWithoutLocationInput = {
    where: sensor_historyScalarWhereInput
    data: XOR<sensor_historyUpdateManyMutationInput, sensor_historyUncheckedUpdateManyWithoutLocationInput>
  }

  export type alert_eventsCreateWithoutSensorInput = {
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
    alert: alertCreateNestedOneWithoutAlert_eventsInput
    device?: deviceCreateNestedOneWithoutAlert_eventsInput
    truck?: truckCreateNestedOneWithoutAlert_eventsInput
  }

  export type alert_eventsUncheckedCreateWithoutSensorInput = {
    id?: number
    alert_id: number
    device_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsCreateOrConnectWithoutSensorInput = {
    where: alert_eventsWhereUniqueInput
    create: XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput>
  }

  export type alert_eventsCreateManySensorInputEnvelope = {
    data: alert_eventsCreateManySensorInput | alert_eventsCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type sensor_historyCreateWithoutSensorInput = {
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
    location: locationCreateNestedOneWithoutSensor_historyInput
    device?: deviceCreateNestedOneWithoutSensor_historyInput
    truck?: truckCreateNestedOneWithoutSensor_historyInput
  }

  export type sensor_historyUncheckedCreateWithoutSensorInput = {
    id?: number
    location_id: number
    device_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyCreateOrConnectWithoutSensorInput = {
    where: sensor_historyWhereUniqueInput
    create: XOR<sensor_historyCreateWithoutSensorInput, sensor_historyUncheckedCreateWithoutSensorInput>
  }

  export type sensor_historyCreateManySensorInputEnvelope = {
    data: sensor_historyCreateManySensorInput | sensor_historyCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type deviceCreateWithoutSensorInput = {
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput
    truck: truckCreateNestedOneWithoutDeviceInput
    location?: locationCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyCreateNestedManyWithoutDeviceInput
  }

  export type deviceUncheckedCreateWithoutSensorInput = {
    id?: number
    truck_id: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput
    location?: locationUncheckedCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type deviceCreateOrConnectWithoutSensorInput = {
    where: deviceWhereUniqueInput
    create: XOR<deviceCreateWithoutSensorInput, deviceUncheckedCreateWithoutSensorInput>
  }

  export type alert_eventsUpsertWithWhereUniqueWithoutSensorInput = {
    where: alert_eventsWhereUniqueInput
    update: XOR<alert_eventsUpdateWithoutSensorInput, alert_eventsUncheckedUpdateWithoutSensorInput>
    create: XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput>
  }

  export type alert_eventsUpdateWithWhereUniqueWithoutSensorInput = {
    where: alert_eventsWhereUniqueInput
    data: XOR<alert_eventsUpdateWithoutSensorInput, alert_eventsUncheckedUpdateWithoutSensorInput>
  }

  export type alert_eventsUpdateManyWithWhereWithoutSensorInput = {
    where: alert_eventsScalarWhereInput
    data: XOR<alert_eventsUpdateManyMutationInput, alert_eventsUncheckedUpdateManyWithoutSensorInput>
  }

  export type sensor_historyUpsertWithWhereUniqueWithoutSensorInput = {
    where: sensor_historyWhereUniqueInput
    update: XOR<sensor_historyUpdateWithoutSensorInput, sensor_historyUncheckedUpdateWithoutSensorInput>
    create: XOR<sensor_historyCreateWithoutSensorInput, sensor_historyUncheckedCreateWithoutSensorInput>
  }

  export type sensor_historyUpdateWithWhereUniqueWithoutSensorInput = {
    where: sensor_historyWhereUniqueInput
    data: XOR<sensor_historyUpdateWithoutSensorInput, sensor_historyUncheckedUpdateWithoutSensorInput>
  }

  export type sensor_historyUpdateManyWithWhereWithoutSensorInput = {
    where: sensor_historyScalarWhereInput
    data: XOR<sensor_historyUpdateManyMutationInput, sensor_historyUncheckedUpdateManyWithoutSensorInput>
  }

  export type deviceUpsertWithoutSensorInput = {
    update: XOR<deviceUpdateWithoutSensorInput, deviceUncheckedUpdateWithoutSensorInput>
    create: XOR<deviceCreateWithoutSensorInput, deviceUncheckedCreateWithoutSensorInput>
    where?: deviceWhereInput
  }

  export type deviceUpdateToOneWithWhereWithoutSensorInput = {
    where?: deviceWhereInput
    data: XOR<deviceUpdateWithoutSensorInput, deviceUncheckedUpdateWithoutSensorInput>
  }

  export type deviceUpdateWithoutSensorInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput
    truck?: truckUpdateOneRequiredWithoutDeviceNestedInput
    location?: locationUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateWithoutSensorInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput
    location?: locationUncheckedUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type locationCreateWithoutSensor_historyInput = {
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    device: deviceCreateNestedOneWithoutLocationInput
    truck?: truckCreateNestedOneWithoutLocationInput
  }

  export type locationUncheckedCreateWithoutSensor_historyInput = {
    id?: number
    device_id: number
    truck_id?: number | null
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
  }

  export type locationCreateOrConnectWithoutSensor_historyInput = {
    where: locationWhereUniqueInput
    create: XOR<locationCreateWithoutSensor_historyInput, locationUncheckedCreateWithoutSensor_historyInput>
  }

  export type sensorCreateWithoutSensor_historyInput = {
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    alert_events?: alert_eventsCreateNestedManyWithoutSensorInput
    device: deviceCreateNestedOneWithoutSensorInput
  }

  export type sensorUncheckedCreateWithoutSensor_historyInput = {
    id?: number
    device_id: number
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutSensorInput
  }

  export type sensorCreateOrConnectWithoutSensor_historyInput = {
    where: sensorWhereUniqueInput
    create: XOR<sensorCreateWithoutSensor_historyInput, sensorUncheckedCreateWithoutSensor_historyInput>
  }

  export type deviceCreateWithoutSensor_historyInput = {
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput
    truck: truckCreateNestedOneWithoutDeviceInput
    location?: locationCreateNestedManyWithoutDeviceInput
    sensor?: sensorCreateNestedManyWithoutDeviceInput
  }

  export type deviceUncheckedCreateWithoutSensor_historyInput = {
    id?: number
    truck_id: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput
    location?: locationUncheckedCreateNestedManyWithoutDeviceInput
    sensor?: sensorUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type deviceCreateOrConnectWithoutSensor_historyInput = {
    where: deviceWhereUniqueInput
    create: XOR<deviceCreateWithoutSensor_historyInput, deviceUncheckedCreateWithoutSensor_historyInput>
  }

  export type truckCreateWithoutSensor_historyInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput
    device?: deviceCreateNestedManyWithoutTruckInput
    location?: locationCreateNestedManyWithoutTruckInput
    drivers?: driversCreateNestedOneWithoutTruckInput
    vendors?: vendorsCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateWithoutSensor_historyInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput
    device?: deviceUncheckedCreateNestedManyWithoutTruckInput
    location?: locationUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckCreateOrConnectWithoutSensor_historyInput = {
    where: truckWhereUniqueInput
    create: XOR<truckCreateWithoutSensor_historyInput, truckUncheckedCreateWithoutSensor_historyInput>
  }

  export type locationUpsertWithoutSensor_historyInput = {
    update: XOR<locationUpdateWithoutSensor_historyInput, locationUncheckedUpdateWithoutSensor_historyInput>
    create: XOR<locationCreateWithoutSensor_historyInput, locationUncheckedCreateWithoutSensor_historyInput>
    where?: locationWhereInput
  }

  export type locationUpdateToOneWithWhereWithoutSensor_historyInput = {
    where?: locationWhereInput
    data: XOR<locationUpdateWithoutSensor_historyInput, locationUncheckedUpdateWithoutSensor_historyInput>
  }

  export type locationUpdateWithoutSensor_historyInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: deviceUpdateOneRequiredWithoutLocationNestedInput
    truck?: truckUpdateOneWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateWithoutSensor_historyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensorUpsertWithoutSensor_historyInput = {
    update: XOR<sensorUpdateWithoutSensor_historyInput, sensorUncheckedUpdateWithoutSensor_historyInput>
    create: XOR<sensorCreateWithoutSensor_historyInput, sensorUncheckedCreateWithoutSensor_historyInput>
    where?: sensorWhereInput
  }

  export type sensorUpdateToOneWithWhereWithoutSensor_historyInput = {
    where?: sensorWhereInput
    data: XOR<sensorUpdateWithoutSensor_historyInput, sensorUncheckedUpdateWithoutSensor_historyInput>
  }

  export type sensorUpdateWithoutSensor_historyInput = {
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUpdateManyWithoutSensorNestedInput
    device?: deviceUpdateOneRequiredWithoutSensorNestedInput
  }

  export type sensorUncheckedUpdateWithoutSensor_historyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type deviceUpsertWithoutSensor_historyInput = {
    update: XOR<deviceUpdateWithoutSensor_historyInput, deviceUncheckedUpdateWithoutSensor_historyInput>
    create: XOR<deviceCreateWithoutSensor_historyInput, deviceUncheckedCreateWithoutSensor_historyInput>
    where?: deviceWhereInput
  }

  export type deviceUpdateToOneWithWhereWithoutSensor_historyInput = {
    where?: deviceWhereInput
    data: XOR<deviceUpdateWithoutSensor_historyInput, deviceUncheckedUpdateWithoutSensor_historyInput>
  }

  export type deviceUpdateWithoutSensor_historyInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput
    truck?: truckUpdateOneRequiredWithoutDeviceNestedInput
    location?: locationUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateWithoutSensor_historyInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput
    location?: locationUncheckedUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type truckUpsertWithoutSensor_historyInput = {
    update: XOR<truckUpdateWithoutSensor_historyInput, truckUncheckedUpdateWithoutSensor_historyInput>
    create: XOR<truckCreateWithoutSensor_historyInput, truckUncheckedCreateWithoutSensor_historyInput>
    where?: truckWhereInput
  }

  export type truckUpdateToOneWithWhereWithoutSensor_historyInput = {
    where?: truckWhereInput
    data: XOR<truckUpdateWithoutSensor_historyInput, truckUncheckedUpdateWithoutSensor_historyInput>
  }

  export type truckUpdateWithoutSensor_historyInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput
    device?: deviceUpdateManyWithoutTruckNestedInput
    location?: locationUpdateManyWithoutTruckNestedInput
    drivers?: driversUpdateOneWithoutTruckNestedInput
    vendors?: vendorsUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateWithoutSensor_historyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput
    device?: deviceUncheckedUpdateManyWithoutTruckNestedInput
    location?: locationUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type alert_eventsCreateWithoutTruckInput = {
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
    alert: alertCreateNestedOneWithoutAlert_eventsInput
    device?: deviceCreateNestedOneWithoutAlert_eventsInput
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput
  }

  export type alert_eventsUncheckedCreateWithoutTruckInput = {
    id?: number
    alert_id: number
    device_id?: number | null
    sensor_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsCreateOrConnectWithoutTruckInput = {
    where: alert_eventsWhereUniqueInput
    create: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>
  }

  export type alert_eventsCreateManyTruckInputEnvelope = {
    data: alert_eventsCreateManyTruckInput | alert_eventsCreateManyTruckInput[]
    skipDuplicates?: boolean
  }

  export type deviceCreateWithoutTruckInput = {
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput
    location?: locationCreateNestedManyWithoutDeviceInput
    sensor?: sensorCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyCreateNestedManyWithoutDeviceInput
  }

  export type deviceUncheckedCreateWithoutTruckInput = {
    id?: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput
    location?: locationUncheckedCreateNestedManyWithoutDeviceInput
    sensor?: sensorUncheckedCreateNestedManyWithoutDeviceInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type deviceCreateOrConnectWithoutTruckInput = {
    where: deviceWhereUniqueInput
    create: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>
  }

  export type deviceCreateManyTruckInputEnvelope = {
    data: deviceCreateManyTruckInput | deviceCreateManyTruckInput[]
    skipDuplicates?: boolean
  }

  export type locationCreateWithoutTruckInput = {
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    device: deviceCreateNestedOneWithoutLocationInput
    sensor_history?: sensor_historyCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateWithoutTruckInput = {
    id?: number
    device_id: number
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationCreateOrConnectWithoutTruckInput = {
    where: locationWhereUniqueInput
    create: XOR<locationCreateWithoutTruckInput, locationUncheckedCreateWithoutTruckInput>
  }

  export type locationCreateManyTruckInputEnvelope = {
    data: locationCreateManyTruckInput | locationCreateManyTruckInput[]
    skipDuplicates?: boolean
  }

  export type sensor_historyCreateWithoutTruckInput = {
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
    location: locationCreateNestedOneWithoutSensor_historyInput
    sensor?: sensorCreateNestedOneWithoutSensor_historyInput
    device?: deviceCreateNestedOneWithoutSensor_historyInput
  }

  export type sensor_historyUncheckedCreateWithoutTruckInput = {
    id?: number
    location_id: number
    sensor_id?: number | null
    device_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyCreateOrConnectWithoutTruckInput = {
    where: sensor_historyWhereUniqueInput
    create: XOR<sensor_historyCreateWithoutTruckInput, sensor_historyUncheckedCreateWithoutTruckInput>
  }

  export type sensor_historyCreateManyTruckInputEnvelope = {
    data: sensor_historyCreateManyTruckInput | sensor_historyCreateManyTruckInput[]
    skipDuplicates?: boolean
  }

  export type driversCreateWithoutTruckInput = {
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    vendors?: vendorsCreateNestedOneWithoutDriversInput
  }

  export type driversUncheckedCreateWithoutTruckInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    vendor_id?: number | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type driversCreateOrConnectWithoutTruckInput = {
    where: driversWhereUniqueInput
    create: XOR<driversCreateWithoutTruckInput, driversUncheckedCreateWithoutTruckInput>
  }

  export type vendorsCreateWithoutTruckInput = {
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
    drivers?: driversCreateNestedManyWithoutVendorsInput
  }

  export type vendorsUncheckedCreateWithoutTruckInput = {
    id?: number
    address?: string | null
    email?: string | null
    contact_person?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    name_vendor: string
    telephone?: string | null
    drivers?: driversUncheckedCreateNestedManyWithoutVendorsInput
  }

  export type vendorsCreateOrConnectWithoutTruckInput = {
    where: vendorsWhereUniqueInput
    create: XOR<vendorsCreateWithoutTruckInput, vendorsUncheckedCreateWithoutTruckInput>
  }

  export type alert_eventsUpsertWithWhereUniqueWithoutTruckInput = {
    where: alert_eventsWhereUniqueInput
    update: XOR<alert_eventsUpdateWithoutTruckInput, alert_eventsUncheckedUpdateWithoutTruckInput>
    create: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>
  }

  export type alert_eventsUpdateWithWhereUniqueWithoutTruckInput = {
    where: alert_eventsWhereUniqueInput
    data: XOR<alert_eventsUpdateWithoutTruckInput, alert_eventsUncheckedUpdateWithoutTruckInput>
  }

  export type alert_eventsUpdateManyWithWhereWithoutTruckInput = {
    where: alert_eventsScalarWhereInput
    data: XOR<alert_eventsUpdateManyMutationInput, alert_eventsUncheckedUpdateManyWithoutTruckInput>
  }

  export type deviceUpsertWithWhereUniqueWithoutTruckInput = {
    where: deviceWhereUniqueInput
    update: XOR<deviceUpdateWithoutTruckInput, deviceUncheckedUpdateWithoutTruckInput>
    create: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>
  }

  export type deviceUpdateWithWhereUniqueWithoutTruckInput = {
    where: deviceWhereUniqueInput
    data: XOR<deviceUpdateWithoutTruckInput, deviceUncheckedUpdateWithoutTruckInput>
  }

  export type deviceUpdateManyWithWhereWithoutTruckInput = {
    where: deviceScalarWhereInput
    data: XOR<deviceUpdateManyMutationInput, deviceUncheckedUpdateManyWithoutTruckInput>
  }

  export type deviceScalarWhereInput = {
    AND?: deviceScalarWhereInput | deviceScalarWhereInput[]
    OR?: deviceScalarWhereInput[]
    NOT?: deviceScalarWhereInput | deviceScalarWhereInput[]
    id?: IntFilter<"device"> | number
    truck_id?: IntFilter<"device"> | number
    sn?: StringFilter<"device"> | string
    sim_number?: StringNullableFilter<"device"> | string | null
    installed_at?: DateTimeFilter<"device"> | Date | string
    bat1?: IntNullableFilter<"device"> | number | null
    bat2?: IntNullableFilter<"device"> | number | null
    bat3?: IntNullableFilter<"device"> | number | null
    created_at?: DateTimeFilter<"device"> | Date | string
    deleted_at?: DateTimeNullableFilter<"device"> | Date | string | null
    lock?: IntFilter<"device"> | number
    status?: StringFilter<"device"> | string
    updated_at?: DateTimeFilter<"device"> | Date | string
  }

  export type locationUpsertWithWhereUniqueWithoutTruckInput = {
    where: locationWhereUniqueInput
    update: XOR<locationUpdateWithoutTruckInput, locationUncheckedUpdateWithoutTruckInput>
    create: XOR<locationCreateWithoutTruckInput, locationUncheckedCreateWithoutTruckInput>
  }

  export type locationUpdateWithWhereUniqueWithoutTruckInput = {
    where: locationWhereUniqueInput
    data: XOR<locationUpdateWithoutTruckInput, locationUncheckedUpdateWithoutTruckInput>
  }

  export type locationUpdateManyWithWhereWithoutTruckInput = {
    where: locationScalarWhereInput
    data: XOR<locationUpdateManyMutationInput, locationUncheckedUpdateManyWithoutTruckInput>
  }

  export type sensor_historyUpsertWithWhereUniqueWithoutTruckInput = {
    where: sensor_historyWhereUniqueInput
    update: XOR<sensor_historyUpdateWithoutTruckInput, sensor_historyUncheckedUpdateWithoutTruckInput>
    create: XOR<sensor_historyCreateWithoutTruckInput, sensor_historyUncheckedCreateWithoutTruckInput>
  }

  export type sensor_historyUpdateWithWhereUniqueWithoutTruckInput = {
    where: sensor_historyWhereUniqueInput
    data: XOR<sensor_historyUpdateWithoutTruckInput, sensor_historyUncheckedUpdateWithoutTruckInput>
  }

  export type sensor_historyUpdateManyWithWhereWithoutTruckInput = {
    where: sensor_historyScalarWhereInput
    data: XOR<sensor_historyUpdateManyMutationInput, sensor_historyUncheckedUpdateManyWithoutTruckInput>
  }

  export type driversUpsertWithoutTruckInput = {
    update: XOR<driversUpdateWithoutTruckInput, driversUncheckedUpdateWithoutTruckInput>
    create: XOR<driversCreateWithoutTruckInput, driversUncheckedCreateWithoutTruckInput>
    where?: driversWhereInput
  }

  export type driversUpdateToOneWithWhereWithoutTruckInput = {
    where?: driversWhereInput
    data: XOR<driversUpdateWithoutTruckInput, driversUncheckedUpdateWithoutTruckInput>
  }

  export type driversUpdateWithoutTruckInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vendors?: vendorsUpdateOneWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type vendorsUpsertWithoutTruckInput = {
    update: XOR<vendorsUpdateWithoutTruckInput, vendorsUncheckedUpdateWithoutTruckInput>
    create: XOR<vendorsCreateWithoutTruckInput, vendorsUncheckedCreateWithoutTruckInput>
    where?: vendorsWhereInput
  }

  export type vendorsUpdateToOneWithWhereWithoutTruckInput = {
    where?: vendorsWhereInput
    data: XOR<vendorsUpdateWithoutTruckInput, vendorsUncheckedUpdateWithoutTruckInput>
  }

  export type vendorsUpdateWithoutTruckInput = {
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    drivers?: driversUpdateManyWithoutVendorsNestedInput
  }

  export type vendorsUncheckedUpdateWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name_vendor?: StringFieldUpdateOperationsInput | string
    telephone?: NullableStringFieldUpdateOperationsInput | string | null
    drivers?: driversUncheckedUpdateManyWithoutVendorsNestedInput
  }

  export type driversCreateWithoutVendorsInput = {
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    truck?: truckCreateNestedManyWithoutDriversInput
  }

  export type driversUncheckedCreateWithoutVendorsInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    truck?: truckUncheckedCreateNestedManyWithoutDriversInput
  }

  export type driversCreateOrConnectWithoutVendorsInput = {
    where: driversWhereUniqueInput
    create: XOR<driversCreateWithoutVendorsInput, driversUncheckedCreateWithoutVendorsInput>
  }

  export type driversCreateManyVendorsInputEnvelope = {
    data: driversCreateManyVendorsInput | driversCreateManyVendorsInput[]
    skipDuplicates?: boolean
  }

  export type truckCreateWithoutVendorsInput = {
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput
    device?: deviceCreateNestedManyWithoutTruckInput
    location?: locationCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyCreateNestedManyWithoutTruckInput
    drivers?: driversCreateNestedOneWithoutTruckInput
  }

  export type truckUncheckedCreateWithoutVendorsInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput
    device?: deviceUncheckedCreateNestedManyWithoutTruckInput
    location?: locationUncheckedCreateNestedManyWithoutTruckInput
    sensor_history?: sensor_historyUncheckedCreateNestedManyWithoutTruckInput
  }

  export type truckCreateOrConnectWithoutVendorsInput = {
    where: truckWhereUniqueInput
    create: XOR<truckCreateWithoutVendorsInput, truckUncheckedCreateWithoutVendorsInput>
  }

  export type truckCreateManyVendorsInputEnvelope = {
    data: truckCreateManyVendorsInput | truckCreateManyVendorsInput[]
    skipDuplicates?: boolean
  }

  export type driversUpsertWithWhereUniqueWithoutVendorsInput = {
    where: driversWhereUniqueInput
    update: XOR<driversUpdateWithoutVendorsInput, driversUncheckedUpdateWithoutVendorsInput>
    create: XOR<driversCreateWithoutVendorsInput, driversUncheckedCreateWithoutVendorsInput>
  }

  export type driversUpdateWithWhereUniqueWithoutVendorsInput = {
    where: driversWhereUniqueInput
    data: XOR<driversUpdateWithoutVendorsInput, driversUncheckedUpdateWithoutVendorsInput>
  }

  export type driversUpdateManyWithWhereWithoutVendorsInput = {
    where: driversScalarWhereInput
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyWithoutVendorsInput>
  }

  export type driversScalarWhereInput = {
    AND?: driversScalarWhereInput | driversScalarWhereInput[]
    OR?: driversScalarWhereInput[]
    NOT?: driversScalarWhereInput | driversScalarWhereInput[]
    id?: IntFilter<"drivers"> | number
    name?: StringFilter<"drivers"> | string
    phone?: StringNullableFilter<"drivers"> | string | null
    email?: StringNullableFilter<"drivers"> | string | null
    license_number?: StringFilter<"drivers"> | string
    license_type?: StringFilter<"drivers"> | string
    license_expiry?: DateTimeFilter<"drivers"> | Date | string
    vendor_id?: IntNullableFilter<"drivers"> | number | null
    status?: StringFilter<"drivers"> | string
    created_at?: DateTimeFilter<"drivers"> | Date | string
    updated_at?: DateTimeFilter<"drivers"> | Date | string
    deleted_at?: DateTimeNullableFilter<"drivers"> | Date | string | null
  }

  export type truckUpsertWithWhereUniqueWithoutVendorsInput = {
    where: truckWhereUniqueInput
    update: XOR<truckUpdateWithoutVendorsInput, truckUncheckedUpdateWithoutVendorsInput>
    create: XOR<truckCreateWithoutVendorsInput, truckUncheckedCreateWithoutVendorsInput>
  }

  export type truckUpdateWithWhereUniqueWithoutVendorsInput = {
    where: truckWhereUniqueInput
    data: XOR<truckUpdateWithoutVendorsInput, truckUncheckedUpdateWithoutVendorsInput>
  }

  export type truckUpdateManyWithWhereWithoutVendorsInput = {
    where: truckScalarWhereInput
    data: XOR<truckUpdateManyMutationInput, truckUncheckedUpdateManyWithoutVendorsInput>
  }

  export type alert_eventsCreateManyAlertInput = {
    id?: number
    device_id?: number | null
    sensor_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type alert_eventsUpdateWithoutAlertInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput
  }

  export type alert_eventsUncheckedUpdateWithoutAlertInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsUncheckedUpdateManyWithoutAlertInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsCreateManyDeviceInput = {
    id?: number
    alert_id: number
    sensor_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type locationCreateManyDeviceInput = {
    id?: number
    truck_id?: number | null
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
  }

  export type sensorCreateManyDeviceInput = {
    id?: number
    sn: string
    tireNo: number
    simNumber?: string | null
    sensorNo?: number | null
    sensor_lock?: number
    status?: string
    tempValue?: number | null
    tirepValue?: number | null
    exType?: string | null
    bat?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
  }

  export type sensor_historyCreateManyDeviceInput = {
    id?: number
    location_id: number
    sensor_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type alert_eventsUpdateWithoutDeviceInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput
  }

  export type alert_eventsUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsUncheckedUpdateManyWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type locationUpdateWithoutDeviceInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    truck?: truckUpdateOneWithoutLocationNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateManyWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensorUpdateWithoutDeviceInput = {
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUpdateManyWithoutSensorNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutSensorNestedInput
  }

  export type sensorUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert_events?: alert_eventsUncheckedUpdateManyWithoutSensorNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type sensorUncheckedUpdateManyWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    tireNo?: IntFieldUpdateOperationsInput | number
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null
    exType?: NullableStringFieldUpdateOperationsInput | string | null
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sensor_historyUpdateWithoutDeviceInput = {
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: locationUpdateOneRequiredWithoutSensor_historyNestedInput
    sensor?: sensorUpdateOneWithoutSensor_historyNestedInput
    truck?: truckUpdateOneWithoutSensor_historyNestedInput
  }

  export type sensor_historyUncheckedUpdateWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyUncheckedUpdateManyWithoutDeviceInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type truckCreateManyDriversInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    vendor_id?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
  }

  export type truckUpdateWithoutDriversInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput
    device?: deviceUpdateManyWithoutTruckNestedInput
    location?: locationUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutTruckNestedInput
    vendors?: vendorsUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput
    device?: deviceUncheckedUpdateManyWithoutTruckNestedInput
    location?: locationUncheckedUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateManyWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyCreateManyLocationInput = {
    id?: number
    sensor_id?: number | null
    device_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type sensor_historyUpdateWithoutLocationInput = {
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sensor?: sensorUpdateOneWithoutSensor_historyNestedInput
    device?: deviceUpdateOneWithoutSensor_historyNestedInput
    truck?: truckUpdateOneWithoutSensor_historyNestedInput
  }

  export type sensor_historyUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type alert_eventsCreateManySensorInput = {
    id?: number
    alert_id: number
    device_id?: number | null
    truck_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type sensor_historyCreateManySensorInput = {
    id?: number
    location_id: number
    device_id?: number | null
    truck_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type alert_eventsUpdateWithoutSensorInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput
  }

  export type alert_eventsUncheckedUpdateWithoutSensorInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsUncheckedUpdateManyWithoutSensorInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type sensor_historyUpdateWithoutSensorInput = {
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: locationUpdateOneRequiredWithoutSensor_historyNestedInput
    device?: deviceUpdateOneWithoutSensor_historyNestedInput
    truck?: truckUpdateOneWithoutSensor_historyNestedInput
  }

  export type sensor_historyUncheckedUpdateWithoutSensorInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyUncheckedUpdateManyWithoutSensorInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    truck_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type alert_eventsCreateManyTruckInput = {
    id?: number
    alert_id: number
    device_id?: number | null
    sensor_id?: number | null
    value?: number | null
    message?: string | null
    status?: string
    alert_code?: string | null
    alert_name?: string | null
    alert_severity?: string | null
    truck_plate?: string | null
    truck_name?: string | null
    truck_vin?: string | null
    device_sn?: string | null
    sensor_sn?: string | null
    sensor_tire_no?: number | null
    driver_name?: string | null
    vendor_name?: string | null
    created_at?: Date | string
    resolved_at?: Date | string | null
  }

  export type deviceCreateManyTruckInput = {
    id?: number
    sn: string
    sim_number?: string | null
    installed_at?: Date | string
    bat1?: number | null
    bat2?: number | null
    bat3?: number | null
    created_at?: Date | string
    deleted_at?: Date | string | null
    lock?: number
    status?: string
    updated_at?: Date | string
  }

  export type locationCreateManyTruckInput = {
    id?: number
    device_id: number
    lat: number
    long: number
    speed?: number | null
    heading?: number | null
    altitude?: number | null
    accuracy?: number | null
    created_at?: Date | string
    recorded_at?: Date | string
  }

  export type sensor_historyCreateManyTruckInput = {
    id?: number
    location_id: number
    sensor_id?: number | null
    device_id?: number | null
    tireNo: number
    sensorNo?: number | null
    tempValue: number
    tirepValue: number
    exType?: string
    bat?: number | null
    sensor_sn?: string | null
    sensor_status?: string | null
    device_sn?: string | null
    device_sim_number?: string | null
    device_status?: string | null
    device_bat1?: number | null
    device_bat2?: number | null
    device_bat3?: number | null
    truck_vin?: string | null
    truck_name?: string | null
    truck_plate?: string | null
    truck_model?: string | null
    truck_year?: number | null
    truck_type?: string | null
    truck_status?: string | null
    driver_id?: number | null
    driver_name?: string | null
    driver_phone?: string | null
    driver_license?: string | null
    vendor_id?: number | null
    vendor_name?: string | null
    vendor_contact?: string | null
    recorded_at: Date | string
    created_at?: Date | string
  }

  export type alert_eventsUpdateWithoutTruckInput = {
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput
  }

  export type alert_eventsUncheckedUpdateWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alert_eventsUncheckedUpdateManyWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    alert_id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    value?: NullableFloatFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    alert_code?: NullableStringFieldUpdateOperationsInput | string | null
    alert_name?: NullableStringFieldUpdateOperationsInput | string | null
    alert_severity?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_tire_no?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type deviceUpdateWithoutTruckInput = {
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput
    location?: locationUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput
    location?: locationUncheckedUpdateManyWithoutDeviceNestedInput
    sensor?: sensorUncheckedUpdateManyWithoutDeviceNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type deviceUncheckedUpdateManyWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    sn?: StringFieldUpdateOperationsInput | string
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bat1?: NullableIntFieldUpdateOperationsInput | number | null
    bat2?: NullableIntFieldUpdateOperationsInput | number | null
    bat3?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type locationUpdateWithoutTruckInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: deviceUpdateOneRequiredWithoutLocationNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateManyWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: IntFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    long?: FloatFieldUpdateOperationsInput | number
    speed?: NullableFloatFieldUpdateOperationsInput | number | null
    heading?: NullableFloatFieldUpdateOperationsInput | number | null
    altitude?: NullableFloatFieldUpdateOperationsInput | number | null
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyUpdateWithoutTruckInput = {
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: locationUpdateOneRequiredWithoutSensor_historyNestedInput
    sensor?: sensorUpdateOneWithoutSensor_historyNestedInput
    device?: deviceUpdateOneWithoutSensor_historyNestedInput
  }

  export type sensor_historyUncheckedUpdateWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sensor_historyUncheckedUpdateManyWithoutTruckInput = {
    id?: IntFieldUpdateOperationsInput | number
    location_id?: IntFieldUpdateOperationsInput | number
    sensor_id?: NullableIntFieldUpdateOperationsInput | number | null
    device_id?: NullableIntFieldUpdateOperationsInput | number | null
    tireNo?: IntFieldUpdateOperationsInput | number
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null
    tempValue?: FloatFieldUpdateOperationsInput | number
    tirepValue?: FloatFieldUpdateOperationsInput | number
    exType?: StringFieldUpdateOperationsInput | string
    bat?: NullableIntFieldUpdateOperationsInput | number | null
    sensor_sn?: NullableStringFieldUpdateOperationsInput | string | null
    sensor_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_sn?: NullableStringFieldUpdateOperationsInput | string | null
    device_sim_number?: NullableStringFieldUpdateOperationsInput | string | null
    device_status?: NullableStringFieldUpdateOperationsInput | string | null
    device_bat1?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat2?: NullableIntFieldUpdateOperationsInput | number | null
    device_bat3?: NullableIntFieldUpdateOperationsInput | number | null
    truck_vin?: NullableStringFieldUpdateOperationsInput | string | null
    truck_name?: NullableStringFieldUpdateOperationsInput | string | null
    truck_plate?: NullableStringFieldUpdateOperationsInput | string | null
    truck_model?: NullableStringFieldUpdateOperationsInput | string | null
    truck_year?: NullableIntFieldUpdateOperationsInput | number | null
    truck_type?: NullableStringFieldUpdateOperationsInput | string | null
    truck_status?: NullableStringFieldUpdateOperationsInput | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    driver_name?: NullableStringFieldUpdateOperationsInput | string | null
    driver_phone?: NullableStringFieldUpdateOperationsInput | string | null
    driver_license?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null
    vendor_name?: NullableStringFieldUpdateOperationsInput | string | null
    vendor_contact?: NullableStringFieldUpdateOperationsInput | string | null
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type driversCreateManyVendorsInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    license_number: string
    license_type: string
    license_expiry: Date | string
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type truckCreateManyVendorsInput = {
    id?: number
    vin?: string | null
    name: string
    model?: string | null
    year?: number | null
    created_at?: Date | string
    created_by?: number | null
    updated_by?: number | null
    deleted_at?: Date | string | null
    driver_id?: number | null
    image?: string | null
    plate?: string | null
    status?: string
    type?: string | null
    updated_at?: Date | string
  }

  export type driversUpdateWithoutVendorsInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truck?: truckUpdateManyWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateWithoutVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truck?: truckUncheckedUpdateManyWithoutDriversNestedInput
  }

  export type driversUncheckedUpdateManyWithoutVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    license_number?: StringFieldUpdateOperationsInput | string
    license_type?: StringFieldUpdateOperationsInput | string
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type truckUpdateWithoutVendorsInput = {
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput
    device?: deviceUpdateManyWithoutTruckNestedInput
    location?: locationUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUpdateManyWithoutTruckNestedInput
    drivers?: driversUpdateOneWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateWithoutVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput
    device?: deviceUncheckedUpdateManyWithoutTruckNestedInput
    location?: locationUncheckedUpdateManyWithoutTruckNestedInput
    sensor_history?: sensor_historyUncheckedUpdateManyWithoutTruckNestedInput
  }

  export type truckUncheckedUpdateManyWithoutVendorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    vin?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    updated_by?: NullableIntFieldUpdateOperationsInput | number | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    plate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AlertCountOutputTypeDefaultArgs instead
     */
    export type AlertCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceCountOutputTypeDefaultArgs instead
     */
    export type DeviceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DriversCountOutputTypeDefaultArgs instead
     */
    export type DriversCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DriversCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LocationCountOutputTypeDefaultArgs instead
     */
    export type LocationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LocationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SensorCountOutputTypeDefaultArgs instead
     */
    export type SensorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SensorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TruckCountOutputTypeDefaultArgs instead
     */
    export type TruckCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TruckCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VendorsCountOutputTypeDefaultArgs instead
     */
    export type VendorsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VendorsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use alertDefaultArgs instead
     */
    export type alertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = alertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use alert_eventsDefaultArgs instead
     */
    export type alert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = alert_eventsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use deviceDefaultArgs instead
     */
    export type deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = deviceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use driversDefaultArgs instead
     */
    export type driversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = driversDefaultArgs<ExtArgs>
    /**
     * @deprecated Use locationDefaultArgs instead
     */
    export type locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = locationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use sensorDefaultArgs instead
     */
    export type sensorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = sensorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use sensor_historyDefaultArgs instead
     */
    export type sensor_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = sensor_historyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use truckDefaultArgs instead
     */
    export type truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = truckDefaultArgs<ExtArgs>
    /**
     * @deprecated Use user_adminDefaultArgs instead
     */
    export type user_adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = user_adminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use vendorsDefaultArgs instead
     */
    export type vendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = vendorsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}