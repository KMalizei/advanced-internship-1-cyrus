/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import LogInModal from "../components/UI/LogInModal";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useRouter } from "next/navigation";

function UserSettings() {
  let [userIsPremium, setUserIsPremium] = useState<boolean>();
  const [email, setEmail] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modal__dimRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = getAuth().currentUser;
  userIsPremium = usePremiumStatus(user);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        setEmail(userEmail);
      } else {
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, [email]);

  function openModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === modal__dimRef.current) {
      openModal();
    }
  }

  return (
    <div>
      <SearchBar />
      <div className={`sidebar ${isModalOpen ? "dimmed" : ""}`}></div>
      <SideBar />
      <section>
        <div className="container">
          <div className="row setting__row">
            <div className="section__title page__title">Settings</div>
            {email ? (
              <>
                {userIsPremium ? (
                  <div className="setting__content">
                    <div className="settings__sub--title">
                      Your Subscription plan
                    </div>
                    <div className="settings__text">Premium-Plus</div>
                  </div>
                ) : (
                  <div className="setting__content">
                    <div className="settings__sub--title">
                      Your Subscription plan
                    </div>
                    <div className="settings__text">Basic</div>
                    <button
                      className="btn settings__upgrade--btn"
                      onClick={() => router.push("/choose-plan")}
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                )}
                <div className="setting__content">
                  <div className="settings__sub--title">Email</div>
                  <div className="settings__text">{email}</div>
                </div>
              </>
            ) : (
              <div className="settings__login--wrapper">
                <img
                  alt="login"
                  src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=1080&q=75"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                  width="1033"
                  height="712"
                />
                <div className="settings__login--text">
                  Log in to your account to see your details.
                </div>
                <button
                  className="btn settings__login--btn"
                  onClick={openModal}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {isModalOpen && (
        <div
          className="modal__dim"
          ref={modal__dimRef}
          onClick={handleOverlayClick}
        >
          <LogInModal openModal={openModal} />
        </div>
      )}
    </div>
  );
}

export default UserSettings;
