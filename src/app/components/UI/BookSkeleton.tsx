import React from "react";
import Skeleton from "./Skeleton";

export default function BookSkeleton() {
  return (
    <>
      <div className="inner__wrapper">
        <div className="inner__book">
          <div className="inner-book__title">
            <Skeleton width={450} height={38} />
          </div>
          <div className="inner-book__author">
            <Skeleton width={450} height={19} />
          </div>
          <div className="inner-book__sub--title">
            <Skeleton width={450} height={24} />
          </div>
          <div className="inner-book__wrapper">
            <Skeleton width={450} height={94} />
          </div>
          <div className="inner-book__read--btn-wrapper">
            <Skeleton width={450} height={48} />
          </div>
          <div className="inner-book__bookmark">
            <Skeleton width={450} height={22} />
          </div>
          <div className="inner-book__secondary--title">
            What{"'"}s it about?
          </div>
          <div className="inner-book__tags--wrapper">
            <Skeleton width={450} height={48} />
          </div>
          <div className="inner-book__book--description">
            <Skeleton width={450} height={312} />
          </div>
          <h2 className="inner-book__secondary--title">About the author</h2>
          <div className="inner-book__author--description">
            <Skeleton width={450} height={312} />
          </div>
        </div>
        <div className="inner-book--img-wrapper">
          <figure className="book__image--wrapper">
            <Skeleton width={340} height={340} />
          </figure>
        </div>
      </div>
    </>
  );
}
