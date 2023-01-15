import PostContent from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import { getContent, parseDate } from "@/lib/posts";
import EditIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublishIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const DraftCard: React.FC<{ data: Post }> = ({ data }) => {
  const { push, asPath, locale } = useRouter();
  const username = asPath.split("/profile/")[1];
  const theme = useTheme();
  const { author } = data;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const postContent = getContent(data?.content, isMobile ? 180 : 220, locale);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  return (
    <Paper variant="outlined" sx={{ p: 2, position: "relative" }}>
      {!username && (
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={openMenu ? "long-menu" : undefined}
          aria-expanded={openMenu ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleOpenMenu}
          sx={{ position: "absolute", right: 1, top: 4 }}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() =>
            push({ pathname: `/${data?.type === "ARTICLE" ? "articles" : "posts"}/${data?.slug}/edit` }, undefined, {
              shallow: true,
            })
          }
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Modifier" : "Edit"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleGoToPost}>
          <ListItemIcon>
            <PublishIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Prévisualiser" : "Preview"}</ListItemText>
        </MenuItem>
      </Menu>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.publishedOn, type: "relative" })}
        author={author}
      />
      <Typography
        fontWeight={700}
        color="text.primary"
        variant="h6"
        onClick={handleGoToPost}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
          mb: "-8px",
          mt: 1,
        }}
      >
        {data?.title}
      </Typography>
      <Stack sx={{ cursor: "pointer" }} onClick={handleGoToPost}>
        <PostContent content={postContent} />
      </Stack>
      <PostTags tags={data?.tags} />
    </Paper>
  );
};

export default DraftCard;
