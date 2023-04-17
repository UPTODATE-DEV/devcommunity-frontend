import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, InputBase, LinearProgress, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";
import * as React from "react";
import ArticlesPostsResults from "./ArticlesPostsResults";
import TagsResults from "./TagsResults";
import UsersResults from "./UsersResults";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const { push, locale } = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack
        onClick={handleClickOpen}
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          borderRadius: 10,
          bgcolor: "action.hover",
          minWidth: 1,
          height: 40,
          px: 4,
          cursor: "pointer",
          "&:hover": {
            bgcolor: "action.selected",
          },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {locale === "en" ? "Search..." : "Rechercher..."}
        </Typography>
        <Typography sx={{ display: { xs: "none", md: "inline" } }} variant="caption" color="text.secondary">
          Cmd + K
        </Typography>
      </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        keepMounted
        BackdropComponent={Backdrop}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            px: 0,
            py: 0,
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <InputBase
            sx={{ width: 1, height: 1, p: 2 }}
            startAdornment={<SearchIcon sx={{ color: "text.secondary", mr: 1, my: 0.5 }} />}
            placeholder="Search…"
          />
        </DialogTitle>
        <LinearProgress />
        <DialogContent sx={{ position: "relative" }}>
          <DialogContentText sx={{ my: 1 }} id="alert-dialog-slide-description">
            <Stack spacing={2}>
              <ArticlesPostsResults />
              <UsersResults />
              <TagsResults />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Button variant="text" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
