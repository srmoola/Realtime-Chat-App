import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, googleprovider, firestore } from "../firebase";
import Filter from "bad-words";
import { badwordslist, badwordslist2 } from "../features/badwords.ts";
import { adminlist } from "./admins.ts";

const filter: any = new Filter({ placeHolder: "#" });
filter.addWords(...badwordslist, ...badwordslist2);

const userListRef = collection(firestore, "Users");
const messageDatabase = collection(firestore, "Messages");

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleprovider);

    const querySnapshot = await getDocs(userListRef);
    const existingUsers: any[] = querySnapshot.docs.map(
      (doc) => doc.data().displayName
    );

    let currentUserDisplayName = auth.currentUser?.displayName;
    if (adminlist.includes(auth.currentUser?.email || ""))
      currentUserDisplayName += " - Admin";

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
  const checkProfanity: boolean = filter.isProfane(displayName);

  if (checkProfanity) {
    alert("Username not allowed, please enter an appropriate name!");
    return;
  }

  try {
    let email: string = displayName;
    email = email.replace(/\s/g, "") + "@realtimechat.com";
    await createUserWithEmailAndPassword(auth, email, crypto.randomUUID());
    const user = auth.currentUser;

    if (user) {
      if (imageURL.length < 15)
        imageURL =
          "https://api.dicebear.com/6.x/pixel-art/svg?seed=" + displayName;

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

export const deleteUsers = async () => {
  const users = await getDocs(userListRef);
  users.forEach((docs) => {
    deleteDoc(doc(userListRef, docs.id));
  });
};

export const deleteMessages = async () => {
  const messages = await getDocs(messageDatabase);
  messages.forEach((docs) => {
    deleteDoc(doc(messageDatabase, docs.id));
  });
};
