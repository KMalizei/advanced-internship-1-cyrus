/* eslint-disable @next/next/no-img-element */
"use client";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import RecommendedBooks from "../components/RecomendedBooks";
import SuggestedBooks from "../components/SuggestedBooks";
import axios from "axios";
import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import SelectedSkeleton from "../components/UI/SelectedSkeleton";
import { AiFillPlayCircle } from "react-icons/ai";

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
  duration: any;
  audioRef: MutableRefObject<any | undefined>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

function Page() {
  const [selectedBook, setSelectedBook] = useState<SelectedBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<any | undefined>();

  const selectedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setSelectedBook(data);
    setIsLoading(false);
  };

  useEffect(() => {
    selectedBookQuery();
  }, []);

  const formatTime = (duration: number) => {
    if (duration && !isNaN(duration)) {
      const minutes = Math.floor(duration / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
  };

  return (
    <div className="wrapper">
      <SearchBar />
      <div className="row">
        <div className="container">
          <SideBar />
          {isLoading ? (
            <div className="for-you__wrapper">
              <div className="for-you__title">Selected just for you</div>
              <div className="selected__book">
                <SelectedSkeleton />
              </div>
            </div>
          ) : (
            <div className="for-you__wrapper">
              <div className="for-you__title">Selected just for you</div>
              {selectedBook.map((book, index) => (
                <a
                  key={index}
                  href={`book/${book.id}`}
                  className="selected__book"
                >
                  <div className="selected__book--sub-title">
                    {book.subTitle}
                  </div>
                  <div className="selected__book--line"></div>
                  <div className="selected__book--content">
                    <figure className="book__image--wrapper">
                      <img
                        className=" book__image"
                        src={book.imageLink}
                        alt="book"
                      />
                    </figure>
                    <div className="selected__book--text">
                      <div className="selected__book--title">{book.title}</div>
                      <div className="selected__book--author">
                        {book.author}
                      </div>
                      <div className="selected__book--duration-wrapper">
                        <div className="selected__book--icon">
                          <AiFillPlayCircle />
                        </div>
                        {book?.audioLink && (
                          <>
                            <audio
                              src={book?.audioLink}
                              ref={audioRef}
                              onLoadedMetadata={onLoadedMetadata}
                              className="no__display"
                            />
                            <div className="selected__book--duration">
                              {formatTime(duration)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}

              <div>
                <div className="for-you__title">Recommended For You</div>
                <div className="for-you__sub--title">
                  We think you{`'`}ll like these
                </div>
                <div className="for-you__recommended--books">
                  <RecommendedBooks {...{ duration, audioRef, setDuration }} />
                </div>
              </div>
              <div>
                <div className="for-you__title">Suggested Books</div>
                <div className="for-you__sub--title">Browse these books</div>

                <div className="for-you__recommended--books">
                  <SuggestedBooks />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
