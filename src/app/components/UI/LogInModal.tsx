/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../../firebase";
import { authState } from "../../utilities/authStore";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

function LogInModal({ closeModal }: { closeModal: any }) {
  const router = useRouter();
  const [logInModal, setLogInModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUserEmail = authState((state) => state.setUserEmail);
  const setIsUserAuth = authState((state) => state.setIsUserAuth);

  const emailSignUp = async (e: any) => {
    try {
      const auth = getAuth();
      e.preventDefault();
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      }
      loginAuthSuccess();
    } catch (error) {
      alert(error);
    }
  };

  const emailLogIn = async (e: any) => {
    try {
      const auth = getAuth();
      e.preventDefault();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      }
      loginAuthSuccess();
    } catch (error) {
      alert(error);
    }
  };

  const guestLogIn = async (e: any) => {
    try {
      const auth = getAuth();
      e.preventDefault();
      const email = "guest123@gmail.com";
      const password = "guest123";
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      }
      loginAuthSuccess();
    } catch (error) {
      alert(error);
    }
  };

  const googleLogIn = async (e: any) => {
    const auth = getAuth();
    const provider = await new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      }
      loginAuthSuccess();
    } catch (error) {
      alert(error);
    }
  };

  const loginAuthSuccess = () => {
    setIsUserAuth(true);
    setUserEmail(email);
    closeModal();
    router.push("for-you");
  };

  function swapToLogInModal() {
    if (logInModal === false) {
      setSignUpModal(false);
      setPasswordModal(false);
      setLogInModal(true);
    } else {
      setPasswordModal(false);
      setLogInModal(false);
      setSignUpModal(true);
    }
  }

  function swapToSignUpModal() {
    if (signUpModal === false) {
      setLogInModal(false);
      setSignUpModal(true);
    } else {
      setSignUpModal(false);
      setLogInModal(true);
    }
  }

  function swapToPasswordModal() {
    if (passwordModal === false) {
      setLogInModal(false);
      setPasswordModal(true);
    } else {
      setPasswordModal(false);
      setLogInModal(true);
    }
  }

  return (
    <div className="auth">
      {logInModal && (
        <>
          <div className="auth__content">
            <div className="auth__title">Log in to Summarist</div>
            <button className="btn guest__btn--wrapper" onClick={guestLogIn}>
              <figure className="google__icon--mask guest__icon--mask">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
              </figure>
              <div>Login as a Guest</div>
            </button>
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
            <button className="btn google__btn--wrapper" onClick={googleLogIn}>
              <figure className="google__icon--mask">
                <img
                  alt="google"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png?20230305195327"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                  width="100"
                  style={{ color: "transparent" }}
                  height="100"
                />
              </figure>
              <div>Login with Google</div>
            </button>
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
            <form
              id="log__in--form"
              className="auth__main--form"
              onSubmit={emailLogIn}
            >
              <input
                className="auth__main--input"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="auth__main--input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button className="btn" type="submit">
                <span>Login</span>
              </button>
            </form>
          </div>
          <div className="auth__forgot--password" onClick={swapToPasswordModal}>
            Forgot your password?
          </div>
          <button className="auth__switch--btn" onClick={swapToLogInModal}>
            Don{`'`}t have an account?
          </button>
          <div className="auth__close--btn" onClick={closeModal}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </>
      )}
      {signUpModal && (
        <>
          <div className="auth__content">
            <div className="auth__title">Sign up to Summarist</div>
            <button className="btn google__btn--wrapper" onClick={googleLogIn}>
              <figure className="google__icon--mask">
                <img
                  alt="google"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png?20230305195327"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                  style={{ color: "transparent" }}
                  width="100"
                  height="100"
                ></img>
              </figure>
              <div>Sign up with Google</div>
            </button>
            <div className="auth__separator">
              <span className="auth__separator--text">or</span>
            </div>
            <form
              id="sign__up--form"
              className="auth__main--form"
              onSubmit={emailSignUp}
            >
              <input
                className="auth__main--input"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <input
                className="auth__main--input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn" type="submit">
                <span>Sign up</span>
              </button>
            </form>
          </div>
          <button className="auth__switch--btn" onClick={swapToSignUpModal}>
            Already have an account?
          </button>
          <div className="auth__close--btn" onClick={closeModal}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </>
      )}
      {passwordModal && (
        <>
          <div className="auth__content">
            <div className="auth__title">Reset your password</div>
            <form id="forgot-password__form" className="auth__main--form">
              <input
                className="auth__main--input"
                type="text"
                placeholder="Email address"
              />
              <button className="btn">
                <span>Send reset password link</span>
              </button>
            </form>
          </div>
          <button className="auth__switch--btn" onClick={swapToLogInModal}>
            Go to login
          </button>
          <div className="auth__close--btn" onClick={closeModal}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

export default LogInModal;
