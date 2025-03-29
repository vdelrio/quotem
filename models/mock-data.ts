import { Author, Quote } from "@/models/models";

// Authors --------------------------------------------------------------------------------------

export const ucdmAuthor: Author = {
  id: "1",
  name: "UCDM",
};

export const mockedAuthors: Author[] = [ucdmAuthor];
export const authorsNextId = 2;

// ----------------------------------------------------------------------------------------------
// Quotes ---------------------------------------------------------------------------------------

export const mockedQuotes: Quote[] = [
  {
    id: "1",
    text: "La fe es lo opuesto al miedo y forma parte del amor tal como el miedo forma parte del ataque.",
    author: ucdmAuthor,
  },
  {
    id: "2",
    text: "Padre, hoy quiero oír sólo Tu Voz. Vengo a Ti en el más profundo de los silencios para oír Tu Voz y recibir Tu Palabra. No tengo otra oración que ésta: que me des la verdad. Y la verdad no es sino Tu Voluntad, que hoy quiero compartir Contigo.",
    author: ucdmAuthor,
  },
];
export const quoteNextId = 3;

// ----------------------------------------------------------------------------------------------
