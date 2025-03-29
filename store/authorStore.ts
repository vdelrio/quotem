import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Author } from "@/models/models";
import { authorsNextId, mockedAuthors } from "@/models/mock-data";

type AuthorStore = {
  nextId: number;
  authors: Author[];
  addAuthor: (name: string) => Promise<void>;
  removeAuthor: (authorId: string) => void;
  findAuthorById: (authorId: string) => Author | undefined;
};

export const useAuthorStore = create<AuthorStore>()(
  persist(
    (set, get) => ({
      authors: mockedAuthors,
      nextId: authorsNextId,
      addAuthor: async (name: string) => {
        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            authors: [
              {
                id: String(state.nextId),
                name,
              },
              ...state.authors,
            ],
          };
        });
      },
      removeAuthor: (authorId: string) => {
        set((state) => {
          return {
            ...state,
            authors: state.authors.filter((author) => author.id !== authorId),
          };
        });
      },
      findAuthorById: (authorId: string) => {
        return get().authors.find((author) => author.id === authorId);
      },
    }),
    {
      name: "quotem-author-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
