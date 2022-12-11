import axios from "axios";
import { BASE_API_URL } from "../config/url";

export const useFetcher = async (url: string): Promise<any> => {
  const { data } = await axios.get(url, {
    baseURL: BASE_API_URL,
  });
  return data;
};
