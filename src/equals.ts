import { isParseACL, isParseFile, isParseGeoPoint, isParseObject } from './parseTypeCheck';

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
    isParseACL(a) ||
    isParseFile(a) ||
    isParseGeoPoint(a) ||
    isParseObject(a)
  ) {
    return a.equals(b);
  }
  if (isParseObject(b)) {
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
