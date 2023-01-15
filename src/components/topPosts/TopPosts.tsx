import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { getRequest } from "../../lib";
import { TopSkeleton } from "./Skeleton";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <TopSkeleton />,
});

type Filters = "all" | "week" | "month" | "year" | "date";

const TopPosts = () => {
  const [topPosts, setTopPosts] = React.useState<TopPosts[]>([]);
  const { push, locale } = useRouter();
  const [filter, setFilter] = React.useState<Filters>("all");
  const [byDate, setByDate] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(new Date()));

  const handleFilter = (value: Filters) => {
    if (value === "date") {
      setByDate(true);
    } else {
      setByDate(false);
      setStartDate(dayjs(new Date()));
      setEndDate(dayjs(new Date()));
    }
    setFilter(value);
  };

  const handleViewPost = (post: TopPosts) => {
    push(post.type === "QUESTION" ? `/posts/${post.slug}` : `/articles/${post.slug}`);
  };

  // filter with locale
  const filters: { label: string; value: Filters }[] = [
    { label: locale === "en" ? "All times" : "Tous les temps", value: "all" },
    { label: locale === "en" ? "This week" : "Cette semaine", value: "week" },
    { label: locale === "en" ? "This month" : "Ce mois-ci", value: "month" },
    { label: locale === "en" ? "This year" : "Cette année", value: "year" },
    { label: locale === "en" ? "By date" : "Par date", value: "date" },
  ];

  const getEndPoint = (filter: Filters) => {
    if (filter === "week") return "/posts/top/posts-week";
    if (filter === "month") return "/posts/top/posts-month";
    if (filter === "year") return "/posts/top/posts-year";
    if (filter === "date")
      return `/posts/top/posts-period?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}`;
    return "/posts/top/posts";
  };

  React.useEffect(() => {
    async function getTopPosts() {
      const response = await getRequest({ endpoint: getEndPoint(filter) });
      if (response.error) return [];
      setTopPosts(response.data);
    }

    getTopPosts();
  }, [filter, startDate, endDate]);

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">{locale === "en" ? "Top Posts" : "Meilleurs posts"}</Typography>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {filters.map((el, i) => (
            <Grid item xs={12} md={2.4} key={el.value}>
              <Button
                onClick={() => handleFilter(el.value)}
                variant={el.value === filter ? "contained" : "outlined"}
                disableElevation
                sx={{ width: 1 }}
              >
                {el.label}
              </Button>
            </Grid>
          ))}
        </Grid>
        {byDate && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={5.5}>
                <DatePicker
                  value={startDate}
                  maxDate={dayjs(new Date())}
                  desktopModeMediaQuery="(min-width: 768px)"
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 1,
                        border: 1,
                        py: 1,
                        px: 2,
                        borderRadius: 1,
                        borderColor: "action.disabled",
                        "&:hover": {
                          borderColor: "action.active",
                        },
                      }}
                    >
                      <InputBase placeholder="Hello" ref={inputRef} {...(inputProps as any)} sx={{ width: 1 }} />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </Grid>
              <Grid item md={1} justifyContent="center" sx={{ width: 1 }}>
                <HorizontalRuleIcon sx={{ width: 1, mt: 1, mx: "auto" }} />
              </Grid>
              <Grid item xs={12} md={5.5}>
                <DatePicker
                  label={locale === "en" ? "To" : "Au"}
                  value={endDate}
                  minDate={startDate}
                  maxDate={dayjs(new Date())}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 1,
                        border: 1,
                        py: 1,
                        px: 2,
                        borderRadius: 1,
                        borderColor: "action.disabled",
                        "&:hover": {
                          borderColor: "action.active",
                        },
                      }}
                    >
                      <InputBase placeholder="Hello" ref={inputRef} {...(inputProps as any)} sx={{ width: 1 }} />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        {topPosts?.length === 0 && <Empty />}
        <List>
          {topPosts?.map((el, i) => (
            <React.Fragment key={i}>
              <ListItemButton
                onClick={() => handleViewPost(el)}
                sx={{
                  position: "relative",
                  "&:after": {
                    position: "absolute",
                    content: "''",
                    width: 15,
                    height: 1,
                    bottom: 0,
                    right: 0,
                    backgroundColor:
                      i === 0
                        ? "rgba(52,152,219,1)"
                        : i === 1
                        ? "rgba(52,152,219,0.5)"
                        : i === 2
                        ? "rgba(52,152,219,0.2)"
                        : "inherit",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: "primary.main", color: "white" }}
                    src={process.env.NEXT_PUBLIC_FILES_BASE_URL + el?.author?.profile?.avatar?.url}
                    alt={`${el.author.firstName} ${el.author.lastName}`}
                  >
                    {el.author.firstName.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={el.title}
                  primaryTypographyProps={{
                    fontWeight: 700,
                  }}
                  secondaryTypographyProps={{
                    fontWeight: 700,
                  }}
                  secondary={
                    <span>
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {locale === "en" ? "By" : "Par"} {`${el.author.firstName} ${el.author.lastName}`}
                      </Typography>
                      {` — ${el?.reactions} reactions`}
                    </span>
                  }
                />
              </ListItemButton>
              {i < topPosts.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default TopPosts;
