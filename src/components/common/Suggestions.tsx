import PostCard from "@/components/posts/PostCard";
import QuestionCard from "@/components/questions/QuestionCard";
import { postRequest } from "@/lib/api";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";

const Suggestions: React.FC<{ data: Post; type: "ARTICLE" | "QUESTION" }> = ({ data, type }) => {
  const [posts, setPosts] = React.useState<Post[] | []>([]);
  const { locale } = useRouter();
  const tags = data.tags.map((el) => {
    return el.tag.name;
  });

  React.useEffect(() => {
    async function getSuggestions() {
      const res = await postRequest({ endpoint: "/posts/suggestions", data: { tags, type, postId: data.id } });
      if (res.error) {
        console.log(res.error);
      }
      setPosts(res.data);
    }
    getSuggestions();
    return () => {
      setPosts([]);
    };
  }, []);

  if (!posts?.length) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: "bold" }}>
        {locale === "en" ? "Suggestions" : "Suggestions"}
      </Typography>
      {posts
        .filter((el) => el.id !== data.id)
        .map((item) =>
          type === "ARTICLE" ? <PostCard key={item.id} data={item} /> : <QuestionCard key={item.id} data={item} />
        )}
    </>
  );
};

export default Suggestions;
