import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  session: Session;
  setSession(session: Session): void;
  posts: Post[] | [];
  setPosts(posts: Post[]): void;
  tags: Tag[] | [];
  setTags(tags: Tag[]): void;
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
    }))
  )
);

export default useStore;
