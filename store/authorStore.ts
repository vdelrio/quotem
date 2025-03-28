import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Author = {
  id: number;
  name: string;
};

export const ucdmAuthor: Author = {
  id: 1,
  name: "UCDM",
};

type AuthorStore = {
  nextId: number;
  authors: Author[];
  addAuthor: (name: string) => Promise<void>;
  removeAuthor: (authorId: number) => void;
  findAuthorById: (authorId: number) => Author | undefined;
};

export const useAuthorStore = create<AuthorStore>()(
  persist(
    (set, get) => ({
      authors: [ucdmAuthor],
      nextId: 2,
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
      findAuthorById: (authorId: number) => {
        return get().authors.find((author) => author.id === authorId);
      },
    }),
    {
      name: "quotem-author-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
