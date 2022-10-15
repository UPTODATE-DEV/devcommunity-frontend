type Sex = "M" | "F";
type AccountStatus = "ACTIVE" | "DELETED" | "PENDING" | "DISABLED";

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
  tags: Tag[];
  slug: string;
  type: "QUESTION" | "ARTICLE";
  article: Article;
  question: Question;
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
}

interface Question {
  id: string;
}

type Role = "ADMIN" | "AUTHOR" | "USER";
