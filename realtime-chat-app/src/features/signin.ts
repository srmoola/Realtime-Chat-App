import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, googleprovider, firestore } from "../firebase";

const userListRef = collection(firestore, "Users");

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleprovider);
  } catch (err) {
    console.error(err);
  }
  window.location.reload();
};

export const createUserCustom = async (
  displayName: string,
  imageURL: string
) => {
  try {
    let email: string = displayName;
    email = email.replace(/\s/g, "") + "@realtimechat.com";
    await createUserWithEmailAndPassword(auth, email, crypto.randomUUID());
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, {
        displayName: displayName,
        photoURL: imageURL,
      });

      await addDoc(userListRef, {
        displayName: displayName,
        imageURL: imageURL,
      });
    }

    window.location.reload();
  } catch {
    alert("Display name not available, try again!");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }

  window.location.reload();
};
