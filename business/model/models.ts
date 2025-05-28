export class Author {
  id?: string;
  name: string;

  constructor(params: { name: string }) {
    this.name = params.name;
  }
}

export const NO_AUTHOR = {
  id: "0",
  name: "Sin autor",
};

export class Quote {
  id?: string;
  text: string;
  author?: Author;
  imageUri?: string;

  constructor(params: { text?: string; author?: Author; imageUri?: string }) {
    this.text = params.text || "";
    this.author = params.author;
    this.imageUri = params.imageUri;
  }
}
