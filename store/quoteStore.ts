import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockedQuotes, quoteNextId } from "@/models/mock-data";
import { Author, Quote } from "@/models/models";

type QuoteStore = {
  nextId: number;
  quotes: Quote[];
  addQuote: (text: string, author?: Author) => Promise<void>;
  removeQuote: (quoteId: string) => void;
  findQuoteById: (quoteId: string) => Quote | undefined;
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      quotes: mockedQuotes,
      nextId: quoteNextId,
      addQuote: async (text: string, author?: Author) => {
        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            quotes: [
              {
                id: String(state.nextId),
                text,
                author,
              },
              ...state.quotes,
            ],
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
