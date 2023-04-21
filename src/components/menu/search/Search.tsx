import CloseIcon from "@mui/icons-material/CloseSharp";
import SearchIcon from "@mui/icons-material/Search";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Backdrop, InputBase, LinearProgress, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tab from "@mui/material/Tab";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import * as React from "react";
import useDebounce from "../../../hooks/useDebounce";
import useStoreNoPersist from "../../../hooks/useStoreNoPersist";
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
  const [tab, setTab] = React.useState("Posts");
  const [search, setSearch] = React.useState("");
  const { loading } = useStoreNoPersist((state) => state);

  const isMobile = useMediaQuery("(min-width:760px)");

  const debouncedSearch = useDebounce(search, 500);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

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
            sx={{ width: 1, height: 1, p: 2, mt: 1 }}
            value={search}
            startAdornment={<SearchIcon sx={{ color: "text.secondary", mr: 1, my: 0.5 }} />}
            endAdornment={
              search && (
                <CloseIcon
                  fontSize="small"
                  onClick={() => setSearch("")}
                  sx={{ color: "error", ml: 1, my: 0.5, cursor: "pointer" }}
                />
              )
            }
            placeholder="Search…"
            type="search"
            onChange={(e: any) => setSearch(e?.target?.value)}
          />
        </DialogTitle>
        {loading && <LinearProgress />}
        <DialogContent sx={{ position: "relative", p: 0, minHeight: 300 }}>
          <TabContext value={tab}>
            <TabList
              onChange={handleTabChange}
              scrollButtons
              allowScrollButtonsMobile
              variant={isMobile ? "fullWidth" : "scrollable"}
              aria-label="Show reactions"
              sx={{ border: 1, borderColor: "divider", bgcolor: "background.paper" }}
            >
              {["Posts", "Users", "Tags"].map((item, i) => (
                <Tab
                  // icon={item.icon}
                  key={item}
                  iconPosition="start"
                  sx={{ minHeight: 50 }}
                  label={<Typography textTransform="capitalize">{item}</Typography>}
                  value={item}
                />
              ))}
            </TabList>
            <TabPanel sx={{ py: 1, px: 2 }} value={"Posts"}>
              <ArticlesPostsResults query={debouncedSearch} />
            </TabPanel>

            <TabPanel sx={{ py: 1, px: 2 }} value={"Users"}>
              <UsersResults query={debouncedSearch} />
            </TabPanel>

            <TabPanel sx={{ py: 1, px: 2 }} value={"Tags"}>
              <TagsResults query={debouncedSearch} />
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
