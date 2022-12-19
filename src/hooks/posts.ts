import { useRouter } from "next/router";
import { useCallback } from "react";

export const useGoToUserProfile = () => {
  const router = useRouter();

  const getUserProfilePath = useCallback((email?: string) => {
    if (email) return `/profile/@${email.split("@")[0]}`;
    return "/profile";
  }, []);

  const navigate = useCallback(
    (email?: string) => {
      const userProfilePath = getUserProfilePath(email);
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
      return router.push(`/${post?.type === "ARTICLE" ? "articles" : "posts"}/${post?.slug}`);
    },
    [router]
  );

  return navigate;
};
