import { Menu, MenuItem } from "@mui/material";

type Props = {
  handleClose: any;
  open: boolean;
  anchorEl: any;
};

const RedirectMenu = ({ handleClose, open, anchorEl }: Props) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>
        <a
          style={{
            height: "100%",
            width: "100%",
            textDecoration: "none",
            color: "black",
          }}
          href="https://dojo.code.ninja/welcome/cn-mi-canton"
          target="_blank"
        >
          Dojo Login
        </a>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <a
          style={{
            height: "100%",
            width: "100%",
            textDecoration: "none",
            color: "black",
          }}
          href="https://impact.codeninjas.com/login"
          target="_blank"
        >
          Impact Login
        </a>
      </MenuItem>
    </Menu>
  );
};

export default RedirectMenu;
