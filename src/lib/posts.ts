import { FILES_BASE_URL } from "@/config/url";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const getUserFullName = (user?: User) => {
  return user && `${user?.firstName?.trim()} ${user?.lastName?.trim()}`;
};

export const getUserProfileImageUrl = (user?: User) => {
  return user?.profile?.avatar?.url ? FILES_BASE_URL + user?.profile?.avatar?.url : undefined;
};

export const getArticleImageUrl = (article?: Article) => {
  return article?.image?.url ? FILES_BASE_URL + article?.image?.url : undefined;
};

export const getContent = (content: string, limit: number, locale: string | undefined) => {
  if (limit && content.length > limit) {
    return `${content.substring(0, limit)}... <span class="see-more">${locale === "en" ? "See more" : "Voir plus"}</span>`;
  }
  return content;
};

export const parseDate = ({ type = "normal", date = new Date() }: { type?: "relative" | "normal"; date?: Date }) => {
  if (type === "relative") return dayjs(date).fromNow();
  return dayjs(date).format("DD/MM/YYYY");
};
