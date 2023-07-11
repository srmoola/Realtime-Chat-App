import Backdrop from "@mui/material/Backdrop";
import { motion } from "framer-motion";
import ChatIcon from "@mui/icons-material/Chat";

export default function Loading() {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "black",
      }}
      open={true}
    >
      <motion.div
        className="box"
        animate={{
          scale: [1, 2, 10],
          rotate: [0, 180, 180, 360],
          borderRadius: ["0%", "0%", "50%", "50%", "50%"],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
      >
        <ChatIcon sx={{ color: "black" }} />
      </motion.div>
    </Backdrop>
  );
}
