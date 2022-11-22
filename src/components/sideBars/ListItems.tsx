import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";

const ListItems = ({ item, handleViewPost }: { item: Post; handleViewPost: (path: string) => void }) => {
  const { locale } = useRouter();

  return (
    <React.Fragment key={item.id}>
      <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(item.slug)}>
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: "primary.main", color: "white" }}
            alt={`${item.author.firstName} ${item.author.lastName}`}
            src={process.env.NEXT_PUBLIC_FILES_BASE_URL + item?.author?.profile?.avatar?.url}
          >
            {item.author.firstName.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            fontWeight: 700,
          }}
          secondary={
            <Stack sx={{ width: 1 }} component="span">
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                {locale === "en" ? "By" : "Par"} {`${item.author.firstName} ${item.author.lastName}`}
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

export default ListItems;
