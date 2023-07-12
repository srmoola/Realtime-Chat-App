import { Avatar, Container, Typography } from "@mui/material";
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
import { useAtom } from "jotai";
import { chatBgColor, chatTextColors } from "../features/jotai";

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

  const chatBackgroundColor: any = useAtom(chatBgColor);
  const textColors: any = useAtom<string>(chatTextColors);

  return (
    <>
      <Container
        sx={{
          display: { xl: "flex", lg: "flex", md: "flex", xs: "none" },
          justifyContent: "right",
          backgroundColor: chatBackgroundColor,
          marginLeft: { xl: "390px", xs: "0px" },
          transitionProperty: "background-color, color",
          transitionDuration: "0.3s",
          transitionTimingFunction: "linear",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            backgroundColor: chatBackgroundColor,
            height: "100vh",
            width: "80%",
            color: textColors,
            marginRight: { xl: "10%", xs: "0%" },
            marginLeft: { xl: "10%", xs: "0%" },
            transitionProperty: "background-color, color",
            transitionDuration: "0.3s",
            transitionTimingFunction: "linear",
          }}
        >
          <TextInput />
          <Box
            sx={{
              position: "relative",
              backgroundColor: chatBackgroundColor,
              height: { md: "650px", xl: "825px" },
              width: "100%",
              color: "white",
              bottom: "7.5%",
              overflowY: "scroll",
              transitionProperty: "background-color, color",
              transitionDuration: "0.3s",
              transitionTimingFunction: "linear",
            }}
          >
            <Box
              sx={{
                position: "relative",
                bottom: "7.5%",
                backgroundColor: chatBackgroundColor,
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
      <Box
        sx={{
          height: "fit-content",
          display: { xl: "none", lg: "none", md: "none", xs: "block" },
          color: "#fff",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Avatar
          sx={{ ml: "auto", mr: "auto", mb: 1, height: 96, width: 96 }}
          alt="CodeNinjasLogo"
          src="public/codeninjaslogo.jpg"
        />
        <Typography sx={{ ml: 10, mr: 10 }}>
          Please get off your phone! App can only be opened on a computer!
        </Typography>
      </Box>
    </>
  );
};

export default ChatScreen;
