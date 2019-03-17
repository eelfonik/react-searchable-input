import { isEqual } from 'lodash';

const formatItemWith = prop => item => (item[prop] ? item[prop].toString() : item);
// const formatItemWithId = formatItemWith("id")(item);
// const formatItemWithLabel = formatItemWith("label")(item);

const formatArray = formatFunc => arr => arr.map(formatFunc);

export const addOrRemoveItem = prop => (arr, item) => {
  return hasItem(arr, item, prop) ? removeItem(arr, item, prop) : addItem(arr, item);
}

export function hasItem(arr, item, prop) {
  const formatItemFunc = formatItemWith(prop);
  return !!formatArray(formatItemFunc)(arr).find(it => isEqual(it, formatItemFunc(item)));
}

export const addItem = (arr, item) => ([...arr, item])

export function removeItem(arr, item, prop) {
  const formatItemFunc = formatItemWith(prop);
  return arr.filter(
    it => !isEqual(formatItemFunc(it), formatItemFunc(item))
  );
}
