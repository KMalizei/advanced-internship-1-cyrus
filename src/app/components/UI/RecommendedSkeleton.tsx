import React from "react";
import Skeleton from "./Skeleton";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";

export default function RecommendedSkeleton() {
  return (
    <div className="no__overflow">
      <figure className="book__image--wrapper">
        <Skeleton width={172} height={172} />
      </figure>
      <div className="recommended__book--title">
        <Skeleton width={172} height={19} />
      </div>
      <div className="recommended__book--author">
        <Skeleton width={172} height={17} />
      </div>
      <div className="recommended__book--sub-title">
        <Skeleton width={172} height={34} />
      </div>
      <div className="recommended__book--details-wrapper">
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <AiOutlineClockCircle />
          </div>
          <div className="recommended__book--details-text">
            <Skeleton width={18.18} height={17} />
          </div>
        </div>
        <div className="recommended__book--details">
          <div className="recommended__book--details-icon">
            <AiOutlineStar />
          </div>
          <div className="recommended__book--details-text">
            <Skeleton width={18.18} height={17} />
          </div>
        </div>
      </div>
    </div>
  );
}
