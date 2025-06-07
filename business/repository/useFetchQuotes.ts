import { useState, useEffect } from "react";
import { client } from "@supabase/client";
import { Quote } from "@model/models";

const QUOTE_SELECT_VALUES = "id, text, imageUri:image_uri, author:author_id(*)";

interface ReturnType {
  quotes: Quote[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFetchQuotes = (): ReturnType => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching quotes...");
      const { data, error: fetchError } = await client
        .from("quotes")
        .select(QUOTE_SELECT_VALUES);

      if (fetchError) {
        throw fetchError;
      }

      setQuotes(data || []);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return {
    quotes,
    loading,
    error,
    refetch: fetchQuotes,
  };
};
