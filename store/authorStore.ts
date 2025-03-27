import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Author = {
  id: number;
  name: string;
};

type AuthorStore = {
  nextId: number;
  authors: Author[];
  addAuthor: (name: string) => Promise<void>;
  removeAuthor: (authorId: number) => void;
};

export const useAuthorStore = create<AuthorStore>()(
  persist(
    (set) => ({
      authors: [],
      nextId: 1,
      addAuthor: async (name: string) => {
        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            authors: [
              {
                id: state.nextId,
                name,
              },
              ...state.authors,
            ],
          };
        });
      },
      removeAuthor: (authorId: number) => {
        set((state) => {
          return {
            ...state,
            authors: state.authors.filter((author) => author.id !== authorId),
          };
        });
      },
    }),
    {
      name: "quotem-authors-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
