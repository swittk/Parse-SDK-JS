/**
 * @flow
 */

import type ParseObject from './ParseObject';
import { isParseFile, isParseObject, isParseRelation } from './parseTypeCheck';

export default function canBeSerialized(obj: ParseObject): boolean {
  if (!isParseObject(obj)) {
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
  if (isParseRelation(value)) {
    return true;
  }
  if (isParseObject(value)) {
    return !!value.id;
  }
  if (isParseFile(value)) {
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
