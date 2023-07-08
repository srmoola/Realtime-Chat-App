import { Avatar, Box, Typography } from "@mui/material";

type Props = {
  text: string;
  name: string;
  image: string;
  time: string;
};

const textStyle = {
  color: "black",
  fontSize: "14px",
  position: "relative",
  top: "10px",
  left: "65px",
};

const imageStyle = {
  position: "relative",
  bottom: "20px",
};

const LeftBubble = ({ text, name, image, time }: Props) => {
  return (
    <Box className="speechbubble">
      <Typography sx={textStyle}>
        {name} - {time}
      </Typography>
      <Box className="bubble left">{text}</Box>
      <Avatar sx={imageStyle} src={image} />
    </Box>
  );
};

export default LeftBubble;
