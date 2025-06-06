import { useState, useEffect } from "react";
import { client } from "@/supabase/client";
import { Quote } from "@model/models";
import { QuoteForInsert } from "@/supabase/extra.types";
import { useQuoteStore } from "@store/quoteStore";

const QUOTE_SELECT_VALUES = "id, text, imageUri:image_uri, author:author_id(*)";

interface UseQuoteRepositoryReturn {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createQuote: (quote: Quote) => Promise<null>;
  // updateQuote: (id: string, updates: QuoteUpdate) => Promise<Quote | null>;
  // deleteQuote: (id: string) => Promise<boolean>;
}

export const useQuoteRepository = (): UseQuoteRepositoryReturn => {
  const setQuotes = useQuoteStore((state) => state.setQuotes);
  const addQuote = useQuoteStore((state) => state.addQuote);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await client
        .from("quotes")
        .select(QUOTE_SELECT_VALUES);

      if (fetchError) {
        throw fetchError;
      }
      setQuotes(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async (quote: Quote): Promise<null> => {
    try {
      // TODO: hacer este mapeo en otro lado
      const quoteData: QuoteForInsert = {
        text: quote.text,
        author_id: quote.author?.id,
        image_uri: quote.imageUri,
      };
      const { data, error } = await client
        .from("quotes")
        .insert(quoteData)
        .select(QUOTE_SELECT_VALUES)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        addQuote(data);
      }
      return null;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create quote";
      setError(errorMessage);
      return null;
    }
  };

  // const updateQuote = async (
  //   id: string,
  //   updates: QuoteUpdate,
  // ): Promise<Quote | null> => {
  //   try {
  //     const { data, error } = await client
  //       .from("quotes")
  //       .update(updates)
  //       .eq("id", id)
  //       .select()
  //       .single();
  //
  //     if (error) throw error;
  //
  //     if (data) {
  //       setQuotes((prev) =>
  //         prev.map((quote) => (quote.id === id ? data : quote)),
  //       );
  //       return data;
  //     }
  //     return null;
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error ? err.message : "Failed to update quote";
  //     setError(errorMessage);
  //     return null;
  //   }
  // };
  //
  // const deleteQuote = async (id: string): Promise<boolean> => {
  //   try {
  //     const { error } = await client.from("quotes").delete().eq("id", id);
  //
  //     if (error) throw error;
  //
  //     setQuotes((prev) => prev.filter((quote) => quote.id !== id));
  //     return true;
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error ? err.message : "Failed to delete quote";
  //     setError(errorMessage);
  //     return false;
  //   }
  // };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return {
    loading,
    error,
    refetch: fetchQuotes,
    createQuote,
    // updateQuote,
    // deleteQuote,
  };
};
