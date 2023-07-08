import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import { ErrorSharp } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";

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
        src="/static/images/avatar/1.jpg"
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
            <IconButton>
              <ErrorIcon />
            </IconButton>
          </Tooltip>
        )}
      </IconButton>
    </Paper>
  );
}
