import { useRouter } from "next/router";
import { useCallback } from "react";

export const useGoToUserProfile = () => {
  const router = useRouter();

  const getUserProfilePath = useCallback((username?: string) => {
    if (username) return `/profile/@${username}`;
    return "/profile";
  }, []);

  const navigate = useCallback(
    (user?: User) => {
      console.log("🚀 ~ file: posts.ts:22 ~ useGoToUserProfile ~ user:", user)
      const userProfilePath = getUserProfilePath(user?.username);
      router.push(userProfilePath);
    },
    [getUserProfilePath, router]
  );

  return navigate;
};

export const useGoToPost = () => {
  const router = useRouter();

  const navigate = useCallback(
    (post?: Post) => {
      return router.push(
        `/${post?.type === "ARTICLE" ? "articles" : "posts"}/${post?.slug}${post?.draft ? "/preview" : ""}`
      );
    },
    [router]
  );

  return navigate;
};
