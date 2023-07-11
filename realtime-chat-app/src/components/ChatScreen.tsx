import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextInput from "./TextInput";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";
import { auth, firestore } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const messageDatabase = collection(firestore, "Messages");

const ChatScreen = () => {
  const [messageList, setmessageList] = useState<any>([]);
  const autoscroll = useRef<any>();
  const scrollToBottom = () => {
    autoscroll.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    if (autoscroll.current) {
      scrollToBottom();
    }
  }, [messageList]);

  useEffect(() => {
    const q = query(messageDatabase, orderBy("timestamp"), limit(50));
    const getMessages = onSnapshot(q, (user: { docs: any[] }) => {
      let updatedUsers: any[] = [];
      user.docs.forEach((doc: { data: () => any; id: any }) => {
        updatedUsers.push({ ...doc.data(), id: doc.id });
      });
      setmessageList(updatedUsers);
    });

    return () => getMessages(); // Cleanup the listener when component unmounts
  }, []);

  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "right" }}
        maxWidth="xl"
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            height: "100vh",
            width: "80%",
            color: "white",
          }}
        >
          <TextInput />
          <Box
            sx={{
              position: "relative",
              backgroundColor: "#fff",
              height: { md: "650px", xl: "850px" },
              width: "100%",
              color: "white",
              bottom: "7.5%",
              overflowY: "scroll",
            }}
          >
            <Box
              sx={{
                position: "relative",
                bottom: "7.5%",
                backgroundColor: "#fff",
                height: "fit-content",
                width: "100%",
                color: "white",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div className="spacing"></div>
              {messageList.map(
                (message: {
                  senderemail: string;
                  text: string;
                  senderimageurl: string;
                  sender: string;
                  realtime: string;
                  id: string;
                }) =>
                  message.senderemail === auth.currentUser?.email ? (
                    <RightBubble key={message.id} text={message.text} />
                  ) : (
                    <LeftBubble
                      key={message.id}
                      text={message.text}
                      image={message.senderimageurl}
                      name={message.sender}
                      time={message.realtime}
                    />
                  )
              )}
            </Box>
            <div ref={autoscroll}></div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChatScreen;
