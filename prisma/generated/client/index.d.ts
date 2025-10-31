/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model vendors
 *
 */
export type vendors = $Result.DefaultSelection<Prisma.$vendorsPayload>;
/**
 * Model drivers
 *
 */
export type drivers = $Result.DefaultSelection<Prisma.$driversPayload>;
/**
 * Model truck
 *
 */
export type truck = $Result.DefaultSelection<Prisma.$truckPayload>;
/**
 * Model user_admin
 *
 */
export type user_admin = $Result.DefaultSelection<Prisma.$user_adminPayload>;
/**
 * Model device
 *
 */
export type device = $Result.DefaultSelection<Prisma.$devicePayload>;
/**
 * Model sensor
 *
 */
export type sensor = $Result.DefaultSelection<Prisma.$sensorPayload>;
/**
 * Model location
 *
 */
export type location = $Result.DefaultSelection<Prisma.$locationPayload>;
/**
 * Model location_history
 *
 */
export type location_history = $Result.DefaultSelection<Prisma.$location_historyPayload>;
/**
 * Model alert
 *
 */
export type alert = $Result.DefaultSelection<Prisma.$alertPayload>;
/**
 * Model alert_events
 *
 */
export type alert_events = $Result.DefaultSelection<Prisma.$alert_eventsPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Vendors
 * const vendors = await prisma.vendors.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Vendors
   * const vendors = await prisma.vendors.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void
  ): void;

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
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

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
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.vendors`: Exposes CRUD operations for the **vendors** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Vendors
   * const vendors = await prisma.vendors.findMany()
   * ```
   */
  get vendors(): Prisma.vendorsDelegate<ExtArgs>;

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
   * `prisma.device`: Exposes CRUD operations for the **device** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Devices
   * const devices = await prisma.device.findMany()
   * ```
   */
  get device(): Prisma.deviceDelegate<ExtArgs>;

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
   * `prisma.location`: Exposes CRUD operations for the **location** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Locations
   * const locations = await prisma.location.findMany()
   * ```
   */
  get location(): Prisma.locationDelegate<ExtArgs>;

  /**
   * `prisma.location_history`: Exposes CRUD operations for the **location_history** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Location_histories
   * const location_histories = await prisma.location_history.findMany()
   * ```
   */
  get location_history(): Prisma.location_historyDelegate<ExtArgs>;

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
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

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
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
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
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    vendors: 'vendors';
    drivers: 'drivers';
    truck: 'truck';
    user_admin: 'user_admin';
    device: 'device';
    sensor: 'sensor';
    location: 'location';
    location_history: 'location_history';
    alert: 'alert';
    alert_events: 'alert_events';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps:
        | 'vendors'
        | 'drivers'
        | 'truck'
        | 'user_admin'
        | 'device'
        | 'sensor'
        | 'location'
        | 'location_history'
        | 'alert'
        | 'alert_events';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      vendors: {
        payload: Prisma.$vendorsPayload<ExtArgs>;
        fields: Prisma.vendorsFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.vendorsFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.vendorsFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>;
          };
          findFirst: {
            args: Prisma.vendorsFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.vendorsFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>;
          };
          findMany: {
            args: Prisma.vendorsFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>[];
          };
          create: {
            args: Prisma.vendorsCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>;
          };
          createMany: {
            args: Prisma.vendorsCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.vendorsCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>[];
          };
          delete: {
            args: Prisma.vendorsDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>;
          };
          update: {
            args: Prisma.vendorsUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>;
          };
          deleteMany: {
            args: Prisma.vendorsDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.vendorsUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.vendorsUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$vendorsPayload>;
          };
          aggregate: {
            args: Prisma.VendorsAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateVendors>;
          };
          groupBy: {
            args: Prisma.vendorsGroupByArgs<ExtArgs>;
            result: $Utils.Optional<VendorsGroupByOutputType>[];
          };
          count: {
            args: Prisma.vendorsCountArgs<ExtArgs>;
            result: $Utils.Optional<VendorsCountAggregateOutputType> | number;
          };
        };
      };
      drivers: {
        payload: Prisma.$driversPayload<ExtArgs>;
        fields: Prisma.driversFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.driversFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.driversFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>;
          };
          findFirst: {
            args: Prisma.driversFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.driversFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>;
          };
          findMany: {
            args: Prisma.driversFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[];
          };
          create: {
            args: Prisma.driversCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>;
          };
          createMany: {
            args: Prisma.driversCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.driversCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>[];
          };
          delete: {
            args: Prisma.driversDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>;
          };
          update: {
            args: Prisma.driversUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>;
          };
          deleteMany: {
            args: Prisma.driversDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.driversUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.driversUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$driversPayload>;
          };
          aggregate: {
            args: Prisma.DriversAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDrivers>;
          };
          groupBy: {
            args: Prisma.driversGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DriversGroupByOutputType>[];
          };
          count: {
            args: Prisma.driversCountArgs<ExtArgs>;
            result: $Utils.Optional<DriversCountAggregateOutputType> | number;
          };
        };
      };
      truck: {
        payload: Prisma.$truckPayload<ExtArgs>;
        fields: Prisma.truckFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.truckFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.truckFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>;
          };
          findFirst: {
            args: Prisma.truckFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.truckFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>;
          };
          findMany: {
            args: Prisma.truckFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>[];
          };
          create: {
            args: Prisma.truckCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>;
          };
          createMany: {
            args: Prisma.truckCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.truckCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>[];
          };
          delete: {
            args: Prisma.truckDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>;
          };
          update: {
            args: Prisma.truckUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>;
          };
          deleteMany: {
            args: Prisma.truckDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.truckUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.truckUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$truckPayload>;
          };
          aggregate: {
            args: Prisma.TruckAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTruck>;
          };
          groupBy: {
            args: Prisma.truckGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TruckGroupByOutputType>[];
          };
          count: {
            args: Prisma.truckCountArgs<ExtArgs>;
            result: $Utils.Optional<TruckCountAggregateOutputType> | number;
          };
        };
      };
      user_admin: {
        payload: Prisma.$user_adminPayload<ExtArgs>;
        fields: Prisma.user_adminFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.user_adminFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.user_adminFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>;
          };
          findFirst: {
            args: Prisma.user_adminFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.user_adminFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>;
          };
          findMany: {
            args: Prisma.user_adminFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>[];
          };
          create: {
            args: Prisma.user_adminCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>;
          };
          createMany: {
            args: Prisma.user_adminCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.user_adminCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>[];
          };
          delete: {
            args: Prisma.user_adminDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>;
          };
          update: {
            args: Prisma.user_adminUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>;
          };
          deleteMany: {
            args: Prisma.user_adminDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.user_adminUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.user_adminUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$user_adminPayload>;
          };
          aggregate: {
            args: Prisma.User_adminAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser_admin>;
          };
          groupBy: {
            args: Prisma.user_adminGroupByArgs<ExtArgs>;
            result: $Utils.Optional<User_adminGroupByOutputType>[];
          };
          count: {
            args: Prisma.user_adminCountArgs<ExtArgs>;
            result: $Utils.Optional<User_adminCountAggregateOutputType> | number;
          };
        };
      };
      device: {
        payload: Prisma.$devicePayload<ExtArgs>;
        fields: Prisma.deviceFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.deviceFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.deviceFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>;
          };
          findFirst: {
            args: Prisma.deviceFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.deviceFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>;
          };
          findMany: {
            args: Prisma.deviceFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>[];
          };
          create: {
            args: Prisma.deviceCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>;
          };
          createMany: {
            args: Prisma.deviceCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.deviceCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>[];
          };
          delete: {
            args: Prisma.deviceDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>;
          };
          update: {
            args: Prisma.deviceUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>;
          };
          deleteMany: {
            args: Prisma.deviceDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.deviceUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.deviceUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$devicePayload>;
          };
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDevice>;
          };
          groupBy: {
            args: Prisma.deviceGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DeviceGroupByOutputType>[];
          };
          count: {
            args: Prisma.deviceCountArgs<ExtArgs>;
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number;
          };
        };
      };
      sensor: {
        payload: Prisma.$sensorPayload<ExtArgs>;
        fields: Prisma.sensorFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.sensorFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.sensorFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>;
          };
          findFirst: {
            args: Prisma.sensorFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.sensorFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>;
          };
          findMany: {
            args: Prisma.sensorFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>[];
          };
          create: {
            args: Prisma.sensorCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>;
          };
          createMany: {
            args: Prisma.sensorCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.sensorCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>[];
          };
          delete: {
            args: Prisma.sensorDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>;
          };
          update: {
            args: Prisma.sensorUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>;
          };
          deleteMany: {
            args: Prisma.sensorDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.sensorUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.sensorUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$sensorPayload>;
          };
          aggregate: {
            args: Prisma.SensorAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSensor>;
          };
          groupBy: {
            args: Prisma.sensorGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SensorGroupByOutputType>[];
          };
          count: {
            args: Prisma.sensorCountArgs<ExtArgs>;
            result: $Utils.Optional<SensorCountAggregateOutputType> | number;
          };
        };
      };
      location: {
        payload: Prisma.$locationPayload<ExtArgs>;
        fields: Prisma.locationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.locationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.locationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>;
          };
          findFirst: {
            args: Prisma.locationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.locationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>;
          };
          findMany: {
            args: Prisma.locationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>[];
          };
          create: {
            args: Prisma.locationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>;
          };
          createMany: {
            args: Prisma.locationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.locationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>[];
          };
          delete: {
            args: Prisma.locationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>;
          };
          update: {
            args: Prisma.locationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>;
          };
          deleteMany: {
            args: Prisma.locationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.locationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.locationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$locationPayload>;
          };
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateLocation>;
          };
          groupBy: {
            args: Prisma.locationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<LocationGroupByOutputType>[];
          };
          count: {
            args: Prisma.locationCountArgs<ExtArgs>;
            result: $Utils.Optional<LocationCountAggregateOutputType> | number;
          };
        };
      };
      location_history: {
        payload: Prisma.$location_historyPayload<ExtArgs>;
        fields: Prisma.location_historyFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.location_historyFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.location_historyFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>;
          };
          findFirst: {
            args: Prisma.location_historyFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.location_historyFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>;
          };
          findMany: {
            args: Prisma.location_historyFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>[];
          };
          create: {
            args: Prisma.location_historyCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>;
          };
          createMany: {
            args: Prisma.location_historyCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.location_historyCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>[];
          };
          delete: {
            args: Prisma.location_historyDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>;
          };
          update: {
            args: Prisma.location_historyUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>;
          };
          deleteMany: {
            args: Prisma.location_historyDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.location_historyUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.location_historyUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$location_historyPayload>;
          };
          aggregate: {
            args: Prisma.Location_historyAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateLocation_history>;
          };
          groupBy: {
            args: Prisma.location_historyGroupByArgs<ExtArgs>;
            result: $Utils.Optional<Location_historyGroupByOutputType>[];
          };
          count: {
            args: Prisma.location_historyCountArgs<ExtArgs>;
            result: $Utils.Optional<Location_historyCountAggregateOutputType> | number;
          };
        };
      };
      alert: {
        payload: Prisma.$alertPayload<ExtArgs>;
        fields: Prisma.alertFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.alertFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.alertFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>;
          };
          findFirst: {
            args: Prisma.alertFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.alertFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>;
          };
          findMany: {
            args: Prisma.alertFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>[];
          };
          create: {
            args: Prisma.alertCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>;
          };
          createMany: {
            args: Prisma.alertCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.alertCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>[];
          };
          delete: {
            args: Prisma.alertDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>;
          };
          update: {
            args: Prisma.alertUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>;
          };
          deleteMany: {
            args: Prisma.alertDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.alertUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.alertUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alertPayload>;
          };
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAlert>;
          };
          groupBy: {
            args: Prisma.alertGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AlertGroupByOutputType>[];
          };
          count: {
            args: Prisma.alertCountArgs<ExtArgs>;
            result: $Utils.Optional<AlertCountAggregateOutputType> | number;
          };
        };
      };
      alert_events: {
        payload: Prisma.$alert_eventsPayload<ExtArgs>;
        fields: Prisma.alert_eventsFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.alert_eventsFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.alert_eventsFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>;
          };
          findFirst: {
            args: Prisma.alert_eventsFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.alert_eventsFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>;
          };
          findMany: {
            args: Prisma.alert_eventsFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>[];
          };
          create: {
            args: Prisma.alert_eventsCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>;
          };
          createMany: {
            args: Prisma.alert_eventsCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.alert_eventsCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>[];
          };
          delete: {
            args: Prisma.alert_eventsDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>;
          };
          update: {
            args: Prisma.alert_eventsUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>;
          };
          deleteMany: {
            args: Prisma.alert_eventsDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.alert_eventsUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.alert_eventsUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$alert_eventsPayload>;
          };
          aggregate: {
            args: Prisma.Alert_eventsAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAlert_events>;
          };
          groupBy: {
            args: Prisma.alert_eventsGroupByArgs<ExtArgs>;
            result: $Utils.Optional<Alert_eventsGroupByOutputType>[];
          };
          count: {
            args: Prisma.alert_eventsCountArgs<ExtArgs>;
            result: $Utils.Optional<Alert_eventsCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
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
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
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
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type VendorsCountOutputType
   */

  export type VendorsCountOutputType = {
    drivers: number;
    trucks: number;
  };

  export type VendorsCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    drivers?: boolean | VendorsCountOutputTypeCountDriversArgs;
    trucks?: boolean | VendorsCountOutputTypeCountTrucksArgs;
  };

  // Custom InputTypes
  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VendorsCountOutputType
     */
    select?: VendorsCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeCountDriversArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: driversWhereInput;
  };

  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeCountTrucksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: truckWhereInput;
  };

  /**
   * Count Type DriversCountOutputType
   */

  export type DriversCountOutputType = {
    trucks: number;
  };

  export type DriversCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    trucks?: boolean | DriversCountOutputTypeCountTrucksArgs;
  };

  // Custom InputTypes
  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DriversCountOutputType
     */
    select?: DriversCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * DriversCountOutputType without action
   */
  export type DriversCountOutputTypeCountTrucksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: truckWhereInput;
  };

  /**
   * Count Type TruckCountOutputType
   */

  export type TruckCountOutputType = {
    devices: number;
    alert_events: number;
  };

  export type TruckCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    devices?: boolean | TruckCountOutputTypeCountDevicesArgs;
    alert_events?: boolean | TruckCountOutputTypeCountAlert_eventsArgs;
  };

  // Custom InputTypes
  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the TruckCountOutputType
     */
    select?: TruckCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeCountDevicesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: deviceWhereInput;
  };

  /**
   * TruckCountOutputType without action
   */
  export type TruckCountOutputTypeCountAlert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: alert_eventsWhereInput;
  };

  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    sensors: number;
    locations: number;
    location_history: number;
    alert_events: number;
  };

  export type DeviceCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sensors?: boolean | DeviceCountOutputTypeCountSensorsArgs;
    locations?: boolean | DeviceCountOutputTypeCountLocationsArgs;
    location_history?: boolean | DeviceCountOutputTypeCountLocation_historyArgs;
    alert_events?: boolean | DeviceCountOutputTypeCountAlert_eventsArgs;
  };

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountSensorsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: sensorWhereInput;
  };

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountLocationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: locationWhereInput;
  };

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountLocation_historyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: location_historyWhereInput;
  };

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountAlert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: alert_eventsWhereInput;
  };

  /**
   * Count Type SensorCountOutputType
   */

  export type SensorCountOutputType = {
    alert_events: number;
  };

  export type SensorCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    alert_events?: boolean | SensorCountOutputTypeCountAlert_eventsArgs;
  };

  // Custom InputTypes
  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the SensorCountOutputType
     */
    select?: SensorCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountAlert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: alert_eventsWhereInput;
  };

  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    location_history: number;
  };

  export type LocationCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    location_history?: boolean | LocationCountOutputTypeCountLocation_historyArgs;
  };

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountLocation_historyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: location_historyWhereInput;
  };

  /**
   * Count Type AlertCountOutputType
   */

  export type AlertCountOutputType = {
    alert_events: number;
  };

  export type AlertCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    alert_events?: boolean | AlertCountOutputTypeCountAlert_eventsArgs;
  };

  // Custom InputTypes
  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AlertCountOutputType
     */
    select?: AlertCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeCountAlert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: alert_eventsWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model vendors
   */

  export type AggregateVendors = {
    _count: VendorsCountAggregateOutputType | null;
    _avg: VendorsAvgAggregateOutputType | null;
    _sum: VendorsSumAggregateOutputType | null;
    _min: VendorsMinAggregateOutputType | null;
    _max: VendorsMaxAggregateOutputType | null;
  };

  export type VendorsAvgAggregateOutputType = {
    id: number | null;
  };

  export type VendorsSumAggregateOutputType = {
    id: number | null;
  };

  export type VendorsMinAggregateOutputType = {
    id: number | null;
    name_vendor: string | null;
    address: string | null;
    telephone: string | null;
    email: string | null;
    contact_person: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type VendorsMaxAggregateOutputType = {
    id: number | null;
    name_vendor: string | null;
    address: string | null;
    telephone: string | null;
    email: string | null;
    contact_person: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type VendorsCountAggregateOutputType = {
    id: number;
    name_vendor: number;
    address: number;
    telephone: number;
    email: number;
    contact_person: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type VendorsAvgAggregateInputType = {
    id?: true;
  };

  export type VendorsSumAggregateInputType = {
    id?: true;
  };

  export type VendorsMinAggregateInputType = {
    id?: true;
    name_vendor?: true;
    address?: true;
    telephone?: true;
    email?: true;
    contact_person?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type VendorsMaxAggregateInputType = {
    id?: true;
    name_vendor?: true;
    address?: true;
    telephone?: true;
    email?: true;
    contact_person?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type VendorsCountAggregateInputType = {
    id?: true;
    name_vendor?: true;
    address?: true;
    telephone?: true;
    email?: true;
    contact_person?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type VendorsAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which vendors to aggregate.
     */
    where?: vendorsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: vendorsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned vendors
     **/
    _count?: true | VendorsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: VendorsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: VendorsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VendorsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VendorsMaxAggregateInputType;
  };

  export type GetVendorsAggregateType<T extends VendorsAggregateArgs> = {
    [P in keyof T & keyof AggregateVendors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendors[P]>
      : GetScalarType<T[P], AggregateVendors[P]>;
  };

  export type vendorsGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: vendorsWhereInput;
    orderBy?: vendorsOrderByWithAggregationInput | vendorsOrderByWithAggregationInput[];
    by: VendorsScalarFieldEnum[] | VendorsScalarFieldEnum;
    having?: vendorsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorsCountAggregateInputType | true;
    _avg?: VendorsAvgAggregateInputType;
    _sum?: VendorsSumAggregateInputType;
    _min?: VendorsMinAggregateInputType;
    _max?: VendorsMaxAggregateInputType;
  };

  export type VendorsGroupByOutputType = {
    id: number;
    name_vendor: string;
    address: string | null;
    telephone: string | null;
    email: string | null;
    contact_person: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: VendorsCountAggregateOutputType | null;
    _avg: VendorsAvgAggregateOutputType | null;
    _sum: VendorsSumAggregateOutputType | null;
    _min: VendorsMinAggregateOutputType | null;
    _max: VendorsMaxAggregateOutputType | null;
  };

  type GetVendorsGroupByPayload<T extends vendorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorsGroupByOutputType, T['by']> & {
        [P in keyof T & keyof VendorsGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VendorsGroupByOutputType[P]>
          : GetScalarType<T[P], VendorsGroupByOutputType[P]>;
      }
    >
  >;

  export type vendorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name_vendor?: boolean;
        address?: boolean;
        telephone?: boolean;
        email?: boolean;
        contact_person?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
        drivers?: boolean | vendors$driversArgs<ExtArgs>;
        trucks?: boolean | vendors$trucksArgs<ExtArgs>;
        _count?: boolean | VendorsCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['vendors']
    >;

  export type vendorsSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name_vendor?: boolean;
      address?: boolean;
      telephone?: boolean;
      email?: boolean;
      contact_person?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['vendors']
  >;

  export type vendorsSelectScalar = {
    id?: boolean;
    name_vendor?: boolean;
    address?: boolean;
    telephone?: boolean;
    email?: boolean;
    contact_person?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type vendorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    drivers?: boolean | vendors$driversArgs<ExtArgs>;
    trucks?: boolean | vendors$trucksArgs<ExtArgs>;
    _count?: boolean | VendorsCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type vendorsIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $vendorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'vendors';
      objects: {
        drivers: Prisma.$driversPayload<ExtArgs>[];
        trucks: Prisma.$truckPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          name_vendor: string;
          address: string | null;
          telephone: string | null;
          email: string | null;
          contact_person: string | null;
          created_at: Date;
          updated_at: Date;
          deleted_at: Date | null;
        },
        ExtArgs['result']['vendors']
      >;
      composites: {};
    };

  type vendorsGetPayload<S extends boolean | null | undefined | vendorsDefaultArgs> =
    $Result.GetResult<Prisma.$vendorsPayload, S>;

  type vendorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    vendorsFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: VendorsCountAggregateInputType | true;
  };

  export interface vendorsDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['vendors']; meta: { name: 'vendors' } };
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
    findUnique<T extends vendorsFindUniqueArgs>(
      args: SelectSubset<T, vendorsFindUniqueArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends vendorsFindUniqueOrThrowArgs>(
      args: SelectSubset<T, vendorsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends vendorsFindFirstArgs>(
      args?: SelectSubset<T, vendorsFindFirstArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends vendorsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, vendorsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends vendorsFindManyArgs>(
      args?: SelectSubset<T, vendorsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends vendorsCreateArgs>(
      args: SelectSubset<T, vendorsCreateArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends vendorsCreateManyArgs>(
      args?: SelectSubset<T, vendorsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends vendorsCreateManyAndReturnArgs>(
      args?: SelectSubset<T, vendorsCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends vendorsDeleteArgs>(
      args: SelectSubset<T, vendorsDeleteArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends vendorsUpdateArgs>(
      args: SelectSubset<T, vendorsUpdateArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends vendorsDeleteManyArgs>(
      args?: SelectSubset<T, vendorsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends vendorsUpdateManyArgs>(
      args: SelectSubset<T, vendorsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends vendorsUpsertArgs>(
      args: SelectSubset<T, vendorsUpsertArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, vendorsCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorsCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends VendorsAggregateArgs>(
      args: Subset<T, VendorsAggregateArgs>
    ): Prisma.PrismaPromise<GetVendorsAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, vendorsGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetVendorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__vendorsClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    drivers<T extends vendors$driversArgs<ExtArgs> = {}>(
      args?: Subset<T, vendors$driversArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    trucks<T extends vendors$trucksArgs<ExtArgs> = {}>(
      args?: Subset<T, vendors$trucksArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findMany'> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the vendors model
   */
  interface vendorsFieldRefs {
    readonly id: FieldRef<'vendors', 'Int'>;
    readonly name_vendor: FieldRef<'vendors', 'String'>;
    readonly address: FieldRef<'vendors', 'String'>;
    readonly telephone: FieldRef<'vendors', 'String'>;
    readonly email: FieldRef<'vendors', 'String'>;
    readonly contact_person: FieldRef<'vendors', 'String'>;
    readonly created_at: FieldRef<'vendors', 'DateTime'>;
    readonly updated_at: FieldRef<'vendors', 'DateTime'>;
    readonly deleted_at: FieldRef<'vendors', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * vendors findUnique
   */
  export type vendorsFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * Filter, which vendors to fetch.
     */
    where: vendorsWhereUniqueInput;
  };

  /**
   * vendors findUniqueOrThrow
   */
  export type vendorsFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * Filter, which vendors to fetch.
     */
    where: vendorsWhereUniqueInput;
  };

  /**
   * vendors findFirst
   */
  export type vendorsFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * Filter, which vendors to fetch.
     */
    where?: vendorsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for vendors.
     */
    cursor?: vendorsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of vendors.
     */
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[];
  };

  /**
   * vendors findFirstOrThrow
   */
  export type vendorsFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * Filter, which vendors to fetch.
     */
    where?: vendorsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for vendors.
     */
    cursor?: vendorsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` vendors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of vendors.
     */
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[];
  };

  /**
   * vendors findMany
   */
  export type vendorsFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * Filter, which vendors to fetch.
     */
    where?: vendorsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of vendors to fetch.
     */
    orderBy?: vendorsOrderByWithRelationInput | vendorsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing vendors.
     */
    cursor?: vendorsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` vendors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` vendors.
     */
    skip?: number;
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[];
  };

  /**
   * vendors create
   */
  export type vendorsCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * The data needed to create a vendors.
     */
    data: XOR<vendorsCreateInput, vendorsUncheckedCreateInput>;
  };

  /**
   * vendors createMany
   */
  export type vendorsCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many vendors.
     */
    data: vendorsCreateManyInput | vendorsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * vendors createManyAndReturn
   */
  export type vendorsCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many vendors.
     */
    data: vendorsCreateManyInput | vendorsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * vendors update
   */
  export type vendorsUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * The data needed to update a vendors.
     */
    data: XOR<vendorsUpdateInput, vendorsUncheckedUpdateInput>;
    /**
     * Choose, which vendors to update.
     */
    where: vendorsWhereUniqueInput;
  };

  /**
   * vendors updateMany
   */
  export type vendorsUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update vendors.
     */
    data: XOR<vendorsUpdateManyMutationInput, vendorsUncheckedUpdateManyInput>;
    /**
     * Filter which vendors to update
     */
    where?: vendorsWhereInput;
  };

  /**
   * vendors upsert
   */
  export type vendorsUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * The filter to search for the vendors to update in case it exists.
     */
    where: vendorsWhereUniqueInput;
    /**
     * In case the vendors found by the `where` argument doesn't exist, create a new vendors with this data.
     */
    create: XOR<vendorsCreateInput, vendorsUncheckedCreateInput>;
    /**
     * In case the vendors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<vendorsUpdateInput, vendorsUncheckedUpdateInput>;
  };

  /**
   * vendors delete
   */
  export type vendorsDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    /**
     * Filter which vendors to delete.
     */
    where: vendorsWhereUniqueInput;
  };

  /**
   * vendors deleteMany
   */
  export type vendorsDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which vendors to delete
     */
    where?: vendorsWhereInput;
  };

  /**
   * vendors.drivers
   */
  export type vendors$driversArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    where?: driversWhereInput;
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[];
    cursor?: driversWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[];
  };

  /**
   * vendors.trucks
   */
  export type vendors$trucksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    where?: truckWhereInput;
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[];
    cursor?: truckWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[];
  };

  /**
   * vendors without action
   */
  export type vendorsDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
  };

  /**
   * Model drivers
   */

  export type AggregateDrivers = {
    _count: DriversCountAggregateOutputType | null;
    _avg: DriversAvgAggregateOutputType | null;
    _sum: DriversSumAggregateOutputType | null;
    _min: DriversMinAggregateOutputType | null;
    _max: DriversMaxAggregateOutputType | null;
  };

  export type DriversAvgAggregateOutputType = {
    id: number | null;
    vendor_id: number | null;
  };

  export type DriversSumAggregateOutputType = {
    id: number | null;
    vendor_id: number | null;
  };

  export type DriversMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    license_number: string | null;
    license_type: string | null;
    license_expiry: Date | null;
    vendor_id: number | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type DriversMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    license_number: string | null;
    license_type: string | null;
    license_expiry: Date | null;
    vendor_id: number | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type DriversCountAggregateOutputType = {
    id: number;
    name: number;
    phone: number;
    email: number;
    license_number: number;
    license_type: number;
    license_expiry: number;
    vendor_id: number;
    status: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type DriversAvgAggregateInputType = {
    id?: true;
    vendor_id?: true;
  };

  export type DriversSumAggregateInputType = {
    id?: true;
    vendor_id?: true;
  };

  export type DriversMinAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    license_number?: true;
    license_type?: true;
    license_expiry?: true;
    vendor_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type DriversMaxAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    license_number?: true;
    license_type?: true;
    license_expiry?: true;
    vendor_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type DriversCountAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    license_number?: true;
    license_type?: true;
    license_expiry?: true;
    vendor_id?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type DriversAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which drivers to aggregate.
     */
    where?: driversWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: driversWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` drivers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned drivers
     **/
    _count?: true | DriversCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: DriversAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: DriversSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DriversMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DriversMaxAggregateInputType;
  };

  export type GetDriversAggregateType<T extends DriversAggregateArgs> = {
    [P in keyof T & keyof AggregateDrivers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrivers[P]>
      : GetScalarType<T[P], AggregateDrivers[P]>;
  };

  export type driversGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: driversWhereInput;
    orderBy?: driversOrderByWithAggregationInput | driversOrderByWithAggregationInput[];
    by: DriversScalarFieldEnum[] | DriversScalarFieldEnum;
    having?: driversScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DriversCountAggregateInputType | true;
    _avg?: DriversAvgAggregateInputType;
    _sum?: DriversSumAggregateInputType;
    _min?: DriversMinAggregateInputType;
    _max?: DriversMaxAggregateInputType;
  };

  export type DriversGroupByOutputType = {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date;
    vendor_id: number | null;
    status: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: DriversCountAggregateOutputType | null;
    _avg: DriversAvgAggregateOutputType | null;
    _sum: DriversSumAggregateOutputType | null;
    _min: DriversMinAggregateOutputType | null;
    _max: DriversMaxAggregateOutputType | null;
  };

  type GetDriversGroupByPayload<T extends driversGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriversGroupByOutputType, T['by']> & {
        [P in keyof T & keyof DriversGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], DriversGroupByOutputType[P]>
          : GetScalarType<T[P], DriversGroupByOutputType[P]>;
      }
    >
  >;

  export type driversSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        phone?: boolean;
        email?: boolean;
        license_number?: boolean;
        license_type?: boolean;
        license_expiry?: boolean;
        vendor_id?: boolean;
        status?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
        vendor?: boolean | drivers$vendorArgs<ExtArgs>;
        trucks?: boolean | drivers$trucksArgs<ExtArgs>;
        _count?: boolean | DriversCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['drivers']
    >;

  export type driversSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      phone?: boolean;
      email?: boolean;
      license_number?: boolean;
      license_type?: boolean;
      license_expiry?: boolean;
      vendor_id?: boolean;
      status?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      vendor?: boolean | drivers$vendorArgs<ExtArgs>;
    },
    ExtArgs['result']['drivers']
  >;

  export type driversSelectScalar = {
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    license_number?: boolean;
    license_type?: boolean;
    license_expiry?: boolean;
    vendor_id?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type driversInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | drivers$vendorArgs<ExtArgs>;
    trucks?: boolean | drivers$trucksArgs<ExtArgs>;
    _count?: boolean | DriversCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type driversIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    vendor?: boolean | drivers$vendorArgs<ExtArgs>;
  };

  export type $driversPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'drivers';
      objects: {
        vendor: Prisma.$vendorsPayload<ExtArgs> | null;
        trucks: Prisma.$truckPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: number;
          name: string;
          phone: string | null;
          email: string | null;
          license_number: string;
          license_type: string;
          license_expiry: Date;
          vendor_id: number | null;
          status: string;
          created_at: Date;
          updated_at: Date;
          deleted_at: Date | null;
        },
        ExtArgs['result']['drivers']
      >;
      composites: {};
    };

  type driversGetPayload<S extends boolean | null | undefined | driversDefaultArgs> =
    $Result.GetResult<Prisma.$driversPayload, S>;

  type driversCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    driversFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: DriversCountAggregateInputType | true;
  };

  export interface driversDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['drivers']; meta: { name: 'drivers' } };
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
    findUnique<T extends driversFindUniqueArgs>(
      args: SelectSubset<T, driversFindUniqueArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends driversFindUniqueOrThrowArgs>(
      args: SelectSubset<T, driversFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends driversFindFirstArgs>(
      args?: SelectSubset<T, driversFindFirstArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends driversFindFirstOrThrowArgs>(
      args?: SelectSubset<T, driversFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends driversFindManyArgs>(
      args?: SelectSubset<T, driversFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends driversCreateArgs>(
      args: SelectSubset<T, driversCreateArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends driversCreateManyArgs>(
      args?: SelectSubset<T, driversCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends driversCreateManyAndReturnArgs>(
      args?: SelectSubset<T, driversCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends driversDeleteArgs>(
      args: SelectSubset<T, driversDeleteArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends driversUpdateArgs>(
      args: SelectSubset<T, driversUpdateArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends driversDeleteManyArgs>(
      args?: SelectSubset<T, driversDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends driversUpdateManyArgs>(
      args: SelectSubset<T, driversUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends driversUpsertArgs>(
      args: SelectSubset<T, driversUpsertArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, driversCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriversCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends DriversAggregateArgs>(
      args: Subset<T, DriversAggregateArgs>
    ): Prisma.PrismaPromise<GetDriversAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, driversGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetDriversGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__driversClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    vendor<T extends drivers$vendorArgs<ExtArgs> = {}>(
      args?: Subset<T, drivers$vendorArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    trucks<T extends drivers$trucksArgs<ExtArgs> = {}>(
      args?: Subset<T, drivers$trucksArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findMany'> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the drivers model
   */
  interface driversFieldRefs {
    readonly id: FieldRef<'drivers', 'Int'>;
    readonly name: FieldRef<'drivers', 'String'>;
    readonly phone: FieldRef<'drivers', 'String'>;
    readonly email: FieldRef<'drivers', 'String'>;
    readonly license_number: FieldRef<'drivers', 'String'>;
    readonly license_type: FieldRef<'drivers', 'String'>;
    readonly license_expiry: FieldRef<'drivers', 'DateTime'>;
    readonly vendor_id: FieldRef<'drivers', 'Int'>;
    readonly status: FieldRef<'drivers', 'String'>;
    readonly created_at: FieldRef<'drivers', 'DateTime'>;
    readonly updated_at: FieldRef<'drivers', 'DateTime'>;
    readonly deleted_at: FieldRef<'drivers', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * drivers findUnique
   */
  export type driversFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput;
  };

  /**
   * drivers findUniqueOrThrow
   */
  export type driversFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * Filter, which drivers to fetch.
     */
    where: driversWhereUniqueInput;
  };

  /**
   * drivers findFirst
   */
  export type driversFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` drivers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[];
  };

  /**
   * drivers findFirstOrThrow
   */
  export type driversFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for drivers.
     */
    cursor?: driversWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` drivers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of drivers.
     */
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[];
  };

  /**
   * drivers findMany
   */
  export type driversFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * Filter, which drivers to fetch.
     */
    where?: driversWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of drivers to fetch.
     */
    orderBy?: driversOrderByWithRelationInput | driversOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing drivers.
     */
    cursor?: driversWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` drivers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` drivers.
     */
    skip?: number;
    distinct?: DriversScalarFieldEnum | DriversScalarFieldEnum[];
  };

  /**
   * drivers create
   */
  export type driversCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * The data needed to create a drivers.
     */
    data: XOR<driversCreateInput, driversUncheckedCreateInput>;
  };

  /**
   * drivers createMany
   */
  export type driversCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * drivers createManyAndReturn
   */
  export type driversCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many drivers.
     */
    data: driversCreateManyInput | driversCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * drivers update
   */
  export type driversUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * The data needed to update a drivers.
     */
    data: XOR<driversUpdateInput, driversUncheckedUpdateInput>;
    /**
     * Choose, which drivers to update.
     */
    where: driversWhereUniqueInput;
  };

  /**
   * drivers updateMany
   */
  export type driversUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update drivers.
     */
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyInput>;
    /**
     * Filter which drivers to update
     */
    where?: driversWhereInput;
  };

  /**
   * drivers upsert
   */
  export type driversUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * The filter to search for the drivers to update in case it exists.
     */
    where: driversWhereUniqueInput;
    /**
     * In case the drivers found by the `where` argument doesn't exist, create a new drivers with this data.
     */
    create: XOR<driversCreateInput, driversUncheckedCreateInput>;
    /**
     * In case the drivers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<driversUpdateInput, driversUncheckedUpdateInput>;
  };

  /**
   * drivers delete
   */
  export type driversDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
    /**
     * Filter which drivers to delete.
     */
    where: driversWhereUniqueInput;
  };

  /**
   * drivers deleteMany
   */
  export type driversDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which drivers to delete
     */
    where?: driversWhereInput;
  };

  /**
   * drivers.vendor
   */
  export type drivers$vendorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the vendors
     */
    select?: vendorsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: vendorsInclude<ExtArgs> | null;
    where?: vendorsWhereInput;
  };

  /**
   * drivers.trucks
   */
  export type drivers$trucksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    where?: truckWhereInput;
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[];
    cursor?: truckWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[];
  };

  /**
   * drivers without action
   */
  export type driversDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the drivers
     */
    select?: driversSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: driversInclude<ExtArgs> | null;
  };

  /**
   * Model truck
   */

  export type AggregateTruck = {
    _count: TruckCountAggregateOutputType | null;
    _avg: TruckAvgAggregateOutputType | null;
    _sum: TruckSumAggregateOutputType | null;
    _min: TruckMinAggregateOutputType | null;
    _max: TruckMaxAggregateOutputType | null;
  };

  export type TruckAvgAggregateOutputType = {
    year: number | null;
    vendor_id: number | null;
    driver_id: number | null;
  };

  export type TruckSumAggregateOutputType = {
    year: number | null;
    vendor_id: number | null;
    driver_id: number | null;
  };

  export type TruckMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    image: string | null;
    year: number | null;
    model: string | null;
    type: string | null;
    vendor_id: number | null;
    status: string | null;
    vin: string | null;
    plate: string | null;
    driver_id: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
    created_by: string | null;
    updated_by: string | null;
  };

  export type TruckMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    image: string | null;
    year: number | null;
    model: string | null;
    type: string | null;
    vendor_id: number | null;
    status: string | null;
    vin: string | null;
    plate: string | null;
    driver_id: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
    created_by: string | null;
    updated_by: string | null;
  };

  export type TruckCountAggregateOutputType = {
    id: number;
    name: number;
    image: number;
    year: number;
    model: number;
    type: number;
    vendor_id: number;
    status: number;
    vin: number;
    plate: number;
    driver_id: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    created_by: number;
    updated_by: number;
    _all: number;
  };

  export type TruckAvgAggregateInputType = {
    year?: true;
    vendor_id?: true;
    driver_id?: true;
  };

  export type TruckSumAggregateInputType = {
    year?: true;
    vendor_id?: true;
    driver_id?: true;
  };

  export type TruckMinAggregateInputType = {
    id?: true;
    name?: true;
    image?: true;
    year?: true;
    model?: true;
    type?: true;
    vendor_id?: true;
    status?: true;
    vin?: true;
    plate?: true;
    driver_id?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    created_by?: true;
    updated_by?: true;
  };

  export type TruckMaxAggregateInputType = {
    id?: true;
    name?: true;
    image?: true;
    year?: true;
    model?: true;
    type?: true;
    vendor_id?: true;
    status?: true;
    vin?: true;
    plate?: true;
    driver_id?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    created_by?: true;
    updated_by?: true;
  };

  export type TruckCountAggregateInputType = {
    id?: true;
    name?: true;
    image?: true;
    year?: true;
    model?: true;
    type?: true;
    vendor_id?: true;
    status?: true;
    vin?: true;
    plate?: true;
    driver_id?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    created_by?: true;
    updated_by?: true;
    _all?: true;
  };

  export type TruckAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which truck to aggregate.
     */
    where?: truckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: truckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` trucks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned trucks
     **/
    _count?: true | TruckCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TruckAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TruckSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TruckMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TruckMaxAggregateInputType;
  };

  export type GetTruckAggregateType<T extends TruckAggregateArgs> = {
    [P in keyof T & keyof AggregateTruck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTruck[P]>
      : GetScalarType<T[P], AggregateTruck[P]>;
  };

  export type truckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: truckWhereInput;
      orderBy?: truckOrderByWithAggregationInput | truckOrderByWithAggregationInput[];
      by: TruckScalarFieldEnum[] | TruckScalarFieldEnum;
      having?: truckScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: TruckCountAggregateInputType | true;
      _avg?: TruckAvgAggregateInputType;
      _sum?: TruckSumAggregateInputType;
      _min?: TruckMinAggregateInputType;
      _max?: TruckMaxAggregateInputType;
    };

  export type TruckGroupByOutputType = {
    id: string;
    name: string;
    image: string | null;
    year: number | null;
    model: string | null;
    type: string | null;
    vendor_id: number | null;
    status: string;
    vin: string | null;
    plate: string | null;
    driver_id: number | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    created_by: string | null;
    updated_by: string | null;
    _count: TruckCountAggregateOutputType | null;
    _avg: TruckAvgAggregateOutputType | null;
    _sum: TruckSumAggregateOutputType | null;
    _min: TruckMinAggregateOutputType | null;
    _max: TruckMaxAggregateOutputType | null;
  };

  type GetTruckGroupByPayload<T extends truckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TruckGroupByOutputType, T['by']> & {
        [P in keyof T & keyof TruckGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], TruckGroupByOutputType[P]>
          : GetScalarType<T[P], TruckGroupByOutputType[P]>;
      }
    >
  >;

  export type truckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        image?: boolean;
        year?: boolean;
        model?: boolean;
        type?: boolean;
        vendor_id?: boolean;
        status?: boolean;
        vin?: boolean;
        plate?: boolean;
        driver_id?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
        created_by?: boolean;
        updated_by?: boolean;
        vendor?: boolean | truck$vendorArgs<ExtArgs>;
        driver?: boolean | truck$driverArgs<ExtArgs>;
        devices?: boolean | truck$devicesArgs<ExtArgs>;
        alert_events?: boolean | truck$alert_eventsArgs<ExtArgs>;
        _count?: boolean | TruckCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['truck']
    >;

  export type truckSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      image?: boolean;
      year?: boolean;
      model?: boolean;
      type?: boolean;
      vendor_id?: boolean;
      status?: boolean;
      vin?: boolean;
      plate?: boolean;
      driver_id?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      created_by?: boolean;
      updated_by?: boolean;
      vendor?: boolean | truck$vendorArgs<ExtArgs>;
      driver?: boolean | truck$driverArgs<ExtArgs>;
    },
    ExtArgs['result']['truck']
  >;

  export type truckSelectScalar = {
    id?: boolean;
    name?: boolean;
    image?: boolean;
    year?: boolean;
    model?: boolean;
    type?: boolean;
    vendor_id?: boolean;
    status?: boolean;
    vin?: boolean;
    plate?: boolean;
    driver_id?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    created_by?: boolean;
    updated_by?: boolean;
  };

  export type truckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | truck$vendorArgs<ExtArgs>;
    driver?: boolean | truck$driverArgs<ExtArgs>;
    devices?: boolean | truck$devicesArgs<ExtArgs>;
    alert_events?: boolean | truck$alert_eventsArgs<ExtArgs>;
    _count?: boolean | TruckCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type truckIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    vendor?: boolean | truck$vendorArgs<ExtArgs>;
    driver?: boolean | truck$driverArgs<ExtArgs>;
  };

  export type $truckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'truck';
    objects: {
      vendor: Prisma.$vendorsPayload<ExtArgs> | null;
      driver: Prisma.$driversPayload<ExtArgs> | null;
      devices: Prisma.$devicePayload<ExtArgs>[];
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        image: string | null;
        year: number | null;
        model: string | null;
        type: string | null;
        vendor_id: number | null;
        status: string;
        vin: string | null;
        plate: string | null;
        driver_id: number | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
        created_by: string | null;
        updated_by: string | null;
      },
      ExtArgs['result']['truck']
    >;
    composites: {};
  };

  type truckGetPayload<S extends boolean | null | undefined | truckDefaultArgs> = $Result.GetResult<
    Prisma.$truckPayload,
    S
  >;

  type truckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    truckFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: TruckCountAggregateInputType | true;
  };

  export interface truckDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['truck']; meta: { name: 'truck' } };
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
    findUnique<T extends truckFindUniqueArgs>(
      args: SelectSubset<T, truckFindUniqueArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends truckFindUniqueOrThrowArgs>(
      args: SelectSubset<T, truckFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends truckFindFirstArgs>(
      args?: SelectSubset<T, truckFindFirstArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends truckFindFirstOrThrowArgs>(
      args?: SelectSubset<T, truckFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends truckFindManyArgs>(
      args?: SelectSubset<T, truckFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends truckCreateArgs>(
      args: SelectSubset<T, truckCreateArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends truckCreateManyArgs>(
      args?: SelectSubset<T, truckCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends truckCreateManyAndReturnArgs>(
      args?: SelectSubset<T, truckCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends truckDeleteArgs>(
      args: SelectSubset<T, truckDeleteArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends truckUpdateArgs>(
      args: SelectSubset<T, truckUpdateArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends truckDeleteManyArgs>(
      args?: SelectSubset<T, truckDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends truckUpdateManyArgs>(
      args: SelectSubset<T, truckUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends truckUpsertArgs>(
      args: SelectSubset<T, truckUpsertArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, truckCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TruckCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends TruckAggregateArgs>(
      args: Subset<T, TruckAggregateArgs>
    ): Prisma.PrismaPromise<GetTruckAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, truckGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetTruckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__truckClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    vendor<T extends truck$vendorArgs<ExtArgs> = {}>(
      args?: Subset<T, truck$vendorArgs<ExtArgs>>
    ): Prisma__vendorsClient<
      $Result.GetResult<Prisma.$vendorsPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    driver<T extends truck$driverArgs<ExtArgs> = {}>(
      args?: Subset<T, truck$driverArgs<ExtArgs>>
    ): Prisma__driversClient<
      $Result.GetResult<Prisma.$driversPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    devices<T extends truck$devicesArgs<ExtArgs> = {}>(
      args?: Subset<T, truck$devicesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findMany'> | Null
    >;
    alert_events<T extends truck$alert_eventsArgs<ExtArgs> = {}>(
      args?: Subset<T, truck$alert_eventsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the truck model
   */
  interface truckFieldRefs {
    readonly id: FieldRef<'truck', 'String'>;
    readonly name: FieldRef<'truck', 'String'>;
    readonly image: FieldRef<'truck', 'String'>;
    readonly year: FieldRef<'truck', 'Int'>;
    readonly model: FieldRef<'truck', 'String'>;
    readonly type: FieldRef<'truck', 'String'>;
    readonly vendor_id: FieldRef<'truck', 'Int'>;
    readonly status: FieldRef<'truck', 'String'>;
    readonly vin: FieldRef<'truck', 'String'>;
    readonly plate: FieldRef<'truck', 'String'>;
    readonly driver_id: FieldRef<'truck', 'Int'>;
    readonly created_at: FieldRef<'truck', 'DateTime'>;
    readonly updated_at: FieldRef<'truck', 'DateTime'>;
    readonly deleted_at: FieldRef<'truck', 'DateTime'>;
    readonly created_by: FieldRef<'truck', 'String'>;
    readonly updated_by: FieldRef<'truck', 'String'>;
  }

  // Custom InputTypes
  /**
   * truck findUnique
   */
  export type truckFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    /**
     * Filter, which truck to fetch.
     */
    where: truckWhereUniqueInput;
  };

  /**
   * truck findUniqueOrThrow
   */
  export type truckFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    /**
     * Filter, which truck to fetch.
     */
    where: truckWhereUniqueInput;
  };

  /**
   * truck findFirst
   */
  export type truckFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    /**
     * Filter, which truck to fetch.
     */
    where?: truckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for trucks.
     */
    cursor?: truckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` trucks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of trucks.
     */
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[];
  };

  /**
   * truck findFirstOrThrow
   */
  export type truckFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    /**
     * Filter, which truck to fetch.
     */
    where?: truckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for trucks.
     */
    cursor?: truckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` trucks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of trucks.
     */
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[];
  };

  /**
   * truck findMany
   */
  export type truckFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    /**
     * Filter, which trucks to fetch.
     */
    where?: truckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of trucks to fetch.
     */
    orderBy?: truckOrderByWithRelationInput | truckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing trucks.
     */
    cursor?: truckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` trucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` trucks.
     */
    skip?: number;
    distinct?: TruckScalarFieldEnum | TruckScalarFieldEnum[];
  };

  /**
   * truck create
   */
  export type truckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the truck
       */
      select?: truckSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: truckInclude<ExtArgs> | null;
      /**
       * The data needed to create a truck.
       */
      data: XOR<truckCreateInput, truckUncheckedCreateInput>;
    };

  /**
   * truck createMany
   */
  export type truckCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many trucks.
     */
    data: truckCreateManyInput | truckCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * truck createManyAndReturn
   */
  export type truckCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many trucks.
     */
    data: truckCreateManyInput | truckCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * truck update
   */
  export type truckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the truck
       */
      select?: truckSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: truckInclude<ExtArgs> | null;
      /**
       * The data needed to update a truck.
       */
      data: XOR<truckUpdateInput, truckUncheckedUpdateInput>;
      /**
       * Choose, which truck to update.
       */
      where: truckWhereUniqueInput;
    };

  /**
   * truck updateMany
   */
  export type truckUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update trucks.
     */
    data: XOR<truckUpdateManyMutationInput, truckUncheckedUpdateManyInput>;
    /**
     * Filter which trucks to update
     */
    where?: truckWhereInput;
  };

  /**
   * truck upsert
   */
  export type truckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the truck
       */
      select?: truckSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: truckInclude<ExtArgs> | null;
      /**
       * The filter to search for the truck to update in case it exists.
       */
      where: truckWhereUniqueInput;
      /**
       * In case the truck found by the `where` argument doesn't exist, create a new truck with this data.
       */
      create: XOR<truckCreateInput, truckUncheckedCreateInput>;
      /**
       * In case the truck was found with the provided `where` argument, update it with this data.
       */
      update: XOR<truckUpdateInput, truckUncheckedUpdateInput>;
    };

  /**
   * truck delete
   */
  export type truckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the truck
       */
      select?: truckSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: truckInclude<ExtArgs> | null;
      /**
       * Filter which truck to delete.
       */
      where: truckWhereUniqueInput;
    };

  /**
   * truck deleteMany
   */
  export type truckDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which trucks to delete
     */
    where?: truckWhereInput;
  };

  /**
   * truck.vendor
   */
  export type truck$vendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the vendors
       */
      select?: vendorsSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: vendorsInclude<ExtArgs> | null;
      where?: vendorsWhereInput;
    };

  /**
   * truck.driver
   */
  export type truck$driverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the drivers
       */
      select?: driversSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: driversInclude<ExtArgs> | null;
      where?: driversWhereInput;
    };

  /**
   * truck.devices
   */
  export type truck$devicesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    where?: deviceWhereInput;
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[];
    cursor?: deviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[];
  };

  /**
   * truck.alert_events
   */
  export type truck$alert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    where?: alert_eventsWhereInput;
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    cursor?: alert_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * truck without action
   */
  export type truckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the truck
       */
      select?: truckSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: truckInclude<ExtArgs> | null;
    };

  /**
   * Model user_admin
   */

  export type AggregateUser_admin = {
    _count: User_adminCountAggregateOutputType | null;
    _min: User_adminMinAggregateOutputType | null;
    _max: User_adminMaxAggregateOutputType | null;
  };

  export type User_adminMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: string | null;
    last_login: Date | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type User_adminMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: string | null;
    last_login: Date | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type User_adminCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    password: number;
    role: number;
    last_login: number;
    status: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type User_adminMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    last_login?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type User_adminMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    last_login?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type User_adminCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    last_login?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type User_adminAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which user_admin to aggregate.
     */
    where?: user_adminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: user_adminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` user_admins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned user_admins
     **/
    _count?: true | User_adminCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: User_adminMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: User_adminMaxAggregateInputType;
  };

  export type GetUser_adminAggregateType<T extends User_adminAggregateArgs> = {
    [P in keyof T & keyof AggregateUser_admin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_admin[P]>
      : GetScalarType<T[P], AggregateUser_admin[P]>;
  };

  export type user_adminGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: user_adminWhereInput;
    orderBy?: user_adminOrderByWithAggregationInput | user_adminOrderByWithAggregationInput[];
    by: User_adminScalarFieldEnum[] | User_adminScalarFieldEnum;
    having?: user_adminScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: User_adminCountAggregateInputType | true;
    _min?: User_adminMinAggregateInputType;
    _max?: User_adminMaxAggregateInputType;
  };

  export type User_adminGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    last_login: Date | null;
    status: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: User_adminCountAggregateOutputType | null;
    _min: User_adminMinAggregateOutputType | null;
    _max: User_adminMaxAggregateOutputType | null;
  };

  type GetUser_adminGroupByPayload<T extends user_adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_adminGroupByOutputType, T['by']> & {
        [P in keyof T & keyof User_adminGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], User_adminGroupByOutputType[P]>
          : GetScalarType<T[P], User_adminGroupByOutputType[P]>;
      }
    >
  >;

  export type user_adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        email?: boolean;
        password?: boolean;
        role?: boolean;
        last_login?: boolean;
        status?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
      },
      ExtArgs['result']['user_admin']
    >;

  export type user_adminSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      role?: boolean;
      last_login?: boolean;
      status?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['user_admin']
  >;

  export type user_adminSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    last_login?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type $user_adminPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'user_admin';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        last_login: Date | null;
        status: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['user_admin']
    >;
    composites: {};
  };

  type user_adminGetPayload<S extends boolean | null | undefined | user_adminDefaultArgs> =
    $Result.GetResult<Prisma.$user_adminPayload, S>;

  type user_adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_adminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: User_adminCountAggregateInputType | true;
    };

  export interface user_adminDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['user_admin'];
      meta: { name: 'user_admin' };
    };
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
    findUnique<T extends user_adminFindUniqueArgs>(
      args: SelectSubset<T, user_adminFindUniqueArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends user_adminFindUniqueOrThrowArgs>(
      args: SelectSubset<T, user_adminFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends user_adminFindFirstArgs>(
      args?: SelectSubset<T, user_adminFindFirstArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends user_adminFindFirstOrThrowArgs>(
      args?: SelectSubset<T, user_adminFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends user_adminFindManyArgs>(
      args?: SelectSubset<T, user_adminFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends user_adminCreateArgs>(
      args: SelectSubset<T, user_adminCreateArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends user_adminCreateManyArgs>(
      args?: SelectSubset<T, user_adminCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends user_adminCreateManyAndReturnArgs>(
      args?: SelectSubset<T, user_adminCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends user_adminDeleteArgs>(
      args: SelectSubset<T, user_adminDeleteArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends user_adminUpdateArgs>(
      args: SelectSubset<T, user_adminUpdateArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends user_adminDeleteManyArgs>(
      args?: SelectSubset<T, user_adminDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends user_adminUpdateManyArgs>(
      args: SelectSubset<T, user_adminUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends user_adminUpsertArgs>(
      args: SelectSubset<T, user_adminUpsertArgs<ExtArgs>>
    ): Prisma__user_adminClient<
      $Result.GetResult<Prisma.$user_adminPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, user_adminCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_adminCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends User_adminAggregateArgs>(
      args: Subset<T, User_adminAggregateArgs>
    ): Prisma.PrismaPromise<GetUser_adminAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, user_adminGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetUser_adminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__user_adminClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the user_admin model
   */
  interface user_adminFieldRefs {
    readonly id: FieldRef<'user_admin', 'String'>;
    readonly name: FieldRef<'user_admin', 'String'>;
    readonly email: FieldRef<'user_admin', 'String'>;
    readonly password: FieldRef<'user_admin', 'String'>;
    readonly role: FieldRef<'user_admin', 'String'>;
    readonly last_login: FieldRef<'user_admin', 'DateTime'>;
    readonly status: FieldRef<'user_admin', 'String'>;
    readonly created_at: FieldRef<'user_admin', 'DateTime'>;
    readonly updated_at: FieldRef<'user_admin', 'DateTime'>;
    readonly deleted_at: FieldRef<'user_admin', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * user_admin findUnique
   */
  export type user_adminFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * Filter, which user_admin to fetch.
     */
    where: user_adminWhereUniqueInput;
  };

  /**
   * user_admin findUniqueOrThrow
   */
  export type user_adminFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * Filter, which user_admin to fetch.
     */
    where: user_adminWhereUniqueInput;
  };

  /**
   * user_admin findFirst
   */
  export type user_adminFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * Filter, which user_admin to fetch.
     */
    where?: user_adminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for user_admins.
     */
    cursor?: user_adminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` user_admins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of user_admins.
     */
    distinct?: User_adminScalarFieldEnum | User_adminScalarFieldEnum[];
  };

  /**
   * user_admin findFirstOrThrow
   */
  export type user_adminFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * Filter, which user_admin to fetch.
     */
    where?: user_adminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for user_admins.
     */
    cursor?: user_adminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` user_admins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of user_admins.
     */
    distinct?: User_adminScalarFieldEnum | User_adminScalarFieldEnum[];
  };

  /**
   * user_admin findMany
   */
  export type user_adminFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * Filter, which user_admins to fetch.
     */
    where?: user_adminWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of user_admins to fetch.
     */
    orderBy?: user_adminOrderByWithRelationInput | user_adminOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing user_admins.
     */
    cursor?: user_adminWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` user_admins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` user_admins.
     */
    skip?: number;
    distinct?: User_adminScalarFieldEnum | User_adminScalarFieldEnum[];
  };

  /**
   * user_admin create
   */
  export type user_adminCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * The data needed to create a user_admin.
     */
    data: XOR<user_adminCreateInput, user_adminUncheckedCreateInput>;
  };

  /**
   * user_admin createMany
   */
  export type user_adminCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many user_admins.
     */
    data: user_adminCreateManyInput | user_adminCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * user_admin createManyAndReturn
   */
  export type user_adminCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many user_admins.
     */
    data: user_adminCreateManyInput | user_adminCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * user_admin update
   */
  export type user_adminUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * The data needed to update a user_admin.
     */
    data: XOR<user_adminUpdateInput, user_adminUncheckedUpdateInput>;
    /**
     * Choose, which user_admin to update.
     */
    where: user_adminWhereUniqueInput;
  };

  /**
   * user_admin updateMany
   */
  export type user_adminUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update user_admins.
     */
    data: XOR<user_adminUpdateManyMutationInput, user_adminUncheckedUpdateManyInput>;
    /**
     * Filter which user_admins to update
     */
    where?: user_adminWhereInput;
  };

  /**
   * user_admin upsert
   */
  export type user_adminUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * The filter to search for the user_admin to update in case it exists.
     */
    where: user_adminWhereUniqueInput;
    /**
     * In case the user_admin found by the `where` argument doesn't exist, create a new user_admin with this data.
     */
    create: XOR<user_adminCreateInput, user_adminUncheckedCreateInput>;
    /**
     * In case the user_admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_adminUpdateInput, user_adminUncheckedUpdateInput>;
  };

  /**
   * user_admin delete
   */
  export type user_adminDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
    /**
     * Filter which user_admin to delete.
     */
    where: user_adminWhereUniqueInput;
  };

  /**
   * user_admin deleteMany
   */
  export type user_adminDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which user_admins to delete
     */
    where?: user_adminWhereInput;
  };

  /**
   * user_admin without action
   */
  export type user_adminDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the user_admin
     */
    select?: user_adminSelect<ExtArgs> | null;
  };

  /**
   * Model device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null;
    _avg: DeviceAvgAggregateOutputType | null;
    _sum: DeviceSumAggregateOutputType | null;
    _min: DeviceMinAggregateOutputType | null;
    _max: DeviceMaxAggregateOutputType | null;
  };

  export type DeviceAvgAggregateOutputType = {
    bat1: number | null;
    bat2: number | null;
    bat3: number | null;
    lock: number | null;
  };

  export type DeviceSumAggregateOutputType = {
    bat1: number | null;
    bat2: number | null;
    bat3: number | null;
    lock: number | null;
  };

  export type DeviceMinAggregateOutputType = {
    id: string | null;
    truck_id: string | null;
    sn: string | null;
    bat1: number | null;
    bat2: number | null;
    bat3: number | null;
    lock: number | null;
    sim_number: string | null;
    installed_at: Date | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type DeviceMaxAggregateOutputType = {
    id: string | null;
    truck_id: string | null;
    sn: string | null;
    bat1: number | null;
    bat2: number | null;
    bat3: number | null;
    lock: number | null;
    sim_number: string | null;
    installed_at: Date | null;
    status: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type DeviceCountAggregateOutputType = {
    id: number;
    truck_id: number;
    sn: number;
    bat1: number;
    bat2: number;
    bat3: number;
    lock: number;
    sim_number: number;
    installed_at: number;
    status: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type DeviceAvgAggregateInputType = {
    bat1?: true;
    bat2?: true;
    bat3?: true;
    lock?: true;
  };

  export type DeviceSumAggregateInputType = {
    bat1?: true;
    bat2?: true;
    bat3?: true;
    lock?: true;
  };

  export type DeviceMinAggregateInputType = {
    id?: true;
    truck_id?: true;
    sn?: true;
    bat1?: true;
    bat2?: true;
    bat3?: true;
    lock?: true;
    sim_number?: true;
    installed_at?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type DeviceMaxAggregateInputType = {
    id?: true;
    truck_id?: true;
    sn?: true;
    bat1?: true;
    bat2?: true;
    bat3?: true;
    lock?: true;
    sim_number?: true;
    installed_at?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type DeviceCountAggregateInputType = {
    id?: true;
    truck_id?: true;
    sn?: true;
    bat1?: true;
    bat2?: true;
    bat3?: true;
    lock?: true;
    sim_number?: true;
    installed_at?: true;
    status?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type DeviceAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which device to aggregate.
     */
    where?: deviceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: deviceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` devices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` devices.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned devices
     **/
    _count?: true | DeviceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: DeviceAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: DeviceSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DeviceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DeviceMaxAggregateInputType;
  };

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
    [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>;
  };

  export type deviceGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: deviceWhereInput;
    orderBy?: deviceOrderByWithAggregationInput | deviceOrderByWithAggregationInput[];
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum;
    having?: deviceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeviceCountAggregateInputType | true;
    _avg?: DeviceAvgAggregateInputType;
    _sum?: DeviceSumAggregateInputType;
    _min?: DeviceMinAggregateInputType;
    _max?: DeviceMaxAggregateInputType;
  };

  export type DeviceGroupByOutputType = {
    id: string;
    truck_id: string;
    sn: string;
    bat1: number | null;
    bat2: number | null;
    bat3: number | null;
    lock: number;
    sim_number: string | null;
    installed_at: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: DeviceCountAggregateOutputType | null;
    _avg: DeviceAvgAggregateOutputType | null;
    _sum: DeviceSumAggregateOutputType | null;
    _min: DeviceMinAggregateOutputType | null;
    _max: DeviceMaxAggregateOutputType | null;
  };

  type GetDeviceGroupByPayload<T extends deviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> & {
        [P in keyof T & keyof DeviceGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
          : GetScalarType<T[P], DeviceGroupByOutputType[P]>;
      }
    >
  >;

  export type deviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        truck_id?: boolean;
        sn?: boolean;
        bat1?: boolean;
        bat2?: boolean;
        bat3?: boolean;
        lock?: boolean;
        sim_number?: boolean;
        installed_at?: boolean;
        status?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
        truck?: boolean | truckDefaultArgs<ExtArgs>;
        sensors?: boolean | device$sensorsArgs<ExtArgs>;
        locations?: boolean | device$locationsArgs<ExtArgs>;
        location_history?: boolean | device$location_historyArgs<ExtArgs>;
        alert_events?: boolean | device$alert_eventsArgs<ExtArgs>;
        _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['device']
    >;

  export type deviceSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      truck_id?: boolean;
      sn?: boolean;
      bat1?: boolean;
      bat2?: boolean;
      bat3?: boolean;
      lock?: boolean;
      sim_number?: boolean;
      installed_at?: boolean;
      status?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      truck?: boolean | truckDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['device']
  >;

  export type deviceSelectScalar = {
    id?: boolean;
    truck_id?: boolean;
    sn?: boolean;
    bat1?: boolean;
    bat2?: boolean;
    bat3?: boolean;
    lock?: boolean;
    sim_number?: boolean;
    installed_at?: boolean;
    status?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type deviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    truck?: boolean | truckDefaultArgs<ExtArgs>;
    sensors?: boolean | device$sensorsArgs<ExtArgs>;
    locations?: boolean | device$locationsArgs<ExtArgs>;
    location_history?: boolean | device$location_historyArgs<ExtArgs>;
    alert_events?: boolean | device$alert_eventsArgs<ExtArgs>;
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type deviceIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    truck?: boolean | truckDefaultArgs<ExtArgs>;
  };

  export type $devicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'device';
    objects: {
      truck: Prisma.$truckPayload<ExtArgs>;
      sensors: Prisma.$sensorPayload<ExtArgs>[];
      locations: Prisma.$locationPayload<ExtArgs>[];
      location_history: Prisma.$location_historyPayload<ExtArgs>[];
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        truck_id: string;
        sn: string;
        bat1: number | null;
        bat2: number | null;
        bat3: number | null;
        lock: number;
        sim_number: string | null;
        installed_at: Date;
        status: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['device']
    >;
    composites: {};
  };

  type deviceGetPayload<S extends boolean | null | undefined | deviceDefaultArgs> =
    $Result.GetResult<Prisma.$devicePayload, S>;

  type deviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    deviceFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: DeviceCountAggregateInputType | true;
  };

  export interface deviceDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['device']; meta: { name: 'device' } };
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
    findUnique<T extends deviceFindUniqueArgs>(
      args: SelectSubset<T, deviceFindUniqueArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends deviceFindUniqueOrThrowArgs>(
      args: SelectSubset<T, deviceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends deviceFindFirstArgs>(
      args?: SelectSubset<T, deviceFindFirstArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends deviceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, deviceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends deviceFindManyArgs>(
      args?: SelectSubset<T, deviceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends deviceCreateArgs>(
      args: SelectSubset<T, deviceCreateArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends deviceCreateManyArgs>(
      args?: SelectSubset<T, deviceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends deviceCreateManyAndReturnArgs>(
      args?: SelectSubset<T, deviceCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends deviceDeleteArgs>(
      args: SelectSubset<T, deviceDeleteArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends deviceUpdateArgs>(
      args: SelectSubset<T, deviceUpdateArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends deviceDeleteManyArgs>(
      args?: SelectSubset<T, deviceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends deviceUpdateManyArgs>(
      args: SelectSubset<T, deviceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends deviceUpsertArgs>(
      args: SelectSubset<T, deviceUpsertArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, deviceCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends DeviceAggregateArgs>(
      args: Subset<T, DeviceAggregateArgs>
    ): Prisma.PrismaPromise<GetDeviceAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, deviceGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__deviceClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    truck<T extends truckDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, truckDefaultArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    sensors<T extends device$sensorsArgs<ExtArgs> = {}>(
      args?: Subset<T, device$sensorsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    locations<T extends device$locationsArgs<ExtArgs> = {}>(
      args?: Subset<T, device$locationsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    location_history<T extends device$location_historyArgs<ExtArgs> = {}>(
      args?: Subset<T, device$location_historyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    alert_events<T extends device$alert_eventsArgs<ExtArgs> = {}>(
      args?: Subset<T, device$alert_eventsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the device model
   */
  interface deviceFieldRefs {
    readonly id: FieldRef<'device', 'String'>;
    readonly truck_id: FieldRef<'device', 'String'>;
    readonly sn: FieldRef<'device', 'String'>;
    readonly bat1: FieldRef<'device', 'Int'>;
    readonly bat2: FieldRef<'device', 'Int'>;
    readonly bat3: FieldRef<'device', 'Int'>;
    readonly lock: FieldRef<'device', 'Int'>;
    readonly sim_number: FieldRef<'device', 'String'>;
    readonly installed_at: FieldRef<'device', 'DateTime'>;
    readonly status: FieldRef<'device', 'String'>;
    readonly created_at: FieldRef<'device', 'DateTime'>;
    readonly updated_at: FieldRef<'device', 'DateTime'>;
    readonly deleted_at: FieldRef<'device', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * device findUnique
   */
  export type deviceFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    /**
     * Filter, which device to fetch.
     */
    where: deviceWhereUniqueInput;
  };

  /**
   * device findUniqueOrThrow
   */
  export type deviceFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    /**
     * Filter, which device to fetch.
     */
    where: deviceWhereUniqueInput;
  };

  /**
   * device findFirst
   */
  export type deviceFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    /**
     * Filter, which device to fetch.
     */
    where?: deviceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for devices.
     */
    cursor?: deviceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` devices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` devices.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[];
  };

  /**
   * device findFirstOrThrow
   */
  export type deviceFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    /**
     * Filter, which device to fetch.
     */
    where?: deviceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for devices.
     */
    cursor?: deviceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` devices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` devices.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[];
  };

  /**
   * device findMany
   */
  export type deviceFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    /**
     * Filter, which devices to fetch.
     */
    where?: deviceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of devices to fetch.
     */
    orderBy?: deviceOrderByWithRelationInput | deviceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing devices.
     */
    cursor?: deviceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` devices from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` devices.
     */
    skip?: number;
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[];
  };

  /**
   * device create
   */
  export type deviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the device
       */
      select?: deviceSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: deviceInclude<ExtArgs> | null;
      /**
       * The data needed to create a device.
       */
      data: XOR<deviceCreateInput, deviceUncheckedCreateInput>;
    };

  /**
   * device createMany
   */
  export type deviceCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many devices.
     */
    data: deviceCreateManyInput | deviceCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * device createManyAndReturn
   */
  export type deviceCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many devices.
     */
    data: deviceCreateManyInput | deviceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * device update
   */
  export type deviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the device
       */
      select?: deviceSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: deviceInclude<ExtArgs> | null;
      /**
       * The data needed to update a device.
       */
      data: XOR<deviceUpdateInput, deviceUncheckedUpdateInput>;
      /**
       * Choose, which device to update.
       */
      where: deviceWhereUniqueInput;
    };

  /**
   * device updateMany
   */
  export type deviceUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update devices.
     */
    data: XOR<deviceUpdateManyMutationInput, deviceUncheckedUpdateManyInput>;
    /**
     * Filter which devices to update
     */
    where?: deviceWhereInput;
  };

  /**
   * device upsert
   */
  export type deviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the device
       */
      select?: deviceSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: deviceInclude<ExtArgs> | null;
      /**
       * The filter to search for the device to update in case it exists.
       */
      where: deviceWhereUniqueInput;
      /**
       * In case the device found by the `where` argument doesn't exist, create a new device with this data.
       */
      create: XOR<deviceCreateInput, deviceUncheckedCreateInput>;
      /**
       * In case the device was found with the provided `where` argument, update it with this data.
       */
      update: XOR<deviceUpdateInput, deviceUncheckedUpdateInput>;
    };

  /**
   * device delete
   */
  export type deviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the device
       */
      select?: deviceSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: deviceInclude<ExtArgs> | null;
      /**
       * Filter which device to delete.
       */
      where: deviceWhereUniqueInput;
    };

  /**
   * device deleteMany
   */
  export type deviceDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which devices to delete
     */
    where?: deviceWhereInput;
  };

  /**
   * device.sensors
   */
  export type device$sensorsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    where?: sensorWhereInput;
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[];
    cursor?: sensorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[];
  };

  /**
   * device.locations
   */
  export type device$locationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    where?: locationWhereInput;
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[];
    cursor?: locationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * device.location_history
   */
  export type device$location_historyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    where?: location_historyWhereInput;
    orderBy?: location_historyOrderByWithRelationInput | location_historyOrderByWithRelationInput[];
    cursor?: location_historyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Location_historyScalarFieldEnum | Location_historyScalarFieldEnum[];
  };

  /**
   * device.alert_events
   */
  export type device$alert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    where?: alert_eventsWhereInput;
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    cursor?: alert_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * device without action
   */
  export type deviceDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
  };

  /**
   * Model sensor
   */

  export type AggregateSensor = {
    _count: SensorCountAggregateOutputType | null;
    _avg: SensorAvgAggregateOutputType | null;
    _sum: SensorSumAggregateOutputType | null;
    _min: SensorMinAggregateOutputType | null;
    _max: SensorMaxAggregateOutputType | null;
  };

  export type SensorAvgAggregateOutputType = {
    tireNo: number | null;
    sensorNo: number | null;
    sensor_lock: number | null;
    tempValue: number | null;
    tirepValue: number | null;
    bat: number | null;
  };

  export type SensorSumAggregateOutputType = {
    tireNo: number | null;
    sensorNo: number | null;
    sensor_lock: number | null;
    tempValue: number | null;
    tirepValue: number | null;
    bat: number | null;
  };

  export type SensorMinAggregateOutputType = {
    id: string | null;
    sn: string | null;
    device_id: string | null;
    tireNo: number | null;
    simNumber: string | null;
    sensorNo: number | null;
    sensor_lock: number | null;
    status: string | null;
    tempValue: number | null;
    tirepValue: number | null;
    exType: string | null;
    bat: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type SensorMaxAggregateOutputType = {
    id: string | null;
    sn: string | null;
    device_id: string | null;
    tireNo: number | null;
    simNumber: string | null;
    sensorNo: number | null;
    sensor_lock: number | null;
    status: string | null;
    tempValue: number | null;
    tirepValue: number | null;
    exType: string | null;
    bat: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type SensorCountAggregateOutputType = {
    id: number;
    sn: number;
    device_id: number;
    tireNo: number;
    simNumber: number;
    sensorNo: number;
    sensor_lock: number;
    status: number;
    tempValue: number;
    tirepValue: number;
    exType: number;
    bat: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type SensorAvgAggregateInputType = {
    tireNo?: true;
    sensorNo?: true;
    sensor_lock?: true;
    tempValue?: true;
    tirepValue?: true;
    bat?: true;
  };

  export type SensorSumAggregateInputType = {
    tireNo?: true;
    sensorNo?: true;
    sensor_lock?: true;
    tempValue?: true;
    tirepValue?: true;
    bat?: true;
  };

  export type SensorMinAggregateInputType = {
    id?: true;
    sn?: true;
    device_id?: true;
    tireNo?: true;
    simNumber?: true;
    sensorNo?: true;
    sensor_lock?: true;
    status?: true;
    tempValue?: true;
    tirepValue?: true;
    exType?: true;
    bat?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type SensorMaxAggregateInputType = {
    id?: true;
    sn?: true;
    device_id?: true;
    tireNo?: true;
    simNumber?: true;
    sensorNo?: true;
    sensor_lock?: true;
    status?: true;
    tempValue?: true;
    tirepValue?: true;
    exType?: true;
    bat?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type SensorCountAggregateInputType = {
    id?: true;
    sn?: true;
    device_id?: true;
    tireNo?: true;
    simNumber?: true;
    sensorNo?: true;
    sensor_lock?: true;
    status?: true;
    tempValue?: true;
    tirepValue?: true;
    exType?: true;
    bat?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type SensorAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which sensor to aggregate.
     */
    where?: sensorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: sensorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sensors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned sensors
     **/
    _count?: true | SensorCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: SensorAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: SensorSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SensorMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SensorMaxAggregateInputType;
  };

  export type GetSensorAggregateType<T extends SensorAggregateArgs> = {
    [P in keyof T & keyof AggregateSensor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensor[P]>
      : GetScalarType<T[P], AggregateSensor[P]>;
  };

  export type sensorGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: sensorWhereInput;
    orderBy?: sensorOrderByWithAggregationInput | sensorOrderByWithAggregationInput[];
    by: SensorScalarFieldEnum[] | SensorScalarFieldEnum;
    having?: sensorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SensorCountAggregateInputType | true;
    _avg?: SensorAvgAggregateInputType;
    _sum?: SensorSumAggregateInputType;
    _min?: SensorMinAggregateInputType;
    _max?: SensorMaxAggregateInputType;
  };

  export type SensorGroupByOutputType = {
    id: string;
    sn: string;
    device_id: string;
    tireNo: number;
    simNumber: string | null;
    sensorNo: number | null;
    sensor_lock: number;
    status: string;
    tempValue: number | null;
    tirepValue: number | null;
    exType: string | null;
    bat: number | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: SensorCountAggregateOutputType | null;
    _avg: SensorAvgAggregateOutputType | null;
    _sum: SensorSumAggregateOutputType | null;
    _min: SensorMinAggregateOutputType | null;
    _max: SensorMaxAggregateOutputType | null;
  };

  type GetSensorGroupByPayload<T extends sensorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SensorGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SensorGroupByOutputType[P]>
          : GetScalarType<T[P], SensorGroupByOutputType[P]>;
      }
    >
  >;

  export type sensorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        sn?: boolean;
        device_id?: boolean;
        tireNo?: boolean;
        simNumber?: boolean;
        sensorNo?: boolean;
        sensor_lock?: boolean;
        status?: boolean;
        tempValue?: boolean;
        tirepValue?: boolean;
        exType?: boolean;
        bat?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
        device?: boolean | deviceDefaultArgs<ExtArgs>;
        alert_events?: boolean | sensor$alert_eventsArgs<ExtArgs>;
        _count?: boolean | SensorCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['sensor']
    >;

  export type sensorSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sn?: boolean;
      device_id?: boolean;
      tireNo?: boolean;
      simNumber?: boolean;
      sensorNo?: boolean;
      sensor_lock?: boolean;
      status?: boolean;
      tempValue?: boolean;
      tirepValue?: boolean;
      exType?: boolean;
      bat?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      device?: boolean | deviceDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['sensor']
  >;

  export type sensorSelectScalar = {
    id?: boolean;
    sn?: boolean;
    device_id?: boolean;
    tireNo?: boolean;
    simNumber?: boolean;
    sensorNo?: boolean;
    sensor_lock?: boolean;
    status?: boolean;
    tempValue?: boolean;
    tirepValue?: boolean;
    exType?: boolean;
    bat?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type sensorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | deviceDefaultArgs<ExtArgs>;
    alert_events?: boolean | sensor$alert_eventsArgs<ExtArgs>;
    _count?: boolean | SensorCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type sensorIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    device?: boolean | deviceDefaultArgs<ExtArgs>;
  };

  export type $sensorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'sensor';
    objects: {
      device: Prisma.$devicePayload<ExtArgs>;
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        sn: string;
        device_id: string;
        tireNo: number;
        simNumber: string | null;
        sensorNo: number | null;
        sensor_lock: number;
        status: string;
        tempValue: number | null;
        tirepValue: number | null;
        exType: string | null;
        bat: number | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['sensor']
    >;
    composites: {};
  };

  type sensorGetPayload<S extends boolean | null | undefined | sensorDefaultArgs> =
    $Result.GetResult<Prisma.$sensorPayload, S>;

  type sensorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    sensorFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: SensorCountAggregateInputType | true;
  };

  export interface sensorDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sensor']; meta: { name: 'sensor' } };
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
    findUnique<T extends sensorFindUniqueArgs>(
      args: SelectSubset<T, sensorFindUniqueArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends sensorFindUniqueOrThrowArgs>(
      args: SelectSubset<T, sensorFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends sensorFindFirstArgs>(
      args?: SelectSubset<T, sensorFindFirstArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends sensorFindFirstOrThrowArgs>(
      args?: SelectSubset<T, sensorFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends sensorFindManyArgs>(
      args?: SelectSubset<T, sensorFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends sensorCreateArgs>(
      args: SelectSubset<T, sensorCreateArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends sensorCreateManyArgs>(
      args?: SelectSubset<T, sensorCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends sensorCreateManyAndReturnArgs>(
      args?: SelectSubset<T, sensorCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends sensorDeleteArgs>(
      args: SelectSubset<T, sensorDeleteArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends sensorUpdateArgs>(
      args: SelectSubset<T, sensorUpdateArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends sensorDeleteManyArgs>(
      args?: SelectSubset<T, sensorDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends sensorUpdateManyArgs>(
      args: SelectSubset<T, sensorUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends sensorUpsertArgs>(
      args: SelectSubset<T, sensorUpsertArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, sensorCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends SensorAggregateArgs>(
      args: Subset<T, SensorAggregateArgs>
    ): Prisma.PrismaPromise<GetSensorAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, sensorGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetSensorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__sensorClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    device<T extends deviceDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, deviceDefaultArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    alert_events<T extends sensor$alert_eventsArgs<ExtArgs> = {}>(
      args?: Subset<T, sensor$alert_eventsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the sensor model
   */
  interface sensorFieldRefs {
    readonly id: FieldRef<'sensor', 'String'>;
    readonly sn: FieldRef<'sensor', 'String'>;
    readonly device_id: FieldRef<'sensor', 'String'>;
    readonly tireNo: FieldRef<'sensor', 'Int'>;
    readonly simNumber: FieldRef<'sensor', 'String'>;
    readonly sensorNo: FieldRef<'sensor', 'Int'>;
    readonly sensor_lock: FieldRef<'sensor', 'Int'>;
    readonly status: FieldRef<'sensor', 'String'>;
    readonly tempValue: FieldRef<'sensor', 'Float'>;
    readonly tirepValue: FieldRef<'sensor', 'Float'>;
    readonly exType: FieldRef<'sensor', 'String'>;
    readonly bat: FieldRef<'sensor', 'Int'>;
    readonly created_at: FieldRef<'sensor', 'DateTime'>;
    readonly updated_at: FieldRef<'sensor', 'DateTime'>;
    readonly deleted_at: FieldRef<'sensor', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * sensor findUnique
   */
  export type sensorFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    /**
     * Filter, which sensor to fetch.
     */
    where: sensorWhereUniqueInput;
  };

  /**
   * sensor findUniqueOrThrow
   */
  export type sensorFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    /**
     * Filter, which sensor to fetch.
     */
    where: sensorWhereUniqueInput;
  };

  /**
   * sensor findFirst
   */
  export type sensorFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    /**
     * Filter, which sensor to fetch.
     */
    where?: sensorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for sensors.
     */
    cursor?: sensorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sensors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of sensors.
     */
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[];
  };

  /**
   * sensor findFirstOrThrow
   */
  export type sensorFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    /**
     * Filter, which sensor to fetch.
     */
    where?: sensorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for sensors.
     */
    cursor?: sensorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sensors.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of sensors.
     */
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[];
  };

  /**
   * sensor findMany
   */
  export type sensorFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    /**
     * Filter, which sensors to fetch.
     */
    where?: sensorWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sensors to fetch.
     */
    orderBy?: sensorOrderByWithRelationInput | sensorOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing sensors.
     */
    cursor?: sensorWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sensors from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sensors.
     */
    skip?: number;
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[];
  };

  /**
   * sensor create
   */
  export type sensorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the sensor
       */
      select?: sensorSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: sensorInclude<ExtArgs> | null;
      /**
       * The data needed to create a sensor.
       */
      data: XOR<sensorCreateInput, sensorUncheckedCreateInput>;
    };

  /**
   * sensor createMany
   */
  export type sensorCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many sensors.
     */
    data: sensorCreateManyInput | sensorCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * sensor createManyAndReturn
   */
  export type sensorCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many sensors.
     */
    data: sensorCreateManyInput | sensorCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * sensor update
   */
  export type sensorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the sensor
       */
      select?: sensorSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: sensorInclude<ExtArgs> | null;
      /**
       * The data needed to update a sensor.
       */
      data: XOR<sensorUpdateInput, sensorUncheckedUpdateInput>;
      /**
       * Choose, which sensor to update.
       */
      where: sensorWhereUniqueInput;
    };

  /**
   * sensor updateMany
   */
  export type sensorUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update sensors.
     */
    data: XOR<sensorUpdateManyMutationInput, sensorUncheckedUpdateManyInput>;
    /**
     * Filter which sensors to update
     */
    where?: sensorWhereInput;
  };

  /**
   * sensor upsert
   */
  export type sensorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the sensor
       */
      select?: sensorSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: sensorInclude<ExtArgs> | null;
      /**
       * The filter to search for the sensor to update in case it exists.
       */
      where: sensorWhereUniqueInput;
      /**
       * In case the sensor found by the `where` argument doesn't exist, create a new sensor with this data.
       */
      create: XOR<sensorCreateInput, sensorUncheckedCreateInput>;
      /**
       * In case the sensor was found with the provided `where` argument, update it with this data.
       */
      update: XOR<sensorUpdateInput, sensorUncheckedUpdateInput>;
    };

  /**
   * sensor delete
   */
  export type sensorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the sensor
       */
      select?: sensorSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: sensorInclude<ExtArgs> | null;
      /**
       * Filter which sensor to delete.
       */
      where: sensorWhereUniqueInput;
    };

  /**
   * sensor deleteMany
   */
  export type sensorDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which sensors to delete
     */
    where?: sensorWhereInput;
  };

  /**
   * sensor.alert_events
   */
  export type sensor$alert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    where?: alert_eventsWhereInput;
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    cursor?: alert_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * sensor without action
   */
  export type sensorDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
  };

  /**
   * Model location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null;
    _avg: LocationAvgAggregateOutputType | null;
    _sum: LocationSumAggregateOutputType | null;
    _min: LocationMinAggregateOutputType | null;
    _max: LocationMaxAggregateOutputType | null;
  };

  export type LocationAvgAggregateOutputType = {
    lat: number | null;
    long: number | null;
  };

  export type LocationSumAggregateOutputType = {
    lat: number | null;
    long: number | null;
  };

  export type LocationMinAggregateOutputType = {
    id: string | null;
    device_id: string | null;
    lat: number | null;
    long: number | null;
    recorded_at: Date | null;
    created_at: Date | null;
  };

  export type LocationMaxAggregateOutputType = {
    id: string | null;
    device_id: string | null;
    lat: number | null;
    long: number | null;
    recorded_at: Date | null;
    created_at: Date | null;
  };

  export type LocationCountAggregateOutputType = {
    id: number;
    device_id: number;
    lat: number;
    long: number;
    recorded_at: number;
    created_at: number;
    _all: number;
  };

  export type LocationAvgAggregateInputType = {
    lat?: true;
    long?: true;
  };

  export type LocationSumAggregateInputType = {
    lat?: true;
    long?: true;
  };

  export type LocationMinAggregateInputType = {
    id?: true;
    device_id?: true;
    lat?: true;
    long?: true;
    recorded_at?: true;
    created_at?: true;
  };

  export type LocationMaxAggregateInputType = {
    id?: true;
    device_id?: true;
    lat?: true;
    long?: true;
    recorded_at?: true;
    created_at?: true;
  };

  export type LocationCountAggregateInputType = {
    id?: true;
    device_id?: true;
    lat?: true;
    long?: true;
    recorded_at?: true;
    created_at?: true;
    _all?: true;
  };

  export type LocationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which location to aggregate.
     */
    where?: locationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: locationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` locations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned locations
     **/
    _count?: true | LocationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: LocationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: LocationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: LocationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: LocationMaxAggregateInputType;
  };

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
    [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>;
  };

  export type locationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: locationWhereInput;
    orderBy?: locationOrderByWithAggregationInput | locationOrderByWithAggregationInput[];
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum;
    having?: locationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LocationCountAggregateInputType | true;
    _avg?: LocationAvgAggregateInputType;
    _sum?: LocationSumAggregateInputType;
    _min?: LocationMinAggregateInputType;
    _max?: LocationMaxAggregateInputType;
  };

  export type LocationGroupByOutputType = {
    id: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at: Date;
    created_at: Date;
    _count: LocationCountAggregateOutputType | null;
    _avg: LocationAvgAggregateOutputType | null;
    _sum: LocationSumAggregateOutputType | null;
    _min: LocationMinAggregateOutputType | null;
    _max: LocationMaxAggregateOutputType | null;
  };

  type GetLocationGroupByPayload<T extends locationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> & {
        [P in keyof T & keyof LocationGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
          : GetScalarType<T[P], LocationGroupByOutputType[P]>;
      }
    >
  >;

  export type locationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        device_id?: boolean;
        lat?: boolean;
        long?: boolean;
        recorded_at?: boolean;
        created_at?: boolean;
        device?: boolean | deviceDefaultArgs<ExtArgs>;
        location_history?: boolean | location$location_historyArgs<ExtArgs>;
        _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['location']
    >;

  export type locationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      device_id?: boolean;
      lat?: boolean;
      long?: boolean;
      recorded_at?: boolean;
      created_at?: boolean;
      device?: boolean | deviceDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['location']
  >;

  export type locationSelectScalar = {
    id?: boolean;
    device_id?: boolean;
    lat?: boolean;
    long?: boolean;
    recorded_at?: boolean;
    created_at?: boolean;
  };

  export type locationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      device?: boolean | deviceDefaultArgs<ExtArgs>;
      location_history?: boolean | location$location_historyArgs<ExtArgs>;
      _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>;
    };
  export type locationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    device?: boolean | deviceDefaultArgs<ExtArgs>;
  };

  export type $locationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'location';
      objects: {
        device: Prisma.$devicePayload<ExtArgs>;
        location_history: Prisma.$location_historyPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          device_id: string;
          lat: number;
          long: number;
          recorded_at: Date;
          created_at: Date;
        },
        ExtArgs['result']['location']
      >;
      composites: {};
    };

  type locationGetPayload<S extends boolean | null | undefined | locationDefaultArgs> =
    $Result.GetResult<Prisma.$locationPayload, S>;

  type locationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    locationFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: LocationCountAggregateInputType | true;
  };

  export interface locationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['location'];
      meta: { name: 'location' };
    };
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
    findUnique<T extends locationFindUniqueArgs>(
      args: SelectSubset<T, locationFindUniqueArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends locationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, locationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends locationFindFirstArgs>(
      args?: SelectSubset<T, locationFindFirstArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends locationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, locationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends locationFindManyArgs>(
      args?: SelectSubset<T, locationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends locationCreateArgs>(
      args: SelectSubset<T, locationCreateArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends locationCreateManyArgs>(
      args?: SelectSubset<T, locationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends locationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, locationCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends locationDeleteArgs>(
      args: SelectSubset<T, locationDeleteArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends locationUpdateArgs>(
      args: SelectSubset<T, locationUpdateArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends locationDeleteManyArgs>(
      args?: SelectSubset<T, locationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends locationUpdateManyArgs>(
      args: SelectSubset<T, locationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends locationUpsertArgs>(
      args: SelectSubset<T, locationUpsertArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, locationCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends LocationAggregateArgs>(
      args: Subset<T, LocationAggregateArgs>
    ): Prisma.PrismaPromise<GetLocationAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, locationGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__locationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    device<T extends deviceDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, deviceDefaultArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    location_history<T extends location$location_historyArgs<ExtArgs> = {}>(
      args?: Subset<T, location$location_historyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the location model
   */
  interface locationFieldRefs {
    readonly id: FieldRef<'location', 'String'>;
    readonly device_id: FieldRef<'location', 'String'>;
    readonly lat: FieldRef<'location', 'Float'>;
    readonly long: FieldRef<'location', 'Float'>;
    readonly recorded_at: FieldRef<'location', 'DateTime'>;
    readonly created_at: FieldRef<'location', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * location findUnique
   */
  export type locationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * Filter, which location to fetch.
     */
    where: locationWhereUniqueInput;
  };

  /**
   * location findUniqueOrThrow
   */
  export type locationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * Filter, which location to fetch.
     */
    where: locationWhereUniqueInput;
  };

  /**
   * location findFirst
   */
  export type locationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * Filter, which location to fetch.
     */
    where?: locationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for locations.
     */
    cursor?: locationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` locations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * location findFirstOrThrow
   */
  export type locationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * Filter, which location to fetch.
     */
    where?: locationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for locations.
     */
    cursor?: locationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` locations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * location findMany
   */
  export type locationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * Filter, which locations to fetch.
     */
    where?: locationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing locations.
     */
    cursor?: locationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` locations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` locations.
     */
    skip?: number;
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[];
  };

  /**
   * location create
   */
  export type locationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * The data needed to create a location.
     */
    data: XOR<locationCreateInput, locationUncheckedCreateInput>;
  };

  /**
   * location createMany
   */
  export type locationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many locations.
     */
    data: locationCreateManyInput | locationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * location createManyAndReturn
   */
  export type locationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many locations.
     */
    data: locationCreateManyInput | locationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * location update
   */
  export type locationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * The data needed to update a location.
     */
    data: XOR<locationUpdateInput, locationUncheckedUpdateInput>;
    /**
     * Choose, which location to update.
     */
    where: locationWhereUniqueInput;
  };

  /**
   * location updateMany
   */
  export type locationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update locations.
     */
    data: XOR<locationUpdateManyMutationInput, locationUncheckedUpdateManyInput>;
    /**
     * Filter which locations to update
     */
    where?: locationWhereInput;
  };

  /**
   * location upsert
   */
  export type locationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * The filter to search for the location to update in case it exists.
     */
    where: locationWhereUniqueInput;
    /**
     * In case the location found by the `where` argument doesn't exist, create a new location with this data.
     */
    create: XOR<locationCreateInput, locationUncheckedCreateInput>;
    /**
     * In case the location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<locationUpdateInput, locationUncheckedUpdateInput>;
  };

  /**
   * location delete
   */
  export type locationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
    /**
     * Filter which location to delete.
     */
    where: locationWhereUniqueInput;
  };

  /**
   * location deleteMany
   */
  export type locationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which locations to delete
     */
    where?: locationWhereInput;
  };

  /**
   * location.location_history
   */
  export type location$location_historyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    where?: location_historyWhereInput;
    orderBy?: location_historyOrderByWithRelationInput | location_historyOrderByWithRelationInput[];
    cursor?: location_historyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Location_historyScalarFieldEnum | Location_historyScalarFieldEnum[];
  };

  /**
   * location without action
   */
  export type locationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null;
  };

  /**
   * Model location_history
   */

  export type AggregateLocation_history = {
    _count: Location_historyCountAggregateOutputType | null;
    _avg: Location_historyAvgAggregateOutputType | null;
    _sum: Location_historySumAggregateOutputType | null;
    _min: Location_historyMinAggregateOutputType | null;
    _max: Location_historyMaxAggregateOutputType | null;
  };

  export type Location_historyAvgAggregateOutputType = {
    lat: number | null;
    long: number | null;
  };

  export type Location_historySumAggregateOutputType = {
    lat: number | null;
    long: number | null;
  };

  export type Location_historyMinAggregateOutputType = {
    id: string | null;
    location_id: string | null;
    device_id: string | null;
    lat: number | null;
    long: number | null;
    recorded_at: Date | null;
  };

  export type Location_historyMaxAggregateOutputType = {
    id: string | null;
    location_id: string | null;
    device_id: string | null;
    lat: number | null;
    long: number | null;
    recorded_at: Date | null;
  };

  export type Location_historyCountAggregateOutputType = {
    id: number;
    location_id: number;
    device_id: number;
    lat: number;
    long: number;
    recorded_at: number;
    _all: number;
  };

  export type Location_historyAvgAggregateInputType = {
    lat?: true;
    long?: true;
  };

  export type Location_historySumAggregateInputType = {
    lat?: true;
    long?: true;
  };

  export type Location_historyMinAggregateInputType = {
    id?: true;
    location_id?: true;
    device_id?: true;
    lat?: true;
    long?: true;
    recorded_at?: true;
  };

  export type Location_historyMaxAggregateInputType = {
    id?: true;
    location_id?: true;
    device_id?: true;
    lat?: true;
    long?: true;
    recorded_at?: true;
  };

  export type Location_historyCountAggregateInputType = {
    id?: true;
    location_id?: true;
    device_id?: true;
    lat?: true;
    long?: true;
    recorded_at?: true;
    _all?: true;
  };

  export type Location_historyAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which location_history to aggregate.
     */
    where?: location_historyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of location_histories to fetch.
     */
    orderBy?: location_historyOrderByWithRelationInput | location_historyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: location_historyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` location_histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` location_histories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned location_histories
     **/
    _count?: true | Location_historyCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: Location_historyAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: Location_historySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: Location_historyMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: Location_historyMaxAggregateInputType;
  };

  export type GetLocation_historyAggregateType<T extends Location_historyAggregateArgs> = {
    [P in keyof T & keyof AggregateLocation_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation_history[P]>
      : GetScalarType<T[P], AggregateLocation_history[P]>;
  };

  export type location_historyGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: location_historyWhereInput;
    orderBy?:
      | location_historyOrderByWithAggregationInput
      | location_historyOrderByWithAggregationInput[];
    by: Location_historyScalarFieldEnum[] | Location_historyScalarFieldEnum;
    having?: location_historyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Location_historyCountAggregateInputType | true;
    _avg?: Location_historyAvgAggregateInputType;
    _sum?: Location_historySumAggregateInputType;
    _min?: Location_historyMinAggregateInputType;
    _max?: Location_historyMaxAggregateInputType;
  };

  export type Location_historyGroupByOutputType = {
    id: string;
    location_id: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at: Date;
    _count: Location_historyCountAggregateOutputType | null;
    _avg: Location_historyAvgAggregateOutputType | null;
    _sum: Location_historySumAggregateOutputType | null;
    _min: Location_historyMinAggregateOutputType | null;
    _max: Location_historyMaxAggregateOutputType | null;
  };

  type GetLocation_historyGroupByPayload<T extends location_historyGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<Location_historyGroupByOutputType, T['by']> & {
          [P in keyof T & keyof Location_historyGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Location_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Location_historyGroupByOutputType[P]>;
        }
      >
    >;

  export type location_historySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      location_id?: boolean;
      device_id?: boolean;
      lat?: boolean;
      long?: boolean;
      recorded_at?: boolean;
      location?: boolean | locationDefaultArgs<ExtArgs>;
      device?: boolean | deviceDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['location_history']
  >;

  export type location_historySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      location_id?: boolean;
      device_id?: boolean;
      lat?: boolean;
      long?: boolean;
      recorded_at?: boolean;
      location?: boolean | locationDefaultArgs<ExtArgs>;
      device?: boolean | deviceDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['location_history']
  >;

  export type location_historySelectScalar = {
    id?: boolean;
    location_id?: boolean;
    device_id?: boolean;
    lat?: boolean;
    long?: boolean;
    recorded_at?: boolean;
  };

  export type location_historyInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    location?: boolean | locationDefaultArgs<ExtArgs>;
    device?: boolean | deviceDefaultArgs<ExtArgs>;
  };
  export type location_historyIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    location?: boolean | locationDefaultArgs<ExtArgs>;
    device?: boolean | deviceDefaultArgs<ExtArgs>;
  };

  export type $location_historyPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'location_history';
    objects: {
      location: Prisma.$locationPayload<ExtArgs>;
      device: Prisma.$devicePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        location_id: string;
        device_id: string;
        lat: number;
        long: number;
        recorded_at: Date;
      },
      ExtArgs['result']['location_history']
    >;
    composites: {};
  };

  type location_historyGetPayload<
    S extends boolean | null | undefined | location_historyDefaultArgs,
  > = $Result.GetResult<Prisma.$location_historyPayload, S>;

  type location_historyCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<location_historyFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: Location_historyCountAggregateInputType | true;
  };

  export interface location_historyDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['location_history'];
      meta: { name: 'location_history' };
    };
    /**
     * Find zero or one Location_history that matches the filter.
     * @param {location_historyFindUniqueArgs} args - Arguments to find a Location_history
     * @example
     * // Get one Location_history
     * const location_history = await prisma.location_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends location_historyFindUniqueArgs>(
      args: SelectSubset<T, location_historyFindUniqueArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Location_history that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {location_historyFindUniqueOrThrowArgs} args - Arguments to find a Location_history
     * @example
     * // Get one Location_history
     * const location_history = await prisma.location_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends location_historyFindUniqueOrThrowArgs>(
      args: SelectSubset<T, location_historyFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Location_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {location_historyFindFirstArgs} args - Arguments to find a Location_history
     * @example
     * // Get one Location_history
     * const location_history = await prisma.location_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends location_historyFindFirstArgs>(
      args?: SelectSubset<T, location_historyFindFirstArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Location_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {location_historyFindFirstOrThrowArgs} args - Arguments to find a Location_history
     * @example
     * // Get one Location_history
     * const location_history = await prisma.location_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends location_historyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, location_historyFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Location_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {location_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Location_histories
     * const location_histories = await prisma.location_history.findMany()
     *
     * // Get first 10 Location_histories
     * const location_histories = await prisma.location_history.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const location_historyWithIdOnly = await prisma.location_history.findMany({ select: { id: true } })
     *
     */
    findMany<T extends location_historyFindManyArgs>(
      args?: SelectSubset<T, location_historyFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a Location_history.
     * @param {location_historyCreateArgs} args - Arguments to create a Location_history.
     * @example
     * // Create one Location_history
     * const Location_history = await prisma.location_history.create({
     *   data: {
     *     // ... data to create a Location_history
     *   }
     * })
     *
     */
    create<T extends location_historyCreateArgs>(
      args: SelectSubset<T, location_historyCreateArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Location_histories.
     * @param {location_historyCreateManyArgs} args - Arguments to create many Location_histories.
     * @example
     * // Create many Location_histories
     * const location_history = await prisma.location_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends location_historyCreateManyArgs>(
      args?: SelectSubset<T, location_historyCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Location_histories and returns the data saved in the database.
     * @param {location_historyCreateManyAndReturnArgs} args - Arguments to create many Location_histories.
     * @example
     * // Create many Location_histories
     * const location_history = await prisma.location_history.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Location_histories and only return the `id`
     * const location_historyWithIdOnly = await prisma.location_history.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends location_historyCreateManyAndReturnArgs>(
      args?: SelectSubset<T, location_historyCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Location_history.
     * @param {location_historyDeleteArgs} args - Arguments to delete one Location_history.
     * @example
     * // Delete one Location_history
     * const Location_history = await prisma.location_history.delete({
     *   where: {
     *     // ... filter to delete one Location_history
     *   }
     * })
     *
     */
    delete<T extends location_historyDeleteArgs>(
      args: SelectSubset<T, location_historyDeleteArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Location_history.
     * @param {location_historyUpdateArgs} args - Arguments to update one Location_history.
     * @example
     * // Update one Location_history
     * const location_history = await prisma.location_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends location_historyUpdateArgs>(
      args: SelectSubset<T, location_historyUpdateArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Location_histories.
     * @param {location_historyDeleteManyArgs} args - Arguments to filter Location_histories to delete.
     * @example
     * // Delete a few Location_histories
     * const { count } = await prisma.location_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends location_historyDeleteManyArgs>(
      args?: SelectSubset<T, location_historyDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Location_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {location_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Location_histories
     * const location_history = await prisma.location_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends location_historyUpdateManyArgs>(
      args: SelectSubset<T, location_historyUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Location_history.
     * @param {location_historyUpsertArgs} args - Arguments to update or create a Location_history.
     * @example
     * // Update or create a Location_history
     * const location_history = await prisma.location_history.upsert({
     *   create: {
     *     // ... data to create a Location_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location_history we want to update
     *   }
     * })
     */
    upsert<T extends location_historyUpsertArgs>(
      args: SelectSubset<T, location_historyUpsertArgs<ExtArgs>>
    ): Prisma__location_historyClient<
      $Result.GetResult<Prisma.$location_historyPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Location_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {location_historyCountArgs} args - Arguments to filter Location_histories to count.
     * @example
     * // Count the number of Location_histories
     * const count = await prisma.location_history.count({
     *   where: {
     *     // ... the filter for the Location_histories we want to count
     *   }
     * })
     **/
    count<T extends location_historyCountArgs>(
      args?: Subset<T, location_historyCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Location_historyCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Location_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Location_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Location_historyAggregateArgs>(
      args: Subset<T, Location_historyAggregateArgs>
    ): Prisma.PrismaPromise<GetLocation_historyAggregateType<T>>;

    /**
     * Group by Location_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {location_historyGroupByArgs} args - Group by arguments.
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
      T extends location_historyGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: location_historyGroupByArgs['orderBy'] }
        : { orderBy?: location_historyGroupByArgs['orderBy'] },
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, location_historyGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetLocation_historyGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the location_history model
     */
    readonly fields: location_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for location_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__location_historyClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    location<T extends locationDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, locationDefaultArgs<ExtArgs>>
    ): Prisma__locationClient<
      $Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    device<T extends deviceDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, deviceDefaultArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the location_history model
   */
  interface location_historyFieldRefs {
    readonly id: FieldRef<'location_history', 'String'>;
    readonly location_id: FieldRef<'location_history', 'String'>;
    readonly device_id: FieldRef<'location_history', 'String'>;
    readonly lat: FieldRef<'location_history', 'Float'>;
    readonly long: FieldRef<'location_history', 'Float'>;
    readonly recorded_at: FieldRef<'location_history', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * location_history findUnique
   */
  export type location_historyFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * Filter, which location_history to fetch.
     */
    where: location_historyWhereUniqueInput;
  };

  /**
   * location_history findUniqueOrThrow
   */
  export type location_historyFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * Filter, which location_history to fetch.
     */
    where: location_historyWhereUniqueInput;
  };

  /**
   * location_history findFirst
   */
  export type location_historyFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * Filter, which location_history to fetch.
     */
    where?: location_historyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of location_histories to fetch.
     */
    orderBy?: location_historyOrderByWithRelationInput | location_historyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for location_histories.
     */
    cursor?: location_historyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` location_histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` location_histories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of location_histories.
     */
    distinct?: Location_historyScalarFieldEnum | Location_historyScalarFieldEnum[];
  };

  /**
   * location_history findFirstOrThrow
   */
  export type location_historyFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * Filter, which location_history to fetch.
     */
    where?: location_historyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of location_histories to fetch.
     */
    orderBy?: location_historyOrderByWithRelationInput | location_historyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for location_histories.
     */
    cursor?: location_historyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` location_histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` location_histories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of location_histories.
     */
    distinct?: Location_historyScalarFieldEnum | Location_historyScalarFieldEnum[];
  };

  /**
   * location_history findMany
   */
  export type location_historyFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * Filter, which location_histories to fetch.
     */
    where?: location_historyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of location_histories to fetch.
     */
    orderBy?: location_historyOrderByWithRelationInput | location_historyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing location_histories.
     */
    cursor?: location_historyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` location_histories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` location_histories.
     */
    skip?: number;
    distinct?: Location_historyScalarFieldEnum | Location_historyScalarFieldEnum[];
  };

  /**
   * location_history create
   */
  export type location_historyCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * The data needed to create a location_history.
     */
    data: XOR<location_historyCreateInput, location_historyUncheckedCreateInput>;
  };

  /**
   * location_history createMany
   */
  export type location_historyCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many location_histories.
     */
    data: location_historyCreateManyInput | location_historyCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * location_history createManyAndReturn
   */
  export type location_historyCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many location_histories.
     */
    data: location_historyCreateManyInput | location_historyCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * location_history update
   */
  export type location_historyUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * The data needed to update a location_history.
     */
    data: XOR<location_historyUpdateInput, location_historyUncheckedUpdateInput>;
    /**
     * Choose, which location_history to update.
     */
    where: location_historyWhereUniqueInput;
  };

  /**
   * location_history updateMany
   */
  export type location_historyUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update location_histories.
     */
    data: XOR<location_historyUpdateManyMutationInput, location_historyUncheckedUpdateManyInput>;
    /**
     * Filter which location_histories to update
     */
    where?: location_historyWhereInput;
  };

  /**
   * location_history upsert
   */
  export type location_historyUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * The filter to search for the location_history to update in case it exists.
     */
    where: location_historyWhereUniqueInput;
    /**
     * In case the location_history found by the `where` argument doesn't exist, create a new location_history with this data.
     */
    create: XOR<location_historyCreateInput, location_historyUncheckedCreateInput>;
    /**
     * In case the location_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<location_historyUpdateInput, location_historyUncheckedUpdateInput>;
  };

  /**
   * location_history delete
   */
  export type location_historyDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
    /**
     * Filter which location_history to delete.
     */
    where: location_historyWhereUniqueInput;
  };

  /**
   * location_history deleteMany
   */
  export type location_historyDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which location_histories to delete
     */
    where?: location_historyWhereInput;
  };

  /**
   * location_history without action
   */
  export type location_historyDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the location_history
     */
    select?: location_historySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: location_historyInclude<ExtArgs> | null;
  };

  /**
   * Model alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null;
    _avg: AlertAvgAggregateOutputType | null;
    _sum: AlertSumAggregateOutputType | null;
    _min: AlertMinAggregateOutputType | null;
    _max: AlertMaxAggregateOutputType | null;
  };

  export type AlertAvgAggregateOutputType = {
    threshold_min: number | null;
    threshold_max: number | null;
  };

  export type AlertSumAggregateOutputType = {
    threshold_min: number | null;
    threshold_max: number | null;
  };

  export type AlertMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    description: string | null;
    severity: string | null;
    threshold_min: number | null;
    threshold_max: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type AlertMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    name: string | null;
    description: string | null;
    severity: string | null;
    threshold_min: number | null;
    threshold_max: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type AlertCountAggregateOutputType = {
    id: number;
    code: number;
    name: number;
    description: number;
    severity: number;
    threshold_min: number;
    threshold_max: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type AlertAvgAggregateInputType = {
    threshold_min?: true;
    threshold_max?: true;
  };

  export type AlertSumAggregateInputType = {
    threshold_min?: true;
    threshold_max?: true;
  };

  export type AlertMinAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    description?: true;
    severity?: true;
    threshold_min?: true;
    threshold_max?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type AlertMaxAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    description?: true;
    severity?: true;
    threshold_min?: true;
    threshold_max?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type AlertCountAggregateInputType = {
    id?: true;
    code?: true;
    name?: true;
    description?: true;
    severity?: true;
    threshold_min?: true;
    threshold_max?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type AlertAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which alert to aggregate.
     */
    where?: alertWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: alertWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alerts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned alerts
     **/
    _count?: true | AlertCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AlertAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AlertSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AlertMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AlertMaxAggregateInputType;
  };

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
    [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>;
  };

  export type alertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: alertWhereInput;
      orderBy?: alertOrderByWithAggregationInput | alertOrderByWithAggregationInput[];
      by: AlertScalarFieldEnum[] | AlertScalarFieldEnum;
      having?: alertScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: AlertCountAggregateInputType | true;
      _avg?: AlertAvgAggregateInputType;
      _sum?: AlertSumAggregateInputType;
      _min?: AlertMinAggregateInputType;
      _max?: AlertMaxAggregateInputType;
    };

  export type AlertGroupByOutputType = {
    id: string;
    code: string;
    name: string;
    description: string | null;
    severity: string;
    threshold_min: number | null;
    threshold_max: number | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: AlertCountAggregateOutputType | null;
    _avg: AlertAvgAggregateOutputType | null;
    _sum: AlertSumAggregateOutputType | null;
    _min: AlertMinAggregateOutputType | null;
    _max: AlertMaxAggregateOutputType | null;
  };

  type GetAlertGroupByPayload<T extends alertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> & {
        [P in keyof T & keyof AlertGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
          : GetScalarType<T[P], AlertGroupByOutputType[P]>;
      }
    >
  >;

  export type alertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        code?: boolean;
        name?: boolean;
        description?: boolean;
        severity?: boolean;
        threshold_min?: boolean;
        threshold_max?: boolean;
        created_at?: boolean;
        updated_at?: boolean;
        deleted_at?: boolean;
        alert_events?: boolean | alert$alert_eventsArgs<ExtArgs>;
        _count?: boolean | AlertCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['alert']
    >;

  export type alertSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      code?: boolean;
      name?: boolean;
      description?: boolean;
      severity?: boolean;
      threshold_min?: boolean;
      threshold_max?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['alert']
  >;

  export type alertSelectScalar = {
    id?: boolean;
    code?: boolean;
    name?: boolean;
    description?: boolean;
    severity?: boolean;
    threshold_min?: boolean;
    threshold_max?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type alertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert_events?: boolean | alert$alert_eventsArgs<ExtArgs>;
    _count?: boolean | AlertCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type alertIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $alertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'alert';
    objects: {
      alert_events: Prisma.$alert_eventsPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        code: string;
        name: string;
        description: string | null;
        severity: string;
        threshold_min: number | null;
        threshold_max: number | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['alert']
    >;
    composites: {};
  };

  type alertGetPayload<S extends boolean | null | undefined | alertDefaultArgs> = $Result.GetResult<
    Prisma.$alertPayload,
    S
  >;

  type alertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    alertFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: AlertCountAggregateInputType | true;
  };

  export interface alertDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['alert']; meta: { name: 'alert' } };
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
    findUnique<T extends alertFindUniqueArgs>(
      args: SelectSubset<T, alertFindUniqueArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends alertFindUniqueOrThrowArgs>(
      args: SelectSubset<T, alertFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends alertFindFirstArgs>(
      args?: SelectSubset<T, alertFindFirstArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends alertFindFirstOrThrowArgs>(
      args?: SelectSubset<T, alertFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends alertFindManyArgs>(
      args?: SelectSubset<T, alertFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends alertCreateArgs>(
      args: SelectSubset<T, alertCreateArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends alertCreateManyArgs>(
      args?: SelectSubset<T, alertCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends alertCreateManyAndReturnArgs>(
      args?: SelectSubset<T, alertCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends alertDeleteArgs>(
      args: SelectSubset<T, alertDeleteArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends alertUpdateArgs>(
      args: SelectSubset<T, alertUpdateArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends alertDeleteManyArgs>(
      args?: SelectSubset<T, alertDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends alertUpdateManyArgs>(
      args: SelectSubset<T, alertUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends alertUpsertArgs>(
      args: SelectSubset<T, alertUpsertArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, alertCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends AlertAggregateArgs>(
      args: Subset<T, AlertAggregateArgs>
    ): Prisma.PrismaPromise<GetAlertAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, alertGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__alertClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    alert_events<T extends alert$alert_eventsArgs<ExtArgs> = {}>(
      args?: Subset<T, alert$alert_eventsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the alert model
   */
  interface alertFieldRefs {
    readonly id: FieldRef<'alert', 'String'>;
    readonly code: FieldRef<'alert', 'String'>;
    readonly name: FieldRef<'alert', 'String'>;
    readonly description: FieldRef<'alert', 'String'>;
    readonly severity: FieldRef<'alert', 'String'>;
    readonly threshold_min: FieldRef<'alert', 'Float'>;
    readonly threshold_max: FieldRef<'alert', 'Float'>;
    readonly created_at: FieldRef<'alert', 'DateTime'>;
    readonly updated_at: FieldRef<'alert', 'DateTime'>;
    readonly deleted_at: FieldRef<'alert', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * alert findUnique
   */
  export type alertFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null;
    /**
     * Filter, which alert to fetch.
     */
    where: alertWhereUniqueInput;
  };

  /**
   * alert findUniqueOrThrow
   */
  export type alertFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null;
    /**
     * Filter, which alert to fetch.
     */
    where: alertWhereUniqueInput;
  };

  /**
   * alert findFirst
   */
  export type alertFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null;
    /**
     * Filter, which alert to fetch.
     */
    where?: alertWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for alerts.
     */
    cursor?: alertWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alerts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[];
  };

  /**
   * alert findFirstOrThrow
   */
  export type alertFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null;
    /**
     * Filter, which alert to fetch.
     */
    where?: alertWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for alerts.
     */
    cursor?: alertWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alerts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[];
  };

  /**
   * alert findMany
   */
  export type alertFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alertInclude<ExtArgs> | null;
    /**
     * Filter, which alerts to fetch.
     */
    where?: alertWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alerts to fetch.
     */
    orderBy?: alertOrderByWithRelationInput | alertOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing alerts.
     */
    cursor?: alertWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alerts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alerts.
     */
    skip?: number;
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[];
  };

  /**
   * alert create
   */
  export type alertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the alert
       */
      select?: alertSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: alertInclude<ExtArgs> | null;
      /**
       * The data needed to create a alert.
       */
      data: XOR<alertCreateInput, alertUncheckedCreateInput>;
    };

  /**
   * alert createMany
   */
  export type alertCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many alerts.
     */
    data: alertCreateManyInput | alertCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * alert createManyAndReturn
   */
  export type alertCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert
     */
    select?: alertSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many alerts.
     */
    data: alertCreateManyInput | alertCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * alert update
   */
  export type alertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the alert
       */
      select?: alertSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: alertInclude<ExtArgs> | null;
      /**
       * The data needed to update a alert.
       */
      data: XOR<alertUpdateInput, alertUncheckedUpdateInput>;
      /**
       * Choose, which alert to update.
       */
      where: alertWhereUniqueInput;
    };

  /**
   * alert updateMany
   */
  export type alertUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update alerts.
     */
    data: XOR<alertUpdateManyMutationInput, alertUncheckedUpdateManyInput>;
    /**
     * Filter which alerts to update
     */
    where?: alertWhereInput;
  };

  /**
   * alert upsert
   */
  export type alertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the alert
       */
      select?: alertSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: alertInclude<ExtArgs> | null;
      /**
       * The filter to search for the alert to update in case it exists.
       */
      where: alertWhereUniqueInput;
      /**
       * In case the alert found by the `where` argument doesn't exist, create a new alert with this data.
       */
      create: XOR<alertCreateInput, alertUncheckedCreateInput>;
      /**
       * In case the alert was found with the provided `where` argument, update it with this data.
       */
      update: XOR<alertUpdateInput, alertUncheckedUpdateInput>;
    };

  /**
   * alert delete
   */
  export type alertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the alert
       */
      select?: alertSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: alertInclude<ExtArgs> | null;
      /**
       * Filter which alert to delete.
       */
      where: alertWhereUniqueInput;
    };

  /**
   * alert deleteMany
   */
  export type alertDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which alerts to delete
     */
    where?: alertWhereInput;
  };

  /**
   * alert.alert_events
   */
  export type alert$alert_eventsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    where?: alert_eventsWhereInput;
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    cursor?: alert_eventsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * alert without action
   */
  export type alertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the alert
       */
      select?: alertSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: alertInclude<ExtArgs> | null;
    };

  /**
   * Model alert_events
   */

  export type AggregateAlert_events = {
    _count: Alert_eventsCountAggregateOutputType | null;
    _avg: Alert_eventsAvgAggregateOutputType | null;
    _sum: Alert_eventsSumAggregateOutputType | null;
    _min: Alert_eventsMinAggregateOutputType | null;
    _max: Alert_eventsMaxAggregateOutputType | null;
  };

  export type Alert_eventsAvgAggregateOutputType = {
    value: number | null;
  };

  export type Alert_eventsSumAggregateOutputType = {
    value: number | null;
  };

  export type Alert_eventsMinAggregateOutputType = {
    id: string | null;
    alert_id: string | null;
    device_id: string | null;
    sensor_id: string | null;
    truck_id: string | null;
    value: number | null;
    message: string | null;
    status: string | null;
    created_at: Date | null;
    resolved_at: Date | null;
  };

  export type Alert_eventsMaxAggregateOutputType = {
    id: string | null;
    alert_id: string | null;
    device_id: string | null;
    sensor_id: string | null;
    truck_id: string | null;
    value: number | null;
    message: string | null;
    status: string | null;
    created_at: Date | null;
    resolved_at: Date | null;
  };

  export type Alert_eventsCountAggregateOutputType = {
    id: number;
    alert_id: number;
    device_id: number;
    sensor_id: number;
    truck_id: number;
    value: number;
    message: number;
    status: number;
    created_at: number;
    resolved_at: number;
    _all: number;
  };

  export type Alert_eventsAvgAggregateInputType = {
    value?: true;
  };

  export type Alert_eventsSumAggregateInputType = {
    value?: true;
  };

  export type Alert_eventsMinAggregateInputType = {
    id?: true;
    alert_id?: true;
    device_id?: true;
    sensor_id?: true;
    truck_id?: true;
    value?: true;
    message?: true;
    status?: true;
    created_at?: true;
    resolved_at?: true;
  };

  export type Alert_eventsMaxAggregateInputType = {
    id?: true;
    alert_id?: true;
    device_id?: true;
    sensor_id?: true;
    truck_id?: true;
    value?: true;
    message?: true;
    status?: true;
    created_at?: true;
    resolved_at?: true;
  };

  export type Alert_eventsCountAggregateInputType = {
    id?: true;
    alert_id?: true;
    device_id?: true;
    sensor_id?: true;
    truck_id?: true;
    value?: true;
    message?: true;
    status?: true;
    created_at?: true;
    resolved_at?: true;
    _all?: true;
  };

  export type Alert_eventsAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which alert_events to aggregate.
     */
    where?: alert_eventsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: alert_eventsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alert_events.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned alert_events
     **/
    _count?: true | Alert_eventsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: Alert_eventsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: Alert_eventsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: Alert_eventsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: Alert_eventsMaxAggregateInputType;
  };

  export type GetAlert_eventsAggregateType<T extends Alert_eventsAggregateArgs> = {
    [P in keyof T & keyof AggregateAlert_events]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert_events[P]>
      : GetScalarType<T[P], AggregateAlert_events[P]>;
  };

  export type alert_eventsGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: alert_eventsWhereInput;
    orderBy?: alert_eventsOrderByWithAggregationInput | alert_eventsOrderByWithAggregationInput[];
    by: Alert_eventsScalarFieldEnum[] | Alert_eventsScalarFieldEnum;
    having?: alert_eventsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Alert_eventsCountAggregateInputType | true;
    _avg?: Alert_eventsAvgAggregateInputType;
    _sum?: Alert_eventsSumAggregateInputType;
    _min?: Alert_eventsMinAggregateInputType;
    _max?: Alert_eventsMaxAggregateInputType;
  };

  export type Alert_eventsGroupByOutputType = {
    id: string;
    alert_id: string;
    device_id: string | null;
    sensor_id: string | null;
    truck_id: string | null;
    value: number | null;
    message: string | null;
    status: string;
    created_at: Date;
    resolved_at: Date | null;
    _count: Alert_eventsCountAggregateOutputType | null;
    _avg: Alert_eventsAvgAggregateOutputType | null;
    _sum: Alert_eventsSumAggregateOutputType | null;
    _min: Alert_eventsMinAggregateOutputType | null;
    _max: Alert_eventsMaxAggregateOutputType | null;
  };

  type GetAlert_eventsGroupByPayload<T extends alert_eventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Alert_eventsGroupByOutputType, T['by']> & {
        [P in keyof T & keyof Alert_eventsGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], Alert_eventsGroupByOutputType[P]>
          : GetScalarType<T[P], Alert_eventsGroupByOutputType[P]>;
      }
    >
  >;

  export type alert_eventsSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      alert_id?: boolean;
      device_id?: boolean;
      sensor_id?: boolean;
      truck_id?: boolean;
      value?: boolean;
      message?: boolean;
      status?: boolean;
      created_at?: boolean;
      resolved_at?: boolean;
      alert?: boolean | alertDefaultArgs<ExtArgs>;
      device?: boolean | alert_events$deviceArgs<ExtArgs>;
      sensor?: boolean | alert_events$sensorArgs<ExtArgs>;
      truck?: boolean | alert_events$truckArgs<ExtArgs>;
    },
    ExtArgs['result']['alert_events']
  >;

  export type alert_eventsSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      alert_id?: boolean;
      device_id?: boolean;
      sensor_id?: boolean;
      truck_id?: boolean;
      value?: boolean;
      message?: boolean;
      status?: boolean;
      created_at?: boolean;
      resolved_at?: boolean;
      alert?: boolean | alertDefaultArgs<ExtArgs>;
      device?: boolean | alert_events$deviceArgs<ExtArgs>;
      sensor?: boolean | alert_events$sensorArgs<ExtArgs>;
      truck?: boolean | alert_events$truckArgs<ExtArgs>;
    },
    ExtArgs['result']['alert_events']
  >;

  export type alert_eventsSelectScalar = {
    id?: boolean;
    alert_id?: boolean;
    device_id?: boolean;
    sensor_id?: boolean;
    truck_id?: boolean;
    value?: boolean;
    message?: boolean;
    status?: boolean;
    created_at?: boolean;
    resolved_at?: boolean;
  };

  export type alert_eventsInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    alert?: boolean | alertDefaultArgs<ExtArgs>;
    device?: boolean | alert_events$deviceArgs<ExtArgs>;
    sensor?: boolean | alert_events$sensorArgs<ExtArgs>;
    truck?: boolean | alert_events$truckArgs<ExtArgs>;
  };
  export type alert_eventsIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    alert?: boolean | alertDefaultArgs<ExtArgs>;
    device?: boolean | alert_events$deviceArgs<ExtArgs>;
    sensor?: boolean | alert_events$sensorArgs<ExtArgs>;
    truck?: boolean | alert_events$truckArgs<ExtArgs>;
  };

  export type $alert_eventsPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'alert_events';
    objects: {
      alert: Prisma.$alertPayload<ExtArgs>;
      device: Prisma.$devicePayload<ExtArgs> | null;
      sensor: Prisma.$sensorPayload<ExtArgs> | null;
      truck: Prisma.$truckPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        alert_id: string;
        device_id: string | null;
        sensor_id: string | null;
        truck_id: string | null;
        value: number | null;
        message: string | null;
        status: string;
        created_at: Date;
        resolved_at: Date | null;
      },
      ExtArgs['result']['alert_events']
    >;
    composites: {};
  };

  type alert_eventsGetPayload<S extends boolean | null | undefined | alert_eventsDefaultArgs> =
    $Result.GetResult<Prisma.$alert_eventsPayload, S>;

  type alert_eventsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<alert_eventsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Alert_eventsCountAggregateInputType | true;
    };

  export interface alert_eventsDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['alert_events'];
      meta: { name: 'alert_events' };
    };
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
    findUnique<T extends alert_eventsFindUniqueArgs>(
      args: SelectSubset<T, alert_eventsFindUniqueArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

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
    findUniqueOrThrow<T extends alert_eventsFindUniqueOrThrowArgs>(
      args: SelectSubset<T, alert_eventsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

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
    findFirst<T extends alert_eventsFindFirstArgs>(
      args?: SelectSubset<T, alert_eventsFindFirstArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

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
    findFirstOrThrow<T extends alert_eventsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, alert_eventsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

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
    findMany<T extends alert_eventsFindManyArgs>(
      args?: SelectSubset<T, alert_eventsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'findMany'>>;

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
    create<T extends alert_eventsCreateArgs>(
      args: SelectSubset<T, alert_eventsCreateArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

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
    createMany<T extends alert_eventsCreateManyArgs>(
      args?: SelectSubset<T, alert_eventsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    createManyAndReturn<T extends alert_eventsCreateManyAndReturnArgs>(
      args?: SelectSubset<T, alert_eventsCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

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
    delete<T extends alert_eventsDeleteArgs>(
      args: SelectSubset<T, alert_eventsDeleteArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

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
    update<T extends alert_eventsUpdateArgs>(
      args: SelectSubset<T, alert_eventsUpdateArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

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
    deleteMany<T extends alert_eventsDeleteManyArgs>(
      args?: SelectSubset<T, alert_eventsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends alert_eventsUpdateManyArgs>(
      args: SelectSubset<T, alert_eventsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

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
    upsert<T extends alert_eventsUpsertArgs>(
      args: SelectSubset<T, alert_eventsUpsertArgs<ExtArgs>>
    ): Prisma__alert_eventsClient<
      $Result.GetResult<Prisma.$alert_eventsPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

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
      args?: Subset<T, alert_eventsCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Alert_eventsCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends Alert_eventsAggregateArgs>(
      args: Subset<T, Alert_eventsAggregateArgs>
    ): Prisma.PrismaPromise<GetAlert_eventsAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
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
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, alert_eventsGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetAlert_eventsGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__alert_eventsClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    alert<T extends alertDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, alertDefaultArgs<ExtArgs>>
    ): Prisma__alertClient<
      $Result.GetResult<Prisma.$alertPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    device<T extends alert_events$deviceArgs<ExtArgs> = {}>(
      args?: Subset<T, alert_events$deviceArgs<ExtArgs>>
    ): Prisma__deviceClient<
      $Result.GetResult<Prisma.$devicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    sensor<T extends alert_events$sensorArgs<ExtArgs> = {}>(
      args?: Subset<T, alert_events$sensorArgs<ExtArgs>>
    ): Prisma__sensorClient<
      $Result.GetResult<Prisma.$sensorPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    truck<T extends alert_events$truckArgs<ExtArgs> = {}>(
      args?: Subset<T, alert_events$truckArgs<ExtArgs>>
    ): Prisma__truckClient<
      $Result.GetResult<Prisma.$truckPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null,
      null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the alert_events model
   */
  interface alert_eventsFieldRefs {
    readonly id: FieldRef<'alert_events', 'String'>;
    readonly alert_id: FieldRef<'alert_events', 'String'>;
    readonly device_id: FieldRef<'alert_events', 'String'>;
    readonly sensor_id: FieldRef<'alert_events', 'String'>;
    readonly truck_id: FieldRef<'alert_events', 'String'>;
    readonly value: FieldRef<'alert_events', 'Float'>;
    readonly message: FieldRef<'alert_events', 'String'>;
    readonly status: FieldRef<'alert_events', 'String'>;
    readonly created_at: FieldRef<'alert_events', 'DateTime'>;
    readonly resolved_at: FieldRef<'alert_events', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * alert_events findUnique
   */
  export type alert_eventsFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * Filter, which alert_events to fetch.
     */
    where: alert_eventsWhereUniqueInput;
  };

  /**
   * alert_events findUniqueOrThrow
   */
  export type alert_eventsFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * Filter, which alert_events to fetch.
     */
    where: alert_eventsWhereUniqueInput;
  };

  /**
   * alert_events findFirst
   */
  export type alert_eventsFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * Filter, which alert_events to fetch.
     */
    where?: alert_eventsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for alert_events.
     */
    cursor?: alert_eventsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alert_events.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of alert_events.
     */
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * alert_events findFirstOrThrow
   */
  export type alert_eventsFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * Filter, which alert_events to fetch.
     */
    where?: alert_eventsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for alert_events.
     */
    cursor?: alert_eventsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alert_events.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of alert_events.
     */
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * alert_events findMany
   */
  export type alert_eventsFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * Filter, which alert_events to fetch.
     */
    where?: alert_eventsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of alert_events to fetch.
     */
    orderBy?: alert_eventsOrderByWithRelationInput | alert_eventsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing alert_events.
     */
    cursor?: alert_eventsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` alert_events from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` alert_events.
     */
    skip?: number;
    distinct?: Alert_eventsScalarFieldEnum | Alert_eventsScalarFieldEnum[];
  };

  /**
   * alert_events create
   */
  export type alert_eventsCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * The data needed to create a alert_events.
     */
    data: XOR<alert_eventsCreateInput, alert_eventsUncheckedCreateInput>;
  };

  /**
   * alert_events createMany
   */
  export type alert_eventsCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many alert_events.
     */
    data: alert_eventsCreateManyInput | alert_eventsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * alert_events createManyAndReturn
   */
  export type alert_eventsCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many alert_events.
     */
    data: alert_eventsCreateManyInput | alert_eventsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * alert_events update
   */
  export type alert_eventsUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * The data needed to update a alert_events.
     */
    data: XOR<alert_eventsUpdateInput, alert_eventsUncheckedUpdateInput>;
    /**
     * Choose, which alert_events to update.
     */
    where: alert_eventsWhereUniqueInput;
  };

  /**
   * alert_events updateMany
   */
  export type alert_eventsUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update alert_events.
     */
    data: XOR<alert_eventsUpdateManyMutationInput, alert_eventsUncheckedUpdateManyInput>;
    /**
     * Filter which alert_events to update
     */
    where?: alert_eventsWhereInput;
  };

  /**
   * alert_events upsert
   */
  export type alert_eventsUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * The filter to search for the alert_events to update in case it exists.
     */
    where: alert_eventsWhereUniqueInput;
    /**
     * In case the alert_events found by the `where` argument doesn't exist, create a new alert_events with this data.
     */
    create: XOR<alert_eventsCreateInput, alert_eventsUncheckedCreateInput>;
    /**
     * In case the alert_events was found with the provided `where` argument, update it with this data.
     */
    update: XOR<alert_eventsUpdateInput, alert_eventsUncheckedUpdateInput>;
  };

  /**
   * alert_events delete
   */
  export type alert_eventsDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
    /**
     * Filter which alert_events to delete.
     */
    where: alert_eventsWhereUniqueInput;
  };

  /**
   * alert_events deleteMany
   */
  export type alert_eventsDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which alert_events to delete
     */
    where?: alert_eventsWhereInput;
  };

  /**
   * alert_events.device
   */
  export type alert_events$deviceArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the device
     */
    select?: deviceSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: deviceInclude<ExtArgs> | null;
    where?: deviceWhereInput;
  };

  /**
   * alert_events.sensor
   */
  export type alert_events$sensorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the sensor
     */
    select?: sensorSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sensorInclude<ExtArgs> | null;
    where?: sensorWhereInput;
  };

  /**
   * alert_events.truck
   */
  export type alert_events$truckArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the truck
     */
    select?: truckSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: truckInclude<ExtArgs> | null;
    where?: truckWhereInput;
  };

  /**
   * alert_events without action
   */
  export type alert_eventsDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the alert_events
     */
    select?: alert_eventsSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: alert_eventsInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const VendorsScalarFieldEnum: {
    id: 'id';
    name_vendor: 'name_vendor';
    address: 'address';
    telephone: 'telephone';
    email: 'email';
    contact_person: 'contact_person';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type VendorsScalarFieldEnum =
    (typeof VendorsScalarFieldEnum)[keyof typeof VendorsScalarFieldEnum];

  export const DriversScalarFieldEnum: {
    id: 'id';
    name: 'name';
    phone: 'phone';
    email: 'email';
    license_number: 'license_number';
    license_type: 'license_type';
    license_expiry: 'license_expiry';
    vendor_id: 'vendor_id';
    status: 'status';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type DriversScalarFieldEnum =
    (typeof DriversScalarFieldEnum)[keyof typeof DriversScalarFieldEnum];

  export const TruckScalarFieldEnum: {
    id: 'id';
    name: 'name';
    image: 'image';
    year: 'year';
    model: 'model';
    type: 'type';
    vendor_id: 'vendor_id';
    status: 'status';
    vin: 'vin';
    plate: 'plate';
    driver_id: 'driver_id';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
    created_by: 'created_by';
    updated_by: 'updated_by';
  };

  export type TruckScalarFieldEnum =
    (typeof TruckScalarFieldEnum)[keyof typeof TruckScalarFieldEnum];

  export const User_adminScalarFieldEnum: {
    id: 'id';
    name: 'name';
    email: 'email';
    password: 'password';
    role: 'role';
    last_login: 'last_login';
    status: 'status';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type User_adminScalarFieldEnum =
    (typeof User_adminScalarFieldEnum)[keyof typeof User_adminScalarFieldEnum];

  export const DeviceScalarFieldEnum: {
    id: 'id';
    truck_id: 'truck_id';
    sn: 'sn';
    bat1: 'bat1';
    bat2: 'bat2';
    bat3: 'bat3';
    lock: 'lock';
    sim_number: 'sim_number';
    installed_at: 'installed_at';
    status: 'status';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type DeviceScalarFieldEnum =
    (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum];

  export const SensorScalarFieldEnum: {
    id: 'id';
    sn: 'sn';
    device_id: 'device_id';
    tireNo: 'tireNo';
    simNumber: 'simNumber';
    sensorNo: 'sensorNo';
    sensor_lock: 'sensor_lock';
    status: 'status';
    tempValue: 'tempValue';
    tirepValue: 'tirepValue';
    exType: 'exType';
    bat: 'bat';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type SensorScalarFieldEnum =
    (typeof SensorScalarFieldEnum)[keyof typeof SensorScalarFieldEnum];

  export const LocationScalarFieldEnum: {
    id: 'id';
    device_id: 'device_id';
    lat: 'lat';
    long: 'long';
    recorded_at: 'recorded_at';
    created_at: 'created_at';
  };

  export type LocationScalarFieldEnum =
    (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];

  export const Location_historyScalarFieldEnum: {
    id: 'id';
    location_id: 'location_id';
    device_id: 'device_id';
    lat: 'lat';
    long: 'long';
    recorded_at: 'recorded_at';
  };

  export type Location_historyScalarFieldEnum =
    (typeof Location_historyScalarFieldEnum)[keyof typeof Location_historyScalarFieldEnum];

  export const AlertScalarFieldEnum: {
    id: 'id';
    code: 'code';
    name: 'name';
    description: 'description';
    severity: 'severity';
    threshold_min: 'threshold_min';
    threshold_max: 'threshold_max';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type AlertScalarFieldEnum =
    (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum];

  export const Alert_eventsScalarFieldEnum: {
    id: 'id';
    alert_id: 'alert_id';
    device_id: 'device_id';
    sensor_id: 'sensor_id';
    truck_id: 'truck_id';
    value: 'value';
    message: 'message';
    status: 'status';
    created_at: 'created_at';
    resolved_at: 'resolved_at';
  };

  export type Alert_eventsScalarFieldEnum =
    (typeof Alert_eventsScalarFieldEnum)[keyof typeof Alert_eventsScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type vendorsWhereInput = {
    AND?: vendorsWhereInput | vendorsWhereInput[];
    OR?: vendorsWhereInput[];
    NOT?: vendorsWhereInput | vendorsWhereInput[];
    id?: IntFilter<'vendors'> | number;
    name_vendor?: StringFilter<'vendors'> | string;
    address?: StringNullableFilter<'vendors'> | string | null;
    telephone?: StringNullableFilter<'vendors'> | string | null;
    email?: StringNullableFilter<'vendors'> | string | null;
    contact_person?: StringNullableFilter<'vendors'> | string | null;
    created_at?: DateTimeFilter<'vendors'> | Date | string;
    updated_at?: DateTimeFilter<'vendors'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'vendors'> | Date | string | null;
    drivers?: DriversListRelationFilter;
    trucks?: TruckListRelationFilter;
  };

  export type vendorsOrderByWithRelationInput = {
    id?: SortOrder;
    name_vendor?: SortOrder;
    address?: SortOrderInput | SortOrder;
    telephone?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    contact_person?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    drivers?: driversOrderByRelationAggregateInput;
    trucks?: truckOrderByRelationAggregateInput;
  };

  export type vendorsWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: vendorsWhereInput | vendorsWhereInput[];
      OR?: vendorsWhereInput[];
      NOT?: vendorsWhereInput | vendorsWhereInput[];
      name_vendor?: StringFilter<'vendors'> | string;
      address?: StringNullableFilter<'vendors'> | string | null;
      telephone?: StringNullableFilter<'vendors'> | string | null;
      email?: StringNullableFilter<'vendors'> | string | null;
      contact_person?: StringNullableFilter<'vendors'> | string | null;
      created_at?: DateTimeFilter<'vendors'> | Date | string;
      updated_at?: DateTimeFilter<'vendors'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'vendors'> | Date | string | null;
      drivers?: DriversListRelationFilter;
      trucks?: TruckListRelationFilter;
    },
    'id'
  >;

  export type vendorsOrderByWithAggregationInput = {
    id?: SortOrder;
    name_vendor?: SortOrder;
    address?: SortOrderInput | SortOrder;
    telephone?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    contact_person?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: vendorsCountOrderByAggregateInput;
    _avg?: vendorsAvgOrderByAggregateInput;
    _max?: vendorsMaxOrderByAggregateInput;
    _min?: vendorsMinOrderByAggregateInput;
    _sum?: vendorsSumOrderByAggregateInput;
  };

  export type vendorsScalarWhereWithAggregatesInput = {
    AND?: vendorsScalarWhereWithAggregatesInput | vendorsScalarWhereWithAggregatesInput[];
    OR?: vendorsScalarWhereWithAggregatesInput[];
    NOT?: vendorsScalarWhereWithAggregatesInput | vendorsScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'vendors'> | number;
    name_vendor?: StringWithAggregatesFilter<'vendors'> | string;
    address?: StringNullableWithAggregatesFilter<'vendors'> | string | null;
    telephone?: StringNullableWithAggregatesFilter<'vendors'> | string | null;
    email?: StringNullableWithAggregatesFilter<'vendors'> | string | null;
    contact_person?: StringNullableWithAggregatesFilter<'vendors'> | string | null;
    created_at?: DateTimeWithAggregatesFilter<'vendors'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'vendors'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'vendors'> | Date | string | null;
  };

  export type driversWhereInput = {
    AND?: driversWhereInput | driversWhereInput[];
    OR?: driversWhereInput[];
    NOT?: driversWhereInput | driversWhereInput[];
    id?: IntFilter<'drivers'> | number;
    name?: StringFilter<'drivers'> | string;
    phone?: StringNullableFilter<'drivers'> | string | null;
    email?: StringNullableFilter<'drivers'> | string | null;
    license_number?: StringFilter<'drivers'> | string;
    license_type?: StringFilter<'drivers'> | string;
    license_expiry?: DateTimeFilter<'drivers'> | Date | string;
    vendor_id?: IntNullableFilter<'drivers'> | number | null;
    status?: StringFilter<'drivers'> | string;
    created_at?: DateTimeFilter<'drivers'> | Date | string;
    updated_at?: DateTimeFilter<'drivers'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'drivers'> | Date | string | null;
    vendor?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null;
    trucks?: TruckListRelationFilter;
  };

  export type driversOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    phone?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    license_number?: SortOrder;
    license_type?: SortOrder;
    license_expiry?: SortOrder;
    vendor_id?: SortOrderInput | SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    vendor?: vendorsOrderByWithRelationInput;
    trucks?: truckOrderByRelationAggregateInput;
  };

  export type driversWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: driversWhereInput | driversWhereInput[];
      OR?: driversWhereInput[];
      NOT?: driversWhereInput | driversWhereInput[];
      name?: StringFilter<'drivers'> | string;
      phone?: StringNullableFilter<'drivers'> | string | null;
      email?: StringNullableFilter<'drivers'> | string | null;
      license_number?: StringFilter<'drivers'> | string;
      license_type?: StringFilter<'drivers'> | string;
      license_expiry?: DateTimeFilter<'drivers'> | Date | string;
      vendor_id?: IntNullableFilter<'drivers'> | number | null;
      status?: StringFilter<'drivers'> | string;
      created_at?: DateTimeFilter<'drivers'> | Date | string;
      updated_at?: DateTimeFilter<'drivers'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'drivers'> | Date | string | null;
      vendor?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null;
      trucks?: TruckListRelationFilter;
    },
    'id'
  >;

  export type driversOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    phone?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    license_number?: SortOrder;
    license_type?: SortOrder;
    license_expiry?: SortOrder;
    vendor_id?: SortOrderInput | SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: driversCountOrderByAggregateInput;
    _avg?: driversAvgOrderByAggregateInput;
    _max?: driversMaxOrderByAggregateInput;
    _min?: driversMinOrderByAggregateInput;
    _sum?: driversSumOrderByAggregateInput;
  };

  export type driversScalarWhereWithAggregatesInput = {
    AND?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[];
    OR?: driversScalarWhereWithAggregatesInput[];
    NOT?: driversScalarWhereWithAggregatesInput | driversScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'drivers'> | number;
    name?: StringWithAggregatesFilter<'drivers'> | string;
    phone?: StringNullableWithAggregatesFilter<'drivers'> | string | null;
    email?: StringNullableWithAggregatesFilter<'drivers'> | string | null;
    license_number?: StringWithAggregatesFilter<'drivers'> | string;
    license_type?: StringWithAggregatesFilter<'drivers'> | string;
    license_expiry?: DateTimeWithAggregatesFilter<'drivers'> | Date | string;
    vendor_id?: IntNullableWithAggregatesFilter<'drivers'> | number | null;
    status?: StringWithAggregatesFilter<'drivers'> | string;
    created_at?: DateTimeWithAggregatesFilter<'drivers'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'drivers'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'drivers'> | Date | string | null;
  };

  export type truckWhereInput = {
    AND?: truckWhereInput | truckWhereInput[];
    OR?: truckWhereInput[];
    NOT?: truckWhereInput | truckWhereInput[];
    id?: UuidFilter<'truck'> | string;
    name?: StringFilter<'truck'> | string;
    image?: StringNullableFilter<'truck'> | string | null;
    year?: IntNullableFilter<'truck'> | number | null;
    model?: StringNullableFilter<'truck'> | string | null;
    type?: StringNullableFilter<'truck'> | string | null;
    vendor_id?: IntNullableFilter<'truck'> | number | null;
    status?: StringFilter<'truck'> | string;
    vin?: StringNullableFilter<'truck'> | string | null;
    plate?: StringNullableFilter<'truck'> | string | null;
    driver_id?: IntNullableFilter<'truck'> | number | null;
    created_at?: DateTimeFilter<'truck'> | Date | string;
    updated_at?: DateTimeFilter<'truck'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'truck'> | Date | string | null;
    created_by?: UuidNullableFilter<'truck'> | string | null;
    updated_by?: UuidNullableFilter<'truck'> | string | null;
    vendor?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null;
    driver?: XOR<DriversNullableRelationFilter, driversWhereInput> | null;
    devices?: DeviceListRelationFilter;
    alert_events?: Alert_eventsListRelationFilter;
  };

  export type truckOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    image?: SortOrderInput | SortOrder;
    year?: SortOrderInput | SortOrder;
    model?: SortOrderInput | SortOrder;
    type?: SortOrderInput | SortOrder;
    vendor_id?: SortOrderInput | SortOrder;
    status?: SortOrder;
    vin?: SortOrderInput | SortOrder;
    plate?: SortOrderInput | SortOrder;
    driver_id?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    created_by?: SortOrderInput | SortOrder;
    updated_by?: SortOrderInput | SortOrder;
    vendor?: vendorsOrderByWithRelationInput;
    driver?: driversOrderByWithRelationInput;
    devices?: deviceOrderByRelationAggregateInput;
    alert_events?: alert_eventsOrderByRelationAggregateInput;
  };

  export type truckWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      vin?: string;
      plate?: string;
      AND?: truckWhereInput | truckWhereInput[];
      OR?: truckWhereInput[];
      NOT?: truckWhereInput | truckWhereInput[];
      name?: StringFilter<'truck'> | string;
      image?: StringNullableFilter<'truck'> | string | null;
      year?: IntNullableFilter<'truck'> | number | null;
      model?: StringNullableFilter<'truck'> | string | null;
      type?: StringNullableFilter<'truck'> | string | null;
      vendor_id?: IntNullableFilter<'truck'> | number | null;
      status?: StringFilter<'truck'> | string;
      driver_id?: IntNullableFilter<'truck'> | number | null;
      created_at?: DateTimeFilter<'truck'> | Date | string;
      updated_at?: DateTimeFilter<'truck'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'truck'> | Date | string | null;
      created_by?: UuidNullableFilter<'truck'> | string | null;
      updated_by?: UuidNullableFilter<'truck'> | string | null;
      vendor?: XOR<VendorsNullableRelationFilter, vendorsWhereInput> | null;
      driver?: XOR<DriversNullableRelationFilter, driversWhereInput> | null;
      devices?: DeviceListRelationFilter;
      alert_events?: Alert_eventsListRelationFilter;
    },
    'id' | 'vin' | 'plate'
  >;

  export type truckOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    image?: SortOrderInput | SortOrder;
    year?: SortOrderInput | SortOrder;
    model?: SortOrderInput | SortOrder;
    type?: SortOrderInput | SortOrder;
    vendor_id?: SortOrderInput | SortOrder;
    status?: SortOrder;
    vin?: SortOrderInput | SortOrder;
    plate?: SortOrderInput | SortOrder;
    driver_id?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    created_by?: SortOrderInput | SortOrder;
    updated_by?: SortOrderInput | SortOrder;
    _count?: truckCountOrderByAggregateInput;
    _avg?: truckAvgOrderByAggregateInput;
    _max?: truckMaxOrderByAggregateInput;
    _min?: truckMinOrderByAggregateInput;
    _sum?: truckSumOrderByAggregateInput;
  };

  export type truckScalarWhereWithAggregatesInput = {
    AND?: truckScalarWhereWithAggregatesInput | truckScalarWhereWithAggregatesInput[];
    OR?: truckScalarWhereWithAggregatesInput[];
    NOT?: truckScalarWhereWithAggregatesInput | truckScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'truck'> | string;
    name?: StringWithAggregatesFilter<'truck'> | string;
    image?: StringNullableWithAggregatesFilter<'truck'> | string | null;
    year?: IntNullableWithAggregatesFilter<'truck'> | number | null;
    model?: StringNullableWithAggregatesFilter<'truck'> | string | null;
    type?: StringNullableWithAggregatesFilter<'truck'> | string | null;
    vendor_id?: IntNullableWithAggregatesFilter<'truck'> | number | null;
    status?: StringWithAggregatesFilter<'truck'> | string;
    vin?: StringNullableWithAggregatesFilter<'truck'> | string | null;
    plate?: StringNullableWithAggregatesFilter<'truck'> | string | null;
    driver_id?: IntNullableWithAggregatesFilter<'truck'> | number | null;
    created_at?: DateTimeWithAggregatesFilter<'truck'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'truck'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'truck'> | Date | string | null;
    created_by?: UuidNullableWithAggregatesFilter<'truck'> | string | null;
    updated_by?: UuidNullableWithAggregatesFilter<'truck'> | string | null;
  };

  export type user_adminWhereInput = {
    AND?: user_adminWhereInput | user_adminWhereInput[];
    OR?: user_adminWhereInput[];
    NOT?: user_adminWhereInput | user_adminWhereInput[];
    id?: UuidFilter<'user_admin'> | string;
    name?: StringFilter<'user_admin'> | string;
    email?: StringFilter<'user_admin'> | string;
    password?: StringFilter<'user_admin'> | string;
    role?: StringFilter<'user_admin'> | string;
    last_login?: DateTimeNullableFilter<'user_admin'> | Date | string | null;
    status?: StringFilter<'user_admin'> | string;
    created_at?: DateTimeFilter<'user_admin'> | Date | string;
    updated_at?: DateTimeFilter<'user_admin'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'user_admin'> | Date | string | null;
  };

  export type user_adminOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    last_login?: SortOrderInput | SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
  };

  export type user_adminWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: user_adminWhereInput | user_adminWhereInput[];
      OR?: user_adminWhereInput[];
      NOT?: user_adminWhereInput | user_adminWhereInput[];
      name?: StringFilter<'user_admin'> | string;
      password?: StringFilter<'user_admin'> | string;
      role?: StringFilter<'user_admin'> | string;
      last_login?: DateTimeNullableFilter<'user_admin'> | Date | string | null;
      status?: StringFilter<'user_admin'> | string;
      created_at?: DateTimeFilter<'user_admin'> | Date | string;
      updated_at?: DateTimeFilter<'user_admin'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'user_admin'> | Date | string | null;
    },
    'id' | 'email'
  >;

  export type user_adminOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    last_login?: SortOrderInput | SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: user_adminCountOrderByAggregateInput;
    _max?: user_adminMaxOrderByAggregateInput;
    _min?: user_adminMinOrderByAggregateInput;
  };

  export type user_adminScalarWhereWithAggregatesInput = {
    AND?: user_adminScalarWhereWithAggregatesInput | user_adminScalarWhereWithAggregatesInput[];
    OR?: user_adminScalarWhereWithAggregatesInput[];
    NOT?: user_adminScalarWhereWithAggregatesInput | user_adminScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'user_admin'> | string;
    name?: StringWithAggregatesFilter<'user_admin'> | string;
    email?: StringWithAggregatesFilter<'user_admin'> | string;
    password?: StringWithAggregatesFilter<'user_admin'> | string;
    role?: StringWithAggregatesFilter<'user_admin'> | string;
    last_login?: DateTimeNullableWithAggregatesFilter<'user_admin'> | Date | string | null;
    status?: StringWithAggregatesFilter<'user_admin'> | string;
    created_at?: DateTimeWithAggregatesFilter<'user_admin'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'user_admin'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'user_admin'> | Date | string | null;
  };

  export type deviceWhereInput = {
    AND?: deviceWhereInput | deviceWhereInput[];
    OR?: deviceWhereInput[];
    NOT?: deviceWhereInput | deviceWhereInput[];
    id?: UuidFilter<'device'> | string;
    truck_id?: UuidFilter<'device'> | string;
    sn?: StringFilter<'device'> | string;
    bat1?: IntNullableFilter<'device'> | number | null;
    bat2?: IntNullableFilter<'device'> | number | null;
    bat3?: IntNullableFilter<'device'> | number | null;
    lock?: IntFilter<'device'> | number;
    sim_number?: StringNullableFilter<'device'> | string | null;
    installed_at?: DateTimeFilter<'device'> | Date | string;
    status?: StringFilter<'device'> | string;
    created_at?: DateTimeFilter<'device'> | Date | string;
    updated_at?: DateTimeFilter<'device'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'device'> | Date | string | null;
    truck?: XOR<TruckRelationFilter, truckWhereInput>;
    sensors?: SensorListRelationFilter;
    locations?: LocationListRelationFilter;
    location_history?: Location_historyListRelationFilter;
    alert_events?: Alert_eventsListRelationFilter;
  };

  export type deviceOrderByWithRelationInput = {
    id?: SortOrder;
    truck_id?: SortOrder;
    sn?: SortOrder;
    bat1?: SortOrderInput | SortOrder;
    bat2?: SortOrderInput | SortOrder;
    bat3?: SortOrderInput | SortOrder;
    lock?: SortOrder;
    sim_number?: SortOrderInput | SortOrder;
    installed_at?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    truck?: truckOrderByWithRelationInput;
    sensors?: sensorOrderByRelationAggregateInput;
    locations?: locationOrderByRelationAggregateInput;
    location_history?: location_historyOrderByRelationAggregateInput;
    alert_events?: alert_eventsOrderByRelationAggregateInput;
  };

  export type deviceWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sn?: string;
      AND?: deviceWhereInput | deviceWhereInput[];
      OR?: deviceWhereInput[];
      NOT?: deviceWhereInput | deviceWhereInput[];
      truck_id?: UuidFilter<'device'> | string;
      bat1?: IntNullableFilter<'device'> | number | null;
      bat2?: IntNullableFilter<'device'> | number | null;
      bat3?: IntNullableFilter<'device'> | number | null;
      lock?: IntFilter<'device'> | number;
      sim_number?: StringNullableFilter<'device'> | string | null;
      installed_at?: DateTimeFilter<'device'> | Date | string;
      status?: StringFilter<'device'> | string;
      created_at?: DateTimeFilter<'device'> | Date | string;
      updated_at?: DateTimeFilter<'device'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'device'> | Date | string | null;
      truck?: XOR<TruckRelationFilter, truckWhereInput>;
      sensors?: SensorListRelationFilter;
      locations?: LocationListRelationFilter;
      location_history?: Location_historyListRelationFilter;
      alert_events?: Alert_eventsListRelationFilter;
    },
    'id' | 'sn'
  >;

  export type deviceOrderByWithAggregationInput = {
    id?: SortOrder;
    truck_id?: SortOrder;
    sn?: SortOrder;
    bat1?: SortOrderInput | SortOrder;
    bat2?: SortOrderInput | SortOrder;
    bat3?: SortOrderInput | SortOrder;
    lock?: SortOrder;
    sim_number?: SortOrderInput | SortOrder;
    installed_at?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: deviceCountOrderByAggregateInput;
    _avg?: deviceAvgOrderByAggregateInput;
    _max?: deviceMaxOrderByAggregateInput;
    _min?: deviceMinOrderByAggregateInput;
    _sum?: deviceSumOrderByAggregateInput;
  };

  export type deviceScalarWhereWithAggregatesInput = {
    AND?: deviceScalarWhereWithAggregatesInput | deviceScalarWhereWithAggregatesInput[];
    OR?: deviceScalarWhereWithAggregatesInput[];
    NOT?: deviceScalarWhereWithAggregatesInput | deviceScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'device'> | string;
    truck_id?: UuidWithAggregatesFilter<'device'> | string;
    sn?: StringWithAggregatesFilter<'device'> | string;
    bat1?: IntNullableWithAggregatesFilter<'device'> | number | null;
    bat2?: IntNullableWithAggregatesFilter<'device'> | number | null;
    bat3?: IntNullableWithAggregatesFilter<'device'> | number | null;
    lock?: IntWithAggregatesFilter<'device'> | number;
    sim_number?: StringNullableWithAggregatesFilter<'device'> | string | null;
    installed_at?: DateTimeWithAggregatesFilter<'device'> | Date | string;
    status?: StringWithAggregatesFilter<'device'> | string;
    created_at?: DateTimeWithAggregatesFilter<'device'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'device'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'device'> | Date | string | null;
  };

  export type sensorWhereInput = {
    AND?: sensorWhereInput | sensorWhereInput[];
    OR?: sensorWhereInput[];
    NOT?: sensorWhereInput | sensorWhereInput[];
    id?: UuidFilter<'sensor'> | string;
    sn?: StringFilter<'sensor'> | string;
    device_id?: UuidFilter<'sensor'> | string;
    tireNo?: IntFilter<'sensor'> | number;
    simNumber?: StringNullableFilter<'sensor'> | string | null;
    sensorNo?: IntNullableFilter<'sensor'> | number | null;
    sensor_lock?: IntFilter<'sensor'> | number;
    status?: StringFilter<'sensor'> | string;
    tempValue?: FloatNullableFilter<'sensor'> | number | null;
    tirepValue?: FloatNullableFilter<'sensor'> | number | null;
    exType?: StringNullableFilter<'sensor'> | string | null;
    bat?: IntNullableFilter<'sensor'> | number | null;
    created_at?: DateTimeFilter<'sensor'> | Date | string;
    updated_at?: DateTimeFilter<'sensor'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'sensor'> | Date | string | null;
    device?: XOR<DeviceRelationFilter, deviceWhereInput>;
    alert_events?: Alert_eventsListRelationFilter;
  };

  export type sensorOrderByWithRelationInput = {
    id?: SortOrder;
    sn?: SortOrder;
    device_id?: SortOrder;
    tireNo?: SortOrder;
    simNumber?: SortOrderInput | SortOrder;
    sensorNo?: SortOrderInput | SortOrder;
    sensor_lock?: SortOrder;
    status?: SortOrder;
    tempValue?: SortOrderInput | SortOrder;
    tirepValue?: SortOrderInput | SortOrder;
    exType?: SortOrderInput | SortOrder;
    bat?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    device?: deviceOrderByWithRelationInput;
    alert_events?: alert_eventsOrderByRelationAggregateInput;
  };

  export type sensorWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sn?: string;
      AND?: sensorWhereInput | sensorWhereInput[];
      OR?: sensorWhereInput[];
      NOT?: sensorWhereInput | sensorWhereInput[];
      device_id?: UuidFilter<'sensor'> | string;
      tireNo?: IntFilter<'sensor'> | number;
      simNumber?: StringNullableFilter<'sensor'> | string | null;
      sensorNo?: IntNullableFilter<'sensor'> | number | null;
      sensor_lock?: IntFilter<'sensor'> | number;
      status?: StringFilter<'sensor'> | string;
      tempValue?: FloatNullableFilter<'sensor'> | number | null;
      tirepValue?: FloatNullableFilter<'sensor'> | number | null;
      exType?: StringNullableFilter<'sensor'> | string | null;
      bat?: IntNullableFilter<'sensor'> | number | null;
      created_at?: DateTimeFilter<'sensor'> | Date | string;
      updated_at?: DateTimeFilter<'sensor'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'sensor'> | Date | string | null;
      device?: XOR<DeviceRelationFilter, deviceWhereInput>;
      alert_events?: Alert_eventsListRelationFilter;
    },
    'id' | 'sn'
  >;

  export type sensorOrderByWithAggregationInput = {
    id?: SortOrder;
    sn?: SortOrder;
    device_id?: SortOrder;
    tireNo?: SortOrder;
    simNumber?: SortOrderInput | SortOrder;
    sensorNo?: SortOrderInput | SortOrder;
    sensor_lock?: SortOrder;
    status?: SortOrder;
    tempValue?: SortOrderInput | SortOrder;
    tirepValue?: SortOrderInput | SortOrder;
    exType?: SortOrderInput | SortOrder;
    bat?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: sensorCountOrderByAggregateInput;
    _avg?: sensorAvgOrderByAggregateInput;
    _max?: sensorMaxOrderByAggregateInput;
    _min?: sensorMinOrderByAggregateInput;
    _sum?: sensorSumOrderByAggregateInput;
  };

  export type sensorScalarWhereWithAggregatesInput = {
    AND?: sensorScalarWhereWithAggregatesInput | sensorScalarWhereWithAggregatesInput[];
    OR?: sensorScalarWhereWithAggregatesInput[];
    NOT?: sensorScalarWhereWithAggregatesInput | sensorScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'sensor'> | string;
    sn?: StringWithAggregatesFilter<'sensor'> | string;
    device_id?: UuidWithAggregatesFilter<'sensor'> | string;
    tireNo?: IntWithAggregatesFilter<'sensor'> | number;
    simNumber?: StringNullableWithAggregatesFilter<'sensor'> | string | null;
    sensorNo?: IntNullableWithAggregatesFilter<'sensor'> | number | null;
    sensor_lock?: IntWithAggregatesFilter<'sensor'> | number;
    status?: StringWithAggregatesFilter<'sensor'> | string;
    tempValue?: FloatNullableWithAggregatesFilter<'sensor'> | number | null;
    tirepValue?: FloatNullableWithAggregatesFilter<'sensor'> | number | null;
    exType?: StringNullableWithAggregatesFilter<'sensor'> | string | null;
    bat?: IntNullableWithAggregatesFilter<'sensor'> | number | null;
    created_at?: DateTimeWithAggregatesFilter<'sensor'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'sensor'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'sensor'> | Date | string | null;
  };

  export type locationWhereInput = {
    AND?: locationWhereInput | locationWhereInput[];
    OR?: locationWhereInput[];
    NOT?: locationWhereInput | locationWhereInput[];
    id?: UuidFilter<'location'> | string;
    device_id?: UuidFilter<'location'> | string;
    lat?: FloatFilter<'location'> | number;
    long?: FloatFilter<'location'> | number;
    recorded_at?: DateTimeFilter<'location'> | Date | string;
    created_at?: DateTimeFilter<'location'> | Date | string;
    device?: XOR<DeviceRelationFilter, deviceWhereInput>;
    location_history?: Location_historyListRelationFilter;
  };

  export type locationOrderByWithRelationInput = {
    id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    created_at?: SortOrder;
    device?: deviceOrderByWithRelationInput;
    location_history?: location_historyOrderByRelationAggregateInput;
  };

  export type locationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: locationWhereInput | locationWhereInput[];
      OR?: locationWhereInput[];
      NOT?: locationWhereInput | locationWhereInput[];
      device_id?: UuidFilter<'location'> | string;
      lat?: FloatFilter<'location'> | number;
      long?: FloatFilter<'location'> | number;
      recorded_at?: DateTimeFilter<'location'> | Date | string;
      created_at?: DateTimeFilter<'location'> | Date | string;
      device?: XOR<DeviceRelationFilter, deviceWhereInput>;
      location_history?: Location_historyListRelationFilter;
    },
    'id'
  >;

  export type locationOrderByWithAggregationInput = {
    id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    created_at?: SortOrder;
    _count?: locationCountOrderByAggregateInput;
    _avg?: locationAvgOrderByAggregateInput;
    _max?: locationMaxOrderByAggregateInput;
    _min?: locationMinOrderByAggregateInput;
    _sum?: locationSumOrderByAggregateInput;
  };

  export type locationScalarWhereWithAggregatesInput = {
    AND?: locationScalarWhereWithAggregatesInput | locationScalarWhereWithAggregatesInput[];
    OR?: locationScalarWhereWithAggregatesInput[];
    NOT?: locationScalarWhereWithAggregatesInput | locationScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'location'> | string;
    device_id?: UuidWithAggregatesFilter<'location'> | string;
    lat?: FloatWithAggregatesFilter<'location'> | number;
    long?: FloatWithAggregatesFilter<'location'> | number;
    recorded_at?: DateTimeWithAggregatesFilter<'location'> | Date | string;
    created_at?: DateTimeWithAggregatesFilter<'location'> | Date | string;
  };

  export type location_historyWhereInput = {
    AND?: location_historyWhereInput | location_historyWhereInput[];
    OR?: location_historyWhereInput[];
    NOT?: location_historyWhereInput | location_historyWhereInput[];
    id?: UuidFilter<'location_history'> | string;
    location_id?: UuidFilter<'location_history'> | string;
    device_id?: UuidFilter<'location_history'> | string;
    lat?: FloatFilter<'location_history'> | number;
    long?: FloatFilter<'location_history'> | number;
    recorded_at?: DateTimeFilter<'location_history'> | Date | string;
    location?: XOR<LocationRelationFilter, locationWhereInput>;
    device?: XOR<DeviceRelationFilter, deviceWhereInput>;
  };

  export type location_historyOrderByWithRelationInput = {
    id?: SortOrder;
    location_id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    location?: locationOrderByWithRelationInput;
    device?: deviceOrderByWithRelationInput;
  };

  export type location_historyWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: location_historyWhereInput | location_historyWhereInput[];
      OR?: location_historyWhereInput[];
      NOT?: location_historyWhereInput | location_historyWhereInput[];
      location_id?: UuidFilter<'location_history'> | string;
      device_id?: UuidFilter<'location_history'> | string;
      lat?: FloatFilter<'location_history'> | number;
      long?: FloatFilter<'location_history'> | number;
      recorded_at?: DateTimeFilter<'location_history'> | Date | string;
      location?: XOR<LocationRelationFilter, locationWhereInput>;
      device?: XOR<DeviceRelationFilter, deviceWhereInput>;
    },
    'id'
  >;

  export type location_historyOrderByWithAggregationInput = {
    id?: SortOrder;
    location_id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    _count?: location_historyCountOrderByAggregateInput;
    _avg?: location_historyAvgOrderByAggregateInput;
    _max?: location_historyMaxOrderByAggregateInput;
    _min?: location_historyMinOrderByAggregateInput;
    _sum?: location_historySumOrderByAggregateInput;
  };

  export type location_historyScalarWhereWithAggregatesInput = {
    AND?:
      | location_historyScalarWhereWithAggregatesInput
      | location_historyScalarWhereWithAggregatesInput[];
    OR?: location_historyScalarWhereWithAggregatesInput[];
    NOT?:
      | location_historyScalarWhereWithAggregatesInput
      | location_historyScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'location_history'> | string;
    location_id?: UuidWithAggregatesFilter<'location_history'> | string;
    device_id?: UuidWithAggregatesFilter<'location_history'> | string;
    lat?: FloatWithAggregatesFilter<'location_history'> | number;
    long?: FloatWithAggregatesFilter<'location_history'> | number;
    recorded_at?: DateTimeWithAggregatesFilter<'location_history'> | Date | string;
  };

  export type alertWhereInput = {
    AND?: alertWhereInput | alertWhereInput[];
    OR?: alertWhereInput[];
    NOT?: alertWhereInput | alertWhereInput[];
    id?: UuidFilter<'alert'> | string;
    code?: StringFilter<'alert'> | string;
    name?: StringFilter<'alert'> | string;
    description?: StringNullableFilter<'alert'> | string | null;
    severity?: StringFilter<'alert'> | string;
    threshold_min?: FloatNullableFilter<'alert'> | number | null;
    threshold_max?: FloatNullableFilter<'alert'> | number | null;
    created_at?: DateTimeFilter<'alert'> | Date | string;
    updated_at?: DateTimeFilter<'alert'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'alert'> | Date | string | null;
    alert_events?: Alert_eventsListRelationFilter;
  };

  export type alertOrderByWithRelationInput = {
    id?: SortOrder;
    code?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    severity?: SortOrder;
    threshold_min?: SortOrderInput | SortOrder;
    threshold_max?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    alert_events?: alert_eventsOrderByRelationAggregateInput;
  };

  export type alertWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      code?: string;
      AND?: alertWhereInput | alertWhereInput[];
      OR?: alertWhereInput[];
      NOT?: alertWhereInput | alertWhereInput[];
      name?: StringFilter<'alert'> | string;
      description?: StringNullableFilter<'alert'> | string | null;
      severity?: StringFilter<'alert'> | string;
      threshold_min?: FloatNullableFilter<'alert'> | number | null;
      threshold_max?: FloatNullableFilter<'alert'> | number | null;
      created_at?: DateTimeFilter<'alert'> | Date | string;
      updated_at?: DateTimeFilter<'alert'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'alert'> | Date | string | null;
      alert_events?: Alert_eventsListRelationFilter;
    },
    'id' | 'code'
  >;

  export type alertOrderByWithAggregationInput = {
    id?: SortOrder;
    code?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    severity?: SortOrder;
    threshold_min?: SortOrderInput | SortOrder;
    threshold_max?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: alertCountOrderByAggregateInput;
    _avg?: alertAvgOrderByAggregateInput;
    _max?: alertMaxOrderByAggregateInput;
    _min?: alertMinOrderByAggregateInput;
    _sum?: alertSumOrderByAggregateInput;
  };

  export type alertScalarWhereWithAggregatesInput = {
    AND?: alertScalarWhereWithAggregatesInput | alertScalarWhereWithAggregatesInput[];
    OR?: alertScalarWhereWithAggregatesInput[];
    NOT?: alertScalarWhereWithAggregatesInput | alertScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'alert'> | string;
    code?: StringWithAggregatesFilter<'alert'> | string;
    name?: StringWithAggregatesFilter<'alert'> | string;
    description?: StringNullableWithAggregatesFilter<'alert'> | string | null;
    severity?: StringWithAggregatesFilter<'alert'> | string;
    threshold_min?: FloatNullableWithAggregatesFilter<'alert'> | number | null;
    threshold_max?: FloatNullableWithAggregatesFilter<'alert'> | number | null;
    created_at?: DateTimeWithAggregatesFilter<'alert'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'alert'> | Date | string;
    deleted_at?: DateTimeNullableWithAggregatesFilter<'alert'> | Date | string | null;
  };

  export type alert_eventsWhereInput = {
    AND?: alert_eventsWhereInput | alert_eventsWhereInput[];
    OR?: alert_eventsWhereInput[];
    NOT?: alert_eventsWhereInput | alert_eventsWhereInput[];
    id?: UuidFilter<'alert_events'> | string;
    alert_id?: UuidFilter<'alert_events'> | string;
    device_id?: UuidNullableFilter<'alert_events'> | string | null;
    sensor_id?: UuidNullableFilter<'alert_events'> | string | null;
    truck_id?: UuidNullableFilter<'alert_events'> | string | null;
    value?: FloatNullableFilter<'alert_events'> | number | null;
    message?: StringNullableFilter<'alert_events'> | string | null;
    status?: StringFilter<'alert_events'> | string;
    created_at?: DateTimeFilter<'alert_events'> | Date | string;
    resolved_at?: DateTimeNullableFilter<'alert_events'> | Date | string | null;
    alert?: XOR<AlertRelationFilter, alertWhereInput>;
    device?: XOR<DeviceNullableRelationFilter, deviceWhereInput> | null;
    sensor?: XOR<SensorNullableRelationFilter, sensorWhereInput> | null;
    truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null;
  };

  export type alert_eventsOrderByWithRelationInput = {
    id?: SortOrder;
    alert_id?: SortOrder;
    device_id?: SortOrderInput | SortOrder;
    sensor_id?: SortOrderInput | SortOrder;
    truck_id?: SortOrderInput | SortOrder;
    value?: SortOrderInput | SortOrder;
    message?: SortOrderInput | SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    resolved_at?: SortOrderInput | SortOrder;
    alert?: alertOrderByWithRelationInput;
    device?: deviceOrderByWithRelationInput;
    sensor?: sensorOrderByWithRelationInput;
    truck?: truckOrderByWithRelationInput;
  };

  export type alert_eventsWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: alert_eventsWhereInput | alert_eventsWhereInput[];
      OR?: alert_eventsWhereInput[];
      NOT?: alert_eventsWhereInput | alert_eventsWhereInput[];
      alert_id?: UuidFilter<'alert_events'> | string;
      device_id?: UuidNullableFilter<'alert_events'> | string | null;
      sensor_id?: UuidNullableFilter<'alert_events'> | string | null;
      truck_id?: UuidNullableFilter<'alert_events'> | string | null;
      value?: FloatNullableFilter<'alert_events'> | number | null;
      message?: StringNullableFilter<'alert_events'> | string | null;
      status?: StringFilter<'alert_events'> | string;
      created_at?: DateTimeFilter<'alert_events'> | Date | string;
      resolved_at?: DateTimeNullableFilter<'alert_events'> | Date | string | null;
      alert?: XOR<AlertRelationFilter, alertWhereInput>;
      device?: XOR<DeviceNullableRelationFilter, deviceWhereInput> | null;
      sensor?: XOR<SensorNullableRelationFilter, sensorWhereInput> | null;
      truck?: XOR<TruckNullableRelationFilter, truckWhereInput> | null;
    },
    'id'
  >;

  export type alert_eventsOrderByWithAggregationInput = {
    id?: SortOrder;
    alert_id?: SortOrder;
    device_id?: SortOrderInput | SortOrder;
    sensor_id?: SortOrderInput | SortOrder;
    truck_id?: SortOrderInput | SortOrder;
    value?: SortOrderInput | SortOrder;
    message?: SortOrderInput | SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    resolved_at?: SortOrderInput | SortOrder;
    _count?: alert_eventsCountOrderByAggregateInput;
    _avg?: alert_eventsAvgOrderByAggregateInput;
    _max?: alert_eventsMaxOrderByAggregateInput;
    _min?: alert_eventsMinOrderByAggregateInput;
    _sum?: alert_eventsSumOrderByAggregateInput;
  };

  export type alert_eventsScalarWhereWithAggregatesInput = {
    AND?: alert_eventsScalarWhereWithAggregatesInput | alert_eventsScalarWhereWithAggregatesInput[];
    OR?: alert_eventsScalarWhereWithAggregatesInput[];
    NOT?: alert_eventsScalarWhereWithAggregatesInput | alert_eventsScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'alert_events'> | string;
    alert_id?: UuidWithAggregatesFilter<'alert_events'> | string;
    device_id?: UuidNullableWithAggregatesFilter<'alert_events'> | string | null;
    sensor_id?: UuidNullableWithAggregatesFilter<'alert_events'> | string | null;
    truck_id?: UuidNullableWithAggregatesFilter<'alert_events'> | string | null;
    value?: FloatNullableWithAggregatesFilter<'alert_events'> | number | null;
    message?: StringNullableWithAggregatesFilter<'alert_events'> | string | null;
    status?: StringWithAggregatesFilter<'alert_events'> | string;
    created_at?: DateTimeWithAggregatesFilter<'alert_events'> | Date | string;
    resolved_at?: DateTimeNullableWithAggregatesFilter<'alert_events'> | Date | string | null;
  };

  export type vendorsCreateInput = {
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    drivers?: driversCreateNestedManyWithoutVendorInput;
    trucks?: truckCreateNestedManyWithoutVendorInput;
  };

  export type vendorsUncheckedCreateInput = {
    id?: number;
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    drivers?: driversUncheckedCreateNestedManyWithoutVendorInput;
    trucks?: truckUncheckedCreateNestedManyWithoutVendorInput;
  };

  export type vendorsUpdateInput = {
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    drivers?: driversUpdateManyWithoutVendorNestedInput;
    trucks?: truckUpdateManyWithoutVendorNestedInput;
  };

  export type vendorsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    drivers?: driversUncheckedUpdateManyWithoutVendorNestedInput;
    trucks?: truckUncheckedUpdateManyWithoutVendorNestedInput;
  };

  export type vendorsCreateManyInput = {
    id?: number;
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type vendorsUpdateManyMutationInput = {
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type vendorsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type driversCreateInput = {
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    vendor?: vendorsCreateNestedOneWithoutDriversInput;
    trucks?: truckCreateNestedManyWithoutDriverInput;
  };

  export type driversUncheckedCreateInput = {
    id?: number;
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    vendor_id?: number | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    trucks?: truckUncheckedCreateNestedManyWithoutDriverInput;
  };

  export type driversUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    vendor?: vendorsUpdateOneWithoutDriversNestedInput;
    trucks?: truckUpdateManyWithoutDriverNestedInput;
  };

  export type driversUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    trucks?: truckUncheckedUpdateManyWithoutDriverNestedInput;
  };

  export type driversCreateManyInput = {
    id?: number;
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    vendor_id?: number | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type driversUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type driversUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type truckCreateInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    vendor?: vendorsCreateNestedOneWithoutTrucksInput;
    driver?: driversCreateNestedOneWithoutTrucksInput;
    devices?: deviceCreateNestedManyWithoutTruckInput;
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput;
  };

  export type truckUncheckedCreateInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    vendor_id?: number | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    driver_id?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    devices?: deviceUncheckedCreateNestedManyWithoutTruckInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput;
  };

  export type truckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor?: vendorsUpdateOneWithoutTrucksNestedInput;
    driver?: driversUpdateOneWithoutTrucksNestedInput;
    devices?: deviceUpdateManyWithoutTruckNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    devices?: deviceUncheckedUpdateManyWithoutTruckNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput;
  };

  export type truckCreateManyInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    vendor_id?: number | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    driver_id?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
  };

  export type truckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type truckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type user_adminCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    last_login?: Date | string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type user_adminUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    last_login?: Date | string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type user_adminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type user_adminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type user_adminCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    last_login?: Date | string | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type user_adminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type user_adminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type deviceCreateInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    truck: truckCreateNestedOneWithoutDevicesInput;
    sensors?: sensorCreateNestedManyWithoutDeviceInput;
    locations?: locationCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUncheckedCreateInput = {
    id?: string;
    truck_id: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    sensors?: sensorUncheckedCreateNestedManyWithoutDeviceInput;
    locations?: locationUncheckedCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyUncheckedCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    truck?: truckUpdateOneRequiredWithoutDevicesNestedInput;
    sensors?: sensorUpdateManyWithoutDeviceNestedInput;
    locations?: locationUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    truck_id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sensors?: sensorUncheckedUpdateManyWithoutDeviceNestedInput;
    locations?: locationUncheckedUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUncheckedUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceCreateManyInput = {
    id?: string;
    truck_id: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type deviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type deviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    truck_id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type sensorCreateInput = {
    id?: string;
    sn: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    device: deviceCreateNestedOneWithoutSensorsInput;
    alert_events?: alert_eventsCreateNestedManyWithoutSensorInput;
  };

  export type sensorUncheckedCreateInput = {
    id?: string;
    sn: string;
    device_id: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutSensorInput;
  };

  export type sensorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    device?: deviceUpdateOneRequiredWithoutSensorsNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutSensorNestedInput;
  };

  export type sensorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutSensorNestedInput;
  };

  export type sensorCreateManyInput = {
    id?: string;
    sn: string;
    device_id: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type sensorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type sensorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type locationCreateInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
    device: deviceCreateNestedOneWithoutLocationsInput;
    location_history?: location_historyCreateNestedManyWithoutLocationInput;
  };

  export type locationUncheckedCreateInput = {
    id?: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
    location_history?: location_historyUncheckedCreateNestedManyWithoutLocationInput;
  };

  export type locationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    device?: deviceUpdateOneRequiredWithoutLocationsNestedInput;
    location_history?: location_historyUpdateManyWithoutLocationNestedInput;
  };

  export type locationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    location_history?: location_historyUncheckedUpdateManyWithoutLocationNestedInput;
  };

  export type locationCreateManyInput = {
    id?: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
  };

  export type locationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type locationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type location_historyCreateInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    location: locationCreateNestedOneWithoutLocation_historyInput;
    device: deviceCreateNestedOneWithoutLocation_historyInput;
  };

  export type location_historyUncheckedCreateInput = {
    id?: string;
    location_id: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
  };

  export type location_historyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    location?: locationUpdateOneRequiredWithoutLocation_historyNestedInput;
    device?: deviceUpdateOneRequiredWithoutLocation_historyNestedInput;
  };

  export type location_historyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    location_id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type location_historyCreateManyInput = {
    id?: string;
    location_id: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
  };

  export type location_historyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type location_historyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    location_id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type alertCreateInput = {
    id?: string;
    code: string;
    name: string;
    description?: string | null;
    severity?: string;
    threshold_min?: number | null;
    threshold_max?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    alert_events?: alert_eventsCreateNestedManyWithoutAlertInput;
  };

  export type alertUncheckedCreateInput = {
    id?: string;
    code: string;
    name: string;
    description?: string | null;
    severity?: string;
    threshold_min?: number | null;
    threshold_max?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutAlertInput;
  };

  export type alertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    code?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    severity?: StringFieldUpdateOperationsInput | string;
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null;
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert_events?: alert_eventsUpdateManyWithoutAlertNestedInput;
  };

  export type alertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    code?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    severity?: StringFieldUpdateOperationsInput | string;
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null;
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutAlertNestedInput;
  };

  export type alertCreateManyInput = {
    id?: string;
    code: string;
    name: string;
    description?: string | null;
    severity?: string;
    threshold_min?: number | null;
    threshold_max?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type alertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    code?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    severity?: StringFieldUpdateOperationsInput | string;
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null;
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    code?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    severity?: StringFieldUpdateOperationsInput | string;
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null;
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsCreateInput = {
    id?: string;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
    alert: alertCreateNestedOneWithoutAlert_eventsInput;
    device?: deviceCreateNestedOneWithoutAlert_eventsInput;
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput;
    truck?: truckCreateNestedOneWithoutAlert_eventsInput;
  };

  export type alert_eventsUncheckedCreateInput = {
    id?: string;
    alert_id: string;
    device_id?: string | null;
    sensor_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput;
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput;
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput;
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput;
  };

  export type alert_eventsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsCreateManyInput = {
    id?: string;
    alert_id: string;
    device_id?: string | null;
    sensor_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type DriversListRelationFilter = {
    every?: driversWhereInput;
    some?: driversWhereInput;
    none?: driversWhereInput;
  };

  export type TruckListRelationFilter = {
    every?: truckWhereInput;
    some?: truckWhereInput;
    none?: truckWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type driversOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type truckOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type vendorsCountOrderByAggregateInput = {
    id?: SortOrder;
    name_vendor?: SortOrder;
    address?: SortOrder;
    telephone?: SortOrder;
    email?: SortOrder;
    contact_person?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type vendorsAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type vendorsMaxOrderByAggregateInput = {
    id?: SortOrder;
    name_vendor?: SortOrder;
    address?: SortOrder;
    telephone?: SortOrder;
    email?: SortOrder;
    contact_person?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type vendorsMinOrderByAggregateInput = {
    id?: SortOrder;
    name_vendor?: SortOrder;
    address?: SortOrder;
    telephone?: SortOrder;
    email?: SortOrder;
    contact_person?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type vendorsSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type VendorsNullableRelationFilter = {
    is?: vendorsWhereInput | null;
    isNot?: vendorsWhereInput | null;
  };

  export type driversCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
    license_number?: SortOrder;
    license_type?: SortOrder;
    license_expiry?: SortOrder;
    vendor_id?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type driversAvgOrderByAggregateInput = {
    id?: SortOrder;
    vendor_id?: SortOrder;
  };

  export type driversMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
    license_number?: SortOrder;
    license_type?: SortOrder;
    license_expiry?: SortOrder;
    vendor_id?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type driversMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
    license_number?: SortOrder;
    license_type?: SortOrder;
    license_expiry?: SortOrder;
    vendor_id?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type driversSumOrderByAggregateInput = {
    id?: SortOrder;
    vendor_id?: SortOrder;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidFilter<$PrismaModel> | string;
  };

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type DriversNullableRelationFilter = {
    is?: driversWhereInput | null;
    isNot?: driversWhereInput | null;
  };

  export type DeviceListRelationFilter = {
    every?: deviceWhereInput;
    some?: deviceWhereInput;
    none?: deviceWhereInput;
  };

  export type Alert_eventsListRelationFilter = {
    every?: alert_eventsWhereInput;
    some?: alert_eventsWhereInput;
    none?: alert_eventsWhereInput;
  };

  export type deviceOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type alert_eventsOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type truckCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    image?: SortOrder;
    year?: SortOrder;
    model?: SortOrder;
    type?: SortOrder;
    vendor_id?: SortOrder;
    status?: SortOrder;
    vin?: SortOrder;
    plate?: SortOrder;
    driver_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
    created_by?: SortOrder;
    updated_by?: SortOrder;
  };

  export type truckAvgOrderByAggregateInput = {
    year?: SortOrder;
    vendor_id?: SortOrder;
    driver_id?: SortOrder;
  };

  export type truckMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    image?: SortOrder;
    year?: SortOrder;
    model?: SortOrder;
    type?: SortOrder;
    vendor_id?: SortOrder;
    status?: SortOrder;
    vin?: SortOrder;
    plate?: SortOrder;
    driver_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
    created_by?: SortOrder;
    updated_by?: SortOrder;
  };

  export type truckMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    image?: SortOrder;
    year?: SortOrder;
    model?: SortOrder;
    type?: SortOrder;
    vendor_id?: SortOrder;
    status?: SortOrder;
    vin?: SortOrder;
    plate?: SortOrder;
    driver_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
    created_by?: SortOrder;
    updated_by?: SortOrder;
  };

  export type truckSumOrderByAggregateInput = {
    year?: SortOrder;
    vendor_id?: SortOrder;
    driver_id?: SortOrder;
  };

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type user_adminCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    last_login?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type user_adminMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    last_login?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type user_adminMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    last_login?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type TruckRelationFilter = {
    is?: truckWhereInput;
    isNot?: truckWhereInput;
  };

  export type SensorListRelationFilter = {
    every?: sensorWhereInput;
    some?: sensorWhereInput;
    none?: sensorWhereInput;
  };

  export type LocationListRelationFilter = {
    every?: locationWhereInput;
    some?: locationWhereInput;
    none?: locationWhereInput;
  };

  export type Location_historyListRelationFilter = {
    every?: location_historyWhereInput;
    some?: location_historyWhereInput;
    none?: location_historyWhereInput;
  };

  export type sensorOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type locationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type location_historyOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type deviceCountOrderByAggregateInput = {
    id?: SortOrder;
    truck_id?: SortOrder;
    sn?: SortOrder;
    bat1?: SortOrder;
    bat2?: SortOrder;
    bat3?: SortOrder;
    lock?: SortOrder;
    sim_number?: SortOrder;
    installed_at?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type deviceAvgOrderByAggregateInput = {
    bat1?: SortOrder;
    bat2?: SortOrder;
    bat3?: SortOrder;
    lock?: SortOrder;
  };

  export type deviceMaxOrderByAggregateInput = {
    id?: SortOrder;
    truck_id?: SortOrder;
    sn?: SortOrder;
    bat1?: SortOrder;
    bat2?: SortOrder;
    bat3?: SortOrder;
    lock?: SortOrder;
    sim_number?: SortOrder;
    installed_at?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type deviceMinOrderByAggregateInput = {
    id?: SortOrder;
    truck_id?: SortOrder;
    sn?: SortOrder;
    bat1?: SortOrder;
    bat2?: SortOrder;
    bat3?: SortOrder;
    lock?: SortOrder;
    sim_number?: SortOrder;
    installed_at?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type deviceSumOrderByAggregateInput = {
    bat1?: SortOrder;
    bat2?: SortOrder;
    bat3?: SortOrder;
    lock?: SortOrder;
  };

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type DeviceRelationFilter = {
    is?: deviceWhereInput;
    isNot?: deviceWhereInput;
  };

  export type sensorCountOrderByAggregateInput = {
    id?: SortOrder;
    sn?: SortOrder;
    device_id?: SortOrder;
    tireNo?: SortOrder;
    simNumber?: SortOrder;
    sensorNo?: SortOrder;
    sensor_lock?: SortOrder;
    status?: SortOrder;
    tempValue?: SortOrder;
    tirepValue?: SortOrder;
    exType?: SortOrder;
    bat?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type sensorAvgOrderByAggregateInput = {
    tireNo?: SortOrder;
    sensorNo?: SortOrder;
    sensor_lock?: SortOrder;
    tempValue?: SortOrder;
    tirepValue?: SortOrder;
    bat?: SortOrder;
  };

  export type sensorMaxOrderByAggregateInput = {
    id?: SortOrder;
    sn?: SortOrder;
    device_id?: SortOrder;
    tireNo?: SortOrder;
    simNumber?: SortOrder;
    sensorNo?: SortOrder;
    sensor_lock?: SortOrder;
    status?: SortOrder;
    tempValue?: SortOrder;
    tirepValue?: SortOrder;
    exType?: SortOrder;
    bat?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type sensorMinOrderByAggregateInput = {
    id?: SortOrder;
    sn?: SortOrder;
    device_id?: SortOrder;
    tireNo?: SortOrder;
    simNumber?: SortOrder;
    sensorNo?: SortOrder;
    sensor_lock?: SortOrder;
    status?: SortOrder;
    tempValue?: SortOrder;
    tirepValue?: SortOrder;
    exType?: SortOrder;
    bat?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type sensorSumOrderByAggregateInput = {
    tireNo?: SortOrder;
    sensorNo?: SortOrder;
    sensor_lock?: SortOrder;
    tempValue?: SortOrder;
    tirepValue?: SortOrder;
    bat?: SortOrder;
  };

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type locationCountOrderByAggregateInput = {
    id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    created_at?: SortOrder;
  };

  export type locationAvgOrderByAggregateInput = {
    lat?: SortOrder;
    long?: SortOrder;
  };

  export type locationMaxOrderByAggregateInput = {
    id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    created_at?: SortOrder;
  };

  export type locationMinOrderByAggregateInput = {
    id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
    created_at?: SortOrder;
  };

  export type locationSumOrderByAggregateInput = {
    lat?: SortOrder;
    long?: SortOrder;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type LocationRelationFilter = {
    is?: locationWhereInput;
    isNot?: locationWhereInput;
  };

  export type location_historyCountOrderByAggregateInput = {
    id?: SortOrder;
    location_id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
  };

  export type location_historyAvgOrderByAggregateInput = {
    lat?: SortOrder;
    long?: SortOrder;
  };

  export type location_historyMaxOrderByAggregateInput = {
    id?: SortOrder;
    location_id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
  };

  export type location_historyMinOrderByAggregateInput = {
    id?: SortOrder;
    location_id?: SortOrder;
    device_id?: SortOrder;
    lat?: SortOrder;
    long?: SortOrder;
    recorded_at?: SortOrder;
  };

  export type location_historySumOrderByAggregateInput = {
    lat?: SortOrder;
    long?: SortOrder;
  };

  export type alertCountOrderByAggregateInput = {
    id?: SortOrder;
    code?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    severity?: SortOrder;
    threshold_min?: SortOrder;
    threshold_max?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type alertAvgOrderByAggregateInput = {
    threshold_min?: SortOrder;
    threshold_max?: SortOrder;
  };

  export type alertMaxOrderByAggregateInput = {
    id?: SortOrder;
    code?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    severity?: SortOrder;
    threshold_min?: SortOrder;
    threshold_max?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type alertMinOrderByAggregateInput = {
    id?: SortOrder;
    code?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    severity?: SortOrder;
    threshold_min?: SortOrder;
    threshold_max?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type alertSumOrderByAggregateInput = {
    threshold_min?: SortOrder;
    threshold_max?: SortOrder;
  };

  export type AlertRelationFilter = {
    is?: alertWhereInput;
    isNot?: alertWhereInput;
  };

  export type DeviceNullableRelationFilter = {
    is?: deviceWhereInput | null;
    isNot?: deviceWhereInput | null;
  };

  export type SensorNullableRelationFilter = {
    is?: sensorWhereInput | null;
    isNot?: sensorWhereInput | null;
  };

  export type TruckNullableRelationFilter = {
    is?: truckWhereInput | null;
    isNot?: truckWhereInput | null;
  };

  export type alert_eventsCountOrderByAggregateInput = {
    id?: SortOrder;
    alert_id?: SortOrder;
    device_id?: SortOrder;
    sensor_id?: SortOrder;
    truck_id?: SortOrder;
    value?: SortOrder;
    message?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    resolved_at?: SortOrder;
  };

  export type alert_eventsAvgOrderByAggregateInput = {
    value?: SortOrder;
  };

  export type alert_eventsMaxOrderByAggregateInput = {
    id?: SortOrder;
    alert_id?: SortOrder;
    device_id?: SortOrder;
    sensor_id?: SortOrder;
    truck_id?: SortOrder;
    value?: SortOrder;
    message?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    resolved_at?: SortOrder;
  };

  export type alert_eventsMinOrderByAggregateInput = {
    id?: SortOrder;
    alert_id?: SortOrder;
    device_id?: SortOrder;
    sensor_id?: SortOrder;
    truck_id?: SortOrder;
    value?: SortOrder;
    message?: SortOrder;
    status?: SortOrder;
    created_at?: SortOrder;
    resolved_at?: SortOrder;
  };

  export type alert_eventsSumOrderByAggregateInput = {
    value?: SortOrder;
  };

  export type driversCreateNestedManyWithoutVendorInput = {
    create?:
      | XOR<driversCreateWithoutVendorInput, driversUncheckedCreateWithoutVendorInput>
      | driversCreateWithoutVendorInput[]
      | driversUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | driversCreateOrConnectWithoutVendorInput
      | driversCreateOrConnectWithoutVendorInput[];
    createMany?: driversCreateManyVendorInputEnvelope;
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[];
  };

  export type truckCreateNestedManyWithoutVendorInput = {
    create?:
      | XOR<truckCreateWithoutVendorInput, truckUncheckedCreateWithoutVendorInput>
      | truckCreateWithoutVendorInput[]
      | truckUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutVendorInput
      | truckCreateOrConnectWithoutVendorInput[];
    createMany?: truckCreateManyVendorInputEnvelope;
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
  };

  export type driversUncheckedCreateNestedManyWithoutVendorInput = {
    create?:
      | XOR<driversCreateWithoutVendorInput, driversUncheckedCreateWithoutVendorInput>
      | driversCreateWithoutVendorInput[]
      | driversUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | driversCreateOrConnectWithoutVendorInput
      | driversCreateOrConnectWithoutVendorInput[];
    createMany?: driversCreateManyVendorInputEnvelope;
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[];
  };

  export type truckUncheckedCreateNestedManyWithoutVendorInput = {
    create?:
      | XOR<truckCreateWithoutVendorInput, truckUncheckedCreateWithoutVendorInput>
      | truckCreateWithoutVendorInput[]
      | truckUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutVendorInput
      | truckCreateOrConnectWithoutVendorInput[];
    createMany?: truckCreateManyVendorInputEnvelope;
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type driversUpdateManyWithoutVendorNestedInput = {
    create?:
      | XOR<driversCreateWithoutVendorInput, driversUncheckedCreateWithoutVendorInput>
      | driversCreateWithoutVendorInput[]
      | driversUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | driversCreateOrConnectWithoutVendorInput
      | driversCreateOrConnectWithoutVendorInput[];
    upsert?:
      | driversUpsertWithWhereUniqueWithoutVendorInput
      | driversUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: driversCreateManyVendorInputEnvelope;
    set?: driversWhereUniqueInput | driversWhereUniqueInput[];
    disconnect?: driversWhereUniqueInput | driversWhereUniqueInput[];
    delete?: driversWhereUniqueInput | driversWhereUniqueInput[];
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[];
    update?:
      | driversUpdateWithWhereUniqueWithoutVendorInput
      | driversUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?:
      | driversUpdateManyWithWhereWithoutVendorInput
      | driversUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: driversScalarWhereInput | driversScalarWhereInput[];
  };

  export type truckUpdateManyWithoutVendorNestedInput = {
    create?:
      | XOR<truckCreateWithoutVendorInput, truckUncheckedCreateWithoutVendorInput>
      | truckCreateWithoutVendorInput[]
      | truckUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutVendorInput
      | truckCreateOrConnectWithoutVendorInput[];
    upsert?:
      | truckUpsertWithWhereUniqueWithoutVendorInput
      | truckUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: truckCreateManyVendorInputEnvelope;
    set?: truckWhereUniqueInput | truckWhereUniqueInput[];
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[];
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    update?:
      | truckUpdateWithWhereUniqueWithoutVendorInput
      | truckUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?:
      | truckUpdateManyWithWhereWithoutVendorInput
      | truckUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type driversUncheckedUpdateManyWithoutVendorNestedInput = {
    create?:
      | XOR<driversCreateWithoutVendorInput, driversUncheckedCreateWithoutVendorInput>
      | driversCreateWithoutVendorInput[]
      | driversUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | driversCreateOrConnectWithoutVendorInput
      | driversCreateOrConnectWithoutVendorInput[];
    upsert?:
      | driversUpsertWithWhereUniqueWithoutVendorInput
      | driversUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: driversCreateManyVendorInputEnvelope;
    set?: driversWhereUniqueInput | driversWhereUniqueInput[];
    disconnect?: driversWhereUniqueInput | driversWhereUniqueInput[];
    delete?: driversWhereUniqueInput | driversWhereUniqueInput[];
    connect?: driversWhereUniqueInput | driversWhereUniqueInput[];
    update?:
      | driversUpdateWithWhereUniqueWithoutVendorInput
      | driversUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?:
      | driversUpdateManyWithWhereWithoutVendorInput
      | driversUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: driversScalarWhereInput | driversScalarWhereInput[];
  };

  export type truckUncheckedUpdateManyWithoutVendorNestedInput = {
    create?:
      | XOR<truckCreateWithoutVendorInput, truckUncheckedCreateWithoutVendorInput>
      | truckCreateWithoutVendorInput[]
      | truckUncheckedCreateWithoutVendorInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutVendorInput
      | truckCreateOrConnectWithoutVendorInput[];
    upsert?:
      | truckUpsertWithWhereUniqueWithoutVendorInput
      | truckUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: truckCreateManyVendorInputEnvelope;
    set?: truckWhereUniqueInput | truckWhereUniqueInput[];
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[];
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    update?:
      | truckUpdateWithWhereUniqueWithoutVendorInput
      | truckUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?:
      | truckUpdateManyWithWhereWithoutVendorInput
      | truckUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[];
  };

  export type vendorsCreateNestedOneWithoutDriversInput = {
    create?: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>;
    connectOrCreate?: vendorsCreateOrConnectWithoutDriversInput;
    connect?: vendorsWhereUniqueInput;
  };

  export type truckCreateNestedManyWithoutDriverInput = {
    create?:
      | XOR<truckCreateWithoutDriverInput, truckUncheckedCreateWithoutDriverInput>
      | truckCreateWithoutDriverInput[]
      | truckUncheckedCreateWithoutDriverInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutDriverInput
      | truckCreateOrConnectWithoutDriverInput[];
    createMany?: truckCreateManyDriverInputEnvelope;
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
  };

  export type truckUncheckedCreateNestedManyWithoutDriverInput = {
    create?:
      | XOR<truckCreateWithoutDriverInput, truckUncheckedCreateWithoutDriverInput>
      | truckCreateWithoutDriverInput[]
      | truckUncheckedCreateWithoutDriverInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutDriverInput
      | truckCreateOrConnectWithoutDriverInput[];
    createMany?: truckCreateManyDriverInputEnvelope;
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
  };

  export type vendorsUpdateOneWithoutDriversNestedInput = {
    create?: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>;
    connectOrCreate?: vendorsCreateOrConnectWithoutDriversInput;
    upsert?: vendorsUpsertWithoutDriversInput;
    disconnect?: vendorsWhereInput | boolean;
    delete?: vendorsWhereInput | boolean;
    connect?: vendorsWhereUniqueInput;
    update?: XOR<
      XOR<vendorsUpdateToOneWithWhereWithoutDriversInput, vendorsUpdateWithoutDriversInput>,
      vendorsUncheckedUpdateWithoutDriversInput
    >;
  };

  export type truckUpdateManyWithoutDriverNestedInput = {
    create?:
      | XOR<truckCreateWithoutDriverInput, truckUncheckedCreateWithoutDriverInput>
      | truckCreateWithoutDriverInput[]
      | truckUncheckedCreateWithoutDriverInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutDriverInput
      | truckCreateOrConnectWithoutDriverInput[];
    upsert?:
      | truckUpsertWithWhereUniqueWithoutDriverInput
      | truckUpsertWithWhereUniqueWithoutDriverInput[];
    createMany?: truckCreateManyDriverInputEnvelope;
    set?: truckWhereUniqueInput | truckWhereUniqueInput[];
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[];
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    update?:
      | truckUpdateWithWhereUniqueWithoutDriverInput
      | truckUpdateWithWhereUniqueWithoutDriverInput[];
    updateMany?:
      | truckUpdateManyWithWhereWithoutDriverInput
      | truckUpdateManyWithWhereWithoutDriverInput[];
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[];
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type truckUncheckedUpdateManyWithoutDriverNestedInput = {
    create?:
      | XOR<truckCreateWithoutDriverInput, truckUncheckedCreateWithoutDriverInput>
      | truckCreateWithoutDriverInput[]
      | truckUncheckedCreateWithoutDriverInput[];
    connectOrCreate?:
      | truckCreateOrConnectWithoutDriverInput
      | truckCreateOrConnectWithoutDriverInput[];
    upsert?:
      | truckUpsertWithWhereUniqueWithoutDriverInput
      | truckUpsertWithWhereUniqueWithoutDriverInput[];
    createMany?: truckCreateManyDriverInputEnvelope;
    set?: truckWhereUniqueInput | truckWhereUniqueInput[];
    disconnect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    delete?: truckWhereUniqueInput | truckWhereUniqueInput[];
    connect?: truckWhereUniqueInput | truckWhereUniqueInput[];
    update?:
      | truckUpdateWithWhereUniqueWithoutDriverInput
      | truckUpdateWithWhereUniqueWithoutDriverInput[];
    updateMany?:
      | truckUpdateManyWithWhereWithoutDriverInput
      | truckUpdateManyWithWhereWithoutDriverInput[];
    deleteMany?: truckScalarWhereInput | truckScalarWhereInput[];
  };

  export type vendorsCreateNestedOneWithoutTrucksInput = {
    create?: XOR<vendorsCreateWithoutTrucksInput, vendorsUncheckedCreateWithoutTrucksInput>;
    connectOrCreate?: vendorsCreateOrConnectWithoutTrucksInput;
    connect?: vendorsWhereUniqueInput;
  };

  export type driversCreateNestedOneWithoutTrucksInput = {
    create?: XOR<driversCreateWithoutTrucksInput, driversUncheckedCreateWithoutTrucksInput>;
    connectOrCreate?: driversCreateOrConnectWithoutTrucksInput;
    connect?: driversWhereUniqueInput;
  };

  export type deviceCreateNestedManyWithoutTruckInput = {
    create?:
      | XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>
      | deviceCreateWithoutTruckInput[]
      | deviceUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | deviceCreateOrConnectWithoutTruckInput
      | deviceCreateOrConnectWithoutTruckInput[];
    createMany?: deviceCreateManyTruckInputEnvelope;
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
  };

  export type alert_eventsCreateNestedManyWithoutTruckInput = {
    create?:
      | XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>
      | alert_eventsCreateWithoutTruckInput[]
      | alert_eventsUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutTruckInput
      | alert_eventsCreateOrConnectWithoutTruckInput[];
    createMany?: alert_eventsCreateManyTruckInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type deviceUncheckedCreateNestedManyWithoutTruckInput = {
    create?:
      | XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>
      | deviceCreateWithoutTruckInput[]
      | deviceUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | deviceCreateOrConnectWithoutTruckInput
      | deviceCreateOrConnectWithoutTruckInput[];
    createMany?: deviceCreateManyTruckInputEnvelope;
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
  };

  export type alert_eventsUncheckedCreateNestedManyWithoutTruckInput = {
    create?:
      | XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>
      | alert_eventsCreateWithoutTruckInput[]
      | alert_eventsUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutTruckInput
      | alert_eventsCreateOrConnectWithoutTruckInput[];
    createMany?: alert_eventsCreateManyTruckInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type vendorsUpdateOneWithoutTrucksNestedInput = {
    create?: XOR<vendorsCreateWithoutTrucksInput, vendorsUncheckedCreateWithoutTrucksInput>;
    connectOrCreate?: vendorsCreateOrConnectWithoutTrucksInput;
    upsert?: vendorsUpsertWithoutTrucksInput;
    disconnect?: vendorsWhereInput | boolean;
    delete?: vendorsWhereInput | boolean;
    connect?: vendorsWhereUniqueInput;
    update?: XOR<
      XOR<vendorsUpdateToOneWithWhereWithoutTrucksInput, vendorsUpdateWithoutTrucksInput>,
      vendorsUncheckedUpdateWithoutTrucksInput
    >;
  };

  export type driversUpdateOneWithoutTrucksNestedInput = {
    create?: XOR<driversCreateWithoutTrucksInput, driversUncheckedCreateWithoutTrucksInput>;
    connectOrCreate?: driversCreateOrConnectWithoutTrucksInput;
    upsert?: driversUpsertWithoutTrucksInput;
    disconnect?: driversWhereInput | boolean;
    delete?: driversWhereInput | boolean;
    connect?: driversWhereUniqueInput;
    update?: XOR<
      XOR<driversUpdateToOneWithWhereWithoutTrucksInput, driversUpdateWithoutTrucksInput>,
      driversUncheckedUpdateWithoutTrucksInput
    >;
  };

  export type deviceUpdateManyWithoutTruckNestedInput = {
    create?:
      | XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>
      | deviceCreateWithoutTruckInput[]
      | deviceUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | deviceCreateOrConnectWithoutTruckInput
      | deviceCreateOrConnectWithoutTruckInput[];
    upsert?:
      | deviceUpsertWithWhereUniqueWithoutTruckInput
      | deviceUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: deviceCreateManyTruckInputEnvelope;
    set?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    disconnect?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    delete?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    update?:
      | deviceUpdateWithWhereUniqueWithoutTruckInput
      | deviceUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?:
      | deviceUpdateManyWithWhereWithoutTruckInput
      | deviceUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: deviceScalarWhereInput | deviceScalarWhereInput[];
  };

  export type alert_eventsUpdateManyWithoutTruckNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>
      | alert_eventsCreateWithoutTruckInput[]
      | alert_eventsUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutTruckInput
      | alert_eventsCreateOrConnectWithoutTruckInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutTruckInput
      | alert_eventsUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: alert_eventsCreateManyTruckInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutTruckInput
      | alert_eventsUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutTruckInput
      | alert_eventsUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type deviceUncheckedUpdateManyWithoutTruckNestedInput = {
    create?:
      | XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>
      | deviceCreateWithoutTruckInput[]
      | deviceUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | deviceCreateOrConnectWithoutTruckInput
      | deviceCreateOrConnectWithoutTruckInput[];
    upsert?:
      | deviceUpsertWithWhereUniqueWithoutTruckInput
      | deviceUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: deviceCreateManyTruckInputEnvelope;
    set?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    disconnect?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    delete?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    connect?: deviceWhereUniqueInput | deviceWhereUniqueInput[];
    update?:
      | deviceUpdateWithWhereUniqueWithoutTruckInput
      | deviceUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?:
      | deviceUpdateManyWithWhereWithoutTruckInput
      | deviceUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: deviceScalarWhereInput | deviceScalarWhereInput[];
  };

  export type alert_eventsUncheckedUpdateManyWithoutTruckNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>
      | alert_eventsCreateWithoutTruckInput[]
      | alert_eventsUncheckedCreateWithoutTruckInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutTruckInput
      | alert_eventsCreateOrConnectWithoutTruckInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutTruckInput
      | alert_eventsUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: alert_eventsCreateManyTruckInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutTruckInput
      | alert_eventsUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutTruckInput
      | alert_eventsUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type truckCreateNestedOneWithoutDevicesInput = {
    create?: XOR<truckCreateWithoutDevicesInput, truckUncheckedCreateWithoutDevicesInput>;
    connectOrCreate?: truckCreateOrConnectWithoutDevicesInput;
    connect?: truckWhereUniqueInput;
  };

  export type sensorCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>
      | sensorCreateWithoutDeviceInput[]
      | sensorUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | sensorCreateOrConnectWithoutDeviceInput
      | sensorCreateOrConnectWithoutDeviceInput[];
    createMany?: sensorCreateManyDeviceInputEnvelope;
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
  };

  export type locationCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>
      | locationCreateWithoutDeviceInput[]
      | locationUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | locationCreateOrConnectWithoutDeviceInput
      | locationCreateOrConnectWithoutDeviceInput[];
    createMany?: locationCreateManyDeviceInputEnvelope;
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[];
  };

  export type location_historyCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<
          location_historyCreateWithoutDeviceInput,
          location_historyUncheckedCreateWithoutDeviceInput
        >
      | location_historyCreateWithoutDeviceInput[]
      | location_historyUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutDeviceInput
      | location_historyCreateOrConnectWithoutDeviceInput[];
    createMany?: location_historyCreateManyDeviceInputEnvelope;
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
  };

  export type alert_eventsCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput>
      | alert_eventsCreateWithoutDeviceInput[]
      | alert_eventsUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutDeviceInput
      | alert_eventsCreateOrConnectWithoutDeviceInput[];
    createMany?: alert_eventsCreateManyDeviceInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type sensorUncheckedCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>
      | sensorCreateWithoutDeviceInput[]
      | sensorUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | sensorCreateOrConnectWithoutDeviceInput
      | sensorCreateOrConnectWithoutDeviceInput[];
    createMany?: sensorCreateManyDeviceInputEnvelope;
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
  };

  export type locationUncheckedCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>
      | locationCreateWithoutDeviceInput[]
      | locationUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | locationCreateOrConnectWithoutDeviceInput
      | locationCreateOrConnectWithoutDeviceInput[];
    createMany?: locationCreateManyDeviceInputEnvelope;
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[];
  };

  export type location_historyUncheckedCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<
          location_historyCreateWithoutDeviceInput,
          location_historyUncheckedCreateWithoutDeviceInput
        >
      | location_historyCreateWithoutDeviceInput[]
      | location_historyUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutDeviceInput
      | location_historyCreateOrConnectWithoutDeviceInput[];
    createMany?: location_historyCreateManyDeviceInputEnvelope;
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
  };

  export type alert_eventsUncheckedCreateNestedManyWithoutDeviceInput = {
    create?:
      | XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput>
      | alert_eventsCreateWithoutDeviceInput[]
      | alert_eventsUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutDeviceInput
      | alert_eventsCreateOrConnectWithoutDeviceInput[];
    createMany?: alert_eventsCreateManyDeviceInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type truckUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: XOR<truckCreateWithoutDevicesInput, truckUncheckedCreateWithoutDevicesInput>;
    connectOrCreate?: truckCreateOrConnectWithoutDevicesInput;
    upsert?: truckUpsertWithoutDevicesInput;
    connect?: truckWhereUniqueInput;
    update?: XOR<
      XOR<truckUpdateToOneWithWhereWithoutDevicesInput, truckUpdateWithoutDevicesInput>,
      truckUncheckedUpdateWithoutDevicesInput
    >;
  };

  export type sensorUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>
      | sensorCreateWithoutDeviceInput[]
      | sensorUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | sensorCreateOrConnectWithoutDeviceInput
      | sensorCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | sensorUpsertWithWhereUniqueWithoutDeviceInput
      | sensorUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: sensorCreateManyDeviceInputEnvelope;
    set?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    disconnect?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    delete?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    update?:
      | sensorUpdateWithWhereUniqueWithoutDeviceInput
      | sensorUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | sensorUpdateManyWithWhereWithoutDeviceInput
      | sensorUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: sensorScalarWhereInput | sensorScalarWhereInput[];
  };

  export type locationUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>
      | locationCreateWithoutDeviceInput[]
      | locationUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | locationCreateOrConnectWithoutDeviceInput
      | locationCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | locationUpsertWithWhereUniqueWithoutDeviceInput
      | locationUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: locationCreateManyDeviceInputEnvelope;
    set?: locationWhereUniqueInput | locationWhereUniqueInput[];
    disconnect?: locationWhereUniqueInput | locationWhereUniqueInput[];
    delete?: locationWhereUniqueInput | locationWhereUniqueInput[];
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[];
    update?:
      | locationUpdateWithWhereUniqueWithoutDeviceInput
      | locationUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | locationUpdateManyWithWhereWithoutDeviceInput
      | locationUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: locationScalarWhereInput | locationScalarWhereInput[];
  };

  export type location_historyUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<
          location_historyCreateWithoutDeviceInput,
          location_historyUncheckedCreateWithoutDeviceInput
        >
      | location_historyCreateWithoutDeviceInput[]
      | location_historyUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutDeviceInput
      | location_historyCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | location_historyUpsertWithWhereUniqueWithoutDeviceInput
      | location_historyUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: location_historyCreateManyDeviceInputEnvelope;
    set?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    disconnect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    delete?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    update?:
      | location_historyUpdateWithWhereUniqueWithoutDeviceInput
      | location_historyUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | location_historyUpdateManyWithWhereWithoutDeviceInput
      | location_historyUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: location_historyScalarWhereInput | location_historyScalarWhereInput[];
  };

  export type alert_eventsUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput>
      | alert_eventsCreateWithoutDeviceInput[]
      | alert_eventsUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutDeviceInput
      | alert_eventsCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutDeviceInput
      | alert_eventsUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: alert_eventsCreateManyDeviceInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutDeviceInput
      | alert_eventsUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutDeviceInput
      | alert_eventsUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type sensorUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>
      | sensorCreateWithoutDeviceInput[]
      | sensorUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | sensorCreateOrConnectWithoutDeviceInput
      | sensorCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | sensorUpsertWithWhereUniqueWithoutDeviceInput
      | sensorUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: sensorCreateManyDeviceInputEnvelope;
    set?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    disconnect?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    delete?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    connect?: sensorWhereUniqueInput | sensorWhereUniqueInput[];
    update?:
      | sensorUpdateWithWhereUniqueWithoutDeviceInput
      | sensorUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | sensorUpdateManyWithWhereWithoutDeviceInput
      | sensorUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: sensorScalarWhereInput | sensorScalarWhereInput[];
  };

  export type locationUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>
      | locationCreateWithoutDeviceInput[]
      | locationUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | locationCreateOrConnectWithoutDeviceInput
      | locationCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | locationUpsertWithWhereUniqueWithoutDeviceInput
      | locationUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: locationCreateManyDeviceInputEnvelope;
    set?: locationWhereUniqueInput | locationWhereUniqueInput[];
    disconnect?: locationWhereUniqueInput | locationWhereUniqueInput[];
    delete?: locationWhereUniqueInput | locationWhereUniqueInput[];
    connect?: locationWhereUniqueInput | locationWhereUniqueInput[];
    update?:
      | locationUpdateWithWhereUniqueWithoutDeviceInput
      | locationUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | locationUpdateManyWithWhereWithoutDeviceInput
      | locationUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: locationScalarWhereInput | locationScalarWhereInput[];
  };

  export type location_historyUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<
          location_historyCreateWithoutDeviceInput,
          location_historyUncheckedCreateWithoutDeviceInput
        >
      | location_historyCreateWithoutDeviceInput[]
      | location_historyUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutDeviceInput
      | location_historyCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | location_historyUpsertWithWhereUniqueWithoutDeviceInput
      | location_historyUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: location_historyCreateManyDeviceInputEnvelope;
    set?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    disconnect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    delete?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    update?:
      | location_historyUpdateWithWhereUniqueWithoutDeviceInput
      | location_historyUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | location_historyUpdateManyWithWhereWithoutDeviceInput
      | location_historyUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: location_historyScalarWhereInput | location_historyScalarWhereInput[];
  };

  export type alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutDeviceInput, alert_eventsUncheckedCreateWithoutDeviceInput>
      | alert_eventsCreateWithoutDeviceInput[]
      | alert_eventsUncheckedCreateWithoutDeviceInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutDeviceInput
      | alert_eventsCreateOrConnectWithoutDeviceInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutDeviceInput
      | alert_eventsUpsertWithWhereUniqueWithoutDeviceInput[];
    createMany?: alert_eventsCreateManyDeviceInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutDeviceInput
      | alert_eventsUpdateWithWhereUniqueWithoutDeviceInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutDeviceInput
      | alert_eventsUpdateManyWithWhereWithoutDeviceInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type deviceCreateNestedOneWithoutSensorsInput = {
    create?: XOR<deviceCreateWithoutSensorsInput, deviceUncheckedCreateWithoutSensorsInput>;
    connectOrCreate?: deviceCreateOrConnectWithoutSensorsInput;
    connect?: deviceWhereUniqueInput;
  };

  export type alert_eventsCreateNestedManyWithoutSensorInput = {
    create?:
      | XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput>
      | alert_eventsCreateWithoutSensorInput[]
      | alert_eventsUncheckedCreateWithoutSensorInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutSensorInput
      | alert_eventsCreateOrConnectWithoutSensorInput[];
    createMany?: alert_eventsCreateManySensorInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type alert_eventsUncheckedCreateNestedManyWithoutSensorInput = {
    create?:
      | XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput>
      | alert_eventsCreateWithoutSensorInput[]
      | alert_eventsUncheckedCreateWithoutSensorInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutSensorInput
      | alert_eventsCreateOrConnectWithoutSensorInput[];
    createMany?: alert_eventsCreateManySensorInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type deviceUpdateOneRequiredWithoutSensorsNestedInput = {
    create?: XOR<deviceCreateWithoutSensorsInput, deviceUncheckedCreateWithoutSensorsInput>;
    connectOrCreate?: deviceCreateOrConnectWithoutSensorsInput;
    upsert?: deviceUpsertWithoutSensorsInput;
    connect?: deviceWhereUniqueInput;
    update?: XOR<
      XOR<deviceUpdateToOneWithWhereWithoutSensorsInput, deviceUpdateWithoutSensorsInput>,
      deviceUncheckedUpdateWithoutSensorsInput
    >;
  };

  export type alert_eventsUpdateManyWithoutSensorNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput>
      | alert_eventsCreateWithoutSensorInput[]
      | alert_eventsUncheckedCreateWithoutSensorInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutSensorInput
      | alert_eventsCreateOrConnectWithoutSensorInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutSensorInput
      | alert_eventsUpsertWithWhereUniqueWithoutSensorInput[];
    createMany?: alert_eventsCreateManySensorInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutSensorInput
      | alert_eventsUpdateWithWhereUniqueWithoutSensorInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutSensorInput
      | alert_eventsUpdateManyWithWhereWithoutSensorInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type alert_eventsUncheckedUpdateManyWithoutSensorNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutSensorInput, alert_eventsUncheckedCreateWithoutSensorInput>
      | alert_eventsCreateWithoutSensorInput[]
      | alert_eventsUncheckedCreateWithoutSensorInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutSensorInput
      | alert_eventsCreateOrConnectWithoutSensorInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutSensorInput
      | alert_eventsUpsertWithWhereUniqueWithoutSensorInput[];
    createMany?: alert_eventsCreateManySensorInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutSensorInput
      | alert_eventsUpdateWithWhereUniqueWithoutSensorInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutSensorInput
      | alert_eventsUpdateManyWithWhereWithoutSensorInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type deviceCreateNestedOneWithoutLocationsInput = {
    create?: XOR<deviceCreateWithoutLocationsInput, deviceUncheckedCreateWithoutLocationsInput>;
    connectOrCreate?: deviceCreateOrConnectWithoutLocationsInput;
    connect?: deviceWhereUniqueInput;
  };

  export type location_historyCreateNestedManyWithoutLocationInput = {
    create?:
      | XOR<
          location_historyCreateWithoutLocationInput,
          location_historyUncheckedCreateWithoutLocationInput
        >
      | location_historyCreateWithoutLocationInput[]
      | location_historyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutLocationInput
      | location_historyCreateOrConnectWithoutLocationInput[];
    createMany?: location_historyCreateManyLocationInputEnvelope;
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
  };

  export type location_historyUncheckedCreateNestedManyWithoutLocationInput = {
    create?:
      | XOR<
          location_historyCreateWithoutLocationInput,
          location_historyUncheckedCreateWithoutLocationInput
        >
      | location_historyCreateWithoutLocationInput[]
      | location_historyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutLocationInput
      | location_historyCreateOrConnectWithoutLocationInput[];
    createMany?: location_historyCreateManyLocationInputEnvelope;
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type deviceUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<deviceCreateWithoutLocationsInput, deviceUncheckedCreateWithoutLocationsInput>;
    connectOrCreate?: deviceCreateOrConnectWithoutLocationsInput;
    upsert?: deviceUpsertWithoutLocationsInput;
    connect?: deviceWhereUniqueInput;
    update?: XOR<
      XOR<deviceUpdateToOneWithWhereWithoutLocationsInput, deviceUpdateWithoutLocationsInput>,
      deviceUncheckedUpdateWithoutLocationsInput
    >;
  };

  export type location_historyUpdateManyWithoutLocationNestedInput = {
    create?:
      | XOR<
          location_historyCreateWithoutLocationInput,
          location_historyUncheckedCreateWithoutLocationInput
        >
      | location_historyCreateWithoutLocationInput[]
      | location_historyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutLocationInput
      | location_historyCreateOrConnectWithoutLocationInput[];
    upsert?:
      | location_historyUpsertWithWhereUniqueWithoutLocationInput
      | location_historyUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: location_historyCreateManyLocationInputEnvelope;
    set?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    disconnect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    delete?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    update?:
      | location_historyUpdateWithWhereUniqueWithoutLocationInput
      | location_historyUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?:
      | location_historyUpdateManyWithWhereWithoutLocationInput
      | location_historyUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: location_historyScalarWhereInput | location_historyScalarWhereInput[];
  };

  export type location_historyUncheckedUpdateManyWithoutLocationNestedInput = {
    create?:
      | XOR<
          location_historyCreateWithoutLocationInput,
          location_historyUncheckedCreateWithoutLocationInput
        >
      | location_historyCreateWithoutLocationInput[]
      | location_historyUncheckedCreateWithoutLocationInput[];
    connectOrCreate?:
      | location_historyCreateOrConnectWithoutLocationInput
      | location_historyCreateOrConnectWithoutLocationInput[];
    upsert?:
      | location_historyUpsertWithWhereUniqueWithoutLocationInput
      | location_historyUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: location_historyCreateManyLocationInputEnvelope;
    set?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    disconnect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    delete?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    connect?: location_historyWhereUniqueInput | location_historyWhereUniqueInput[];
    update?:
      | location_historyUpdateWithWhereUniqueWithoutLocationInput
      | location_historyUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?:
      | location_historyUpdateManyWithWhereWithoutLocationInput
      | location_historyUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: location_historyScalarWhereInput | location_historyScalarWhereInput[];
  };

  export type locationCreateNestedOneWithoutLocation_historyInput = {
    create?: XOR<
      locationCreateWithoutLocation_historyInput,
      locationUncheckedCreateWithoutLocation_historyInput
    >;
    connectOrCreate?: locationCreateOrConnectWithoutLocation_historyInput;
    connect?: locationWhereUniqueInput;
  };

  export type deviceCreateNestedOneWithoutLocation_historyInput = {
    create?: XOR<
      deviceCreateWithoutLocation_historyInput,
      deviceUncheckedCreateWithoutLocation_historyInput
    >;
    connectOrCreate?: deviceCreateOrConnectWithoutLocation_historyInput;
    connect?: deviceWhereUniqueInput;
  };

  export type locationUpdateOneRequiredWithoutLocation_historyNestedInput = {
    create?: XOR<
      locationCreateWithoutLocation_historyInput,
      locationUncheckedCreateWithoutLocation_historyInput
    >;
    connectOrCreate?: locationCreateOrConnectWithoutLocation_historyInput;
    upsert?: locationUpsertWithoutLocation_historyInput;
    connect?: locationWhereUniqueInput;
    update?: XOR<
      XOR<
        locationUpdateToOneWithWhereWithoutLocation_historyInput,
        locationUpdateWithoutLocation_historyInput
      >,
      locationUncheckedUpdateWithoutLocation_historyInput
    >;
  };

  export type deviceUpdateOneRequiredWithoutLocation_historyNestedInput = {
    create?: XOR<
      deviceCreateWithoutLocation_historyInput,
      deviceUncheckedCreateWithoutLocation_historyInput
    >;
    connectOrCreate?: deviceCreateOrConnectWithoutLocation_historyInput;
    upsert?: deviceUpsertWithoutLocation_historyInput;
    connect?: deviceWhereUniqueInput;
    update?: XOR<
      XOR<
        deviceUpdateToOneWithWhereWithoutLocation_historyInput,
        deviceUpdateWithoutLocation_historyInput
      >,
      deviceUncheckedUpdateWithoutLocation_historyInput
    >;
  };

  export type alert_eventsCreateNestedManyWithoutAlertInput = {
    create?:
      | XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>
      | alert_eventsCreateWithoutAlertInput[]
      | alert_eventsUncheckedCreateWithoutAlertInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutAlertInput
      | alert_eventsCreateOrConnectWithoutAlertInput[];
    createMany?: alert_eventsCreateManyAlertInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type alert_eventsUncheckedCreateNestedManyWithoutAlertInput = {
    create?:
      | XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>
      | alert_eventsCreateWithoutAlertInput[]
      | alert_eventsUncheckedCreateWithoutAlertInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutAlertInput
      | alert_eventsCreateOrConnectWithoutAlertInput[];
    createMany?: alert_eventsCreateManyAlertInputEnvelope;
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
  };

  export type alert_eventsUpdateManyWithoutAlertNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>
      | alert_eventsCreateWithoutAlertInput[]
      | alert_eventsUncheckedCreateWithoutAlertInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutAlertInput
      | alert_eventsCreateOrConnectWithoutAlertInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutAlertInput
      | alert_eventsUpsertWithWhereUniqueWithoutAlertInput[];
    createMany?: alert_eventsCreateManyAlertInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutAlertInput
      | alert_eventsUpdateWithWhereUniqueWithoutAlertInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutAlertInput
      | alert_eventsUpdateManyWithWhereWithoutAlertInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type alert_eventsUncheckedUpdateManyWithoutAlertNestedInput = {
    create?:
      | XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>
      | alert_eventsCreateWithoutAlertInput[]
      | alert_eventsUncheckedCreateWithoutAlertInput[];
    connectOrCreate?:
      | alert_eventsCreateOrConnectWithoutAlertInput
      | alert_eventsCreateOrConnectWithoutAlertInput[];
    upsert?:
      | alert_eventsUpsertWithWhereUniqueWithoutAlertInput
      | alert_eventsUpsertWithWhereUniqueWithoutAlertInput[];
    createMany?: alert_eventsCreateManyAlertInputEnvelope;
    set?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    disconnect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    delete?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    connect?: alert_eventsWhereUniqueInput | alert_eventsWhereUniqueInput[];
    update?:
      | alert_eventsUpdateWithWhereUniqueWithoutAlertInput
      | alert_eventsUpdateWithWhereUniqueWithoutAlertInput[];
    updateMany?:
      | alert_eventsUpdateManyWithWhereWithoutAlertInput
      | alert_eventsUpdateManyWithWhereWithoutAlertInput[];
    deleteMany?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
  };

  export type alertCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>;
    connectOrCreate?: alertCreateOrConnectWithoutAlert_eventsInput;
    connect?: alertWhereUniqueInput;
  };

  export type deviceCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<
      deviceCreateWithoutAlert_eventsInput,
      deviceUncheckedCreateWithoutAlert_eventsInput
    >;
    connectOrCreate?: deviceCreateOrConnectWithoutAlert_eventsInput;
    connect?: deviceWhereUniqueInput;
  };

  export type sensorCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<
      sensorCreateWithoutAlert_eventsInput,
      sensorUncheckedCreateWithoutAlert_eventsInput
    >;
    connectOrCreate?: sensorCreateOrConnectWithoutAlert_eventsInput;
    connect?: sensorWhereUniqueInput;
  };

  export type truckCreateNestedOneWithoutAlert_eventsInput = {
    create?: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>;
    connectOrCreate?: truckCreateOrConnectWithoutAlert_eventsInput;
    connect?: truckWhereUniqueInput;
  };

  export type alertUpdateOneRequiredWithoutAlert_eventsNestedInput = {
    create?: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>;
    connectOrCreate?: alertCreateOrConnectWithoutAlert_eventsInput;
    upsert?: alertUpsertWithoutAlert_eventsInput;
    connect?: alertWhereUniqueInput;
    update?: XOR<
      XOR<alertUpdateToOneWithWhereWithoutAlert_eventsInput, alertUpdateWithoutAlert_eventsInput>,
      alertUncheckedUpdateWithoutAlert_eventsInput
    >;
  };

  export type deviceUpdateOneWithoutAlert_eventsNestedInput = {
    create?: XOR<
      deviceCreateWithoutAlert_eventsInput,
      deviceUncheckedCreateWithoutAlert_eventsInput
    >;
    connectOrCreate?: deviceCreateOrConnectWithoutAlert_eventsInput;
    upsert?: deviceUpsertWithoutAlert_eventsInput;
    disconnect?: deviceWhereInput | boolean;
    delete?: deviceWhereInput | boolean;
    connect?: deviceWhereUniqueInput;
    update?: XOR<
      XOR<deviceUpdateToOneWithWhereWithoutAlert_eventsInput, deviceUpdateWithoutAlert_eventsInput>,
      deviceUncheckedUpdateWithoutAlert_eventsInput
    >;
  };

  export type sensorUpdateOneWithoutAlert_eventsNestedInput = {
    create?: XOR<
      sensorCreateWithoutAlert_eventsInput,
      sensorUncheckedCreateWithoutAlert_eventsInput
    >;
    connectOrCreate?: sensorCreateOrConnectWithoutAlert_eventsInput;
    upsert?: sensorUpsertWithoutAlert_eventsInput;
    disconnect?: sensorWhereInput | boolean;
    delete?: sensorWhereInput | boolean;
    connect?: sensorWhereUniqueInput;
    update?: XOR<
      XOR<sensorUpdateToOneWithWhereWithoutAlert_eventsInput, sensorUpdateWithoutAlert_eventsInput>,
      sensorUncheckedUpdateWithoutAlert_eventsInput
    >;
  };

  export type truckUpdateOneWithoutAlert_eventsNestedInput = {
    create?: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>;
    connectOrCreate?: truckCreateOrConnectWithoutAlert_eventsInput;
    upsert?: truckUpsertWithoutAlert_eventsInput;
    disconnect?: truckWhereInput | boolean;
    delete?: truckWhereInput | boolean;
    connect?: truckWhereUniqueInput;
    update?: XOR<
      XOR<truckUpdateToOneWithWhereWithoutAlert_eventsInput, truckUpdateWithoutAlert_eventsInput>,
      truckUncheckedUpdateWithoutAlert_eventsInput
    >;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidFilter<$PrismaModel> | string;
  };

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedFloatNullableFilter<$PrismaModel>;
    _min?: NestedFloatNullableFilter<$PrismaModel>;
    _max?: NestedFloatNullableFilter<$PrismaModel>;
  };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type driversCreateWithoutVendorInput = {
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    trucks?: truckCreateNestedManyWithoutDriverInput;
  };

  export type driversUncheckedCreateWithoutVendorInput = {
    id?: number;
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    trucks?: truckUncheckedCreateNestedManyWithoutDriverInput;
  };

  export type driversCreateOrConnectWithoutVendorInput = {
    where: driversWhereUniqueInput;
    create: XOR<driversCreateWithoutVendorInput, driversUncheckedCreateWithoutVendorInput>;
  };

  export type driversCreateManyVendorInputEnvelope = {
    data: driversCreateManyVendorInput | driversCreateManyVendorInput[];
    skipDuplicates?: boolean;
  };

  export type truckCreateWithoutVendorInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    driver?: driversCreateNestedOneWithoutTrucksInput;
    devices?: deviceCreateNestedManyWithoutTruckInput;
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput;
  };

  export type truckUncheckedCreateWithoutVendorInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    driver_id?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    devices?: deviceUncheckedCreateNestedManyWithoutTruckInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput;
  };

  export type truckCreateOrConnectWithoutVendorInput = {
    where: truckWhereUniqueInput;
    create: XOR<truckCreateWithoutVendorInput, truckUncheckedCreateWithoutVendorInput>;
  };

  export type truckCreateManyVendorInputEnvelope = {
    data: truckCreateManyVendorInput | truckCreateManyVendorInput[];
    skipDuplicates?: boolean;
  };

  export type driversUpsertWithWhereUniqueWithoutVendorInput = {
    where: driversWhereUniqueInput;
    update: XOR<driversUpdateWithoutVendorInput, driversUncheckedUpdateWithoutVendorInput>;
    create: XOR<driversCreateWithoutVendorInput, driversUncheckedCreateWithoutVendorInput>;
  };

  export type driversUpdateWithWhereUniqueWithoutVendorInput = {
    where: driversWhereUniqueInput;
    data: XOR<driversUpdateWithoutVendorInput, driversUncheckedUpdateWithoutVendorInput>;
  };

  export type driversUpdateManyWithWhereWithoutVendorInput = {
    where: driversScalarWhereInput;
    data: XOR<driversUpdateManyMutationInput, driversUncheckedUpdateManyWithoutVendorInput>;
  };

  export type driversScalarWhereInput = {
    AND?: driversScalarWhereInput | driversScalarWhereInput[];
    OR?: driversScalarWhereInput[];
    NOT?: driversScalarWhereInput | driversScalarWhereInput[];
    id?: IntFilter<'drivers'> | number;
    name?: StringFilter<'drivers'> | string;
    phone?: StringNullableFilter<'drivers'> | string | null;
    email?: StringNullableFilter<'drivers'> | string | null;
    license_number?: StringFilter<'drivers'> | string;
    license_type?: StringFilter<'drivers'> | string;
    license_expiry?: DateTimeFilter<'drivers'> | Date | string;
    vendor_id?: IntNullableFilter<'drivers'> | number | null;
    status?: StringFilter<'drivers'> | string;
    created_at?: DateTimeFilter<'drivers'> | Date | string;
    updated_at?: DateTimeFilter<'drivers'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'drivers'> | Date | string | null;
  };

  export type truckUpsertWithWhereUniqueWithoutVendorInput = {
    where: truckWhereUniqueInput;
    update: XOR<truckUpdateWithoutVendorInput, truckUncheckedUpdateWithoutVendorInput>;
    create: XOR<truckCreateWithoutVendorInput, truckUncheckedCreateWithoutVendorInput>;
  };

  export type truckUpdateWithWhereUniqueWithoutVendorInput = {
    where: truckWhereUniqueInput;
    data: XOR<truckUpdateWithoutVendorInput, truckUncheckedUpdateWithoutVendorInput>;
  };

  export type truckUpdateManyWithWhereWithoutVendorInput = {
    where: truckScalarWhereInput;
    data: XOR<truckUpdateManyMutationInput, truckUncheckedUpdateManyWithoutVendorInput>;
  };

  export type truckScalarWhereInput = {
    AND?: truckScalarWhereInput | truckScalarWhereInput[];
    OR?: truckScalarWhereInput[];
    NOT?: truckScalarWhereInput | truckScalarWhereInput[];
    id?: UuidFilter<'truck'> | string;
    name?: StringFilter<'truck'> | string;
    image?: StringNullableFilter<'truck'> | string | null;
    year?: IntNullableFilter<'truck'> | number | null;
    model?: StringNullableFilter<'truck'> | string | null;
    type?: StringNullableFilter<'truck'> | string | null;
    vendor_id?: IntNullableFilter<'truck'> | number | null;
    status?: StringFilter<'truck'> | string;
    vin?: StringNullableFilter<'truck'> | string | null;
    plate?: StringNullableFilter<'truck'> | string | null;
    driver_id?: IntNullableFilter<'truck'> | number | null;
    created_at?: DateTimeFilter<'truck'> | Date | string;
    updated_at?: DateTimeFilter<'truck'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'truck'> | Date | string | null;
    created_by?: UuidNullableFilter<'truck'> | string | null;
    updated_by?: UuidNullableFilter<'truck'> | string | null;
  };

  export type vendorsCreateWithoutDriversInput = {
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    trucks?: truckCreateNestedManyWithoutVendorInput;
  };

  export type vendorsUncheckedCreateWithoutDriversInput = {
    id?: number;
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    trucks?: truckUncheckedCreateNestedManyWithoutVendorInput;
  };

  export type vendorsCreateOrConnectWithoutDriversInput = {
    where: vendorsWhereUniqueInput;
    create: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>;
  };

  export type truckCreateWithoutDriverInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    vendor?: vendorsCreateNestedOneWithoutTrucksInput;
    devices?: deviceCreateNestedManyWithoutTruckInput;
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput;
  };

  export type truckUncheckedCreateWithoutDriverInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    vendor_id?: number | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    devices?: deviceUncheckedCreateNestedManyWithoutTruckInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput;
  };

  export type truckCreateOrConnectWithoutDriverInput = {
    where: truckWhereUniqueInput;
    create: XOR<truckCreateWithoutDriverInput, truckUncheckedCreateWithoutDriverInput>;
  };

  export type truckCreateManyDriverInputEnvelope = {
    data: truckCreateManyDriverInput | truckCreateManyDriverInput[];
    skipDuplicates?: boolean;
  };

  export type vendorsUpsertWithoutDriversInput = {
    update: XOR<vendorsUpdateWithoutDriversInput, vendorsUncheckedUpdateWithoutDriversInput>;
    create: XOR<vendorsCreateWithoutDriversInput, vendorsUncheckedCreateWithoutDriversInput>;
    where?: vendorsWhereInput;
  };

  export type vendorsUpdateToOneWithWhereWithoutDriversInput = {
    where?: vendorsWhereInput;
    data: XOR<vendorsUpdateWithoutDriversInput, vendorsUncheckedUpdateWithoutDriversInput>;
  };

  export type vendorsUpdateWithoutDriversInput = {
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    trucks?: truckUpdateManyWithoutVendorNestedInput;
  };

  export type vendorsUncheckedUpdateWithoutDriversInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    trucks?: truckUncheckedUpdateManyWithoutVendorNestedInput;
  };

  export type truckUpsertWithWhereUniqueWithoutDriverInput = {
    where: truckWhereUniqueInput;
    update: XOR<truckUpdateWithoutDriverInput, truckUncheckedUpdateWithoutDriverInput>;
    create: XOR<truckCreateWithoutDriverInput, truckUncheckedCreateWithoutDriverInput>;
  };

  export type truckUpdateWithWhereUniqueWithoutDriverInput = {
    where: truckWhereUniqueInput;
    data: XOR<truckUpdateWithoutDriverInput, truckUncheckedUpdateWithoutDriverInput>;
  };

  export type truckUpdateManyWithWhereWithoutDriverInput = {
    where: truckScalarWhereInput;
    data: XOR<truckUpdateManyMutationInput, truckUncheckedUpdateManyWithoutDriverInput>;
  };

  export type vendorsCreateWithoutTrucksInput = {
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    drivers?: driversCreateNestedManyWithoutVendorInput;
  };

  export type vendorsUncheckedCreateWithoutTrucksInput = {
    id?: number;
    name_vendor: string;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
    contact_person?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    drivers?: driversUncheckedCreateNestedManyWithoutVendorInput;
  };

  export type vendorsCreateOrConnectWithoutTrucksInput = {
    where: vendorsWhereUniqueInput;
    create: XOR<vendorsCreateWithoutTrucksInput, vendorsUncheckedCreateWithoutTrucksInput>;
  };

  export type driversCreateWithoutTrucksInput = {
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    vendor?: vendorsCreateNestedOneWithoutDriversInput;
  };

  export type driversUncheckedCreateWithoutTrucksInput = {
    id?: number;
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    vendor_id?: number | null;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type driversCreateOrConnectWithoutTrucksInput = {
    where: driversWhereUniqueInput;
    create: XOR<driversCreateWithoutTrucksInput, driversUncheckedCreateWithoutTrucksInput>;
  };

  export type deviceCreateWithoutTruckInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    sensors?: sensorCreateNestedManyWithoutDeviceInput;
    locations?: locationCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUncheckedCreateWithoutTruckInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    sensors?: sensorUncheckedCreateNestedManyWithoutDeviceInput;
    locations?: locationUncheckedCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyUncheckedCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput;
  };

  export type deviceCreateOrConnectWithoutTruckInput = {
    where: deviceWhereUniqueInput;
    create: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>;
  };

  export type deviceCreateManyTruckInputEnvelope = {
    data: deviceCreateManyTruckInput | deviceCreateManyTruckInput[];
    skipDuplicates?: boolean;
  };

  export type alert_eventsCreateWithoutTruckInput = {
    id?: string;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
    alert: alertCreateNestedOneWithoutAlert_eventsInput;
    device?: deviceCreateNestedOneWithoutAlert_eventsInput;
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput;
  };

  export type alert_eventsUncheckedCreateWithoutTruckInput = {
    id?: string;
    alert_id: string;
    device_id?: string | null;
    sensor_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsCreateOrConnectWithoutTruckInput = {
    where: alert_eventsWhereUniqueInput;
    create: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>;
  };

  export type alert_eventsCreateManyTruckInputEnvelope = {
    data: alert_eventsCreateManyTruckInput | alert_eventsCreateManyTruckInput[];
    skipDuplicates?: boolean;
  };

  export type vendorsUpsertWithoutTrucksInput = {
    update: XOR<vendorsUpdateWithoutTrucksInput, vendorsUncheckedUpdateWithoutTrucksInput>;
    create: XOR<vendorsCreateWithoutTrucksInput, vendorsUncheckedCreateWithoutTrucksInput>;
    where?: vendorsWhereInput;
  };

  export type vendorsUpdateToOneWithWhereWithoutTrucksInput = {
    where?: vendorsWhereInput;
    data: XOR<vendorsUpdateWithoutTrucksInput, vendorsUncheckedUpdateWithoutTrucksInput>;
  };

  export type vendorsUpdateWithoutTrucksInput = {
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    drivers?: driversUpdateManyWithoutVendorNestedInput;
  };

  export type vendorsUncheckedUpdateWithoutTrucksInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name_vendor?: StringFieldUpdateOperationsInput | string;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    telephone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    contact_person?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    drivers?: driversUncheckedUpdateManyWithoutVendorNestedInput;
  };

  export type driversUpsertWithoutTrucksInput = {
    update: XOR<driversUpdateWithoutTrucksInput, driversUncheckedUpdateWithoutTrucksInput>;
    create: XOR<driversCreateWithoutTrucksInput, driversUncheckedCreateWithoutTrucksInput>;
    where?: driversWhereInput;
  };

  export type driversUpdateToOneWithWhereWithoutTrucksInput = {
    where?: driversWhereInput;
    data: XOR<driversUpdateWithoutTrucksInput, driversUncheckedUpdateWithoutTrucksInput>;
  };

  export type driversUpdateWithoutTrucksInput = {
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    vendor?: vendorsUpdateOneWithoutDriversNestedInput;
  };

  export type driversUncheckedUpdateWithoutTrucksInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type deviceUpsertWithWhereUniqueWithoutTruckInput = {
    where: deviceWhereUniqueInput;
    update: XOR<deviceUpdateWithoutTruckInput, deviceUncheckedUpdateWithoutTruckInput>;
    create: XOR<deviceCreateWithoutTruckInput, deviceUncheckedCreateWithoutTruckInput>;
  };

  export type deviceUpdateWithWhereUniqueWithoutTruckInput = {
    where: deviceWhereUniqueInput;
    data: XOR<deviceUpdateWithoutTruckInput, deviceUncheckedUpdateWithoutTruckInput>;
  };

  export type deviceUpdateManyWithWhereWithoutTruckInput = {
    where: deviceScalarWhereInput;
    data: XOR<deviceUpdateManyMutationInput, deviceUncheckedUpdateManyWithoutTruckInput>;
  };

  export type deviceScalarWhereInput = {
    AND?: deviceScalarWhereInput | deviceScalarWhereInput[];
    OR?: deviceScalarWhereInput[];
    NOT?: deviceScalarWhereInput | deviceScalarWhereInput[];
    id?: UuidFilter<'device'> | string;
    truck_id?: UuidFilter<'device'> | string;
    sn?: StringFilter<'device'> | string;
    bat1?: IntNullableFilter<'device'> | number | null;
    bat2?: IntNullableFilter<'device'> | number | null;
    bat3?: IntNullableFilter<'device'> | number | null;
    lock?: IntFilter<'device'> | number;
    sim_number?: StringNullableFilter<'device'> | string | null;
    installed_at?: DateTimeFilter<'device'> | Date | string;
    status?: StringFilter<'device'> | string;
    created_at?: DateTimeFilter<'device'> | Date | string;
    updated_at?: DateTimeFilter<'device'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'device'> | Date | string | null;
  };

  export type alert_eventsUpsertWithWhereUniqueWithoutTruckInput = {
    where: alert_eventsWhereUniqueInput;
    update: XOR<alert_eventsUpdateWithoutTruckInput, alert_eventsUncheckedUpdateWithoutTruckInput>;
    create: XOR<alert_eventsCreateWithoutTruckInput, alert_eventsUncheckedCreateWithoutTruckInput>;
  };

  export type alert_eventsUpdateWithWhereUniqueWithoutTruckInput = {
    where: alert_eventsWhereUniqueInput;
    data: XOR<alert_eventsUpdateWithoutTruckInput, alert_eventsUncheckedUpdateWithoutTruckInput>;
  };

  export type alert_eventsUpdateManyWithWhereWithoutTruckInput = {
    where: alert_eventsScalarWhereInput;
    data: XOR<
      alert_eventsUpdateManyMutationInput,
      alert_eventsUncheckedUpdateManyWithoutTruckInput
    >;
  };

  export type alert_eventsScalarWhereInput = {
    AND?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
    OR?: alert_eventsScalarWhereInput[];
    NOT?: alert_eventsScalarWhereInput | alert_eventsScalarWhereInput[];
    id?: UuidFilter<'alert_events'> | string;
    alert_id?: UuidFilter<'alert_events'> | string;
    device_id?: UuidNullableFilter<'alert_events'> | string | null;
    sensor_id?: UuidNullableFilter<'alert_events'> | string | null;
    truck_id?: UuidNullableFilter<'alert_events'> | string | null;
    value?: FloatNullableFilter<'alert_events'> | number | null;
    message?: StringNullableFilter<'alert_events'> | string | null;
    status?: StringFilter<'alert_events'> | string;
    created_at?: DateTimeFilter<'alert_events'> | Date | string;
    resolved_at?: DateTimeNullableFilter<'alert_events'> | Date | string | null;
  };

  export type truckCreateWithoutDevicesInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    vendor?: vendorsCreateNestedOneWithoutTrucksInput;
    driver?: driversCreateNestedOneWithoutTrucksInput;
    alert_events?: alert_eventsCreateNestedManyWithoutTruckInput;
  };

  export type truckUncheckedCreateWithoutDevicesInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    vendor_id?: number | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    driver_id?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutTruckInput;
  };

  export type truckCreateOrConnectWithoutDevicesInput = {
    where: truckWhereUniqueInput;
    create: XOR<truckCreateWithoutDevicesInput, truckUncheckedCreateWithoutDevicesInput>;
  };

  export type sensorCreateWithoutDeviceInput = {
    id?: string;
    sn: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    alert_events?: alert_eventsCreateNestedManyWithoutSensorInput;
  };

  export type sensorUncheckedCreateWithoutDeviceInput = {
    id?: string;
    sn: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutSensorInput;
  };

  export type sensorCreateOrConnectWithoutDeviceInput = {
    where: sensorWhereUniqueInput;
    create: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>;
  };

  export type sensorCreateManyDeviceInputEnvelope = {
    data: sensorCreateManyDeviceInput | sensorCreateManyDeviceInput[];
    skipDuplicates?: boolean;
  };

  export type locationCreateWithoutDeviceInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
    location_history?: location_historyCreateNestedManyWithoutLocationInput;
  };

  export type locationUncheckedCreateWithoutDeviceInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
    location_history?: location_historyUncheckedCreateNestedManyWithoutLocationInput;
  };

  export type locationCreateOrConnectWithoutDeviceInput = {
    where: locationWhereUniqueInput;
    create: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>;
  };

  export type locationCreateManyDeviceInputEnvelope = {
    data: locationCreateManyDeviceInput | locationCreateManyDeviceInput[];
    skipDuplicates?: boolean;
  };

  export type location_historyCreateWithoutDeviceInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    location: locationCreateNestedOneWithoutLocation_historyInput;
  };

  export type location_historyUncheckedCreateWithoutDeviceInput = {
    id?: string;
    location_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
  };

  export type location_historyCreateOrConnectWithoutDeviceInput = {
    where: location_historyWhereUniqueInput;
    create: XOR<
      location_historyCreateWithoutDeviceInput,
      location_historyUncheckedCreateWithoutDeviceInput
    >;
  };

  export type location_historyCreateManyDeviceInputEnvelope = {
    data: location_historyCreateManyDeviceInput | location_historyCreateManyDeviceInput[];
    skipDuplicates?: boolean;
  };

  export type alert_eventsCreateWithoutDeviceInput = {
    id?: string;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
    alert: alertCreateNestedOneWithoutAlert_eventsInput;
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput;
    truck?: truckCreateNestedOneWithoutAlert_eventsInput;
  };

  export type alert_eventsUncheckedCreateWithoutDeviceInput = {
    id?: string;
    alert_id: string;
    sensor_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsCreateOrConnectWithoutDeviceInput = {
    where: alert_eventsWhereUniqueInput;
    create: XOR<
      alert_eventsCreateWithoutDeviceInput,
      alert_eventsUncheckedCreateWithoutDeviceInput
    >;
  };

  export type alert_eventsCreateManyDeviceInputEnvelope = {
    data: alert_eventsCreateManyDeviceInput | alert_eventsCreateManyDeviceInput[];
    skipDuplicates?: boolean;
  };

  export type truckUpsertWithoutDevicesInput = {
    update: XOR<truckUpdateWithoutDevicesInput, truckUncheckedUpdateWithoutDevicesInput>;
    create: XOR<truckCreateWithoutDevicesInput, truckUncheckedCreateWithoutDevicesInput>;
    where?: truckWhereInput;
  };

  export type truckUpdateToOneWithWhereWithoutDevicesInput = {
    where?: truckWhereInput;
    data: XOR<truckUpdateWithoutDevicesInput, truckUncheckedUpdateWithoutDevicesInput>;
  };

  export type truckUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor?: vendorsUpdateOneWithoutTrucksNestedInput;
    driver?: driversUpdateOneWithoutTrucksNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput;
  };

  export type sensorUpsertWithWhereUniqueWithoutDeviceInput = {
    where: sensorWhereUniqueInput;
    update: XOR<sensorUpdateWithoutDeviceInput, sensorUncheckedUpdateWithoutDeviceInput>;
    create: XOR<sensorCreateWithoutDeviceInput, sensorUncheckedCreateWithoutDeviceInput>;
  };

  export type sensorUpdateWithWhereUniqueWithoutDeviceInput = {
    where: sensorWhereUniqueInput;
    data: XOR<sensorUpdateWithoutDeviceInput, sensorUncheckedUpdateWithoutDeviceInput>;
  };

  export type sensorUpdateManyWithWhereWithoutDeviceInput = {
    where: sensorScalarWhereInput;
    data: XOR<sensorUpdateManyMutationInput, sensorUncheckedUpdateManyWithoutDeviceInput>;
  };

  export type sensorScalarWhereInput = {
    AND?: sensorScalarWhereInput | sensorScalarWhereInput[];
    OR?: sensorScalarWhereInput[];
    NOT?: sensorScalarWhereInput | sensorScalarWhereInput[];
    id?: UuidFilter<'sensor'> | string;
    sn?: StringFilter<'sensor'> | string;
    device_id?: UuidFilter<'sensor'> | string;
    tireNo?: IntFilter<'sensor'> | number;
    simNumber?: StringNullableFilter<'sensor'> | string | null;
    sensorNo?: IntNullableFilter<'sensor'> | number | null;
    sensor_lock?: IntFilter<'sensor'> | number;
    status?: StringFilter<'sensor'> | string;
    tempValue?: FloatNullableFilter<'sensor'> | number | null;
    tirepValue?: FloatNullableFilter<'sensor'> | number | null;
    exType?: StringNullableFilter<'sensor'> | string | null;
    bat?: IntNullableFilter<'sensor'> | number | null;
    created_at?: DateTimeFilter<'sensor'> | Date | string;
    updated_at?: DateTimeFilter<'sensor'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'sensor'> | Date | string | null;
  };

  export type locationUpsertWithWhereUniqueWithoutDeviceInput = {
    where: locationWhereUniqueInput;
    update: XOR<locationUpdateWithoutDeviceInput, locationUncheckedUpdateWithoutDeviceInput>;
    create: XOR<locationCreateWithoutDeviceInput, locationUncheckedCreateWithoutDeviceInput>;
  };

  export type locationUpdateWithWhereUniqueWithoutDeviceInput = {
    where: locationWhereUniqueInput;
    data: XOR<locationUpdateWithoutDeviceInput, locationUncheckedUpdateWithoutDeviceInput>;
  };

  export type locationUpdateManyWithWhereWithoutDeviceInput = {
    where: locationScalarWhereInput;
    data: XOR<locationUpdateManyMutationInput, locationUncheckedUpdateManyWithoutDeviceInput>;
  };

  export type locationScalarWhereInput = {
    AND?: locationScalarWhereInput | locationScalarWhereInput[];
    OR?: locationScalarWhereInput[];
    NOT?: locationScalarWhereInput | locationScalarWhereInput[];
    id?: UuidFilter<'location'> | string;
    device_id?: UuidFilter<'location'> | string;
    lat?: FloatFilter<'location'> | number;
    long?: FloatFilter<'location'> | number;
    recorded_at?: DateTimeFilter<'location'> | Date | string;
    created_at?: DateTimeFilter<'location'> | Date | string;
  };

  export type location_historyUpsertWithWhereUniqueWithoutDeviceInput = {
    where: location_historyWhereUniqueInput;
    update: XOR<
      location_historyUpdateWithoutDeviceInput,
      location_historyUncheckedUpdateWithoutDeviceInput
    >;
    create: XOR<
      location_historyCreateWithoutDeviceInput,
      location_historyUncheckedCreateWithoutDeviceInput
    >;
  };

  export type location_historyUpdateWithWhereUniqueWithoutDeviceInput = {
    where: location_historyWhereUniqueInput;
    data: XOR<
      location_historyUpdateWithoutDeviceInput,
      location_historyUncheckedUpdateWithoutDeviceInput
    >;
  };

  export type location_historyUpdateManyWithWhereWithoutDeviceInput = {
    where: location_historyScalarWhereInput;
    data: XOR<
      location_historyUpdateManyMutationInput,
      location_historyUncheckedUpdateManyWithoutDeviceInput
    >;
  };

  export type location_historyScalarWhereInput = {
    AND?: location_historyScalarWhereInput | location_historyScalarWhereInput[];
    OR?: location_historyScalarWhereInput[];
    NOT?: location_historyScalarWhereInput | location_historyScalarWhereInput[];
    id?: UuidFilter<'location_history'> | string;
    location_id?: UuidFilter<'location_history'> | string;
    device_id?: UuidFilter<'location_history'> | string;
    lat?: FloatFilter<'location_history'> | number;
    long?: FloatFilter<'location_history'> | number;
    recorded_at?: DateTimeFilter<'location_history'> | Date | string;
  };

  export type alert_eventsUpsertWithWhereUniqueWithoutDeviceInput = {
    where: alert_eventsWhereUniqueInput;
    update: XOR<
      alert_eventsUpdateWithoutDeviceInput,
      alert_eventsUncheckedUpdateWithoutDeviceInput
    >;
    create: XOR<
      alert_eventsCreateWithoutDeviceInput,
      alert_eventsUncheckedCreateWithoutDeviceInput
    >;
  };

  export type alert_eventsUpdateWithWhereUniqueWithoutDeviceInput = {
    where: alert_eventsWhereUniqueInput;
    data: XOR<alert_eventsUpdateWithoutDeviceInput, alert_eventsUncheckedUpdateWithoutDeviceInput>;
  };

  export type alert_eventsUpdateManyWithWhereWithoutDeviceInput = {
    where: alert_eventsScalarWhereInput;
    data: XOR<
      alert_eventsUpdateManyMutationInput,
      alert_eventsUncheckedUpdateManyWithoutDeviceInput
    >;
  };

  export type deviceCreateWithoutSensorsInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    truck: truckCreateNestedOneWithoutDevicesInput;
    locations?: locationCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUncheckedCreateWithoutSensorsInput = {
    id?: string;
    truck_id: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    locations?: locationUncheckedCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyUncheckedCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput;
  };

  export type deviceCreateOrConnectWithoutSensorsInput = {
    where: deviceWhereUniqueInput;
    create: XOR<deviceCreateWithoutSensorsInput, deviceUncheckedCreateWithoutSensorsInput>;
  };

  export type alert_eventsCreateWithoutSensorInput = {
    id?: string;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
    alert: alertCreateNestedOneWithoutAlert_eventsInput;
    device?: deviceCreateNestedOneWithoutAlert_eventsInput;
    truck?: truckCreateNestedOneWithoutAlert_eventsInput;
  };

  export type alert_eventsUncheckedCreateWithoutSensorInput = {
    id?: string;
    alert_id: string;
    device_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsCreateOrConnectWithoutSensorInput = {
    where: alert_eventsWhereUniqueInput;
    create: XOR<
      alert_eventsCreateWithoutSensorInput,
      alert_eventsUncheckedCreateWithoutSensorInput
    >;
  };

  export type alert_eventsCreateManySensorInputEnvelope = {
    data: alert_eventsCreateManySensorInput | alert_eventsCreateManySensorInput[];
    skipDuplicates?: boolean;
  };

  export type deviceUpsertWithoutSensorsInput = {
    update: XOR<deviceUpdateWithoutSensorsInput, deviceUncheckedUpdateWithoutSensorsInput>;
    create: XOR<deviceCreateWithoutSensorsInput, deviceUncheckedCreateWithoutSensorsInput>;
    where?: deviceWhereInput;
  };

  export type deviceUpdateToOneWithWhereWithoutSensorsInput = {
    where?: deviceWhereInput;
    data: XOR<deviceUpdateWithoutSensorsInput, deviceUncheckedUpdateWithoutSensorsInput>;
  };

  export type deviceUpdateWithoutSensorsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    truck?: truckUpdateOneRequiredWithoutDevicesNestedInput;
    locations?: locationUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateWithoutSensorsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    truck_id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    locations?: locationUncheckedUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUncheckedUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput;
  };

  export type alert_eventsUpsertWithWhereUniqueWithoutSensorInput = {
    where: alert_eventsWhereUniqueInput;
    update: XOR<
      alert_eventsUpdateWithoutSensorInput,
      alert_eventsUncheckedUpdateWithoutSensorInput
    >;
    create: XOR<
      alert_eventsCreateWithoutSensorInput,
      alert_eventsUncheckedCreateWithoutSensorInput
    >;
  };

  export type alert_eventsUpdateWithWhereUniqueWithoutSensorInput = {
    where: alert_eventsWhereUniqueInput;
    data: XOR<alert_eventsUpdateWithoutSensorInput, alert_eventsUncheckedUpdateWithoutSensorInput>;
  };

  export type alert_eventsUpdateManyWithWhereWithoutSensorInput = {
    where: alert_eventsScalarWhereInput;
    data: XOR<
      alert_eventsUpdateManyMutationInput,
      alert_eventsUncheckedUpdateManyWithoutSensorInput
    >;
  };

  export type deviceCreateWithoutLocationsInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    truck: truckCreateNestedOneWithoutDevicesInput;
    sensors?: sensorCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUncheckedCreateWithoutLocationsInput = {
    id?: string;
    truck_id: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    sensors?: sensorUncheckedCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyUncheckedCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput;
  };

  export type deviceCreateOrConnectWithoutLocationsInput = {
    where: deviceWhereUniqueInput;
    create: XOR<deviceCreateWithoutLocationsInput, deviceUncheckedCreateWithoutLocationsInput>;
  };

  export type location_historyCreateWithoutLocationInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    device: deviceCreateNestedOneWithoutLocation_historyInput;
  };

  export type location_historyUncheckedCreateWithoutLocationInput = {
    id?: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
  };

  export type location_historyCreateOrConnectWithoutLocationInput = {
    where: location_historyWhereUniqueInput;
    create: XOR<
      location_historyCreateWithoutLocationInput,
      location_historyUncheckedCreateWithoutLocationInput
    >;
  };

  export type location_historyCreateManyLocationInputEnvelope = {
    data: location_historyCreateManyLocationInput | location_historyCreateManyLocationInput[];
    skipDuplicates?: boolean;
  };

  export type deviceUpsertWithoutLocationsInput = {
    update: XOR<deviceUpdateWithoutLocationsInput, deviceUncheckedUpdateWithoutLocationsInput>;
    create: XOR<deviceCreateWithoutLocationsInput, deviceUncheckedCreateWithoutLocationsInput>;
    where?: deviceWhereInput;
  };

  export type deviceUpdateToOneWithWhereWithoutLocationsInput = {
    where?: deviceWhereInput;
    data: XOR<deviceUpdateWithoutLocationsInput, deviceUncheckedUpdateWithoutLocationsInput>;
  };

  export type deviceUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    truck?: truckUpdateOneRequiredWithoutDevicesNestedInput;
    sensors?: sensorUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    truck_id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sensors?: sensorUncheckedUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUncheckedUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput;
  };

  export type location_historyUpsertWithWhereUniqueWithoutLocationInput = {
    where: location_historyWhereUniqueInput;
    update: XOR<
      location_historyUpdateWithoutLocationInput,
      location_historyUncheckedUpdateWithoutLocationInput
    >;
    create: XOR<
      location_historyCreateWithoutLocationInput,
      location_historyUncheckedCreateWithoutLocationInput
    >;
  };

  export type location_historyUpdateWithWhereUniqueWithoutLocationInput = {
    where: location_historyWhereUniqueInput;
    data: XOR<
      location_historyUpdateWithoutLocationInput,
      location_historyUncheckedUpdateWithoutLocationInput
    >;
  };

  export type location_historyUpdateManyWithWhereWithoutLocationInput = {
    where: location_historyScalarWhereInput;
    data: XOR<
      location_historyUpdateManyMutationInput,
      location_historyUncheckedUpdateManyWithoutLocationInput
    >;
  };

  export type locationCreateWithoutLocation_historyInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
    device: deviceCreateNestedOneWithoutLocationsInput;
  };

  export type locationUncheckedCreateWithoutLocation_historyInput = {
    id?: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
  };

  export type locationCreateOrConnectWithoutLocation_historyInput = {
    where: locationWhereUniqueInput;
    create: XOR<
      locationCreateWithoutLocation_historyInput,
      locationUncheckedCreateWithoutLocation_historyInput
    >;
  };

  export type deviceCreateWithoutLocation_historyInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    truck: truckCreateNestedOneWithoutDevicesInput;
    sensors?: sensorCreateNestedManyWithoutDeviceInput;
    locations?: locationCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUncheckedCreateWithoutLocation_historyInput = {
    id?: string;
    truck_id: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    sensors?: sensorUncheckedCreateNestedManyWithoutDeviceInput;
    locations?: locationUncheckedCreateNestedManyWithoutDeviceInput;
    alert_events?: alert_eventsUncheckedCreateNestedManyWithoutDeviceInput;
  };

  export type deviceCreateOrConnectWithoutLocation_historyInput = {
    where: deviceWhereUniqueInput;
    create: XOR<
      deviceCreateWithoutLocation_historyInput,
      deviceUncheckedCreateWithoutLocation_historyInput
    >;
  };

  export type locationUpsertWithoutLocation_historyInput = {
    update: XOR<
      locationUpdateWithoutLocation_historyInput,
      locationUncheckedUpdateWithoutLocation_historyInput
    >;
    create: XOR<
      locationCreateWithoutLocation_historyInput,
      locationUncheckedCreateWithoutLocation_historyInput
    >;
    where?: locationWhereInput;
  };

  export type locationUpdateToOneWithWhereWithoutLocation_historyInput = {
    where?: locationWhereInput;
    data: XOR<
      locationUpdateWithoutLocation_historyInput,
      locationUncheckedUpdateWithoutLocation_historyInput
    >;
  };

  export type locationUpdateWithoutLocation_historyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    device?: deviceUpdateOneRequiredWithoutLocationsNestedInput;
  };

  export type locationUncheckedUpdateWithoutLocation_historyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type deviceUpsertWithoutLocation_historyInput = {
    update: XOR<
      deviceUpdateWithoutLocation_historyInput,
      deviceUncheckedUpdateWithoutLocation_historyInput
    >;
    create: XOR<
      deviceCreateWithoutLocation_historyInput,
      deviceUncheckedCreateWithoutLocation_historyInput
    >;
    where?: deviceWhereInput;
  };

  export type deviceUpdateToOneWithWhereWithoutLocation_historyInput = {
    where?: deviceWhereInput;
    data: XOR<
      deviceUpdateWithoutLocation_historyInput,
      deviceUncheckedUpdateWithoutLocation_historyInput
    >;
  };

  export type deviceUpdateWithoutLocation_historyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    truck?: truckUpdateOneRequiredWithoutDevicesNestedInput;
    sensors?: sensorUpdateManyWithoutDeviceNestedInput;
    locations?: locationUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateWithoutLocation_historyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    truck_id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sensors?: sensorUncheckedUpdateManyWithoutDeviceNestedInput;
    locations?: locationUncheckedUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput;
  };

  export type alert_eventsCreateWithoutAlertInput = {
    id?: string;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
    device?: deviceCreateNestedOneWithoutAlert_eventsInput;
    sensor?: sensorCreateNestedOneWithoutAlert_eventsInput;
    truck?: truckCreateNestedOneWithoutAlert_eventsInput;
  };

  export type alert_eventsUncheckedCreateWithoutAlertInput = {
    id?: string;
    device_id?: string | null;
    sensor_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsCreateOrConnectWithoutAlertInput = {
    where: alert_eventsWhereUniqueInput;
    create: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>;
  };

  export type alert_eventsCreateManyAlertInputEnvelope = {
    data: alert_eventsCreateManyAlertInput | alert_eventsCreateManyAlertInput[];
    skipDuplicates?: boolean;
  };

  export type alert_eventsUpsertWithWhereUniqueWithoutAlertInput = {
    where: alert_eventsWhereUniqueInput;
    update: XOR<alert_eventsUpdateWithoutAlertInput, alert_eventsUncheckedUpdateWithoutAlertInput>;
    create: XOR<alert_eventsCreateWithoutAlertInput, alert_eventsUncheckedCreateWithoutAlertInput>;
  };

  export type alert_eventsUpdateWithWhereUniqueWithoutAlertInput = {
    where: alert_eventsWhereUniqueInput;
    data: XOR<alert_eventsUpdateWithoutAlertInput, alert_eventsUncheckedUpdateWithoutAlertInput>;
  };

  export type alert_eventsUpdateManyWithWhereWithoutAlertInput = {
    where: alert_eventsScalarWhereInput;
    data: XOR<
      alert_eventsUpdateManyMutationInput,
      alert_eventsUncheckedUpdateManyWithoutAlertInput
    >;
  };

  export type alertCreateWithoutAlert_eventsInput = {
    id?: string;
    code: string;
    name: string;
    description?: string | null;
    severity?: string;
    threshold_min?: number | null;
    threshold_max?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type alertUncheckedCreateWithoutAlert_eventsInput = {
    id?: string;
    code: string;
    name: string;
    description?: string | null;
    severity?: string;
    threshold_min?: number | null;
    threshold_max?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type alertCreateOrConnectWithoutAlert_eventsInput = {
    where: alertWhereUniqueInput;
    create: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>;
  };

  export type deviceCreateWithoutAlert_eventsInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    truck: truckCreateNestedOneWithoutDevicesInput;
    sensors?: sensorCreateNestedManyWithoutDeviceInput;
    locations?: locationCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyCreateNestedManyWithoutDeviceInput;
  };

  export type deviceUncheckedCreateWithoutAlert_eventsInput = {
    id?: string;
    truck_id: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    sensors?: sensorUncheckedCreateNestedManyWithoutDeviceInput;
    locations?: locationUncheckedCreateNestedManyWithoutDeviceInput;
    location_history?: location_historyUncheckedCreateNestedManyWithoutDeviceInput;
  };

  export type deviceCreateOrConnectWithoutAlert_eventsInput = {
    where: deviceWhereUniqueInput;
    create: XOR<
      deviceCreateWithoutAlert_eventsInput,
      deviceUncheckedCreateWithoutAlert_eventsInput
    >;
  };

  export type sensorCreateWithoutAlert_eventsInput = {
    id?: string;
    sn: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    device: deviceCreateNestedOneWithoutSensorsInput;
  };

  export type sensorUncheckedCreateWithoutAlert_eventsInput = {
    id?: string;
    sn: string;
    device_id: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type sensorCreateOrConnectWithoutAlert_eventsInput = {
    where: sensorWhereUniqueInput;
    create: XOR<
      sensorCreateWithoutAlert_eventsInput,
      sensorUncheckedCreateWithoutAlert_eventsInput
    >;
  };

  export type truckCreateWithoutAlert_eventsInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    vendor?: vendorsCreateNestedOneWithoutTrucksInput;
    driver?: driversCreateNestedOneWithoutTrucksInput;
    devices?: deviceCreateNestedManyWithoutTruckInput;
  };

  export type truckUncheckedCreateWithoutAlert_eventsInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    vendor_id?: number | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    driver_id?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
    devices?: deviceUncheckedCreateNestedManyWithoutTruckInput;
  };

  export type truckCreateOrConnectWithoutAlert_eventsInput = {
    where: truckWhereUniqueInput;
    create: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>;
  };

  export type alertUpsertWithoutAlert_eventsInput = {
    update: XOR<alertUpdateWithoutAlert_eventsInput, alertUncheckedUpdateWithoutAlert_eventsInput>;
    create: XOR<alertCreateWithoutAlert_eventsInput, alertUncheckedCreateWithoutAlert_eventsInput>;
    where?: alertWhereInput;
  };

  export type alertUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: alertWhereInput;
    data: XOR<alertUpdateWithoutAlert_eventsInput, alertUncheckedUpdateWithoutAlert_eventsInput>;
  };

  export type alertUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    code?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    severity?: StringFieldUpdateOperationsInput | string;
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null;
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alertUncheckedUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    code?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    severity?: StringFieldUpdateOperationsInput | string;
    threshold_min?: NullableFloatFieldUpdateOperationsInput | number | null;
    threshold_max?: NullableFloatFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type deviceUpsertWithoutAlert_eventsInput = {
    update: XOR<
      deviceUpdateWithoutAlert_eventsInput,
      deviceUncheckedUpdateWithoutAlert_eventsInput
    >;
    create: XOR<
      deviceCreateWithoutAlert_eventsInput,
      deviceUncheckedCreateWithoutAlert_eventsInput
    >;
    where?: deviceWhereInput;
  };

  export type deviceUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: deviceWhereInput;
    data: XOR<deviceUpdateWithoutAlert_eventsInput, deviceUncheckedUpdateWithoutAlert_eventsInput>;
  };

  export type deviceUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    truck?: truckUpdateOneRequiredWithoutDevicesNestedInput;
    sensors?: sensorUpdateManyWithoutDeviceNestedInput;
    locations?: locationUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    truck_id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sensors?: sensorUncheckedUpdateManyWithoutDeviceNestedInput;
    locations?: locationUncheckedUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUncheckedUpdateManyWithoutDeviceNestedInput;
  };

  export type sensorUpsertWithoutAlert_eventsInput = {
    update: XOR<
      sensorUpdateWithoutAlert_eventsInput,
      sensorUncheckedUpdateWithoutAlert_eventsInput
    >;
    create: XOR<
      sensorCreateWithoutAlert_eventsInput,
      sensorUncheckedCreateWithoutAlert_eventsInput
    >;
    where?: sensorWhereInput;
  };

  export type sensorUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: sensorWhereInput;
    data: XOR<sensorUpdateWithoutAlert_eventsInput, sensorUncheckedUpdateWithoutAlert_eventsInput>;
  };

  export type sensorUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    device?: deviceUpdateOneRequiredWithoutSensorsNestedInput;
  };

  export type sensorUncheckedUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type truckUpsertWithoutAlert_eventsInput = {
    update: XOR<truckUpdateWithoutAlert_eventsInput, truckUncheckedUpdateWithoutAlert_eventsInput>;
    create: XOR<truckCreateWithoutAlert_eventsInput, truckUncheckedCreateWithoutAlert_eventsInput>;
    where?: truckWhereInput;
  };

  export type truckUpdateToOneWithWhereWithoutAlert_eventsInput = {
    where?: truckWhereInput;
    data: XOR<truckUpdateWithoutAlert_eventsInput, truckUncheckedUpdateWithoutAlert_eventsInput>;
  };

  export type truckUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor?: vendorsUpdateOneWithoutTrucksNestedInput;
    driver?: driversUpdateOneWithoutTrucksNestedInput;
    devices?: deviceUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateWithoutAlert_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    devices?: deviceUncheckedUpdateManyWithoutTruckNestedInput;
  };

  export type driversCreateManyVendorInput = {
    id?: number;
    name: string;
    phone?: string | null;
    email?: string | null;
    license_number: string;
    license_type: string;
    license_expiry: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type truckCreateManyVendorInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    driver_id?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
  };

  export type driversUpdateWithoutVendorInput = {
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    trucks?: truckUpdateManyWithoutDriverNestedInput;
  };

  export type driversUncheckedUpdateWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    trucks?: truckUncheckedUpdateManyWithoutDriverNestedInput;
  };

  export type driversUncheckedUpdateManyWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    license_number?: StringFieldUpdateOperationsInput | string;
    license_type?: StringFieldUpdateOperationsInput | string;
    license_expiry?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type truckUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    driver?: driversUpdateOneWithoutTrucksNestedInput;
    devices?: deviceUpdateManyWithoutTruckNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    devices?: deviceUncheckedUpdateManyWithoutTruckNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateManyWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    driver_id?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type truckCreateManyDriverInput = {
    id?: string;
    name: string;
    image?: string | null;
    year?: number | null;
    model?: string | null;
    type?: string | null;
    vendor_id?: number | null;
    status?: string;
    vin?: string | null;
    plate?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    created_by?: string | null;
    updated_by?: string | null;
  };

  export type truckUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor?: vendorsUpdateOneWithoutTrucksNestedInput;
    devices?: deviceUpdateManyWithoutTruckNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
    devices?: deviceUncheckedUpdateManyWithoutTruckNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutTruckNestedInput;
  };

  export type truckUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    year?: NullableIntFieldUpdateOperationsInput | number | null;
    model?: NullableStringFieldUpdateOperationsInput | string | null;
    type?: NullableStringFieldUpdateOperationsInput | string | null;
    vendor_id?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: StringFieldUpdateOperationsInput | string;
    vin?: NullableStringFieldUpdateOperationsInput | string | null;
    plate?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_by?: NullableStringFieldUpdateOperationsInput | string | null;
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type deviceCreateManyTruckInput = {
    id?: string;
    sn: string;
    bat1?: number | null;
    bat2?: number | null;
    bat3?: number | null;
    lock?: number;
    sim_number?: string | null;
    installed_at?: Date | string;
    status?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type alert_eventsCreateManyTruckInput = {
    id?: string;
    alert_id: string;
    device_id?: string | null;
    sensor_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type deviceUpdateWithoutTruckInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sensors?: sensorUpdateManyWithoutDeviceNestedInput;
    locations?: locationUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateWithoutTruckInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sensors?: sensorUncheckedUpdateManyWithoutDeviceNestedInput;
    locations?: locationUncheckedUpdateManyWithoutDeviceNestedInput;
    location_history?: location_historyUncheckedUpdateManyWithoutDeviceNestedInput;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutDeviceNestedInput;
  };

  export type deviceUncheckedUpdateManyWithoutTruckInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    bat1?: NullableIntFieldUpdateOperationsInput | number | null;
    bat2?: NullableIntFieldUpdateOperationsInput | number | null;
    bat3?: NullableIntFieldUpdateOperationsInput | number | null;
    lock?: IntFieldUpdateOperationsInput | number;
    sim_number?: NullableStringFieldUpdateOperationsInput | string | null;
    installed_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsUpdateWithoutTruckInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput;
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput;
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput;
  };

  export type alert_eventsUncheckedUpdateWithoutTruckInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsUncheckedUpdateManyWithoutTruckInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type sensorCreateManyDeviceInput = {
    id?: string;
    sn: string;
    tireNo: number;
    simNumber?: string | null;
    sensorNo?: number | null;
    sensor_lock?: number;
    status?: string;
    tempValue?: number | null;
    tirepValue?: number | null;
    exType?: string | null;
    bat?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type locationCreateManyDeviceInput = {
    id?: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
    created_at?: Date | string;
  };

  export type location_historyCreateManyDeviceInput = {
    id?: string;
    location_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
  };

  export type alert_eventsCreateManyDeviceInput = {
    id?: string;
    alert_id: string;
    sensor_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type sensorUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert_events?: alert_eventsUpdateManyWithoutSensorNestedInput;
  };

  export type sensorUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert_events?: alert_eventsUncheckedUpdateManyWithoutSensorNestedInput;
  };

  export type sensorUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sn?: StringFieldUpdateOperationsInput | string;
    tireNo?: IntFieldUpdateOperationsInput | number;
    simNumber?: NullableStringFieldUpdateOperationsInput | string | null;
    sensorNo?: NullableIntFieldUpdateOperationsInput | number | null;
    sensor_lock?: IntFieldUpdateOperationsInput | number;
    status?: StringFieldUpdateOperationsInput | string;
    tempValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    tirepValue?: NullableFloatFieldUpdateOperationsInput | number | null;
    exType?: NullableStringFieldUpdateOperationsInput | string | null;
    bat?: NullableIntFieldUpdateOperationsInput | number | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type locationUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    location_history?: location_historyUpdateManyWithoutLocationNestedInput;
  };

  export type locationUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    location_history?: location_historyUncheckedUpdateManyWithoutLocationNestedInput;
  };

  export type locationUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type location_historyUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    location?: locationUpdateOneRequiredWithoutLocation_historyNestedInput;
  };

  export type location_historyUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    location_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type location_historyUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    location_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type alert_eventsUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput;
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput;
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput;
  };

  export type alert_eventsUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsCreateManySensorInput = {
    id?: string;
    alert_id: string;
    device_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsUpdateWithoutSensorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    alert?: alertUpdateOneRequiredWithoutAlert_eventsNestedInput;
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput;
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput;
  };

  export type alert_eventsUncheckedUpdateWithoutSensorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsUncheckedUpdateManyWithoutSensorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    alert_id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type location_historyCreateManyLocationInput = {
    id?: string;
    device_id: string;
    lat: number;
    long: number;
    recorded_at?: Date | string;
  };

  export type location_historyUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    device?: deviceUpdateOneRequiredWithoutLocation_historyNestedInput;
  };

  export type location_historyUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type location_historyUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: StringFieldUpdateOperationsInput | string;
    lat?: FloatFieldUpdateOperationsInput | number;
    long?: FloatFieldUpdateOperationsInput | number;
    recorded_at?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type alert_eventsCreateManyAlertInput = {
    id?: string;
    device_id?: string | null;
    sensor_id?: string | null;
    truck_id?: string | null;
    value?: number | null;
    message?: string | null;
    status?: string;
    created_at?: Date | string;
    resolved_at?: Date | string | null;
  };

  export type alert_eventsUpdateWithoutAlertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    device?: deviceUpdateOneWithoutAlert_eventsNestedInput;
    sensor?: sensorUpdateOneWithoutAlert_eventsNestedInput;
    truck?: truckUpdateOneWithoutAlert_eventsNestedInput;
  };

  export type alert_eventsUncheckedUpdateWithoutAlertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type alert_eventsUncheckedUpdateManyWithoutAlertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    device_id?: NullableStringFieldUpdateOperationsInput | string | null;
    sensor_id?: NullableStringFieldUpdateOperationsInput | string | null;
    truck_id?: NullableStringFieldUpdateOperationsInput | string | null;
    value?: NullableFloatFieldUpdateOperationsInput | number | null;
    message?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    resolved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use VendorsCountOutputTypeDefaultArgs instead
   */
  export type VendorsCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = VendorsCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use DriversCountOutputTypeDefaultArgs instead
   */
  export type DriversCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = DriversCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use TruckCountOutputTypeDefaultArgs instead
   */
  export type TruckCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = TruckCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use DeviceCountOutputTypeDefaultArgs instead
   */
  export type DeviceCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = DeviceCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SensorCountOutputTypeDefaultArgs instead
   */
  export type SensorCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = SensorCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use LocationCountOutputTypeDefaultArgs instead
   */
  export type LocationCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = LocationCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use AlertCountOutputTypeDefaultArgs instead
   */
  export type AlertCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = AlertCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use vendorsDefaultArgs instead
   */
  export type vendorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    vendorsDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use driversDefaultArgs instead
   */
  export type driversArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    driversDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use truckDefaultArgs instead
   */
  export type truckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    truckDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use user_adminDefaultArgs instead
   */
  export type user_adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    user_adminDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use deviceDefaultArgs instead
   */
  export type deviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    deviceDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use sensorDefaultArgs instead
   */
  export type sensorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    sensorDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use locationDefaultArgs instead
   */
  export type locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    locationDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use location_historyDefaultArgs instead
   */
  export type location_historyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = location_historyDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use alertDefaultArgs instead
   */
  export type alertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    alertDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use alert_eventsDefaultArgs instead
   */
  export type alert_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    alert_eventsDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
