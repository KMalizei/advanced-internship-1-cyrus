import React from "react";
import Skeleton from "./Skeleton";
import { FaSpinner } from "react-icons/fa";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
} from "react-icons/io5";

export default function PlayerSkeleton() {
  return (
    <>
      <div className="summary">
        <div className="audio__book--spinner">
          <FaSpinner />
        </div>

        <div className="audio__wrapper">
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure
                className="book__image--wrapper"
                style={{
                  height: "48px",
                  width: "48px",
                  minWidth: "48px",
                  display: "flex",
                  minHeight: "48px",
                }}
              >
                <div className="book__image">
                  <Skeleton width={48} height={48} />
                </div>
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">
                <Skeleton width={90} height={17} />
              </div>
              <div className="audio__track--author">
                <Skeleton width={90} height={17} />
              </div>
            </div>
          </div>
          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button className="audio__controls--btn">
                <IoPlayBackSharp />
              </button>
              <button className="audio__controls--btn audio__controls--btn-play">
                <IoPlaySharp />
              </button>
              <button className="audio__controls--btn">
                <IoPlayForwardSharp />
              </button>
            </div>
          </div>
          <div className="audio__progress--wrapper">
            <div className="audio__time">00:00</div>
            <input
              type="range"
              className="audio__progress--bar"
              defaultValue="0"
              max="280.032"
            />
            <div className="audio__time">00:00</div>
          </div>
        </div>
      </div>
    </>
  );
}
