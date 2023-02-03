import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import TagsList from "../tags/TagsList";

const FirstLoginChooseTags = ({
  open,
  handleClose,
  userName,
}: {
  open: boolean;
  userName: string;
  handleClose: () => void;
}) => {
  const { locale } = useRouter();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {locale === "en" ? `Welcome ${userName}` : `Bienvenu ${userName}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {locale === "en"
            ? "Continually provide access to proactive resources after magnetic leadership skills. Quickly transition."
            : "Continually provide access to proactive resources after magnetic leadership skills. Quickly transition."}
        </DialogContentText>
        <TagsList />
      </DialogContent>
      <DialogActions>
        <Button sx={{ px: 4 }} disableElevation variant="contained" onClick={handleClose} autoFocus>
          {locale === "en" ? "Close" : "Fermer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstLoginChooseTags;
