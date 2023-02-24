import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { getRequest, patchRequest, postRequest } from "@/lib";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SeriesCard from "./SeriesCard";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => null,
});

const CreateSeries = () => {
  const { locale } = useRouter();
  const session = useStore((state) => state.session);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const { profileTab, setProfileTab, setSeries, series } = useStore((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [checked, setChecked] = useState<Series[]>([]);
  const { openAddSeries, setToggleAddSeries, currentSeries, setCurrentSeries } = useStoreNoPersist((state) => state);

  const handleAddPostModalClose = () => {
    setOpenAddPostModal(false);
  };

  const handleToggle = (post: Post) => () => {
    const currentIndex = checked.findIndex((el) => el.post.id === post.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({ module: checked.length + 1, post, id: post.id });
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOpenAddModal = () => {
    setOpenAddPostModal(true);
  };

  const handleSearch = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSave = async () => {
    if (currentSeries) {
      const response = await patchRequest({
        endpoint: `/posts/${currentSeries}/series`,
        data: {
          posts: checked.map((el, i) => ({ module: i + 1, post: el.post.id })),
          user: session?.user?.id,
        },
      });
      setSeries(response.data);
    } else {
      const response = await postRequest({
        endpoint: "/posts/series",
        data: {
          posts: checked.map((el, i) => ({ module: i + 1, post: el.post.id })),
          user: session.user?.id,
        },
      });
      setSeries(response.data);
    }
    setChecked([]);
    setCurrentSeries(null);
    setToggleAddSeries();
  };

  useEffect(() => {
    async function getPosts() {
      const response = await getRequest({ endpoint: `/posts?&userId=${session.user?.id}` });
      setSearchResults(response.data);
    }
    async function handleFilter(searchTerm: string) {
      const results = searchResults.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(results);
    }
    if (searchTerm) {
      handleFilter(searchTerm);
    } else {
      getPosts();
    }
    return () => setChecked([]);
  }, [searchTerm]);

  useEffect(() => {
    async function getSeries() {
      const response = await getRequest({
        endpoint: `/posts/series?userId=${session.user?.id}&seriesId=${currentSeries}`,
      });
      setChecked(response.data?.posts);
    }
    if (currentSeries) {
      getSeries();
    }
  }, [currentSeries]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Dialog
        open={openAddPostModal}
        onClose={handleAddPostModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle>
          <InputBase
            placeholder={locale === "en" ? "Search for a post..." : "Rechercher un post..."}
            startAdornment={<SearchIcon color="disabled" sx={{ mr: 1 }} />}
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearch}
            name="search"
            sx={{ width: 1 }}
          />
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 2, pb: 4 }}>
            {(searchResults?.length > 0 &&
              searchResults?.map((el) => (
                <SeriesCard
                  key={el.id}
                  handleCheck={handleToggle(el)}
                  checked={checked?.findIndex((checked) => checked.post.id === el.id) !== -1}
                  data={el}
                />
              ))) || <Empty />}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 2 }}>
          <Button variant="outlined" onClick={handleAddPostModalClose} color="primary">
            {locale === "en" ? "Close" : "Fermer"}
          </Button>
        </DialogActions>
      </Dialog>
      <Paper component={Stack} spacing={2} variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" color="text.primary">
          {locale === "en" ? "Create a series" : "Créer une série"}
        </Typography>
      </Paper>
      <Paper component={Stack} spacing={2} variant="outlined" sx={{ py: 4, px: 2, minHeight: "240px" }}>
        <Stack spacing={2} sx={{ py: 2 }}>
          {(checked?.length > 0 &&
            checked?.map((el) => (
              <SeriesCard
                key={el.id}
                handleCheck={handleToggle(el.post)}
                checked={checked?.findIndex((checked) => checked.id === el.id) !== -1}
                data={el.post}
                showDragIcon
              />
            ))) || <Empty />}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ width: 1 }}
            variant="outlined"
            color="primary"
            startIcon={<PlaylistAddIcon />}
            onClick={handleOpenAddModal}
          >
            {locale === "en" ? "Select posts" : "Sélectionner des posts"}
          </Button>
          {checked?.length > 0 && (
            <Button
              disableElevation
              sx={{ width: 1 }}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              {locale === "en" ? "Save" : "Enregistrer"}
            </Button>
          )}
        </Stack>
      </Paper>
    </DndProvider>
  );
};

export default CreateSeries;
