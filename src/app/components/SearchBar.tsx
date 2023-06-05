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

interface SearchBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
}

export default function SearchBar({ isSidebarOpen, toggleSidebar }: SearchBarProps) {
  const [showBooksWrapper, setShowBooksWrapper] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const searchBackgroundRef = useRef<HTMLDivElement>(null);
  


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
        searchBackgroundRef.current &&
        !searchBackgroundRef.current.contains(event.target as Node)
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
                <AiOutlineSearch />
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={toggleSidebar}>
          <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
              ></path>
            </svg>
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
                  <audio src="audio-source"></audio>
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

