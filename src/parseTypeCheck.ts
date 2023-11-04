import type ParseACL from "./ParseACL";
import type ParseCLP from "./ParseCLP";
import type ParseFile from "./ParseFile";
import type ParseGeoPoint from "./ParseGeoPoint";
import type ParseObject from "./ParseObject";
import type ParsePolygon from "./ParsePolygon";
import type ParseRelation from "./ParseRelation";
import type ParseRole from "./ParseRole";
import type ParseUser from "./ParseUser";

export function isParseObject(obj?: any): obj is ParseObject {
  return obj?.__pType == 'Object' && obj.__isClass == true;
}
export function isParseFile(obj?: any): obj is ParseFile {
  return obj?.__pType == 'File' && obj.__isClass == true;
}
export function isParseRelation(obj?: any): obj is ParseRelation {
  return obj?.__pType == 'Relation' && obj.__isClass == true;
}
export function isParseACL(obj?: any): obj is ParseACL {
  return obj?.__pType == 'ACL' && obj.__isClass == true;
}
export function isParseCLP(obj?: any): obj is ParseCLP {
  return obj?.__pType == 'CLP' && obj.__isClass == true;
}
export function isParseGeoPoint(obj?: any): obj is ParseGeoPoint {
  return obj?.__pType == 'GeoPoint' && obj.__isClass == true;
}
export function isParsePolygon(obj?: any): obj is ParsePolygon {
  return obj?.__pType == 'Polygon' && obj.__isClass == true;
}
export function isParseRole(obj?: any): obj is ParseRole {
  return obj?.__pType == 'Object' && obj.__isClass == true && obj.__subtype == 'Role';
}
export function isParseUser(obj?: any): obj is ParseUser {
  return obj?.__pType == 'Object' && obj.__isClass == true && obj.__subtype == 'User';
}