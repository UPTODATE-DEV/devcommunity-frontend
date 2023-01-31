import PostContent from "@/components/common/Content";
import { useGoToPost } from "@/hooks/posts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/system/useTheme";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const SeriesListCard: React.FC<{
  data: Post;
  handleEditSeries: () => void;
  handleDeleteSeries: () => void;
}> = ({ data, handleDeleteSeries, handleEditSeries }) => {
  const theme = useTheme();
  const goToPost = useGoToPost();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const { push, asPath, locale } = useRouter();
  const username = asPath.split("/profile/")[1];

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  return (
    <Paper
      variant="outlined"
      sx={{
        pl: 2,
        pr: 3.5,
        py: 1.5,
        position: "relative",
        "&:hover": {
          borderColor: "primary.main",
          "&::after": {
            borderColor: "primary.main",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 4,
          left: -4,
          width: 1,
          height: 1,
          borderRadius: 1,
          borderLeft: "2px solid",
          borderBottom: "2px solid",
          borderColor: "divider",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 7,
          left: -7,
          width: 1,
          height: 1,
          borderRadius: 1,
          borderLeft: "2px solid",
          borderBottom: "2px solid",
          borderColor: "divider",
        },
      }}
    >
      {!username && (
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={openMenu ? "long-menu" : undefined}
          aria-expanded={openMenu ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleOpenMenu}
          sx={{ position: "absolute", right: 1, top: 4, zIndex: 4 }}
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
        <MenuItem onClick={handleEditSeries}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Modifier" : "Edit"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteSeries}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Supprimer" : "Delete"}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleGoToPost}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{locale === "fr" ? "Voir la série" : "View series"}</ListItemText>
        </MenuItem>
      </Menu>
      <Typography fontWeight={700} variant="h6" color="text.primary">
        {data?.title}
      </Typography>
      <Stack sx={{ cursor: "pointer" }} onClick={() => {}}>
        <PostContent content={`${data?.content.substring(0, 130)}...`} />
      </Stack>
    </Paper>
  );
};

export default SeriesListCard;
