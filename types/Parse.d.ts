import * as ParseOp from './ParseOp';
import ACL from './ParseACL';
import * as Analytics from './Analytics';
import AnonymousUtils from './AnonymousUtils';
import * as Cloud from './Cloud';
import CLP from './ParseCLP';
import CoreManager from './CoreManager';
import Config from './ParseConfig';
import ParseError from './ParseError';
import FacebookUtils from './FacebookUtils';
import File from './ParseFile';
import GeoPoint from './ParseGeoPoint';
import Polygon from './ParsePolygon';
import Installation from './ParseInstallation';
import LocalDatastore from './LocalDatastore';
import ParseObject from './ParseObject';
import * as Push from './Push';
import Query from './ParseQuery';
import Relation from './ParseRelation';
import Role from './ParseRole';
import Schema from './ParseSchema';
import Session from './ParseSession';
import Storage from './Storage';
import User from './ParseUser';
import ParseLiveQuery from './ParseLiveQuery';
import LiveQueryClient from './LiveQueryClient';
import LiveQuerySubscription from './LiveQuerySubscription';
import type { EventuallyQueue } from './CoreManager';
import type ParseACLType from './ParseACL';
import type ParseFileType from './ParseFile';
import type { FileSaveOptions as ParseFileSaveOptions, FileSource as ParseFileSource } from './ParseFile';
import type ParseGeoPointType from './ParseGeoPoint';
import type ParseInstallationType from './ParseInstallation';
import type ParsePolygonType from './ParsePolygon';
import type ParseQueryType from './ParseQuery';
import type ParseRelationType from './ParseRelation';
import type ParseRoleType from './ParseRole';
import type ParseSchemaType from './ParseSchema';
import type ParseSessionType from './ParseSession';
import type ParseUserType from './ParseUser';
import type * as CloudCodeTypes from './CloudCode';
import type * as CloudTypes from './Cloud';
import type * as CoreManagerTypes from './CoreManager';
import type * as OptionsTypes from './Options';
import type * as ParseObjectTypes from './ParseObject';
import type * as ParseQueryTypes from './ParseQuery';
import type * as ParseSchemaTypes from './ParseSchema';
import type * as ParseUserTypes from './ParseUser';
import type * as PushTypes from './Push';
/**
 * The interface for the Parse SDK.
 * This interface can be augmented in build-specific type definitions (e.g., node.d.ts)
 * to provide environment-specific type signatures.
 */
export interface Parse {
    ACL: typeof ACL;
    Analytics: typeof Analytics;
    AnonymousUtils: typeof AnonymousUtils;
    Cloud: typeof Cloud;
    CLP: typeof CLP;
    CoreManager: typeof CoreManager;
    Config: typeof Config;
    Error: typeof ParseError;
    FacebookUtils: typeof FacebookUtils;
    File: typeof File;
    GeoPoint: typeof GeoPoint;
    Polygon: typeof Polygon;
    Installation: typeof Installation;
    LocalDatastore: typeof LocalDatastore;
    Object: typeof ParseObject;
    Op: {
        Set: typeof ParseOp.SetOp;
        Unset: typeof ParseOp.UnsetOp;
        Increment: typeof ParseOp.IncrementOp;
        Add: typeof ParseOp.AddOp;
        Remove: typeof ParseOp.RemoveOp;
        AddUnique: typeof ParseOp.AddUniqueOp;
        Relation: typeof ParseOp.RelationOp;
    };
    Push: typeof Push;
    Query: typeof Query;
    Relation: typeof Relation;
    Role: typeof Role;
    Schema: typeof Schema;
    Session: typeof Session;
    Storage: typeof Storage;
    User: typeof User;
    LiveQueryClient: typeof LiveQueryClient;
    LiveQuerySubscription: typeof LiveQuerySubscription;
    IndexedDB: any;
    Hooks: any;
    Parse: any;
    /**
     * @property {EventuallyQueue} Parse.EventuallyQueue
     * @static
     */
    EventuallyQueue: EventuallyQueue;
    /**
     * Call this method first to set up your authentication tokens for Parse.
     *
     * @param {string} applicationId Your Parse Application ID.
     * @param {string} javaScriptKey Your Parse JavaScript Key (Not needed for parse-server)
     * @note Node.js builds (parse/node) support additional parameters: masterKey and maintenanceKey.
     * @static
     */
    initialize(applicationId: string, javaScriptKey: string): void;
    _initialize(applicationId: string, javaScriptKey: string, masterKey?: string, maintenanceKey?: string): void;
    /**
     * Call this method to set your AsyncStorage engine
     * Starting Parse@1.11, the ParseSDK do not provide a React AsyncStorage as the ReactNative module
     * is not provided at a stable path and changes over versions.
     *
     * @param {AsyncStorage} storage a react native async storage.
     * @static
     */
    setAsyncStorage(storage: any): void;
    /**
     * Call this method to set your LocalDatastoreStorage engine
     * If using React-Native use {@link Parse.setAsyncStorage Parse.setAsyncStorage()}
     *
     * @param {LocalDatastoreController} controller a data storage.
     * @static
     */
    setLocalDatastoreController(controller: any): void;
    /**
     * Returns information regarding the current server's health
     *
     * @returns {Promise}
     * @static
     */
    getServerHealth(): Promise<any>;
    /**
     * @property {string} Parse.applicationId
     * @static
     */
    applicationId: string | undefined;
    /**
     * @property {string} Parse.javaScriptKey
     * @static
     */
    javaScriptKey: string | undefined;
    /**
     * @property {string} Parse.masterKey
     * @static
     */
    masterKey: string | undefined;
    /**
     * @property {string} Parse.maintenanceKey
     * @static
     */
    maintenanceKey: string | undefined;
    /**
     * @property {string} Parse.serverURL
     * @static
     */
    serverURL: string | undefined;
    /**
     * @property {ParseLiveQuery} Parse.LiveQuery
     * @static
     */
    LiveQuery: ParseLiveQuery;
    /**
     * @property {string} Parse.liveQueryServerURL
     * @static
     */
    liveQueryServerURL: string | undefined;
    /**
     * @property {boolean} Parse.encryptedUser
     * @static
     */
    encryptedUser: boolean;
    /**
     * @property {string} Parse.secret
     * @static
     */
    secret: string | undefined;
    /**
     * @property {boolean} Parse.idempotency
     * @static
     */
    idempotency: boolean | undefined;
    /**
     * @property {boolean} Parse.allowCustomObjectId
     * @static
     */
    allowCustomObjectId: boolean | undefined;
    /**
     * Setting this property to `true` enables enhanced logging for `Parse.Object`
     * in Node.js environments. Specifically, it will log:
     *
     * ```
     * ParseObject: className: <CLASS_NAME>, id: <OBJECT_ID>
     * Attributes: <OBJECT_ATTRIBUTES>
     * ```
     *
     * @warning This should not be enabled in production environments as this may
     * expose sensitive information in server logs.
     *
     * @property {boolean} Parse.nodeLogging
     * @static
     */
    nodeLogging: boolean | undefined;
    _request(...args: any[]): Promise<any>;
    _ajax(...args: any[]): Promise<any>;
    _decode(_: any, value: any): any;
    _encode(value: any, _: any, disallowObjects?: boolean): any;
    _getInstallationId(): Promise<string>;
    /**
     * Enable pinning in your application.
     * This must be called after `Parse.initialize` in your application.
     *
     * @param [polling] Allow pinging the server /health endpoint. Default true
     * @param [ms] Milliseconds to ping the server. Default 2000ms
     * @static
     */
    enableLocalDatastore(polling?: boolean, ms?: number): void;
    /**
     * Flag that indicates whether Local Datastore is enabled.
     *
     * @static
     * @returns {boolean}
     */
    isLocalDatastoreEnabled(): boolean;
    /**
     * Gets all contents from Local Datastore
     *
     * <pre>
     * await Parse.dumpLocalDatastore();
     * </pre>
     *
     * @static
     * @returns {object}
     */
    dumpLocalDatastore(): Promise<any>;
    /**
     * Enable the current user encryption.
     * This must be called before login any user.
     *
     * @static
     */
    enableEncryptedUser(): void;
    /**
     * Flag that indicates whether Encrypted User is enabled.
     *
     * @static
     * @returns {boolean}
     */
    isEncryptedUserEnabled(): boolean;
}
declare const Parse: Parse;
declare namespace Parse {
    type RequestOptions = OptionsTypes.RequestOptions;
    type FullOptions = OptionsTypes.FullOptions;
    type BatchSizeOption = OptionsTypes.BatchSizeOption;
    type CascadeSaveOption = OptionsTypes.CascadeSaveOption;
    type ContextOption = OptionsTypes.ContextOption;
    type ErrorOption = OptionsTypes.ErrorOption;
    type RawJSONOptions = OptionsTypes.RawJSONOptions;
    type ScopeOptions = OptionsTypes.ScopeOptions;
    type SessionTokenOption = OptionsTypes.SessionTokenOption;
    type SilentOption = OptionsTypes.SilentOption;
    type SuccessFailureOptions = OptionsTypes.SuccessFailureOptions;
    type SuccessOption = OptionsTypes.SuccessOption;
    type UseMasterKeyOption = OptionsTypes.UseMasterKeyOption;
    type WaitOption = OptionsTypes.WaitOption;
    type Attributes = ParseObjectTypes.Attributes;
    type AttributeKey<T> = ParseObjectTypes.AttributeKey<T>;
    type Pointer = ParseObjectTypes.Pointer;
    type JSONBaseAttributes = ParseObjectTypes.JSONBaseAttributes;
    type CommonAttributes = ParseObjectTypes.CommonAttributes;
    type Encode<T> = ParseObjectTypes.Encode<T>;
    type ToJSON<T> = ParseObjectTypes.ToJSON<T>;
    type ObjectStatic<T extends ParseObject = ParseObject> = ParseObjectTypes.ObjectStatic<T>;
    type ObjectConstructor = ParseObjectTypes.ObjectConstructor;
    type WhereClause = ParseQueryTypes.WhereClause;
    type QueryOptions = ParseQueryTypes.QueryOptions;
    type FullTextQueryOptions = ParseQueryTypes.FullTextQueryOptions;
    type QueryJSON = ParseQueryTypes.QueryJSON;
    type BaseAttributes = ParseQueryTypes.BaseAttributes;
    type BatchOptions = ParseQueryTypes.BatchOptions;
    type FindOptions = ParseQueryTypes.FindOptions;
    type FirstOptions = ParseQueryTypes.FirstOptions;
    type GetOptions = ParseQueryTypes.GetOptions;
    type CountOptions = ParseQueryTypes.CountOptions;
    type EachOptions = ParseQueryTypes.EachOptions;
    type FullTextOptions = ParseQueryTypes.FullTextOptions;
    type AggregationOptions = ParseQueryTypes.AggregationOptions;
    type TYPE = ParseSchemaTypes.TYPE;
    type AttrType<T extends ParseObject, V> = ParseSchemaTypes.AttrType<T, V>;
    type FieldOptions<T extends ParseSchemaTypes.FieldType = any> = ParseSchemaTypes.FieldOptions<T>;
    type FieldType = ParseSchemaTypes.FieldType;
    type Index = ParseSchemaTypes.Index;
    type CLP = ParseSchemaTypes.CLP;
    type CLPField = ParseSchemaTypes.CLPField;
    type RestSchema = ParseSchemaTypes.RestSchema;
    type AuthData = ParseUserTypes.AuthData;
    type AuthProvider = ParseUserTypes.AuthProvider;
    type SignUpOptions = ParseUserTypes.SignUpOptions;
    interface Object<T extends Attributes = Attributes> extends ParseObject<T> {
    }
    namespace Object {
        type SaveOptions = ParseObjectTypes.SaveOptions;
        type FetchOptions = ParseObjectTypes.FetchOptions;
        type DestroyOptions = ParseObjectTypes.DestroyOptions;
        type DestroyAllOptions = ParseObjectTypes.DestroyAllOptions;
        type FetchAllOptions = ParseObjectTypes.FetchAllOptions;
        type SaveAllOptions = ParseObjectTypes.SaveAllOptions;
        type SetOptions = ParseObjectTypes.SetOptions;
        type Encode<T> = ParseObjectTypes.Encode<T>;
        type ToJSON<T> = ParseObjectTypes.ToJSON<T>;
    }
    interface Query<T extends ParseObject = ParseObject> extends ParseQueryType<T> {
    }
    namespace Query {
        type BatchOptions = ParseQueryTypes.BatchOptions;
        type QueryOptions = ParseQueryTypes.QueryOptions;
        type FullTextQueryOptions = ParseQueryTypes.FullTextQueryOptions;
        type FindOptions = ParseQueryTypes.FindOptions;
        type FirstOptions = ParseQueryTypes.FirstOptions;
        type GetOptions = ParseQueryTypes.GetOptions;
        type CountOptions = ParseQueryTypes.CountOptions;
        type EachOptions = ParseQueryTypes.EachOptions;
        type FullTextOptions = ParseQueryTypes.FullTextOptions;
        type AggregationOptions = ParseQueryTypes.AggregationOptions;
        type QueryJSON = ParseQueryTypes.QueryJSON;
        type WhereClause = ParseQueryTypes.WhereClause;
        type BaseAttributes = ParseQueryTypes.BaseAttributes;
    }
    interface Schema<T extends ParseObject = any> extends ParseSchemaType<T> {
    }
    namespace Schema {
        type TYPE = ParseSchemaTypes.TYPE;
        type AttrType<T extends ParseObject, V> = ParseSchemaTypes.AttrType<T, V>;
        type FieldOptions<T extends ParseSchemaTypes.FieldType = any> = ParseSchemaTypes.FieldOptions<T>;
        type FieldType = ParseSchemaTypes.FieldType;
        type Index = ParseSchemaTypes.Index;
        type CLP = ParseSchemaTypes.CLP;
        type CLPField = ParseSchemaTypes.CLPField;
        type RestSchema = ParseSchemaTypes.RestSchema;
    }
    interface User<T extends Attributes = Attributes> extends ParseUserType<T> {
    }
    namespace User {
        type AuthData = ParseUserTypes.AuthData;
        type AuthProvider = ParseUserTypes.AuthProvider;
        type SignUpOptions = ParseUserTypes.SignUpOptions;
    }
    interface Role<T extends Attributes = Attributes> extends ParseRoleType<T> {
    }
    interface Session<T extends Attributes = Attributes> extends ParseSessionType<T> {
    }
    interface Installation<T extends Attributes = Attributes> extends ParseInstallationType<T> {
    }
    type ACL = ParseACLType;
    type GeoPoint = ParseGeoPointType;
    type Polygon = ParsePolygonType;
    type Relation<S extends ParseObject = ParseObject, T extends ParseObject = ParseObject> = ParseRelationType<S, T>;
    interface File extends ParseFileType {
    }
    namespace File {
        type FileSaveOptions = ParseFileSaveOptions;
        type FileSource = ParseFileSource;
    }
    namespace Push {
        type PushData = PushTypes.PushData;
        type SendOptions = PushTypes.SendOptions;
    }
    namespace Cloud {
        type RunOptions = CloudTypes.RunOptions;
        type FunctionRequest<T = Record<string, any>> = CloudCodeTypes.FunctionRequest<T>;
        type FunctionResponse = CloudCodeTypes.FunctionResponse;
        type TriggerRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.TriggerRequest<T>;
        type BeforeSaveRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.BeforeSaveRequest<T>;
        type AfterSaveRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.AfterSaveRequest<T>;
        type BeforeDeleteRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.BeforeDeleteRequest<T>;
        type AfterDeleteRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.AfterDeleteRequest<T>;
        type BeforeFindRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.BeforeFindRequest<T>;
        type AfterFindRequest<T extends ParseObject = ParseObject> = CloudCodeTypes.AfterFindRequest<T>;
        type FileTriggerRequest = CloudCodeTypes.FileTriggerRequest;
        type ConnectTriggerRequest = CloudCodeTypes.ConnectTriggerRequest;
        type LiveQueryEventTrigger<T extends ParseObject = ParseObject> = CloudCodeTypes.LiveQueryEventTrigger<T>;
        type JobRequest = CloudCodeTypes.JobRequest;
        type ValidatorField = CloudCodeTypes.ValidatorField;
        type ValidatorObject = CloudCodeTypes.ValidatorObject;
        type HTTPOptions = CloudCodeTypes.HTTPOptions;
        type HTTPResponse = CloudCodeTypes.HTTPResponse;
        type ReadPreferenceOption = CloudCodeTypes.ReadPreferenceOption;
    }
    namespace EventuallyQueue {
        type Queue = CoreManagerTypes.Queue;
        type QueueObject = CoreManagerTypes.QueueObject;
    }
}
export default Parse;
