import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { rightBubblecolor } from "../features/jotai";

type Props = {
  text: string;
};

const RightBubble = ({ text }: Props) => {
  const bubblecolor: any = useAtom(rightBubblecolor);

  return (
    <Box sx={{ backgroundColor: bubblecolor }} className="bubble right">
      {text}
    </Box>
  );
};

export default RightBubble;
