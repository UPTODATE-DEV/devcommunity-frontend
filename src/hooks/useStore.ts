import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  session: Session;
  setSession(session: Session): void;
  posts: Post[] | [];
  setPosts(posts: Post[]): void;
  tags: Tag[] | [];
  setTags(tags: Tag[]): void;
  topUsers: TopUsers[] | [];
  setTopUsers: (topUsers: TopUsers[]) => void;
  bookmarks: Bookmarks[] | [];
  setBookmarks: (bookmarks: Bookmarks[]) => void;
  topPosts?: TopPosts;
  setTopPosts: (topPosts: TopPosts) => void;
  openMobileMenu: boolean;
  setOpenMobileMenu: (open: boolean) => void;
}

const useStore = create<Store>()(
  devtools(
    persist((set) => ({
      session: {
        jwt: "",
        user: undefined,
        isLoggedIn: false,
      },
      setSession: (session: Session) => {
        return set((state) => ({ ...state, session }));
      },
      posts: [],
      setPosts: (posts: Post[]) => {
        return set((state) => ({ ...state, posts }));
      },
      tags: [],
      setTags: (tags: Tag[]) => {
        return set((state) => ({ ...state, tags }));
      },
      topUsers: [],
      setTopUsers: (topUsers: TopUsers[]) => {
        return set((state) => ({ ...state, topUsers }));
      },
      bookmarks: [],
      setBookmarks: (bookmarks: Bookmarks[]) => {
        return set((state) => ({ ...state, bookmarks }));
      },
      topPosts: undefined,
      setTopPosts: (topPosts: TopPosts) => {
        return set((state) => ({ ...state, topPosts }));
      },
      openMobileMenu: false,
      setOpenMobileMenu: (openMobileMenu: boolean) => {
        return set((state) => ({ ...state, openMobileMenu }));
      },
    }))
  )
);

export default useStore;
