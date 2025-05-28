import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockedQuotes, quoteNextId } from "@model/mock-data";
import { Quote } from "@model/models";

type QuoteStore = {
  nextId: number;
  quotes: Quote[];
  addQuote: (newQuote: Quote) => void;
  updateQuote: (modifiedQuote: Quote) => void;
  deleteQuote: (quoteId: string) => void;
  findQuoteById: (quoteId: string) => Quote | undefined;
};

export const useQuoteRepository = create<QuoteStore>()(
  persist(
    (set, get) => ({
      quotes: mockedQuotes,
      nextId: quoteNextId,
      addQuote: (newQuote: Quote) => {
        set((state) => ({
          quotes: [
            {
              ...newQuote,
              id: String(state.nextId),
            },
            ...state.quotes,
          ],
          nextId: state.nextId + 1,
        }));
      },
      updateQuote: (modifiedQuote: Quote) => {
        set((state) => ({
          quotes: state.quotes.map((quote) =>
            quote.id === modifiedQuote.id
              ? { ...quote, ...modifiedQuote }
              : quote,
          ),
        }));
      },
      deleteQuote: (quoteId: string) => {
        set((state) => ({
          quotes: state.quotes.filter((quote) => quote.id !== quoteId),
        }));
      },
      findQuoteById: (quoteId: string) => {
        return get().quotes.find((quote) => quote.id === quoteId);
      },
    }),
    {
      name: "quotem-quote-repository",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
