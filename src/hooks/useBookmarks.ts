import useSWRInfinite from "swr/infinite";
import axios from "axios";
import qs from "qs";
import React from "react";
import { API } from "@/config/url";
import useStore from "@/hooks/useStore";

const useBookmarks = () => {
  const [open, setOpen] = React.useState(false);
  const session = useStore((state) => state.session?.user);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [endOfPage, setEndOfPage] = React.useState(false);
  const [perPage, setPerPage] = React.useState(10);

  const params = qs.stringify({ perPage });

  const fetcher = async (url: string): Promise<any> => {
    const { data } = await axios.get(url, {
      baseURL: API,
    });
    return data;
  };

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) {
      setEndOfPage(true);
      return null;
    }
    return `/posts?page=${pageIndex + 1}&${params}`;
  };

  const { data, size, setSize, isLoading, error, isValidating } = useSWRInfinite<Post[], any>(getKey, fetcher);

  return { data, size, setSize, isLoading, error, isValidating, endOfPage };
};

export default useBookmarks;
