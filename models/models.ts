export type Author = {
  id: string;
  name: string;
};

export type Quote = {
  id: string;
  text: string;
  author: Author;
};
