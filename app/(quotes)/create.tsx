import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useQuoteRepository } from "@repository/quoteRepository";
import { useQuoteStore } from "@store/quoteStore";
import { QuoteForm } from "@components/quote/QuoteForm";

export default function NewQuoteScreen() {
  const router = useRouter();

  const addQuote = useQuoteRepository((state) => state.addQuote);
  const currentQuote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );
  const clearCurrentQuote = useQuoteStore((state) => state.clearCurrentQuote);

  useEffect(() => {
    clearCurrentQuote();
  }, [clearCurrentQuote]);

  const onSave = () => {
    if (!currentQuote.text) {
      return;
    }
    addQuote(currentQuote);
    router.back();
  };

  return (
    <QuoteForm
      quote={currentQuote}
      setQuoteField={setCurrentQuoteField}
      onSave={onSave}
    />
  );
}
