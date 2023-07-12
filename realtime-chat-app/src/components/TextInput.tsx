import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { auth } from "../firebase.ts";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import Filter from "bad-words";
import { badwordslist, badwordslist2 } from "../features/badwords.ts";

const filter: any = new Filter({ placeHolder: "#" });
filter.addWords(...badwordslist, ...badwordslist2);

const messageDatabase = collection(firestore, "Messages");

function getTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes: any = now.getMinutes();

  // Convert hours to 12-hour format
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Add leading zeros to minutes if necessary
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // Format the time as X:YZ PM
  var time = hours + ":" + minutes + " " + ampm;

  return time;
}

export default function TextInput() {
  const [text, settext] = useState<string>("");

  const handleSubmit = async (message: string) => {
    const checkProfanity: boolean = filter.isProfane(message);
    let cleanedmessage: string = message;

    if (checkProfanity) {
      cleanedmessage =
        " 🤬 This message contains bad stuff, please note you will be banned if this happens again! 🤬";
    }

    await addDoc(messageDatabase, {
      text: cleanedmessage,
      sender: auth.currentUser?.displayName,
      senderimageurl: auth.currentUser?.photoURL,
      senderemail: auth.currentUser?.email,
      realtime: getTime(),
      timestamp: serverTimestamp(),
    });

    settext("");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        position: "relative",
        top: "92%",
        backgroundColor: "#fff",
      }}
    >
      <Avatar
        sx={{ margin: "10px" }}
        alt="Remy Sharp"
        src={
          auth.currentUser?.photoURL ||
          "https://source.unsplash.com/random?avatars"
        }
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 2, mr: 2, flex: 1 }}
        onChange={(e) => settext(e.target.value)}
        placeholder="Type here to chat..."
        value={text}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(text);
          }
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => handleSubmit(text)}
      >
        {text.length > 4 ? (
          <SendIcon />
        ) : (
          <Tooltip title="Type something to send!">
            <ErrorIcon sx={{ marginRight: "10px" }} />
          </Tooltip>
        )}
      </IconButton>
    </Paper>
  );
}
