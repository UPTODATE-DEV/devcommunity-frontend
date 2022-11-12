import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  session: Session;
  setSession(session: Session): void;
  posts: Post[] | [];
  setPosts(posts: Post[]): void;
  tags: Tag[] | [];
  setTags(tags: Tag[]): void;
  editProfile: boolean;
  setEditProfile: (state: boolean) => void;
  topUsers: TopUsers[] | [];
  setTopUsers: (topUsers: TopUsers[]) => void;
  bookmarks: Bookmarks[] | [];
  setBookmarks: (bookmarks: Bookmarks[]) => void;
  topPostsOfTheWeek?: TopPostsOfTheWeek;
  setTopPostsOfTheWeek: (topPosts: TopPostsOfTheWeek) => void;
  topPosts?: TopPosts[];
  setTopPosts: (topPosts: TopPosts[]) => void;
  currentPost: Post | null;
  setCurrentPost: (post: Post) => void;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  openMobileMenu: boolean;
  setOpenMobileMenu: (open: boolean) => void;
  notifications: Notifications[] | [];
  setNotifications: (notifications: Notifications[]) => void;
  tagsFilters: Tag[] | [];
  setTagsFilters: (tags: Tag) => void;
  clearTagsFilters: () => void;
  showTagsFilters: boolean;
  setShowTagsFilters: (state: boolean) => void;
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
      topPosts: [],
      setTopPosts: (topPosts: TopPosts[]) => {
        return set((state) => ({ ...state, topPosts }));
      },
      topPostsOfTheWeek: undefined,
      setTopPostsOfTheWeek: (topPostsOfTheWeek: TopPostsOfTheWeek) => {
        return set((state) => ({ ...state, topPostsOfTheWeek }));
      },
      openMobileMenu: false,
      setOpenMobileMenu: (openMobileMenu: boolean) => {
        return set((state) => ({ ...state, openMobileMenu }));
      },
      notifications: [],
      setNotifications: (notifications: Notifications[]) => {
        return set((state) => ({ ...state, notifications }));
      },
      currentPost: null,
      setCurrentPost: (currentPost: Post) => {
        return set((state) => ({ ...state, currentPost }));
      },
      tagsFilters: [],
      setTagsFilters: (tag: Tag) => {
        return set((state) => ({
          ...state,
          tagsFilters: state.tagsFilters.find((el) => el.id === tag.id)
            ? state.tagsFilters.filter((el) => el.id !== tag.id)
            : [...state.tagsFilters, tag],
        }));
      },
      clearTagsFilters: () => {
        return set((state) => ({ ...state, tagsFilters: [] }));
      },
      showTagsFilters: false,
      setShowTagsFilters: (showTagsFilters: boolean) => {
        return set((state) => ({ ...state, showTagsFilters }));
      },
      currentUser: null,
      setCurrentUser: (user: User) => {
        return set((state) => ({ ...state, user }));
      },
      editProfile: false,
      setEditProfile: (editProfile: boolean) => {
        return set((state) => ({ ...state, editProfile }));
      },
    }))
  )
);

export default useStore;
