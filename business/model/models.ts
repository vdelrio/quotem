export type Author = {
  id: number;
  name: string;
};

export const NO_AUTHOR: Author = {
  id: 0,
  name: "Sin autor",
};

export type Quote = {
  id?: number;
  text: string;
  author: Author | null;
  imageUri: string | null;
};
