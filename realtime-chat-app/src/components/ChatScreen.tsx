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
              bottom: "7.5%",
              backgroundColor: "#fff",
              height: "92%",
              width: "100%",
              color: "white",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                height: "100%",
                width: "100%",
                color: "white",
                overflowY: "scroll",
              }}
              className="chatcontainer"
            >
              <div className="bubble left">
                Bro ipsum dolor sit amet gaper backside single track, manny Bike
                epic clipless. Schraeder drop gondy, rail fatty slash gear
                jammer steeps
              </div>
              <div className="bubble right">Ok, Thank you</div>
              <div className="bubble left"> ut labore et dolore magna </div>
              <div className="bubble right">👌</div>
              <div className="bubble left">
                Bro ipsum dolor sit amet gaper backside single track, manny Bike
                epic clipless. Schraeder drop gondy, rail fatty slash gear
                jammer steeps
              </div>
              <div className="bubble right">Ok, Thank you</div>
              <div className="bubble left"> ut labore et dolore magna </div>
              <div className="bubble right">👌</div>
              <div className="bubble left">
                Bro ipsum dolor sit amet gaper backside single track, manny Bike
                epic clipless. Schraeder drop gondy, rail fatty slash gear
                jammer steeps
              </div>
              <div className="bubble right">Ok, Thank you</div>
              <div className="bubble left"> ut labore et dolore magna </div>
              <div className="bubble right">👌</div>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChatScreen;
