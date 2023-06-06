/* eslint-disable @next/next/no-img-element */
"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import axios from "axios";
import RecommendedSkeleton from "./UI/RecommendedSkeleton";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

interface RecommendBook {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
  selectedBookQuery: () => void;
  onClick: () => void;
  handleBookClick: (id: string) => void;
  recommendedBookQuery: () => void;
}

interface SuggestedBooksProps {
  audioDurations: { [id: string]: number };
  audioRefs: MutableRefObject<{ [id: string]: HTMLAudioElement | null }>;
  onLoadedMetadata: (id: string) => void;
}

export default function SuggestedBooks({
  audioDurations,
  audioRefs,
  onLoadedMetadata,
}: SuggestedBooksProps) {
  const [recommendBook, setRecommendBook] = useState<RecommendBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const recommendBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    setRecommendBook(data);
    setIsLoading(false);
  };

  useEffect(() => {
    recommendBookQuery();
  }, []);

  const formatTime = (duration: number | undefined) => {
    if (duration && !isNaN(duration)) {
      const minutes = Math.floor(duration / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="for-you__recommended--books-link" key={index}>
              <RecommendedSkeleton />
            </div>
          ))}
        </>
      ) : (
        <>
          {recommendBook.map((book: RecommendBook, index) => {
            const audioId = `audio_${book.id}`;
            return (
              <a
                key={index}
                className="for-you__recommended--books-link"
                href={`/book/${book.id}`}
              >
                {book.subscriptionRequired && (
                  <div className="book__pill">Premium</div>
                )}
                <audio
                  src={book.audioLink}
                  ref={(audioRef) => (audioRefs.current[audioId] = audioRef)}
                  onLoadedMetadata={() => onLoadedMetadata(audioId)}
                  className="no__display"
                />
                <figure className="book__image--wrapper">
                  <img
                    className="book__image"
                    src={book.imageLink}
                    alt="book"
                  />
                </figure>
                <div className="recommended__book--title">{book.title}</div>
                <div className="recommended__book--author">{book.author}</div>
                <div className="recommended__book--sub-title">
                  {book.subTitle}
                </div>
                <div className="recommended__book--details-wrapper">
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-icon">
                      <AiOutlineClockCircle />
                    </div>
                    <div
                      className="recommended__book--details-text"
                      key={book.id}
                    >
                      {formatTime(audioDurations[audioId])}
                    </div>
                  </div>
                  <div className="recommended__book--details">
                    <div className="recommended__book--details-icon">
                      <AiOutlineStar />
                    </div>
                    <div className="recommended__book--details-text">
                      {book.averageRating}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </>
      )}
    </>
  );
}
