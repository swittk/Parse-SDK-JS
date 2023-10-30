import type ParseACL from './ParseACL';
import type ParseFile from './ParseFile';
import type ParseGeoPoint from './ParseGeoPoint';
import type ParseObject from './ParseObject';

export default function equals(a: any, b: any): boolean {
  const toString = Object.prototype.toString;
  if (toString.call(a) === '[object Date]' || toString.call(b) === '[object Date]') {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return +dateA === +dateB;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (!a || typeof a !== 'object') {
    // a is a primitive
    return a === b;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = a.length; i--;) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (
    (!!a && typeof a == 'object' && 'isParseACL' in a) ||
    // a instanceof ParseACL ||
    (!!a && typeof a == 'object' && 'isParseFile' in a) ||
    // a instanceof ParseFile ||
    (!!a && typeof a == 'object' && 'isParseGeoPoint' in a) ||
    // a instanceof ParseGeoPoint ||
    (!!a && typeof a == 'object' && 'isParseObject' in a)
    // a instanceof ParseObject
  ) {
    return a.equals(b);
  }
  if (!!b && typeof b == 'object' && 'isParseObject' in b) {
    if (a.__type === 'Object' || a.__type === 'Pointer') {
      return a.objectId === b.id && a.className === b.className;
    }
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const k in a) {
    if (!equals(a[k], b[k])) {
      return false;
    }
  }
  return true;
}
