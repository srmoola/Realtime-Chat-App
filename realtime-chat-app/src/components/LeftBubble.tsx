import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { leftBubbleColor } from "../features/jotai";
import { useState, useEffect } from "react";

type Props = {
  text: string;
  name: string;
  image: string;
  time: string;
};

const textStyle = {
  marginBottom: "10px",
  fontSize: { xl: "14px", md: "10px" },
  position: "relative",
  top: "10px",
  left: "65px",
};

const timeStyle = {
  fontSize: { xl: "14px", md: "10px" },
  position: "relative",
  top: "3px",
  left: "65px",
};

const imageStyle = {
  position: "relative",
  bottom: "30px",
};

const LeftBubble = ({ text, name, image, time }: Props) => {
  const bubblecolor: any = useAtom(leftBubbleColor);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setisLoaded(true);
    }, 2000);
  }, []);

  return (
    <Box className="speechbubble">
      <Typography sx={textStyle}>{name}</Typography>
      <Box sx={{ backgroundColor: bubblecolor }} className="bubble left">
        {!isLoaded ? (
          <>
            <Skeleton
              variant="text"
              width={300}
              sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
            />
            <Skeleton
              variant="text"
              width={300}
              sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
            />
            <Skeleton
              variant="text"
              width={250}
              sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
            />
          </>
        ) : (
          text
        )}
      </Box>
      <Typography sx={timeStyle}>{time}</Typography>
      <Avatar sx={imageStyle} src={image} />
    </Box>
  );
};

export default LeftBubble;
