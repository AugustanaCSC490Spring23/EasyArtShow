import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../backend/firebase";
import { doc, getFirestore, setDoc } from "@firebase/firestore";

// Login
const provider = new GoogleAuthProvider();
const loginWithGoogle = () => {
  const loggingAttempt = signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const dbFireStore = getFirestore();
      const docRef = doc(dbFireStore, "hosts", `${user.uid}`);

      setDoc(docRef, {});
      return true;
    })
    .catch((error) => {
      console.log(error.message);
    });
  return false;
};

export default { loginWithGoogle };
