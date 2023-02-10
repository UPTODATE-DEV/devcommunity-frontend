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
        {locale === "en"
          ? `Great to have you with us ${user.firstName}`
          : `Heureux de vous compter parmi nous ${user.firstName}`}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description" gutterBottom>
          {locale === "en"
            ? "Select your favorite tags and centers of interest to customize your feed"
            : "Sélectionnez vos tags favoris et centres d'intérêt pour personnaliser votre contenu"}
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
          {locale === "en" ? "Get started" : "Commencer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstLoginChooseTags;
