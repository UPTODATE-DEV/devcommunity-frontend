import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

const RightSideBar = () => {
  const data = [
    {
      id: 1,
      name: "Luccin Masirika",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/avatar.jpg",
    },
    {
      id: 2,
      name: "Luccin Masirika",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/avatar.jpg",
    },
    {
      id: 3,
      name: "Luccin Masirika",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/avatar.jpg",
    },
    {
      id: 4,
      name: "Luccin Masirika",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/avatar.jpg",
    },
  ];

  return (
    <Stack>
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        Top posts of the Week
      </Typography>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Luccin Masirika" src={item.image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {item.name}
                    </Typography>
                    {` — ${item.description.substring(0, 60)}...`}
                  </React.Fragment>
                }
              />
            </ListItemButton>
            {data.length !== item.id && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        Top questions of the Week
      </Typography>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Luccin Masirika" src={item.image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {item.name}
                    </Typography>
                    {` — 1230 likes`}
                  </React.Fragment>
                }
              />
            </ListItemButton>
            {data.length !== item.id && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default RightSideBar;
