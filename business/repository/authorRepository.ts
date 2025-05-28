import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mockedAuthors, authorNextId } from "@model/mock-data";
import { Author } from "@model/models";

type AuthorStore = {
  nextId: number;
  authors: Author[];
  addAuthor: (newAuthor: Author) => void;
  updateAuthor: (modifiedAuthor: Author) => void;
  deleteAuthor: (authorId: string) => void;
  findAuthorById: (authorId: string) => Author | null;
};

export const useAuthorRepository = create<AuthorStore>()(
  persist(
    (set, get) => ({
      authors: mockedAuthors,
      nextId: authorNextId,
      addAuthor: (newAuthor: Author) => {
        set((state) => ({
          authors: [
            {
              ...newAuthor,
              id: String(state.nextId),
            },
            ...state.authors,
          ],
          nextId: state.nextId + 1,
        }));
      },
      updateAuthor: (modifiedAuthor: Author) => {
        set((state) => ({
          authors: state.authors.map((author) =>
            author.id === modifiedAuthor.id
              ? { ...author, ...modifiedAuthor }
              : author,
          ),
        }));
      },
      deleteAuthor: (authorId: string) => {
        set((state) => ({
          authors: state.authors.filter((author) => author.id !== authorId),
        }));
      },
      findAuthorById: (authorId: string) => {
        return get().authors.find((author) => author.id === authorId) || null;
      },
    }),
    {
      name: "quotem-author-repository",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
