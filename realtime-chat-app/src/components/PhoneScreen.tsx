import { Avatar, Typography, Box } from "@mui/material";

const PhoneScreen = () => {
  return (
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
        src="/codeninjaslogo.jpg"
      />
      <Typography sx={{ ml: 10, mr: 10 }}>
        Please get off your phone! App can only be opened on a computer!
      </Typography>
    </Box>
  );
};

export default PhoneScreen;
