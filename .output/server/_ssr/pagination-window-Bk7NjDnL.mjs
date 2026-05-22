function getPaginationWindow(totalItems, page, pageSize) {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * safePageSize;
  const endIndexExclusive = Math.min(startIndex + safePageSize, totalItems);
  const displayRangeStart = totalItems > 0 ? startIndex + 1 : 0;
  const displayRangeEnd = totalItems > 0 ? endIndexExclusive : 0;
  return {
    totalItems,
    page,
    pageSize: safePageSize,
    totalPages,
    safePage,
    startIndex,
    endIndexExclusive,
    displayRangeStart,
    displayRangeEnd
  };
}
export {
  getPaginationWindow as g
};
