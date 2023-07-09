import { useEffect, useState } from "react";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./components/Login";
import Sidebar from "./components/Sidebar";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleprovider } from "./firebase";

function App() {
  const [falseRender, setfalseRender] = useState<boolean>(false);

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
        <LoginPage signInWithGoogle={signInWithGoogle} />
      )}
    </>
  );
}

export default App;
