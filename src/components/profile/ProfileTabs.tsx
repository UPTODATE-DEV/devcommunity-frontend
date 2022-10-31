import ClassIcon from "@mui/icons-material/Class";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Stack, Typography, IconButton } from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";
import { Avatar, Button } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ManageAccounts from "@mui/icons-material/ManageAccountsSharp";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useStore from "@/hooks/useStore";
import { deleteRequest, getRequest } from "@/lib/api";
import CommentIcon from "@mui/icons-material/Comment";
import PostCard from "./PostCard";
import QuestionCard from "./QuestionCard";
import PostComment from "../posts/PostComment";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import Fab from "@mui/material/Fab";
import useMediaQuery from "@mui/material/useMediaQuery";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const ProfileTabs = () => {
  const [tab, setTab] = React.useState("0");
  const { setPosts, posts } = useStore((state) => state);
  const user = useStore((state) => state.session?.user);
  const [comments, setComments] = React.useState<PostComment[] | []>([]);

  const tabs = [
    {
      id: 0,
      label: "Posts",
      icon: <QuestionAnswer />,
    },
    {
      id: 1,
      label: "Articles",
      icon: <HistoryEduIcon />,
    },
    {
      id: 2,
      label: "Comments",
      icon: <CommentIcon />,
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleDeleteComment = async (id: string) => {
    const response = await deleteRequest({ endpoint: `/comments/${id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      setComments((state) => state.filter((el) => el.id !== id));
    }
  };

  const handleDeletePost = async (id: string) => {
    const response = await deleteRequest({ endpoint: `/posts/${id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      setPosts(posts.filter((el) => el.id !== response.data?.id) as Post[]);
    }
  };

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: `/posts/author/${user?.id}` });
      if (!posts.error) {
        setPosts(posts.data);
      }
    };

    getPosts();

    async function getComment() {
      const res = await getRequest({ endpoint: `/comments/author/${user?.id}` });
      if (res.error) {
        console.log(res.error);
      }
      setComments(res.data);
    }
    getComment();
  }, []);

  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleTabChange}
        variant={useMediaQuery("(min-width:600px)") ? "fullWidth" : "scrollable"}
        aria-label="lab API tabs example"
        sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}
      >
        {tabs.map((item, i) => (
          <Tab
            icon={item.icon}
            key={item.id}
            iconPosition="start"
            sx={{ minHeight: 50 }}
            label={<Typography>{item.label}</Typography>}
            value={i.toString()}
          />
        ))}
      </TabList>
      <TabPanel sx={{ p: 0 }} value={"0"}>
        <Stack spacing={5}>
          {posts
            .filter((el) => el.type === "QUESTION")
            .map((item, index) => (
              <React.Fragment key={item.id}>
                <QuestionCard handleDeletePost={handleDeletePost} data={item} />
                {posts.length !== index && <Divider />}
              </React.Fragment>
            ))}
        </Stack>
        <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
          <CircularProgress />
        </Stack>
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"1"}>
        <Stack spacing={5}>
          {posts
            .filter((el) => el.type === "ARTICLE")
            .map((item, index) => (
              <React.Fragment key={item.id}>
                <PostCard handleDeletePost={handleDeletePost} data={item} />
                {posts.length !== index && <Divider />}
              </React.Fragment>
            ))}
        </Stack>
        <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
          <CircularProgress />
        </Stack>
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"2"}>
        <Stack spacing={2}>
          {comments.map((el, index) => (
            <React.Fragment key={el.id}>
              <Stack direction="row" spacing={2}>
                <Avatar alt={`${el?.author?.firstName} ${el?.author?.lastName}`} src={el?.author?.avatar?.url}>
                  {el?.author?.firstName.charAt(0)}
                </Avatar>
                <Stack sx={{ position: "relative", width: 1 }}>
                  <Typography color="text.primary" fontWeight={700}>
                    {el?.author?.firstName} {el?.author?.lastName}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: el.content,
                    }}
                  />
                  <Stack direction="row" flexWrap="wrap" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ px: 2 }}
                      onClick={() => handleDeleteComment(el.id)}
                      startIcon={<RemoveRedEyeIcon />}
                    >
                      Go to post
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{ px: 2 }}
                      onClick={() => handleDeleteComment(el.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
        <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
          <CircularProgress />
        </Stack>
      </TabPanel>
    </TabContext>
  );
};

export default ProfileTabs;
