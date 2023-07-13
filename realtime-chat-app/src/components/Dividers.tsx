import Divider from "@mui/material/Divider/Divider";

type Props = {
  textColors: string;
  transitionStyles: Object;
};

const Dividers = ({ textColors, transitionStyles }: Props) => {
  return (
    <Divider
      sx={{
        height: 28,
        m: 0.5,
        backgroundColor: textColors,
        ...transitionStyles,
      }}
      orientation="vertical"
    />
  );
};

export default Dividers;
