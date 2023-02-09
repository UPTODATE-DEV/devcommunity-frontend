import { getRequest } from "@/lib/api";
import React from "react";
import { toast } from "react-toastify";

const useUser = (id?: string): User | undefined => {
  const [user, setUSer] = React.useState<User | undefined>();

  React.useEffect(() => {
    async function getUser() {
      const response = await getRequest({ endpoint: `/users/${id}/by/id` });
      if (response.error) {
        toast.error("Error while getting user's data");
      }
      setUSer(await response.data);
    }
    getUser();
  }, [id]);
  return user;
};

export default useUser;
