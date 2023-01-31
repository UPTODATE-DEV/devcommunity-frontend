import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface Store {
  session: Session;
  setSession(session: Session): void;
  posts: Post[] | [];
  setPosts(posts: Post[]): void;
  comments: PostComment[] | [];
  setComments(posts: PostComment[]): void;
  tags: Tag[] | [];
  setTags(tags: Tag[]): void;
  topUsers: TopUsers[] | [];
  setTopUsers: (topUsers: TopUsers[]) => void;
  bookmarks: Bookmarks[] | [];
  setBookmarks: (bookmarks: Bookmarks[]) => void;
  topPostsOfTheWeek?: TopPostsOfTheWeek;
  setTopPostsOfTheWeek: (topPosts: TopPostsOfTheWeek) => void;
  topPosts?: TopPosts[];
  setTopPosts: (topPosts: TopPosts[]) => void;
  currentPost: Post | null;
  setCurrentPost: (post: Post | null) => void;
  currentComment: PostComment | null;
  setCurrentComment: (comment: PostComment | null) => void;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  openMobileMenu: boolean;
  setOpenMobileMenu: (open: boolean) => void;
  notifications: Notifications[] | [];
  setNotifications: (notifications: Notifications[]) => void;
  notificationsCount: number;
  setNotificationsCount: (notificationsCount: number) => void;
  tagsFilters: Tag[] | [];
  setTagsFilters: (tags: Tag) => void;
  clearTagsFilters: () => void;
  setMultiTagsFilters: (tags: Tag[]) => void;
  showTagsFilters: boolean;
  setShowTagsFilters: (state: boolean) => void;
  post: Post | null;
  setPost: (post: Post) => void;
  profileTab: string | undefined;
  setProfileTab: (tab: string) => void;
  series: { id: string; posts: Series[] }[];
  setSeries: (series: { id: string; posts: Series[] }[]) => void;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
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
        comments: [],
        setComments: (comments: PostComment[]) => {
          return set((state) => ({ ...state, comments }));
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
        notificationsCount: 0,
        setNotificationsCount: (notificationsCount: number) => {
          return set((state) => ({ ...state, notificationsCount }));
        },
        currentPost: null,
        setCurrentPost: (currentPost: Post | null) => {
          return set((state) => ({ ...state, currentPost }));
        },
        currentComment: null,
        setCurrentComment: (currentComment: PostComment | null) => {
          return set((state) => ({ ...state, currentComment }));
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
        setMultiTagsFilters: (tags: Tag[]) => {
          return set((state) => ({ ...state, tagsFilters: tags }));
        },
        showTagsFilters: false,
        setShowTagsFilters: (showTagsFilters: boolean) => {
          return set((state) => ({ ...state, showTagsFilters }));
        },
        currentUser: null,
        setCurrentUser: (user: User) => {
          return set((state) => ({ ...state, user }));
        },
        post: null,
        setPost: (post: Post) => {
          return set((state) => ({ ...state, post }));
        },
        profileTab: undefined,
        setProfileTab: (tab: string) => {
          return set((state) => ({ ...state, profileTab: tab }));
        },
        series: [],
        setSeries: (series: { id: string; posts: Series[] }[]) => {
          return set((state) => ({ ...state, series }));
        },
      }),
      {
        name: "store-updev-community",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useStore;
