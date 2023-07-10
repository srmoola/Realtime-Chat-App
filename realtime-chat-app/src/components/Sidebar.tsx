import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar, ListItemAvatar, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Brightness6 } from "@mui/icons-material";
import HelpIcon from "@mui/icons-material/Help";
import { firestore } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const drawerWidth = "20%";

interface Props {
  window?: () => Window;
  logout: Function;
}

const iconstyles = { cursor: "pointer", height: 35, width: 35, margin: 1 };

const userListRef = collection(firestore, "Users");

export default function Sidebar({ window, logout }: Props) {
  const drawer = (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "20px" }}>
          Real Time Chat App
          <ChatIcon sx={{ marginLeft: "5px" }} />
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "black" }} />
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="Settings">
          <SettingsIcon sx={iconstyles} />
        </Tooltip>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="Switch Theme">
          <Brightness6 onClick={() => logout()} sx={iconstyles} />
        </Tooltip>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="Help">
          <HelpIcon onClick={() => logout()} sx={iconstyles} />
        </Tooltip>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Tooltip title="Log Out">
          <LogoutIcon onClick={() => logout()} sx={iconstyles} />
        </Tooltip>
      </Box>
      <Divider sx={{ backgroundColor: "black" }} />
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          marginTop: "0px",
        }}
      >
        {[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20,
        ].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <div key={crypto.randomUUID()}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${value + 1}`} />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
