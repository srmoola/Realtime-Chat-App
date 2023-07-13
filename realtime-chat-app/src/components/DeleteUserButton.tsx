import Button from "@mui/material/Button/Button";

type Props = {
  banUser: Function;
  userID: string;
};

const DeleteUserButton = ({ banUser, userID }: Props) => {
  return (
    <Button onClick={() => banUser(userID)} color="error" sx={{ mr: 2 }}>
      Delete
    </Button>
  );
};

export default DeleteUserButton;
