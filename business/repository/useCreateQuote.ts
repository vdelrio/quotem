import { useState } from "react";
import { Quote } from "@model/models";
import { client } from "@supabase/client";
import { QUOTE_SELECT_VALUES } from "@repository/utils";
import { QuoteDataMapper } from "@repository/QuoteDataMapper";

interface ReturnType {
  createQuote: (quote: Quote) => Promise<Quote | null>;
  loading: boolean;
  error: Error | null;
}

export const useCreateQuote = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const createQuote = async (quote: Quote): Promise<Quote | null> => {
    try {
      setLoading(true);
      setError(null);

      const quoteData = QuoteDataMapper.mapQuoteForInsert(quote);
      const { data, error: createError } = await client
        .from("quotes")
        .insert(quoteData)
        .select(QUOTE_SELECT_VALUES)
        .single();

      if (createError) {
        throw createError;
      }

      return data;
    } catch (err: any) {
      setError(err);
      console.error("Error creating quote:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createQuote,
    loading,
    error,
  };
};
