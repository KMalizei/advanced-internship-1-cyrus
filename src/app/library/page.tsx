"use client";
import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import SavedBooks from "../components/SavedBooks";
import SidebarSizing from "../components/UI/SidebarSizing";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { db } from "../firebase";
import { useBookStore } from "../utilities/bookStore";

function Library() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedBooks, setSavedBooks] = useState<any[]>([]);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [audioDurations, setAudioDurations] = useState<{
    [id: string]: number;
  }>({});
  const audioRefs: MutableRefObject<{ [id: string]: HTMLAudioElement | null }> =
    useRef({});
  const { addFinishedBook } = useBookStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onLoadedMetadata = (id: string) => {
    const seconds = audioRefs.current[id]?.duration || 0;
    setAudioDurations((prevDurations) => ({ ...prevDurations, [id]: seconds }));
  };

  const onDeleteBook = async (bookId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const bookRef = doc(
          collection(db, "users", user.uid, "library"),
          bookId
        );
        await deleteDoc(bookRef);

        // Update the savedBooks state by filtering out the deleted book
        setSavedBooks((prevSavedBooks) =>
          prevSavedBooks.filter((book) => book.id !== bookId)
        );
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        const user = auth.currentUser;
        if (user) {
          const collectionRef = collection(db, "users", user.uid, "library");
          const querySnapshot = await getDocs(collectionRef);
          const ids = querySnapshot.docs.map((doc) =>
            doc.id.replace(/[^a-zA-Z0-9]/g, "")
          );
          setSavedBookIds(ids);
        }
      } catch (error) {
        console.error("Error fetching saved book IDs:", error);
      }
    };

    fetchSavedBooks();
  }, []);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setIsLoading(true);
        if (savedBookIds.length === 0) {
          return;
        }

        const bookPromises = savedBookIds.map(async (bookId) => {
          const response = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
          );
          const responseData = await response.text();

          if (responseData.trim() === "") {
            return null;
          }

          let bookData;
          try {
            bookData = JSON.parse(responseData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }

          const modifiedBookData = {
            id: bookId,
            author: bookData.author,
            title: bookData.title,
            subTitle: bookData.subTitle,
            imageLink: bookData.imageLink,
            audioLink: bookData.audioLink,
            totalRating: bookData.totalRating,
            averageRating: bookData.averageRating,
            keyIdeas: bookData.keyIdeas,
            type: bookData.type,
            status: bookData.status,
            subscriptionRequired: bookData.subscriptionRequired,
            summary: bookData.summary,
            tags: bookData.tags,
            bookDescription: bookData.bookDescription,
            authorDescription: bookData.authorDescription,
          };

          return modifiedBookData;
        });

        const books = await Promise.all(bookPromises);
        setSavedBooks(books);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching saved books:", error);
      }
    };

    fetchBooksData();
  }, [savedBookIds]);

  const moveBookToFinished = (bookId: string) => {
    const bookIndex = savedBooks.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      const book = savedBooks[bookIndex];
      addFinishedBook(book.id);
      setSavedBooks((prevSavedBooks) =>
        prevSavedBooks.filter((book) => book.id !== bookId)
      );
    }
  };

  return (
    <div className="wrapper">
      <SidebarSizing
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="row">
        <div className="container">
          <div className="for-you__title">Saved Books</div>
          <div className="for-you__sub--title">
            {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
          </div>
          <div className="for-you__recommended--books">
            <SavedBooks
              savedBooks={savedBooks}
              audioDurations={audioDurations}
              audioRefs={audioRefs}
              onLoadedMetadata={onLoadedMetadata}
              onMoveToFinished={moveBookToFinished}
              onDeleteBook={onDeleteBook}
              isLoading={isLoading}
            />
          </div>
          <div className="for-you__title">Finished</div>
          <div className="for-you__sub--title">&quot;0&quot; Items</div>
          <div className="for-you__recommended--books"></div>
          <div className="library_libBlockWrapper__8mLgC">
            <h2>Done and dusted!</h2>
            <p>When you finish a book, you can find it here later.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
