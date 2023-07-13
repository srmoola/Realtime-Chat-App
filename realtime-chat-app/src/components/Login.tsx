import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";
import { Divider, InputAdornment, Tooltip } from "@mui/material";
import { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";

type Props = {
  signInWithGoogle: Function;
  createUserCustom: Function;
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Created by Satyadev Moolagani at "}
      <Link
        color="inherit"
        target="_blank"
        href="https://skylinewebstudio.com/"
      >
        Skyline Web Studio
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage({
  signInWithGoogle,
  createUserCustom,
}: Props) {
  const [imageurl, setimageurl] = useState<string>("");
  const [displayname, setdisplayname] = useState<string>("");

  const handleSubmit = (displayName: string, imageURL: string) => {
    createUserCustom(displayName, imageURL);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/codeninjassidebarpic.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="/codeninjaslogo.jpg"
              sx={{ m: 1, backgroundColor: "black" }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              CodeNinjas Dojo Chat Sign-In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="displayname"
                label="Display Name"
                name="displayname"
                autoComplete="off"
                onChange={(e) => setdisplayname(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="imageurl"
                label="Avatar Image URL"
                name="imageurl"
                autoComplete="off"
                autoFocus
                onChange={(e) => setimageurl(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        onClick={() =>
                          (window.location.href =
                            "https://www.wikihow.com/Get-the-URL-for-Pictures")
                        }
                        title="Help"
                      >
                        <HelpIcon sx={{ cursor: "pointer" }} />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
                onClick={() => {
                  handleSubmit(displayname, imageurl);
                }}
              >
                Enter Chat
              </Button>
              <Divider sx={{ marginTop: "20px" }}>OR</Divider>
              <GoogleButton
                style={{
                  marginTop: "40px",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "black",
                }}
                onClick={() => {
                  signInWithGoogle();
                }}
              />
              <Divider sx={{ marginTop: "40px" }}>Preview Avatar Image</Divider>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mt: { xl: "50px", md: "20px" },
                  p: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                src={imageurl}
              />
              <Copyright sx={{ mt: { xl: 8, md: 2 } }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
