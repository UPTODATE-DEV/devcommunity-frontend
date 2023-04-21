import { Avatar, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useGoToUserProfile } from "../../../hooks";
import useStoreNoPersist from "../../../hooks/useStoreNoPersist";
import { getRequest, getUserProfileImageUrl } from "../../../lib";
import ResultsTitle from "./ResultsTitle";

const UsersResults = ({ query }: { query: string }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const { setLoading } = useStoreNoPersist((state) => state);
  const count = users.length;

  const goToProfile = useGoToUserProfile();

  React.useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const tags = await getRequest({ endpoint: `/users?search=${query}` });
      if (!tags.error) {
        setLoading(false);
        setUsers(tags.data);
      }
      setLoading(false);
    };

    if (query) {
      getUsers();
    }
  }, [query]);

  return (
    <Stack sx={{ py: 1 }} spacing={1}>
      <ResultsTitle title="Users" count={count} />
      {count === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
      )}
      {users.map((user, i) => (
        <Stack direction="row" spacing={1} onClick={() => goToProfile(user)} key={i} sx={{ cursor: "pointer" }}>
          {getUserProfileImageUrl(user) ? (
            <Avatar alt={user?.firstName} src={getUserProfileImageUrl(user)} />
          ) : (
            <Avatar
              sx={{ bgcolor: "primary.main", color: "white", fontSize: 14, fontWeight: 700 }}
              alt={user?.firstName}
            >
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Avatar>
          )}

          <Stack>
            <Typography sx={{ color: "text.primary" }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              @{user.username}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default UsersResults;
