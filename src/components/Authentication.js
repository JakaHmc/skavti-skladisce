import { auth, googleProvider } from "./Firebase";
import {  signInWithPopup  } from "firebase/auth";
import ButtonSignIn from "./ButtonSignIn";

export const Authentication = () => {

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div>

      <ButtonSignIn variant="primary" text="Prijava (Google)"onClick={signInWithGoogle}/>

    </div>
  );
};