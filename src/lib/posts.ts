import { FILES_BASE_URL } from "@/config/url";
import dayjs from "dayjs";

export const getUserFullName = (user?: User) => {
  return `${user?.firstName} ${user?.lastName}`;
};

export const getUserProfileImageUrl = (user?: User) => {
  return FILES_BASE_URL + user?.profile?.avatar?.url || undefined;
};

export const getArticleImageUrl = (article?: Article) => {
  return FILES_BASE_URL + article?.image?.url || undefined;
};

export const getContent = (content: string, limit: number) => {
  if (limit && content.length > limit) {
    return `${content.substring(0, limit)}...`;
  }
  return content;
};

export const parseDate = ({ type = "normal", date = new Date() }: { type?: "relative" | "normal"; date?: Date }) => {
  if (type === "relative") return dayjs(date).fromNow();
  return dayjs(date).fromNow();
};
