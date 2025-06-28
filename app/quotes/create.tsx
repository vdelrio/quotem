import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useQuoteStore } from "@store/quoteStore";
import { QuoteForm } from "@components/quote/QuoteForm";
import { useCreateQuote } from "@repository/useCreateQuote";

export default function NewQuoteScreen() {
  const router = useRouter();
  const addQuote = useQuoteStore((state) => state.addQuote);
  const { createQuote } = useCreateQuote();

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
    const newQuote = await createQuote(currentQuote);
    if (newQuote) {
      addQuote(newQuote);
    }
    router.back();
  };

  return (
    <QuoteForm
      quote={currentQuote}
      setQuoteField={setCurrentQuoteField}
      onSave={onSave}
      saveBtnLabel="Crear"
    />
  );
}
