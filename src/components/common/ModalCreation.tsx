import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/system";
import { useRouter } from "next/router";

const ModalCreation = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const { push } = useRouter();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ p: 2 }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          variant="outlined"
          onClick={() => push({ pathname: "/articles/add" }, undefined, { shallow: true })}
          sx={{ position: "relative", p: 3, cursor: "pointer", "&:hover": { opacity: 0.4 } }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 180,
              height: 80,
              borderRadius: 100,
              mx: "auto",
              mb: 2,
              p: 3,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <HistoryEduIcon color="primary" sx={{ fontSize: 32 }} />
          </Stack>
          <Typography variant="h6" textAlign="center">
            Article
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          onClick={() => push({ pathname: "/posts/add" }, undefined, { shallow: true })}
          sx={{ position: "relative", p: 3, cursor: "pointer", "&:hover": { opacity: 0.4 } }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 180,
              height: 80,
              borderRadius: 100,
              mx: "auto",
              mb: 2,
              p: 3,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <QuestionAnswer color="primary" sx={{ fontSize: 32 }} />
          </Stack>
          <Typography variant="h6" textAlign="center">
            Post
          </Typography>
        </Paper>
      </Stack>
    </Dialog>
  );
};

export default ModalCreation;
