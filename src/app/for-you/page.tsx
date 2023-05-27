/* eslint-disable @next/next/no-img-element */
import React from "react";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

function page() {
  return (
    <div className="wrapper">
      <SearchBar />
      <div className="row">
        <div className="container">
          <SideBar />
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            <a href="/for-you" className="selected__book">
              <div className="selected__book--sub-title">
                How Constant Innovation Creates Radically Successful Businesses
              </div>
              <div className="selected__book--line"></div>
              <div className="selected__book--content">
                <figure className="book__image--wrapper">
                  <img
                    className=" book__image"
                    src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                    alt="book"
                  />
                </figure>
                <div className="selected__book--text">
                  <div className="selected__book--title">The Lean Startup</div>
                  <div className="selected__book--author">Eric Ries</div>
                  <div className="selected__book--duration-wrapper">
                    <div className="selected__book--icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                      </svg>
                    </div>
                    <div className="selected__book--duration">
                      3 mins 23 secs
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
