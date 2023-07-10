import { useEffect, useState } from "react";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./components/Login";
import Sidebar from "./components/Sidebar";
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleprovider, firestore } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

function App() {
  const [falseRender, setfalseRender] = useState<boolean>(false);
  const userListRef = collection(firestore, "Users");

  useEffect(() => {
    setTimeout(() => setfalseRender(!falseRender), 1500);
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  const createUserCustom = async (displayName: string, imageURL: string) => {
    try {
      let email: string = displayName;
      email = email.replace(/\s/g, "") + "@gmail.com";
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }

    window.location.reload();
  };

  return (
    <>
      {auth.currentUser ? (
        <>
          <Sidebar logout={logout} />
          <ChatScreen />
        </>
      ) : (
        <LoginPage
          createUserCustom={createUserCustom}
          signInWithGoogle={signInWithGoogle}
        />
      )}
    </>
  );
}

export default App;
