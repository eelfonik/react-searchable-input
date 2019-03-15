import { addOrRemoveItem, addItem, removeItem, hasItem } from '../addOrRemoveItem';

describe('test items manipulation', () => {
  it('test if has item', () => {
    expect(hasItem([1, '2'], 2)).toBe(true)
    expect(hasItem([1, '2'], 3)).toBe(false)
  })
  it('test add item', () => {
    expect(addItem([1, '2'], 2)).toEqual(['1', '2', '2'])
  })
  it('test remove item', () => {
    expect(removeItem([1, '2'], 2)).toEqual(['1'])
  })
  it('text add or remove item', () => {
    expect(addOrRemoveItem([1, '2'], 2)).toEqual(['1'])
    expect(addOrRemoveItem([1, '2'], 3)).toEqual(['1', '2','3'])
  })
})