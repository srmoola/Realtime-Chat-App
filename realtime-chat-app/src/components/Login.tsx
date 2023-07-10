import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";
import { Divider, InputAdornment, Tooltip } from "@mui/material";
import { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";

type Props = {
  signInWithGoogle: Function;
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Realtime-Chat-App
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login({ signInWithGoogle }: Props) {
  const [imageurl, setimageurl] = useState<string>("");

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
            backgroundImage: "url(https://source.unsplash.com/random?code)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ChatIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Realtime Chat App Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="imageurl"
                label="Avatar Image URL"
                name="imageurl"
                autoComplete="imageurl"
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Divider sx={{ marginTop: "20px" }}>OR</Divider>
              <GoogleButton
                style={{
                  marginTop: "40px",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
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
                  marginTop: "20px",
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                src={imageurl}
              />
              <Copyright sx={{ mt: 10 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
