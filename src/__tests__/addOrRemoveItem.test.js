import {
  addOrRemoveItem,
  addItem,
  removeItem,
  hasItem
} from "../utils/addOrRemoveItem";

describe("test items manipulation", () => {
  it("test if has item", () => {
    expect(hasItem([1, "2"], 1)).toBe(true);
    expect(hasItem([1, "2"], 2)).toBe(false);
    expect(hasItem([1, "2"], 3)).toBe(false);
    expect(hasItem([{ id: 1, name: "test1" }, { id: 2, name: "test2" }], 2)).toBe(false)
    expect(hasItem([{ id: 1, name: "test1" }, { id: 2, name: "test2" }], 2, 'id')).toBe(false)
  });
  it("test add item", () => {
    expect(addItem([1, "2"], 2)).toEqual([1, "2", 2]);
  });
  it("test remove item", () => {
    expect(removeItem([1, "2"], 2)).toEqual([1, "2"]);
  });
  it("text add or remove item", () => {
    const func = addOrRemoveItem("xxx");
    expect(func([1, "2"], 2)).toEqual([1, "2", 2]);
    expect(func([1, "2"], 3)).toEqual([1, "2", 3]);
    expect(
      func([{ id: 1, name: "test1" }, { id: 2, name: "test2" }], 2)
    ).toEqual([{ id: 1, name: "test1" }, { id: 2, name: "test2" }, 2]);
    expect(
      func([{ id: 1, name: "test1" }, { id: 2, name: "test2" }], {id: 2, name: "test2"})
    ).toEqual([{ id: 1, name: "test1" }]);
    expect(
      func([{ id: 1, name: "test1" }, { id: 2, name: "test2" }], {id: 3, name: "test3"})
    ).toEqual([{ id: 1, name: "test1" }, { id: 2, name: "test2" }, {id: 3, name: "test3"}]);
  });
});
