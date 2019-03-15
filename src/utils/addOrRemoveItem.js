export function addOrRemoveItem(arr, itemId) {
  const formattedArray = arr.map(id => id.toString());
  const formattedId = itemId.toString();
  return hasItem(arr, itemId)
    ? removeItem(formattedArray, formattedId)
    : addItem(formattedArray, formattedId);
}

export function hasItem(arr, itemId) {
  return arr.map(id => id.toString()).includes(itemId.toString())
}

export function addItem(arr, itemId) {
  return arr.map(item => item.toString()).concat(itemId.toString());
}
export function removeItem(arr, itemId) {
  return arr
    .map(item => item.toString())
    .filter(item => item.toString() !== itemId.toString());
}