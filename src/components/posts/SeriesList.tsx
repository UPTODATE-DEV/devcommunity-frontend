import { useGoToPost } from "@/hooks";
import ListIcon from "@mui/icons-material/List";
import { Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useCallback } from "react";
import useStore from "../../hooks/useStore";

interface SeriesListProps {
  series: {
    posts: {
      post: Post;
      module: number;
      id: string;
    }[];
  };
}

const SeriesList = ({ series }: { series: SeriesListProps[] }) => {
  const { locale } = useRouter();

  const { currentPost } = useStore((state) => state);

  const { query } = useRouter();

  const goToPost = useGoToPost();

  const handleGoToPost = useCallback((data: Post) => {
    goToPost(data);
  }, []);

  return (
    <Stack sx={{ bgcolor: "action.hover", p: 2, borderRadius: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <ListIcon fontSize="large" />
        <Typography variant="h6" fontWeight={700}>
          {locale === "fr" ? "TABLE DES MATIÈRES" : "TABLE OF CONTENTS"}
        </Typography>
      </Stack>

      <Stack sx={{ pl: 6 }}>
        {series.map((el, i) => (
          <Fragment key={i}>
            {el.series.posts.map((el) => {
              return (
                <Typography
                  color={query?.slug === el.post.slug ? "primary.main" : "text.secondary"}
                  sx={{
                    "&:hover": { color: "primary.main" },
                    cursor: "pointer",
                    my: 0.4,
                    textDecoration: query?.slug === el.post.slug ? "underline" : "none",
                  }}
                  fontWeight={700}
                  key={el.id}
                  onClick={() => handleGoToPost(el.post)}
                >
                  {el.post.title}
                </Typography>
              );
            })}
            {series.length > 1 && i !== series.length - 1 && <Divider sx={{ my: 3 }} />}
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default SeriesList;
