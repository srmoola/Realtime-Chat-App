import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { rightBubblecolor } from "../features/jotai";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  text: string;
};

const RightBubble = ({ text }: Props) => {
  const bubblecolor: any = useAtom(rightBubblecolor);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setisLoaded(true);
    }, 2000);
  }, []);

  return (
    <Box sx={{ backgroundColor: bubblecolor }} className="bubble right">
      {!isLoaded ? <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> : text}
    </Box>
  );
};

export default RightBubble;
