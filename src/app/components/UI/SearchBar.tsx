import React, { useState } from "react";
import axios from "axios";

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

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length > 0) {
      setShowBooksWrapper(true);
      try {
        const response = await axios.get<Book[]>(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${inputValue}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setShowBooksWrapper(false);
      setSearchResults([]);
    }
  };

  return (
    <div className="search__background">
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
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                </svg>
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
                    <div className="search__book--title">
                      {book.title}
                    </div>
                    <div className="search__book--author">{book.author}</div>
                    <div className="search__book--duration">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            <path d="M13 7h-2v6h6v-2h-4z"></path>
                          </svg>
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
