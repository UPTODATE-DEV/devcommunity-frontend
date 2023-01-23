type Sex = "M" | "F";
type AccountStatus = "ACTIVE" | "DELETED" | "PENDING" | "DISABLED";
type ArticleReactionType = "LIKE" | "LOVE" | "USEFUL";
type QuestionReactionType = "LIKE" | "DISLIKE";
type Role = "ADMIN" | "AUTHOR" | "USER";

interface Session {
  isLoggedIn: boolean;
  jwt: string;
  user?: User;
}

interface User {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: File;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profile: Profile;
  password: string;
  accountStatus: AccountStatus;
  confirmationCode: string;
  role: Role;
  posts: Post[];
  comments: PostComment[];
  authorRequest: {
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    user: User;
  }[];
  followers: any[];
  followings: any[];
}

interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  draft: boolean;
  content: string;
  publishedOn: Date;
  locale: "FR" | "EN";
  author: User;
  tags: Tags[];
  slug: string;
  type: "QUESTION" | "ARTICLE";
  article: Article;
  question: Question;
  comments: PostComment[];
  series: Series[];
  bookmarks: Bookmarks[];
  _count: { comments: number };
}

interface Series {
  id: string;
  module: number;
  post: Post;
}
interface PostComment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  author: User;
  parentComment?: PostComment;
  post: Post;
  depth: number;
  reactions: CommentReaction[];
  childrenComments: PostComment[];
  _count: { comments: number; childrenComments: number };
}

interface CommentReaction {
  id: string;
  question: string;
  user: User;
  type: QuestionReactionType;
}

interface Profile {
  id: string;
  avatar: File;
  bio: string;
  job: string;
  website: string;
  country: string;
  town: string;
  sex: Sex;
  phone: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  gitHub: string;
}

interface Phone {
  id: string;
  number: string;
  code: string;
}

interface Tag {
  id: string;
  name: string;
  _count: { posts: number };
}

interface Tags {
  tag: Tag;
}

interface File {
  id: string;
  name: string;
  width?: number;
  height?: number;
  size: number;
  mime: string;
  url: string;
}

interface Article {
  id: string;
  image: File;
  reactions: ArticleReaction[];
}

interface ArticleReaction {
  id: string;
  article: string;
  user: User;
  type: ArticleReactionType;
}

interface Question {
  id: string;
  reactions: QuestionsReaction[];
}

interface QuestionsReaction {
  id: string;
  question: string;
  user: User;
  type: QuestionReactionType;
}

interface TopUsers {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  totalReactions: number;
}

interface Bookmarks {
  id: string;
  post: Post;
  userId: string;
}

interface TopPostsOfTheWeek {
  topQuestionsOfTheWeek: Post[];
  topArticlesOfTheWeek: Post[];
}

interface TopPosts {
  id: string;
  title: string;
  reactions: number;
  author: User;
  slug: string;
  type: "QUESTION" | "ARTICLE";
}

interface Notification {
  id: string;
  createdAt: Date;
  notificationToUser: User;
  notificationFromUser: User;
  type: "COMMENT" | "REPLY" | "LIKE" | "DISLIKE" | "BOOKMARK" | "SHARE" | "FOLLOW" | "LOVE" | "USEFUL";
  post: Post;
  comment: PostComment;
  read: boolean;
}

interface Notifications {
  date: string;
  notifications: Notification[];
}

type DateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChangeStartDate: (newValue: Date | null) => void;
  onChangeEndDate: (newValue: Date | null) => void;
  //
  open: boolean;
  onOpen?: VoidFunction;
  onClose: VoidFunction;
  onReset?: VoidFunction;
  //
  isSelected?: boolean;
  isError?: boolean;
  //
  label?: string;
  shortLabel?: string;
  //
  title?: string;
  variant?: "calendar" | "input";
  //
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
};
