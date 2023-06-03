/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";

interface Book {
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

export default function SearchBar() {
  const [showBooksWrapper, setShowBooksWrapper] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const search__backgroundRef = useRef<HTMLDivElement>(null);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue.length > 0) {
      setShowBooksWrapper(true);
      try {
        const { data } = await axios.get<Book[]>(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${inputValue}`
        );
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setShowBooksWrapper(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        search__backgroundRef.current &&
        !search__backgroundRef.current.contains(event.target as Node)
      ) {
        setShowBooksWrapper(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search__background" ref={search__backgroundRef}>
      <div className="search__wrapper">
        <figure>
          <img src="logo" alt="" />
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for books"
                type="text"
                onChange={handleInputChange}
              />
              <div className="search__icon">
                <AiOutlineSearch />
              </div>
            </div>
          </div>
        </div>
        {showBooksWrapper && (
          <div className="search__books--wrapper">
            {searchResults.length === 0 ? (
              <div className="no-books-found">No books found</div>
            ) : (
              searchResults.map((book) => (
                <a
                  className="search__book--link"
                  href={`/book/${book.id}`}
                  key={book.id}
                >
                  <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&amp;token=60872755-13fc-43f4-8b75-bae3fcd73991"></audio>
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "80px",
                      width: "80px",
                      minWidth: "80px",
                      minHeight: "80px",
                    }}
                  >
                    <img
                      className="book__image"
                      src={book.imageLink}
                      alt="book"
                    />
                  </figure>
                  <div>
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                    <div className="search__book--duration">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <AiOutlineStar />
                        </div>
                        <div className="recommended__book--details-text">
                          {book.averageRating}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
