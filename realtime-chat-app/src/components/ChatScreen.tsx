import { Avatar, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextInput from "./TextInput";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";

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

const ChatScreen = () => {
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
              bottom: "7.5%",
              backgroundColor: "#fff",
              height: "650px",
              width: "100%",
              color: "white",

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
              <LeftBubble
                text="bhbh uefe fefuhus d fuuh fwefw"
                image="https://lh3.googleusercontent.com/ogw/AGvuzYa3BuTdCwQ6IjVmMj5pNNMNHRHzHzKATaBixmmzyQ=s32-c-mo"
                name="Satyadev Moolagani"
                time={getTime()}
              />

              <RightBubble text="njnjdnjfj" />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChatScreen;
