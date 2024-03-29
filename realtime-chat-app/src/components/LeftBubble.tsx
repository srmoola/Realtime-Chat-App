import { Avatar, Box, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { chatTextColors, leftBubbleColor } from "../features/jotai";
import { useState, useEffect } from "react";

type Props = {
  text: string;
  name: string;
  image: string;
  time: string;
};

const imageStyle = {
  position: "relative",
  bottom: "30px",
};

const LeftBubble = ({ text, name, image, time }: Props) => {
  const bubblecolor: any = useAtom<string>(leftBubbleColor);
  const chattextcolor: any = useAtom<string>(chatTextColors);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  const textStyle = {
    marginBottom: "10px",
    fontSize: { xl: "14px", md: "10px" },
    position: "relative",
    top: "10px",
    left: "65px",
    color: chattextcolor,
  };

  const timeStyle = {
    fontSize: { xl: "14px", md: "10px" },
    position: "relative",
    top: "3px",
    left: "65px",
    color: chattextcolor,
  };

  useEffect(() => {
    let animationDuration: number = 2000;

    if (text.length > 40) {
      animationDuration = 5000;
    }

    const timer = setTimeout(() => {
      setisLoaded(true);
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box className="speechbubble">
      <Typography sx={textStyle}>{name}</Typography>
      <Box sx={{ backgroundColor: bubblecolor }} className="bubble left">
        {isLoaded ? (
          text
        ) : (
          <>
            <Box className="typing">
              <span className="circle scaling"></span>
              <span className="circle scaling"></span>
              <span className="circle scaling"></span>
            </Box>
          </>
        )}
      </Box>
      <Typography sx={timeStyle}>{time}</Typography>
      <Avatar sx={imageStyle} src={image} />
    </Box>
  );
};

export default LeftBubble;
