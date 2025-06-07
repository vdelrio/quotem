import { useState } from "react";
import { Quote } from "@model/models";
import { client } from "@supabase/client";
import { QuoteForUpdate } from "@supabase/extra.types";
import { QUOTE_SELECT_VALUES } from "@repository/utils";

interface ReturnType {
  updateQuote: (quote: Quote) => Promise<Quote | null>;
  loading: boolean;
  error: Error | null;
}

export const useUpdateQuote = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const updateQuote = async (quote: Quote): Promise<Quote | null> => {
    try {
      setLoading(true);
      setError(null);

      // TODO: hacer este mapeo en otro lado
      const quoteData: QuoteForUpdate = {
        text: quote.text,
        author_id: quote.author?.id,
        image_uri: quote.imageUri,
      };

      const { data, error: updateError } = await client
        .from("quotes")
        .update(quoteData)
        .eq("id", quote.id as number)
        .select(QUOTE_SELECT_VALUES)
        .single();

      if (updateError) {
        throw updateError;
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
    updateQuote,
    loading,
    error,
  };
};
