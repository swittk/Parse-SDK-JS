/**
 * @flow
 */

import ParseFile from './ParseFile';
import type ParseObject from './ParseObject';
import ParseRelation from './ParseRelation';

export default function canBeSerialized(obj: ParseObject): boolean {
  if (!!obj && typeof obj == 'object' && !('isParseObject' in obj)) {
    return true;
  }
  const attributes = obj.attributes;
  for (const attr in attributes) {
    const val = attributes[attr];
    if (!canBeSerializedHelper(val)) {
      return false;
    }
  }
  return true;
}

function canBeSerializedHelper(value: any): boolean {
  if (typeof value !== 'object') {
    return true;
  }
  if (value instanceof ParseRelation) {
    return true;
  }
  if (!!value && 'isParseObject' in value) {
    return !!(value as ParseObject).id;
  }
  if (value instanceof ParseFile) {
    if (value.url()) {
      return true;
    }
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (!canBeSerializedHelper(value[i])) {
        return false;
      }
    }
    return true;
  }
  for (const k in value) {
    if (!canBeSerializedHelper(value[k])) {
      return false;
    }
  }
  return true;
}
