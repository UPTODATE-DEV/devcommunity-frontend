import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import { postRequest } from "@/lib/api";

const PostSuggestions: React.FC<{ data: Post }> = ({ data }) => {
  const [posts, setPosts] = React.useState<Post[] | []>([]);
  const { locale, push } = useRouter();
  const tags = data.tags.map((el) => {
    return el.tag.name;
  });

  React.useEffect(() => {
    async function getSuggestions() {
      const res = await postRequest({ endpoint: "/posts/tags", data: tags });
      if (res.error) {
        console.log(res.error);
      }
      setPosts(res.data?.filter((el: Post) => el.type === "ARTICLE").slice(0, 5));
    }
    getSuggestions();
  }, []);

  if (!posts.length) {
    return null;
  }

  return (
    <Stack sx={{ position: "relative", width: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        {locale === "en" ? "Suggestions" : "Suggestions"}
      </Typography>
      <Divider />
      <List sx={{ width: { xs: "100%" }, bgcolor: "background.paper" }}>
        {posts?.map((item, i) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start" onClick={() => push(`/articles/${item.slug}`)}>
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
                secondary={
                  <Stack sx={{ width: 1 }} component="span">
                    <Typography sx={{ display: "inline" }} component="span" variant="caption" color="text.primary">
                      {locale === "en" ? "By" : "Par"} {`${item.author.firstName} ${item.author.lastName}`}
                    </Typography>
                  </Stack>
                }
              />
            </ListItemButton>
            {i !== posts.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default PostSuggestions;
