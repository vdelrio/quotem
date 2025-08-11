import { useState, useMemo, useLayoutEffect } from "react";
import { Quote } from "@model/models";
import { useQuoteStore } from "@store/quoteStore";
import { useFetchQuotes } from "@repository/useFetchQuotes";
import { normalizeText } from "@/business/utils";

interface ReturnType {
  quotes: Quote[];
  loading: boolean;
  error: Error | null;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const useSearchQuotes = (favoritesOnly = false): ReturnType => {
  const {
    quotes: fetchedQuotes,
    loading,
    error,
  } = useFetchQuotes(favoritesOnly);

  const quotes = useQuoteStore((state) => state.quotes);
  const setQuotes = useQuoteStore((state) => state.setQuotes);
  const [searchText, setSearchText] = useState<string>("");

  useLayoutEffect(() => {
    if (!loading && fetchedQuotes) {
      setQuotes(fetchedQuotes);
    }
  }, [loading, fetchedQuotes, setQuotes]);

  const filteredQuotes = useMemo(() => {
    if (!searchText) {
      return quotes;
    }
    const normalizedSearchText = normalizeText(searchText);
    return quotes.filter((quote) => {
      const normalizedQuoteText = normalizeText(quote.text);
      const normalizedAuthorName = normalizeText(quote.author?.name);
      return (
        normalizedQuoteText.includes(normalizedSearchText) ||
        normalizedAuthorName.includes(normalizedSearchText)
      );
    });
  }, [quotes, searchText]);

  return {
    quotes: filteredQuotes,
    loading,
    error,
    searchText,
    setSearchText,
  };
};
