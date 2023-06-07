/* eslint-disable @next/next/no-img-element */
"use client";
import RecommendedBooks from "../components/RecomendedBooks";
import SuggestedBooks from "../components/SuggestedBooks";
import axios from "axios";
import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import SelectedSkeleton from "../components/UI/SelectedBookSkeleton";
import { AiFillPlayCircle } from "react-icons/ai";
import SidebarSizing from "../components/UI/SidebarSizing";

interface SelectedBook {
  id: string;
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

function Page() {
  const [selectedBook, setSelectedBook] = useState<SelectedBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [audioDurations, setAudioDurations] = useState<{
    [id: string]: number;
  }>({});
  const audioRefs: MutableRefObject<{ [id: string]: HTMLAudioElement | null }> =
    useRef({});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectedBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    console.log(data);
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

  const onLoadedMetadata = (id: string) => {
    const seconds = audioRefs.current[id]?.duration || 0;
    setAudioDurations((prevDurations) => ({ ...prevDurations, [id]: seconds }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth > 768) {
          setIsSidebarOpen(true);
        } else {
          setIsSidebarOpen(false);
        }
      }
    };

    handleResize();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      <SidebarSizing
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="wrapper">
        <div className="row">
          <div className="container">
            {isLoading ? (
              <>
                <div className="for-you__wrapper">
                  <div className="for-you__title">Selected just for you</div>
                  <div className="selected__book">
                    <SelectedSkeleton />
                  </div>
                </div>
                <div>
                  <div className="for-you__title">Recommended For You</div>
                  <div className="for-you__sub--title">
                    We think you&apos;ll like these
                  </div>
                  <div className="for-you__recommended--books">
                    <RecommendedBooks
                      audioDurations={audioDurations}
                      audioRefs={audioRefs}
                      onLoadedMetadata={onLoadedMetadata}
                    />
                  </div>
                </div>
                <div>
                  <div className="for-you__title">Suggested Books</div>
                  <div className="for-you__sub--title">Browse these books</div>
                  <div className="for-you__recommended--books">
                    <SuggestedBooks
                      audioDurations={audioDurations}
                      audioRefs={audioRefs}
                      onLoadedMetadata={onLoadedMetadata}
                    />
                  </div>
                </div>
              </>
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
                        <div className="selected__book--title">
                          {book.title}
                        </div>
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
                                ref={(audioRef) =>
                                  (audioRefs.current[book.id] = audioRef)
                                }
                                onLoadedMetadata={() =>
                                  onLoadedMetadata(book.id)
                                }
                                className="no__display"
                              />
                              <div className="selected__book--duration">
                                {formatTime(audioDurations[book.id] || 0)}
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
                    We think you&apos;ll like these
                  </div>
                  <div className="for-you__recommended--books">
                    <RecommendedBooks
                      audioDurations={audioDurations}
                      audioRefs={audioRefs}
                      onLoadedMetadata={onLoadedMetadata}
                    />
                  </div>
                </div>
                <div>
                  <div className="for-you__title">Suggested Books</div>
                  <div className="for-you__sub--title">Browse these books</div>

                  <div className="for-you__recommended--books">
                    <SuggestedBooks
                      audioDurations={audioDurations}
                      audioRefs={audioRefs}
                      onLoadedMetadata={onLoadedMetadata}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
