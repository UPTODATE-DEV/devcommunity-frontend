import { useRef, useEffect } from "react";

type Ref = HTMLDivElement | null;

export const useInfiniteScroll = (callback: () => void) => {
  const ref = useRef<Ref>(null);
  const isFetching = useRef(false);

  const handleScroll = () => {
    if (ref.current) {
      const { scrollHeight, clientHeight, scrollTop } = ref.current;
      if (scrollTop + clientHeight >= scrollHeight - 1 && !isFetching.current) {
        isFetching.current = true;
        callback();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return ref;
};
