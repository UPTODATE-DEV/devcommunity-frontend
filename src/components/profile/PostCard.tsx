import Bookmark from "@/components/common/Bookmark";
import Content from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import Share from "@/components/common/Share";
import PostImage from "@/components/posts/PostImage";
import PostReaction from "@/components/posts/PostReaction";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import { parseDate } from "@/lib";
import { getArticleImageUrl, getContent } from "@/lib/posts";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
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
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { shortenNumber } from "@/lib/shorterNumber";

const PostCard: React.FC<{ data: Post; handleDeletePost: (id: string) => void }> = ({ data, handleDeletePost }) => {
  const { push, asPath, locale } = useRouter();
  const username = asPath.split("/profile/")[1];
  const goToPost = useGoToPost();
  const theme = useTheme();
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

  const goToProfile = useGoToUserProfile();
  const handleGoToProfile = useCallback(() => {
    goToProfile(data?.author?.email);
  }, [data?.author?.email]);

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
        <MenuItem onClick={() => push({ pathname: `/articles/${data?.slug}/edit` }, undefined, { shallow: true })}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Modifier" : "Edit"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDeletePost(data?.id)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Supprimer" : "Delete"}</ListItemText>
        </MenuItem>
      </Menu>
      <Grid container spacing={{ xs: 0, sm: 2, lg: 4 }}>
        <Grid item xs={12} sm={8}>
          <PostCardHeader
            handleClickGoToProfile={handleGoToProfile}
            date={parseDate({ date: data?.publishedOn, type: "relative" })}
            author={data?.author}
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
            <Content content={postContent} />
          </Stack>
          {isMobile && (
            <PostImage
              handleClick={handleGoToPost}
              title={data?.title}
              articleUrl={getArticleImageUrl(data?.article)}
            />
          )}
          <PostTags tags={data?.tags} />
        </Grid>
        {!isMobile && (
          <Grid item xs={0} sm={4}>
            <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
              <PostImage
                handleClick={handleGoToPost}
                title={data?.title}
                articleUrl={getArticleImageUrl(data?.article)}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <PostReaction post={data} />
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Link href={`/articles/${data?.slug}/#comments`} passHref>
              <IconButton>
                <CommentIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {shortenNumber(data?._count?.comments || 0)}
            </Typography>
          </Stack>

          <Bookmark post={data} />
          <Share data={data} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PostCard;
