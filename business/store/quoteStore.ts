import { create } from "zustand";
import { ucdmAuthor } from "@model/mock-data";
import { Quote } from "@model/models";

const currentQuoteInitialData = {
  text: "",
  author: ucdmAuthor,
  imageUri: null,
};

type QuoteStore = {
  currentQuote: Quote;
  setCurrentQuote: (quote: Quote) => void;
  setCurrentQuoteField: (fieldName: keyof Quote, value: any) => void;
  clearCurrentQuote: () => void;
};

export const useQuoteStore = create<QuoteStore>()((set) => ({
  currentQuote: { ...currentQuoteInitialData },
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
