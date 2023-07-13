import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { logout } from "../features/signin";
import { Divider } from "@mui/material";

export default function CheckLogin() {
  const [open, setOpen] = useState(true);
  const [openSecondDialog, setopenSecondDialog] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setopenSecondDialog(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm this is your account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please press "Sign Out" if this is not your account. If you just
            logged in or reloaded the page, then you can ignore this message and
            press "Confirm".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logout}>Sign Out</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSecondDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontSize: "32px" }} id="alert-dialog-title">
          {"Dojo Chat Rules"}
        </DialogTitle>
        <Divider sx={{ width: "95%", ml: "auto", mr: "auto" }} />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p style={{ color: "black" }}>
              Any breaking of the rules Below will result in a{" "}
              <span style={{ color: "red" }}>BAN!</span>
            </p>
            <br />
            1. Be respectful: Treat others in the chat with kindness and
            respect. Avoid using offensive language or engaging in personal
            attacks.
            <br />
            <br />
            2. Stay on topic: Keep the chat focused on the subject matter
            related to the classroom discussion or activity. Avoid unrelated or
            off-topic conversations that can distract others.
            <br />
            <br />
            3. Use appropriate language: Ensure that your language is
            appropriate for an educational setting. Avoid using slang, excessive
            abbreviations, or inappropriate content.
            <br />
            <br />
            4. Report any issues: If you come across any inappropriate behavior
            or violations of the chat rules, report it to the teacher or chat
            moderator immediately.
            <br />
            <br />
            <p style={{ color: "black" }}>
              Press I Agree to let us know you understand the rules of the Dojo!
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopenSecondDialog(false)} autoFocus>
            I Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
