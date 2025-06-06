import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useQuoteStore } from "@store/quoteStore";
import { QuoteForm } from "@components/quote/QuoteForm";
import { useQuoteRepository2 } from "@repository/useQuoteRepository";

export default function NewQuoteScreen() {
  const router = useRouter();

  const { createQuote } = useQuoteRepository2();

  // const addQuote = useQuoteRepository((state) => state.addQuote);
  const currentQuote = useQuoteStore((state) => state.currentQuote);
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );
  const clearCurrentQuote = useQuoteStore((state) => state.clearCurrentQuote);

  useEffect(() => {
    clearCurrentQuote();
  }, [clearCurrentQuote]);

  const onSave = async (): Promise<void> => {
    if (!currentQuote.text) {
      return;
    }
    // addQuote(currentQuote);
    await createQuote(currentQuote);
    router.back();
  };

  return (
    <QuoteForm
      quote={currentQuote}
      setQuoteField={setCurrentQuoteField}
      onSave={onSave}
      saveBtnLabel="Crear cita"
    />
  );
}
