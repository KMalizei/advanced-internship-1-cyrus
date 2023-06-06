import create from 'zustand';

type Book = {
  id: string;
};

type BookStoreState = {
  finishedBooks: Book[];
};

type BookStoreActions = {
  addFinishedBook: (bookId: string) => void;
  removeFinishedBook: (bookId: string) => void;
  clearFinishedBooks: () => void;
};

export const useBookStore = create<BookStoreState & BookStoreActions>((set) => ({
  finishedBooks: [],
  addFinishedBook: (bookId: string) => {
    set((state) => {
      const finishedBookIndex = state.finishedBooks.findIndex((book) => book.id === bookId);
      if (finishedBookIndex !== -1) {
        return state;
      }

      const newFinishedBook: Book = {
        id: bookId,
      };

      return {
        finishedBooks: [...state.finishedBooks, newFinishedBook],
      };
    });
  },
  removeFinishedBook: (bookId: string) => {
    set((state) => ({
      finishedBooks: state.finishedBooks.filter((book) => book.id !== bookId),
    }));
  },
  clearFinishedBooks: () => {
    set({ finishedBooks: [] });
  },
}));