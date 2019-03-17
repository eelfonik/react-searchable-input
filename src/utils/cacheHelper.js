import { isEqual, drop } from "lodash";
const updateSearchCache = (prevCache, input, resultArray) => {
  const hasCache = prevCache.find(
    cache => cache.query === input && isEqual(cache.data, resultArray)
  );
  const newSearchCache = hasCache
    ? prevCache
    : [
        ...prevCache.filter(cache => cache.query !== input),
        {
          query: input,
          data: resultArray
        }
      ];
  return newSearchCache.length > 10 ? drop(newSearchCache) : newSearchCache;
};

export default updateSearchCache;
