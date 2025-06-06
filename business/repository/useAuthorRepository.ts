import { useState, useEffect } from "react";
import { client } from "@/supabase/client";
import { Author } from "@model/models";

interface UseAuthorRepositoryReturn {
  authors: Author[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAuthorRepository2 = (): UseAuthorRepositoryReturn => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await client.from("authors").select();

      if (fetchError) {
        throw fetchError;
      }
      setAuthors(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
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
