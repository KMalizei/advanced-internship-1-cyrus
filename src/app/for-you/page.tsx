"use client";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import RecommendedBooks from "../components/RecommendedBooks";
import RecommendedBooks2 from "../components/RecommendedBooks2";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface SelectedBook {
  id?: string;
  author?: string;
  title?: string;
  subTitle?: string;
  imageLink?: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: number;
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
  selectedBookQuery?: () => void;
  onClick?: () => void;
  handleBookClick: (id: string) => void;
}

function page() {
  const [selectedBook, setSelectedBook] = useState<SelectedBook[]>([]);

  const selectedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setSelectedBook(data);
  };

  useEffect(() => {
    selectedBookQuery();
  }, []);

  return (
    <div className="wrapper">
      <SearchBar />
      <div className="row">
        <div className="container">
          <SideBar />
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            {selectedBook.map((book, id) => (
              <a key={id} href="/for-you" className="selected__book">
                <div className="selected__book--sub-title">{book.subTitle}</div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure className="book__image--wrapper">
                    <img
                      className=" book__image"
                      src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                      alt="book"
                    />
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">{book.title}</div>
                    <div className="selected__book--author">{book.author}</div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                        </svg>
                      </div>
                      <div className="selected__book--duration">
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}

            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you'll like these
              </div>
              <div className="for-you__recommended--books">
                <RecommendedBooks />
                <RecommendedBooks />
                <RecommendedBooks />
                <RecommendedBooks />
                <RecommendedBooks />
              </div>
            </div>
            <div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse these books</div>
              <div className="for-you__recommended--books">
                <RecommendedBooks2 />
                <RecommendedBooks2 />
                <RecommendedBooks2 />
                <RecommendedBooks2 />
                <RecommendedBooks2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
