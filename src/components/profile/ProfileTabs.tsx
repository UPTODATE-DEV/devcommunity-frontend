import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import { deleteRequest, getRequest, patchRequest } from "@/lib/api";
import { shortenNumber } from "@/lib/shorterNumber";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DraftsIcon from "@mui/icons-material/Drafts";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import TagIcon from "@mui/icons-material/Tag";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import DraftCard from "./DraftCard";
import PostCard from "./PostCard";
import QuestionCard from "./QuestionCard";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => null,
});

const Dashboard = dynamic(import("./Dashboard"), { ssr: false });

const ProfileTabs = ({ currentUser }: { currentUser?: User }) => {
  const sessionUser = useStore((state) => state.session?.user);
  const user = useUser(sessionUser?.username);
  const [tab, setTab] = React.useState(currentUser === undefined && user?.role === "USER" ? "articles" : "dashboard");
  const [posts, setPosts] = React.useState<Post[] | []>([]);
  const [followedTags, setFollowedTags] = React.useState<Tags[] | []>([]);
  const { locale } = useRouter();

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      show: currentUser === undefined && user?.role === "AUTHOR",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      id: "articles",
      label: "Articles",
      show: true,
      icon: <HistoryEduIcon fontSize="small" />,
    },
    {
      id: "posts",
      label: "Posts",
      show: true,
      icon: <QuestionAnswer fontSize="small" />,
    },
    {
      id: "tags",
      label: "Tags",
      show: currentUser ? false : true,
      icon: <TagIcon fontSize="small" />,
    },
    {
      id: "drafts",
      label: "Drafts",
      show: currentUser ? false : true,
      icon: <DraftsIcon fontSize="small" />,
    },
  ];

  const questions = posts.filter((el) => el.type === "QUESTION");
  const articles = posts.filter((el) => el.type === "ARTICLE");
  const drafts = posts.filter((el) => el.draft);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleTagClick = async (tag: string) => {
    await patchRequest({ endpoint: `/tags/follow/${tag}/${sessionUser?.id}` });
    setFollowedTags((state) => state.filter((el) => el.tag.name !== tag));
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
    const getFollowedTags = getRequest({ endpoint: `/tags/followed/${sessionUser?.id}` });
    const [posts, followedTags] = await Promise.all([getPosts, getFollowedTags]);

    setPosts(posts.data);
    setFollowedTags(followedTags.data);
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
        variant={useMediaQuery("(min-width:760px)") ? "fullWidth" : "scrollable"}
        aria-label="Show reactions"
        sx={{ border: 1, borderColor: "divider", bgcolor: "background.paper" }}
      >
        {tabs
          .filter((el) => el.show)
          .map((item, i) => (
            <Tab
              icon={item.icon}
              key={item.id}
              iconPosition="start"
              sx={{ minHeight: 50 }}
              label={<Typography textTransform="capitalize">{item.label}</Typography>}
              value={item.id}
            />
          ))}
      </TabList>
      <TabPanel sx={{ p: 0 }} value={"posts"}>
        <Stack spacing={2}>
          {questions.length === 0 && <Empty />}
          {questions?.map((item, index) => (
            <React.Fragment key={item.id}>
              <QuestionCard handleDeletePost={() => handleDeletePost(item.id)} data={item} />
            </React.Fragment>
          ))}
        </Stack>
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"articles"}>
        <Stack spacing={2}>
          {articles.length === 0 && <Empty />}
          {articles?.map((item, index) => (
            <React.Fragment key={item.id}>
              <PostCard handleDeletePost={() => handleDeletePost(item.id)} data={item} />
            </React.Fragment>
          ))}
        </Stack>
      </TabPanel>
      {!currentUser && (
        <>
          <TabPanel sx={{ p: 0 }} value={"drafts"}>
            <Stack spacing={2}>
              {drafts.length === 0 && <Empty />}
              {drafts?.map((item, index) => (
                <React.Fragment key={item.id}>
                  <DraftCard data={item} />
                </React.Fragment>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={"tags"}>
            {followedTags.length === 0 ? (
              <Empty />
            ) : (
              <Paper variant="outlined" sx={{ py: 4, px: 2, minHeight: "300px" }}>
                <Grid container spacing={1}>
                  {followedTags.map((el, i) => (
                    <Grid item xs="auto" key={el.tag.name}>
                      <Tooltip
                        arrow
                        title={locale === "en" ? "Click to unfollow this tag" : "Cliquer pour ne plus suivre ce tag"}
                      >
                        <Chip
                          size="small"
                          onClick={() => handleTagClick(el.tag.name)}
                          icon={<TagIcon fontSize="small" />}
                          sx={{ px: 2 }}
                          label={`${el.tag.name} (${shortenNumber(el.tag._count.posts)})`}
                        />
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={"dashboard"}>
            <Paper variant="outlined" sx={{ p: 2, minHeight: "200px" }}>
              <Dashboard />
            </Paper>
          </TabPanel>
        </>
      )}
    </TabContext>
  );
};

export default ProfileTabs;
