import { Quote } from "@model/models";
import { QuoteForInsert, QuoteForUpdate } from "@supabase/extra.types";

export class QuoteDataMapper {
  static mapQuoteForInsert(quote: Quote): QuoteForInsert {
    return {
      text: quote.text,
      author_id: quote.author?.id,
      is_favorite: quote.isFavorite,
    };
  }

  static mapQuoteForUpdate(quote: Quote): QuoteForUpdate {
    return {
      text: quote.text,
      author_id: quote.author?.id,
      is_favorite: quote.isFavorite,
    };
  }
}
