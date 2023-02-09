import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import TagsList from "../tags/TagsList";

const FirstLoginChooseTags = ({
  open,
  handleClose,
  user,
  isLoading,
  tags,
}: {
  open: boolean;
  isLoading: boolean;
  tags: Tag[];
  user?: User;
  handleClose: () => void;
}) => {
  const { locale } = useRouter();

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {locale === "en" ? `Welcome ${user.firstName}` : `Bienvenu ${user.firstName}`}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description" gutterBottom>
          {locale === "en"
            ? "Continually provide access to proactive resources after magnetic leadership skills. Quickly transition."
            : "Continually provide access to proactive resources after magnetic leadership skills. Quickly transition."}
        </DialogContentText>
        {isLoading && (
          <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        <TagsList userId={user.id} tags={tags} />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button sx={{ px: 4 }} disableElevation variant="contained" onClick={handleClose} autoFocus>
          {locale === "en" ? "Continue" : "Continuer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstLoginChooseTags;
