import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockedQuotes, quoteNextId, ucdmAuthor } from "@/models/mock-data";
import { Quote } from "@/models/models";

type QuoteStore = {
  nextId: number;
  quotes: Quote[];
  currentQuote: Quote;
  updateCurrentQuote: (fieldName: keyof Quote, value: any) => void;
  addQuote: () => void;
  removeQuote: (quoteId: string) => void;
  findQuoteById: (quoteId: string) => Quote | undefined;
};

const currentQuoteInitialState: Quote = {
  id: "",
  text: "",
  author: ucdmAuthor,
  imageUri: undefined,
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      quotes: mockedQuotes,
      nextId: quoteNextId,
      currentQuote: currentQuoteInitialState,
      updateCurrentQuote: (fieldName: keyof Quote, value: any) => {
        set((state) => {
          return {
            ...state,
            currentQuote: {
              ...state.currentQuote,
              [fieldName]: value,
            },
          };
        });
      },
      addQuote: () => {
        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            quotes: [
              {
                ...state.currentQuote,
                id: String(state.nextId),
              },
              ...state.quotes,
            ],
            currentQuote: currentQuoteInitialState,
          };
        });
      },
      removeQuote: (quoteId: string) => {
        set((state) => {
          return {
            ...state,
            quotes: state.quotes.filter((quote) => quote.id !== quoteId),
          };
        });
      },
      findQuoteById: (quoteId: string) => {
        return get().quotes.find((quote) => quote.id === quoteId);
      },
    }),
    {
      name: "quotem-quote-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
