import { create } from "zustand";
import { ucdmAuthor } from "@model/mock-data";
import { Quote } from "@model/models";

type QuoteStore = {
  currentQuote: Quote;
  setCurrentQuote: (quote: Quote) => void;
  updateCurrentQuoteField: (fieldName: keyof Quote, value: any) => void;
  clearCurrentQuote: () => void;
};

export const useQuoteStore = create<QuoteStore>()((set) => ({
  currentQuote: new Quote({ author: ucdmAuthor }),
  setCurrentQuote: (quote: Quote) => {
    set(() => ({
      currentQuote: { ...quote },
    }));
  },
  updateCurrentQuoteField: (fieldName: keyof Quote, value: any) => {
    set((state) => ({
      currentQuote: {
        ...state.currentQuote,
        [fieldName]: value,
      },
    }));
  },
  clearCurrentQuote: () => {
    set(() => ({
      currentQuote: new Quote({ author: ucdmAuthor }),
    }));
  },
}));
