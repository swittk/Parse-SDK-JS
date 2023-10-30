/**
 * @flow
 */

// import type ParseACL from './ParseACL';
import type ParseFile from './ParseFile';
// import type ParseGeoPoint from './ParseGeoPoint';
// import type ParsePolygon from './ParsePolygon';
import type ParseObject from './ParseObject';
import type { Op } from './ParseOp';
// import ParseRelation from './ParseRelation';

/** Encodes values to storage type */
function encode(
  value: any,
  disallowObjects: boolean,
  forcePointers: boolean,
  seen: Array<any>,
  offline?: boolean
): any {
  if (!!value && typeof value == 'object' && 'isParseObject' in value) {
    if (disallowObjects) {
      throw new Error('Parse Objects not allowed here');
    }
    const objValue = value as ParseObject;
    const seenEntry = objValue.id ? objValue.className + ':' + objValue.id : objValue;
    if (
      forcePointers ||
      !seen ||
      seen.indexOf(seenEntry) > -1 ||
      objValue.dirty() ||
      Object.keys(objValue._getServerData()).length < 1
    ) {
      if (offline && objValue._getId().startsWith('local')) {
        return objValue.toOfflinePointer();
      }
      return objValue.toPointer();
    }
    seen = seen.concat(seenEntry);
    return objValue._toFullJSON(seen, offline);
  }
  if (
    (!!value && typeof value == 'object' && 'isOp' in value) ||
    (!!value && typeof value == 'object' && 'isParseACL' in value) ||
    (!!value && typeof value == 'object' && 'isParseGeoPoint' in value) ||
    (!!value && typeof value == 'object' && 'isParsePolygon' in value) ||
    (!!value && typeof value == 'object' && 'isParseRelation' in value)
  ) {
    return value.toJSON();
  }
  if ((!!value && typeof value == 'object' && 'isParseFile' in value)) {
    if (!value.url()) {
      throw new Error('Tried to encode an unsaved file.');
    }
    return value.toJSON();
  }
  if (Object.prototype.toString.call(value) === '[object Date]') {
    if (isNaN(value)) {
      throw new Error('Tried to encode an invalid date.');
    }
    return { __type: 'Date', iso: (value as Date).toJSON() };
  }
  if (
    Object.prototype.toString.call(value) === '[object RegExp]' &&
    typeof value.source === 'string'
  ) {
    return value.source;
  }

  if (Array.isArray(value)) {
    return value.map(v => {
      return encode(v, disallowObjects, forcePointers, seen, offline);
    });
  }

  if (value && typeof value === 'object') {
    const output = {};
    for (const k in value) {
      output[k] = encode(value[k], disallowObjects, forcePointers, seen, offline);
    }
    return output;
  }

  return value;
}

/** Encodes values to storage type */
export default function encodeValues(
  value: any,
  disallowObjects?: boolean,
  forcePointers?: boolean,
  seen?: Array<any>,
  offline?: boolean
): any {
  return encode(value, !!disallowObjects, !!forcePointers, seen || [], offline);
}
