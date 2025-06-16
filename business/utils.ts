export const getElementCyclically = (
  array: any[],
  index: number,
): any | undefined => {
  if (array.length === 0) {
    return undefined;
  }
  const normalizedIndex =
    ((index % array.length) + array.length) % array.length;
  return array[normalizedIndex];
};
