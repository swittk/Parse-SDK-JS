// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b23a36e669fa127d1035e22ca93faab85b98e49f/types/parse/index.d.ts#L11

import parse from './Parse';
export default parse;

// All exports beyond this point will be included in the Parse namespace
export as namespace Parse;
import ACL from './ParseACL';
import * as Analytics from './Analytics';
import AnonymousUtils from './AnonymousUtils';
import * as Cloud from './Cloud';
import CLP from './ParseCLP';
import CoreManager from './CoreManager';
import Config from './ParseConfig';
import Error from './ParseError';
import FacebookUtils from './FacebookUtils';
import ParseFile from './ParseFile';
import ParseGeoPoint from './ParseGeoPoint';
import * as Hooks from './ParseHooks';
import IndexedDB from './IndexedDBStorageController';
import ParsePolygon from './ParsePolygon';
import ParseInstallation from './ParseInstallation';
import ParseLiveQuery from './ParseLiveQuery';
import LiveQueryClient from './LiveQueryClient';
import LiveQuerySubscription from './LiveQuerySubscription';
import LocalDatastore from './LocalDatastore';
import ParseObject from './ParseObject';
import * as Push from './Push';
import ParseQuery from './ParseQuery';
import ParseRelation from './ParseRelation';
import ParseRole from './ParseRole';
import ParseSchema from './ParseSchema';
import ParseSession from './ParseSession';
import Storage from './Storage';
import ParseUser from './ParseUser';

export type { default as ParseObject } from './ParseObject';
export type { default as ParseUser } from './ParseUser';
export type { default as ParseRole } from './ParseRole';
export type { default as ParseSession } from './ParseSession';
export type { default as ParseQuery } from './ParseQuery';
export type { default as ParseRelation } from './ParseRelation';

export type { AuthProvider, AuthData } from './ParseUser';
export type { Pointer } from './ParseObject';
export {
  ACL,
  Analytics,
  AnonymousUtils,
  Cloud,
  CLP,
  CoreManager,
  Config,
  Error,
  FacebookUtils,
  ParseFile as File,
  ParseGeoPoint as GeoPoint,
  ParsePolygon as Polygon,
  ParseInstallation as Installation,
  ParseLiveQuery as LiveQuery,
  LocalDatastore,
  ParseObject as Object,
  Push,
  ParseQuery as Query,
  ParseRelation as Relation,
  ParseRole as Role,
  ParseSchema as Schema,
  ParseSession as Session,
  Storage,
  ParseUser as User,
  LiveQueryClient,
  LiveQuerySubscription,
  IndexedDB,
  Hooks,
};
