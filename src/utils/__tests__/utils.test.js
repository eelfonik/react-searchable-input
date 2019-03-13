import { addOrRemoveItem, addItem, removeItem } from '../addOrRemoveItem';

describe('test items manipulation', () => {
  const arr = [{
    id: 1,
    label: 'a'
  }, {
    id: '2',
    label: 'b'
  }]
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