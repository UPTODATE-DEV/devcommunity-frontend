import { useGoToPost } from "@/hooks";
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
    <Stack>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
        {locale === "fr" ? "Cet article fait partie d'une série" : "This post is part of a series"}
      </Typography>

      <Stack sx={{ pl: 1, borderLeft: "4px solid", borderLeftColor: "divider" }}>
        {series.map((el, i) => (
          <Fragment key={i}>
            {el.series.posts.map((el) => {
              return (
                <Typography
                  color={query?.slug === el.post.slug ? "primary.main" : "text.secondary"}
                  sx={{ "&:hover": { color: "primary.main" }, cursor: "pointer", textDecoration: "underline" }}
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
