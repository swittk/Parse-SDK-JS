/**
 * @flow
 */

import arrayContainsObject from './arrayContainsObject';
import { isParseObject } from './parseTypeCheck';

export default function unique<T>(arr: Array<T>): Array<T> {
  const uniques: T[] = [];
  arr.forEach(value => {
    if (isParseObject(value)) {
      if (!arrayContainsObject(uniques, value)) {
        uniques.push(value);
      }
    } else {
      if (uniques.indexOf(value) < 0) {
        uniques.push(value);
      }
    }
  });
  return uniques;
}
