import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import axios from "axios";
import RecommendedSkeleton from "./UI/RecommendedSkeleton";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

interface RecommendBook {
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
  handleBookClick?: (id: string) => void;
  recommendedBookQuery?: () => void;
}

interface audioDuration {
  duration: number | undefined;
  audioRef: MutableRefObject<any | undefined>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

export default function RecommendedBooks({
  duration,
  audioRef,
  setDuration,
}: audioDuration) {
  const [recommendBook, setRecommendBook] = useState<RecommendBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const recommendBookQuery = async () => {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
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

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
  };

  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="for-you__recommended--books-link" key={index}>
              <RecommendedSkeleton />
            </div>
          ))}
        </>
      ) : (
        <>
          {recommendBook.map((book: any, index) => (
            <a
              key={index}
              className="for-you__recommended--books-link"
              href={`/book/${book.id}`}
            >
              {book.subscriptionRequired && (
                <div className="book__pill">Premium</div>
              )}
              <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&amp;token=60872755-13fc-43f4-8b75-bae3fcd73991"></audio>
              <figure className="book__image--wrapper">
                <img className="book__image" src={book.imageLink} alt="book" />
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
                  <audio
                    src={book?.audioLink}
                    ref={audioRef}
                    onLoadedMetadata={onLoadedMetadata}
                    className="no__display"
                  />
                  
                        <div
                          className="recommended__book--details-text"
                          key={book.id}
                        >
                          {formatTime(duration)}
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
          ))}
        </>
      )}
    </>
  );
}
