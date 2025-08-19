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

export const normalizeText = (text: string | undefined) => {
  if (!text) {
    return "";
  }
  return text
    .normalize("NFD") // Unicode Normalization form of this string
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase();
};
