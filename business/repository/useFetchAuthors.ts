import { useState, useEffect } from "react";
import { client } from "@supabase/client";
import { Author } from "@model/models";

interface ReturnType {
  authors: Author[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFetchAuthors = (): ReturnType => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching authors...");
      const { data, error: fetchError } = await client.from("authors").select();
      if (fetchError) {
        throw fetchError;
      }

      setAuthors(data || []);
    } catch (err: any) {
      setError(err);
      console.error("Error fetching authors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return {
    authors,
    loading,
    error,
    refetch: fetchAuthors,
  };
};
