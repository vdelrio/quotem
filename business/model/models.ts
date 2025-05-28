export class Author {
  id?: string;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Quote {
  id?: string;
  text: string;
  author: Author;
  imageUri?: string;

  constructor(params: { text?: string; author: Author; imageUri?: string }) {
    this.text = params.text || "";
    this.author = params.author;
    this.imageUri = params.imageUri;
  }
}
