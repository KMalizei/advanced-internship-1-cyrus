import React from "react";
import Skeleton from "./Skeleton";

export default function SelectedSkeleton() {
  return (
    <>
      <div className="selected__book">
        <div className="selected__book--sub-title">
          <Skeleton width={233} height={172} />
        </div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure className="book__image--wrapper">
            <Skeleton width={172} height={220} />
          </figure>
          <div className="selected__book--text">
            <div className="selected__book--title">
              <Skeleton width={162} height={19} />
            </div>
            <div className="selected__book--author">
              <Skeleton width={90} height={17} />
            </div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon">
                <Skeleton width={40} height={40} borderRadius={99} />
              </div>
              <div className="selected__book--duration">
                <Skeleton width={45} height={17} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
