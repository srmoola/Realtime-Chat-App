import { Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import TextInput from "./TextInput";

const ChatScreen = () => {
  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "right" }}
        maxWidth="xl"
      >
        <Box
          sx={{
            backgroundColor: "#000",
            height: "100vh",
            width: "80%",
            color: "white",
          }}
        >
          <TextInput />
          <Box
            sx={{
              position: "relative",
              bottom: "5%",
              backgroundColor: "#fff",
              height: "90%",
              width: "100%",
              color: "white",
            }}
          ></Box>
        </Box>
      </Container>
    </>
  );
};

export default ChatScreen;
