import { Avatar, IconButton } from "@mui/material";

const UserAvatar = ({
  name = "",
  pictureUrl,
  handleClick,
}: {
  name?: string;
  pictureUrl?: string;
  handleClick: () => void;
}) => {
  return (
    <IconButton onClick={handleClick} sx={{ p: 0 }}>
      {pictureUrl ? (
        <Avatar sx={{ bgcolor: "primary.main", color: "white" }} src={pictureUrl} alt={name} />
      ) : (
        <Avatar sx={{ bgcolor: "primary.main", color: "white" }} alt={name}>
          {name.charAt(0)}
        </Avatar>
      )}
    </IconButton>
  );
};

export default UserAvatar;
