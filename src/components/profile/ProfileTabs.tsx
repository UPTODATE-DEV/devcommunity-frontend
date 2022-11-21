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
import { FILES_BASE_URL } from "config/url";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => null,
});

const ProfileTabs = ({ currentUser }: { currentUser?: User }) => {
  const [tab, setTab] = React.useState("0");
  const [posts, setPosts] = React.useState<Post[] | []>([]);
  const sessionUser = useStore((state) => state.session?.user);
  const { push, locale } = useRouter();
  const [comments, setComments] = React.useState<PostComment[] | []>([]);

  const useUserData = useUser(sessionUser?.username);
  const user = currentUser || useUserData;

  const tabs = [
    {
      id: 0,
      label: "Posts",
      show: true,
      icon: <QuestionAnswer />,
    },
    {
      id: 1,
      label: "Articles",
      show: true,
      icon: <HistoryEduIcon />,
    },
    {
      id: 2,
      label: locale === "en" ? "Comments" : "commentaires",
      show: currentUser ? false : true,
      icon: <CommentIcon />,
    },
  ];

  const questions = posts.filter((el) => el.type === "QUESTION");
  const articles = posts.filter((el) => el.type === "ARTICLE");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleViewPost = (data: Post) => {
    push(`${data?.type === "ARTICLE" ? "/articles" : "/posts"}/${data?.slug}`);
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

  const fetchData = async () => {
    const getPosts = getRequest({ endpoint: `/posts/author/${currentUser?.id || sessionUser?.id}` });
    const getComments = getRequest({ endpoint: `/comments/author/${currentUser?.id || sessionUser?.id}` });

    const [posts, comments] = await Promise.all([getPosts, getComments]);

    setPosts(posts.data);
    setComments(comments.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleTabChange}
        scrollButtons
        allowScrollButtonsMobile
        variant={useMediaQuery("(min-width:600px)") ? "fullWidth" : "scrollable"}
        aria-label="lab API tabs example"
        sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}
      >
        {tabs.map(
          (item, i) =>
            item.show && (
              <Tab
                icon={item.icon}
                key={item.id}
                iconPosition="start"
                sx={{ minHeight: 50 }}
                label={<Typography>{item.label}</Typography>}
                value={i.toString()}
              />
            )
        )}
      </TabList>
      <TabPanel sx={{ p: 0 }} value={"0"}>
        <Stack spacing={5}>
          {questions.length === 0 && <Empty />}
          {questions?.map((item, index) => (
            <React.Fragment key={item.id}>
              <QuestionCard handleDeletePost={() => handleDeletePost(item.id)} data={item} />
              {posts.length !== index && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
        {/* <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
          <CircularProgress />
        </Stack> */}
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"1"}>
        <Stack spacing={5}>
          {articles.length === 0 && <Empty />}
          {articles?.map((item, index) => (
            <React.Fragment key={item.id}>
              <PostCard handleDeletePost={() => handleDeletePost(item.id)} data={item} />
              {posts.length !== index && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
      </TabPanel>
      {!currentUser && (
        <TabPanel sx={{ p: 0 }} value={"2"}>
          <Stack spacing={1}>
            {comments.length === 0 && <Empty />}
            {comments.map((el, index) => (
              <React.Fragment key={el.id}>
                <Stack direction="row" spacing={2}>
                  <IconButton onClick={() => push(`/profile/@${user?.email.split("@")[0]}`)}>
                    <Avatar
                      sx={{ bgcolor: "primary.main", color: "white" }}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      src={`${FILES_BASE_URL}${user?.profile?.avatar?.url}`}
                    >
                      {user?.firstName?.charAt(0)}
                    </Avatar>
                  </IconButton>
                  <Stack sx={{ position: "relative", width: 1 }}>
                    <Typography
                      color="text.primary"
                      onClick={() => push(`/profile/@${user?.email.split("@")[0]}`)}
                      sx={{
                        "&:hover": {
                          color: "primary.main",
                        },
                        cursor: "pointer",
                      }}
                      fontWeight={700}
                    >
                      {user?.firstName} {user?.lastName}
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
                        onClick={() => handleViewPost(el.post)}
                        startIcon={<RemoveRedEyeIcon />}
                      >
                        {locale === "en" ? "View post" : "Voir le post"}
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        sx={{ px: 2 }}
                        onClick={() => handleDeleteComment(el.id)}
                        startIcon={<DeleteIcon />}
                      >
                        {locale === "en" ? "Delete" : "Supprimer"}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
                <Divider />
              </React.Fragment>
            ))}
          </Stack>
        </TabPanel>
      )}
    </TabContext>
  );
};

export default ProfileTabs;
