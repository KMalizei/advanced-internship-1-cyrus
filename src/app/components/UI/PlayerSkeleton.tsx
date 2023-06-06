import React from "react";
import Skeleton from "./Skeleton";
import { FaSpinner } from "react-icons/fa";

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
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                  ></path>
                </svg>
              </button>
              <button className="audio__controls--btn audio__controls--btn-play">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="audio__controls--play-icon"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M96 448l320-192L96 64v384z"></path>
                </svg>
              </button>
              <button className="audio__controls--btn">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
                  ></path>
                </svg>
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
