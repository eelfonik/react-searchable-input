export function addOrRemoveItem(arr, itemId) {
  const formattedArray = arr.map(id => id.toString());
  const formattedId = itemId.toString();
  return formattedArray.indexOf(formattedId) === -1
    ? addItem(formattedArray, formattedId)
    : removeItem(formattedArray, formattedId);
}

export function addItem(arr, itemId) {
  return arr.map(item => item.toString()).concat(itemId.toString());
}
export function removeItem(arr, itemId) {
  return arr
    .map(item => item.toString())
    .filter(item => item.toString() !== itemId.toString());
}