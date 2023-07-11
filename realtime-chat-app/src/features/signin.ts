import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, googleprovider, firestore } from "../firebase";

const userListRef = collection(firestore, "Users");

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleprovider);

    const querySnapshot = await getDocs(userListRef);
    const existingUsers: any[] = querySnapshot.docs.map(
      (doc) => doc.data().displayName
    );

    const currentUserDisplayName = auth.currentUser?.displayName;

    // Check if the current user's display name exists in the existing users array
    if (!existingUsers.includes(currentUserDisplayName)) {
      await addDoc(userListRef, {
        displayName: currentUserDisplayName,
        imageURL: auth.currentUser?.photoURL,
        timestamp: serverTimestamp(),
      });
    }
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
        timestamp: serverTimestamp(),
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
