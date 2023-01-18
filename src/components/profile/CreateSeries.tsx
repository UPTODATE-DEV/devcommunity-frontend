import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => null,
});

const CreateSeries = () => {
  const { locale } = useRouter();
  const session = useStore((state) => state.session);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [checked, setChecked] = useState<Post[]>([]);

  const handleAddPostModalClose = () => {
    setOpenAddPostModal(false);
  };

  const handleToggle = (post: Post) => () => {
    const currentIndex = checked.findIndex((el) => el.id === post.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(post);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpenAddModal = () => {
    setOpenAddPostModal(true);
  };

  const [value] = useDebounce(searchTerm, 500);

  const handleSearch = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    async function getPosts() {
      const response = await getRequest({ endpoint: `/posts?&userId=${session.user?.id}&page=1&perPage=1000` });
      setSearchResults(response.data);
    }
  }, []);

  useEffect(() => {
    async function getPosts(searchTerm: string) {
      const results = searchResults.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(results);
    }
    if (value) {
      getPosts(value);
    }
  }, [value]);

  return (
    <>
      <Dialog
        open={openAddPostModal}
        onClose={handleAddPostModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle>{locale === "en" ? "Pick a post" : "Choisit un article"}</DialogTitle>
        <DialogContent>
          <InputBase
            placeholder={locale === "en" ? "Search for a post..." : "Rechercher un post..."}
            endAdornment={<ManageSearchIcon color="disabled" />}
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearch}
            name="search"
            sx={{ width: 1, borderBottom: 1, borderColor: "divider" }}
          />

          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {searchResults.map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value.id} disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.findIndex(el => el.id === value.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value.title}
                      secondary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          dangerouslySetInnerHTML={{ __html: value.content.substring(0, 100) }}
                        />
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Paper component={Stack} spacing={2} variant="outlined" sx={{ py: 4, px: 2, minHeight: "300px" }}>
        <Typography variant="h6" color="text.primary">
          {locale === "en" ? "Create a series" : "Créer une série"}
        </Typography>
        <Divider />
        <Empty />
        {searchResults.length > 0 && (
          <Stack spacing={2}>
            {searchResults.map((post) => (
              <Paper key={post.id} component={Stack} spacing={2} variant="outlined" sx={{ py: 4, px: 2 }}>
                <Typography variant="h6" color="text.primary">
                  {post.title}
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {post.content.substring(0, 100)}...
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
        <Button variant="outlined" color="primary" startIcon={<PlaylistAddIcon />} onClick={handleOpenAddModal}>
          {locale === "en" ? "Add post" : "Ajouter un post"}
        </Button>
      </Paper>
    </>
  );
};

export default CreateSeries;
