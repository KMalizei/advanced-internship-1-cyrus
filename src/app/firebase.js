import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxn055WkFucHhpocSu1qGqk1t09xJiC50",
  authDomain: "summarist-6c344.firebaseapp.com",
  projectId: "summarist-6c344",
  storageBucket: "summarist-6c344.appspot.com",
  messagingSenderId: "822764507976",
  appId: "1:822764507976:web:4c02ffa851167c196b597d",
};

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      // Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console. Use the same OAuth client ID used for the Google provider
      // configured with GCIP or Firebase Auth.
      clientId: "xxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Required to enable one-tap sign-up credential helper.
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
});
// Auto sign-in for returning users is enabled by default except when prompt is
// not 'none' in the Google provider custom parameters. To manually disable:
ui.disableAutoSignIn();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
