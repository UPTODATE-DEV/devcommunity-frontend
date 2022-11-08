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
  createdAt: Date;
  updatedAt: Date;
  avatar: File;
  firstName: string;
  lastName: string;
  email: string;
  profile: Profile;
  password: string;
  accountStatus: AccountStatus;
  confirmationCode: string;
  role: Role;
}

interface Post {
  id: string;
  title: string;
  content: string;
  publishedOn: Date;
  author: User;
  tags: { tag: Tag }[];
  slug: string;
  type: "QUESTION" | "ARTICLE";
  article: Article;
  question: Question;
  comments: PostComment[];
  bookmarks: Bookmarks[];
}

interface PostComment {
  id: string;
  content: string;
  author: User;
}

interface Profile {
  id: string;
  avatar: File;
  bio: string;
  website: string;
  country: string;
  town: string;
  sex: Sex;
  phone: Phone;
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
  _count: number;
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

interface TopPosts {
  topQuestionsOfTheWeek: Post[];
  topArticlesOfTheWeek: Post[];
}

interface Notifications {
  id: string;
  createdAt: Date;
  notificationToUser: User;
  notificationFromUser: User;
  type: "COMMENT" | "REPLY" | "LIKE" | "DISLIKE" | "BOOKMARK" | "SHARE" | "FOLLOW" | "LOVE" | "USEFUL";
  post: Post;
  comment: Comment;
  read: boolean;
}