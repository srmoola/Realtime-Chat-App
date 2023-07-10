import { useEffect, useState } from "react";
import ChatScreen from "./components/ChatScreen";
import LoginPage from "./components/Login";
import Sidebar from "./components/Sidebar";
import { auth } from "./firebase";
import { signInWithGoogle, createUserCustom, logout } from "./features/signin";

function App() {
  const [falseRender, setfalseRender] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setfalseRender(!falseRender), 1500);
  }, []);

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
