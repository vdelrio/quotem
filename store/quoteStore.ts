import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Author, ucdmAuthor } from "@/store/authorStore";

export type Quote = {
  id: number;
  text: string;
  author?: Author;
};

type QuoteStore = {
  nextId: number;
  quotes: Quote[];
  addQuote: (text: string, author?: Author) => Promise<void>;
  removeQuote: (quoteId: number) => void;
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      quotes: [
        {
          id: 1,
          text: "La fe es lo opuesto al miedo y forma parte del amor tal como el miedo forma parte del ataque.",
          author: ucdmAuthor,
        },
      ],
      nextId: 2,
      addQuote: async (text: string, author?: Author) => {
        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            quotes: [
              {
                id: state.nextId,
                text,
                author,
              },
              ...state.quotes,
            ],
          };
        });
      },
      removeQuote: (quoteId: number) => {
        set((state) => {
          return {
            ...state,
            quotes: state.quotes.filter((quote) => quote.id !== quoteId),
          };
        });
      },
    }),
    {
      name: "quotem-quote-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
