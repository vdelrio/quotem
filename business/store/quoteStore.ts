import { create } from "zustand";
import { ucdmAuthor } from "@model/mock-data";
import { Quote } from "@model/models";

const currentQuoteInitialData = {
  text: "",
  author: ucdmAuthor,
  imageUri: null,
};

type QuoteStore = {
  quotes: Quote[];
  setQuotes: (quotes: Quote[]) => void;
  addQuote: (newQuote: Quote) => void;
  updateQuote: (modifiedQuote: Quote) => void;
  deleteQuote: (quoteId: number) => void;
  findQuoteById: (quoteId: number) => Quote | null;
  currentQuote: Quote;
  setCurrentQuote: (quote: Quote) => void;
  setCurrentQuoteField: (fieldName: keyof Quote, value: any) => void;
  clearCurrentQuote: () => void;
};

export const useQuoteStore = create<QuoteStore>()((set, get) => ({
  quotes: [],
  currentQuote: { ...currentQuoteInitialData },
  setQuotes: (quotes: Quote[]): void => {
    set(() => ({
      quotes,
    }));
  },
  addQuote: (newQuote: Quote) => {
    set((state) => ({
      quotes: [
        {
          ...newQuote,
        },
        ...state.quotes,
      ],
    }));
  },
  updateQuote: (modifiedQuote: Quote) => {
    set((state) => ({
      quotes: state.quotes.map((quote) =>
        quote.id === modifiedQuote.id ? { ...quote, ...modifiedQuote } : quote,
      ),
    }));
  },
  deleteQuote: (quoteId: number) => {
    set((state) => ({
      quotes: state.quotes.filter((quote) => quote.id !== quoteId),
    }));
  },
  findQuoteById: (quoteId: number) => {
    return get().quotes.find((quote) => quote.id === quoteId) || null;
  },
  setCurrentQuote: (quote: Quote) => {
    set(() => ({
      currentQuote: { ...quote },
    }));
  },
  setCurrentQuoteField: (fieldName: keyof Quote, value: any) => {
    set((state) => ({
      currentQuote: {
        ...state.currentQuote,
        [fieldName]: value,
      },
    }));
  },
  clearCurrentQuote: () => {
    set(() => ({
      currentQuote: { ...currentQuoteInitialData },
    }));
  },
}));
