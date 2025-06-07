import { useState } from "react";
import { client } from "@supabase/client";

interface ReturnType {
  deleteQuote: (id: number) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const useDeleteQuote = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const deleteQuote = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await client
        .from("quotes")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }
    } catch (err: any) {
      setError(err);
      console.error("Error creating quote:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteQuote,
    loading,
    error,
  };
};
