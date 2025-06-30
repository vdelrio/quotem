import { useState, useEffect } from "react";
import { client } from "@supabase/client";
import { Quote } from "@model/models";
import { QUOTE_SELECT_VALUES } from "@repository/utils";

interface ReturnType {
  quotes: Quote[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFetchQuotes = (favoritesOnly = false): ReturnType => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching quotes...");
      const query = client
        .from("quotes")
        .select(QUOTE_SELECT_VALUES)
        .order("id", { ascending: false });

      if (favoritesOnly) {
        query.eq("is_favorite", true);
      }

      const { data, error: fetchError } = await query;

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
