/**
 * @flow
 */

import { Op } from './ParseOp';
import { isParseACL, isParseFile, isParseGeoPoint, isParseObject, isParsePolygon, isParseRelation } from './parseTypeCheck';

/** Encodes values to storage type */
function encode(
  value: any,
  disallowObjects: boolean,
  forcePointers: boolean,
  seen: Array<any>,
  offline?: boolean
): any {
  if (isParseObject(value)) {
    if (disallowObjects) {
      throw new Error('Parse Objects not allowed here');
    }
    const seenEntry = value.id ? value.className + ':' + value.id : value;
    if (
      forcePointers ||
      !seen ||
      seen.indexOf(seenEntry) > -1 ||
      value.dirty() ||
      Object.keys(value._getServerData()).length < 1
    ) {
      if (offline && value._getId().startsWith('local')) {
        return value.toOfflinePointer();
      }
      return value.toPointer();
    }
    seen = seen.concat(seenEntry);
    return value._toFullJSON(seen, offline);
  }
  if (
    value instanceof Op ||
    isParseACL(value) ||
    isParseGeoPoint(value) ||
    isParsePolygon(value) ||
    isParseRelation(value)
  ) {
    return value.toJSON();
  }
  if (isParseFile(value)) {
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
export default function (
  value: any,
  disallowObjects?: boolean,
  forcePointers?: boolean,
  seen?: Array<any>,
  offline?: boolean
): any {
  return encode(value, !!disallowObjects, !!forcePointers, seen || [], offline);
}
