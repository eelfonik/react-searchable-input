import updateSearchCache from "../utils/cacheHelper";

describe("Test cache helper", () => {
  const prevCache = [{ query: "a", data: [{ id: 1, text: "1" }] }];

  it("Same query key and data should not modify cache", () => {
    const newCache = updateSearchCache(prevCache, "a", [{ id: 1, text: "1" }]);
    expect(newCache).toEqual(prevCache);
  });

  it("Different query key should append to the cache", () => {
    const newCache = updateSearchCache(prevCache, "b", [{ id: 2, text: "2" }]);
    expect(newCache).toEqual([
      { query: "a", data: [{ id: 1, text: "1" }] },
      { query: "b", data: [{ id: 2, text: "2" }] }
    ]);
  });

  it('Same query key with different data should update the cache array', () => {
    const newCache = updateSearchCache(prevCache, "a", [{ id: 2, text: "2" }]);
    expect(newCache).toEqual([{query: "a", data: [{ id: 2, text: "2" }]}]);
  })

  it('cache size is limited at 10', () => {
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(prevCache);
    }
    const newCache = updateSearchCache(arr, "a", [{ id: 2, text: "2" }]);
    expect(newCache).toHaveLength(10);
    expect(newCache[9]).toEqual({ query: "a", data: [{ id: 2, text: "2" }]})
  })
});
