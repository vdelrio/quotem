import { Tables, TablesInsert, TablesUpdate } from "./database.types";

// Specific table types
export type AuthorRow = Tables<"authors">;
export type AuthorForInsert = TablesInsert<"authors">;
export type AuthorForUpdate = TablesUpdate<"authors">;

export type QuoteRow = Tables<"quotes">;
export type QuoteForInsert = TablesInsert<"quotes">;
export type QuoteForUpdate = TablesUpdate<"quotes">;
