/* eslint-disable @next/next/no-img-element */
"use client";
import SideBar from "@/app/components/SideBar";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import SearchBar from "@/app/components/SearchBar";
import { useAuthStore } from "@/app/utilities/authStore";
import LogInModal from "@/app/components/UI/LogInModal";
import AudioPlayer from "@/app/components/UI/AudioPlayer";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  content: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas?: string[];
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
  duration: number;
}

function Page() {
  const [book, setBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modal__dimRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const authStore = useAuthStore();
  const router = useRouter();
  const isUserAuth = authStore?.isUserAuth;
  const API__URL = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${params.id}`;

  const getBook = async () => {
    const { data } = await axios.get(API__URL);
    setBook(data);
  };

  function openModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === modal__dimRef.current) {
      openModal();
    }
  }

  useEffect(() => {
    if (isUserAuth === false) {
      openModal();
    }
  }, [authStore]);

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <SearchBar />
      <SideBar />
      <div
        className={`modal__dim ${isModalOpen ? "dimmed" : ""}`}
        ref={modal__dimRef}
        onClick={handleOverlayClick}
      >
        <div className="summary">
          {isModalOpen ? <LogInModal openModal={openModal} /> : <></>}
          <div className="audio__book--summary" style={{ fontSize: "16px" }}>
            <div className="audio__book--summary-title">
              <b>{book?.title}</b>
            </div>
            {!isUserAuth ? (
              <>
                <div className="audio__book--summary-text">
                  {book?.summary.slice(0, 550)} ...
                </div>
                <a className="log-in__player--text" onClick={openModal}>
                  {" "}
                  <br /> Please{" "}
                  <u className="log-in__player--underline">Login</u> To Continue
                  Reading
                </a>
              </>
            ) : (
              <div className="audio__book--summary-text">{book?.summary}</div>
            )}
            <>
              <div className="audio__wrapper">
                <AudioPlayer book={book} />
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
