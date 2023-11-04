/**
 * @flow
 */

import type ParseFile from './ParseFile';
import type ParseObject from './ParseObject';
import type ParseRelation from './ParseRelation';
import { isParseFile, isParseObject, isParseRelation } from './parseTypeCheck';

type EncounterMap = {
  objects: { [identifier: string]: ParseObject | boolean },
  files: Array<ParseFile>,
};

/**
 * Return an array of unsaved children, which are either Parse Objects or Files.
 * If it encounters any dirty Objects without Ids, it will throw an exception.
 *
 * @param {Parse.Object} obj
 * @param {boolean} allowDeepUnsaved
 * @returns {Array}
 */
export default function unsavedChildren(
  obj: ParseObject,
  allowDeepUnsaved?: boolean
): Array<ParseFile | ParseObject> {
  const encountered = {
    objects: {} as Record<string, ParseObject | true>,
    files: [],
  };
  const identifier = obj.className + ':' + obj._getId();
  encountered.objects[identifier] = obj.dirty() ? obj : true;
  const attributes = obj.attributes;
  for (const attr in attributes) {
    if (typeof attributes[attr] === 'object') {
      traverse(attributes[attr], encountered, false, !!allowDeepUnsaved);
    }
  }
  const unsaved: ParseObject[] = [];
  for (const id in encountered.objects) {
    if (id !== identifier && encountered.objects[id] !== true) {
      unsaved.push(encountered.objects[id] as ParseObject);
    }
  }
  return unsaved.concat(encountered.files);
}

function traverse(
  obj: ParseObject | ParseFile | ParseRelation | Array<ParseObject | ParseFile | ParseRelation>,
  encountered: EncounterMap,
  shouldThrow: boolean,
  allowDeepUnsaved: boolean
) {
  if (isParseObject(obj)) {
    if (!obj.id && shouldThrow) {
      throw new Error('Cannot create a pointer to an unsaved Object.');
    }
    const identifier = obj.className + ':' + obj._getId();
    if (!encountered.objects[identifier]) {
      encountered.objects[identifier] = obj.dirty() ? obj : true;
      const attributes = obj.attributes;
      for (const attr in attributes) {
        if (typeof attributes[attr] === 'object') {
          traverse(attributes[attr], encountered, !allowDeepUnsaved, allowDeepUnsaved);
        }
      }
    }
    return;
  }
  if (isParseFile(obj)) {
    if (!obj.url() && encountered.files.indexOf(obj) < 0) {
      encountered.files.push(obj);
    }
    return;
  }
  if (isParseRelation(obj)) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(el => {
      if (typeof el === 'object') {
        traverse(el, encountered, shouldThrow, allowDeepUnsaved);
      }
    });
  }
  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      traverse(obj[k], encountered, shouldThrow, allowDeepUnsaved);
    }
  }
}
