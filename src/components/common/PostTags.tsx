import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib";
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useRouter } from "next/router";
import React from "react";

const PostTags = ({ tags }: { tags?: Tags[] }) => {
  const { locale } = useRouter();
  const [open, setOpen] = React.useState(false);
  const userId = useStore((state) => state.session?.user?.id);
  const [tagName, setTagName] = React.useState<string | null>(null);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUndo = async () => {
    if (tagName) {
      return await patchRequest({ endpoint: `/tags/follow/${tagName}/${userId}` });
    }
    setOpen(false);
  };

  const handleTagClick = async (tag: string) => {
    setTagName(tag);
    await patchRequest({ endpoint: `/tags/follow/${tag}/${userId}` });
    setOpen(true);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleUndo}>
        {locale === "en" ? "UNDO" : "ANNULER"}
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Grid container spacing={1} sx={{ py: 1 }} direction="row">
        {tags?.map((el) => (
          <Grid item xs="auto" key={el.tag.name}>
            <Chip size="small" icon={<TagIcon fontSize="small" />} sx={{ px: 2 }} label={el.tag.name} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={locale === "en" ? "Tag followed" : "Tag suivi"}
        action={action}
      />
    </>
  );
};

export default PostTags;
