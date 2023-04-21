import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import useStoreNoPersist from "../../../hooks/useStoreNoPersist";
import { getRequest } from "../../../lib";
import ResultsTitle from "./ResultsTitle";

const ArticlesPostsResults = ({ query }: { query: string }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const { setLoading } = useStoreNoPersist((state) => state);

  const count = posts.length;

  React.useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const tags = await getRequest({ endpoint: `/posts?search=${query}` });
      if (!tags.error) {
        setLoading(false);
        setPosts(tags.data);
      }
      setLoading(false);
    };

    if (query) {
      getPosts();
    }
  }, [query]);

  return (
    <Stack sx={{ py: 1 }} spacing={1}>
      <ResultsTitle title="Posts" count={count} />
      {count === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
      )}
      {posts.map((post, i) => (
        <Typography
          key={i}
          variant="body2"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
          }}
        >
          <Link href={`/${post.type === "ARTICLE" ? "articles" : "posts"}/${post.slug}`}>{post.title}</Link>
        </Typography>
      ))}
    </Stack>
  );
};

export default ArticlesPostsResults;
