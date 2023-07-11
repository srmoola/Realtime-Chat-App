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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { sideBarTextColor, sidebarcolor } from "../features/jotai";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SidebarSkeleton from "./SidebarSkeleton";

const drawerWidth = "20%";

interface Props {
  window?: () => Window;
  logout: Function;
}

const iconstyles = { cursor: "pointer", height: 35, width: 35, margin: 1 };

const userListRef = collection(firestore, "Users");

export default function Sidebar({ window, logout }: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const sidebarBackgroundColor: any = useAtom<string>(sidebarcolor);
  const textColors: any = useAtom<string>(sideBarTextColor);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    const q = query(userListRef, orderBy("timestamp", "desc"));
    const getUsers = onSnapshot(q, (user) => {
      let updatedUsers: any[] = [];
      user.docs.forEach((doc) => {
        updatedUsers.push({ ...doc.data(), id: doc.id });
      });
      setUsers(updatedUsers);
    });

    setTimeout(() => {
      setisLoaded(true);
    }, 2000);

    return () => getUsers(); // Cleanup the listener when component unmounts
  }, []); // Run the effect only once on component mount

  const drawer = (
    <div style={{ backgroundColor: sidebarBackgroundColor }}>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "20px", color: textColors }}>
          Real Time Chat App
          <ChatIcon sx={{ marginLeft: "5px" }} />
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: textColors, marginBottom: "5px" }} />
      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: textColors,
        }}
      >
        <Tooltip title="Settings">
          <SettingsIcon sx={iconstyles} />
        </Tooltip>
        <Divider
          sx={{ height: 28, m: 0.5, backgroundColor: textColors }}
          orientation="vertical"
        />
        <Tooltip title="Switch Theme">
          <Brightness6 onClick={() => logout()} sx={iconstyles} />
        </Tooltip>
        <Divider
          sx={{ height: 28, m: 0.5, backgroundColor: textColors }}
          orientation="vertical"
        />
        <Tooltip title="Help">
          <HelpIcon onClick={() => logout()} sx={iconstyles} />
        </Tooltip>
        <Divider
          sx={{ height: 28, m: 0.5, backgroundColor: textColors }}
          orientation="vertical"
        />
        <Tooltip title="Log Out">
          <LogoutIcon onClick={() => logout()} sx={iconstyles} />
        </Tooltip>
      </Box>
      <Divider sx={{ backgroundColor: textColors, marginTop: "5px" }} />
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          backgroundColor: sidebarBackgroundColor,
          marginTop: "0px",
        }}
      >
        {!isLoaded ? (
          <SidebarSkeleton userListLength={users} />
        ) : (
          users.map((value) => {
            return (
              <div key={value.id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={value.imageURL}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ color: textColors }}
                      primary={value.displayName}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider
                  sx={{
                    backgroundColor: textColors,
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              </div>
            );
          })
        )}
      </List>
      <Box
        style={{
          height: "25%",
          backgroundColor: sidebarBackgroundColor,
        }}
      ></Box>
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
