import Box from "@mui/material/Box/Box";

type Props = {
  sidebarBackgroundColor: string;
};

const BottomBoxSide = ({ sidebarBackgroundColor }: Props) => {
  return (
    <Box
      style={{
        height: "700px",
        backgroundColor: sidebarBackgroundColor,
      }}
    ></Box>
  );
};

export default BottomBoxSide;
