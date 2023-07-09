import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { auth } from "../firebase.ts";

export default function TextInput() {
  const [text, settext] = useState<string>("");

  return (
    <Paper
      component="form"
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
          "https://source.unsplash.com/random?wallpapers"
        }
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 2, mr: 2, flex: 1 }}
        onChange={(e) => settext(e.target.value)}
        placeholder="Type here to chat..."
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        {text.length > 1 ? (
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
