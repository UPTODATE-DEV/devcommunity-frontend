import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

const UserAvatar = ({
  name,
  pictureUrl,
  handleClick,
}: {
  name?: string;
  pictureUrl?: string;
  handleClick?: () => void;
}) => {
  if (!name) {
    return null;
  }

  return (
    <IconButton onClick={handleClick} sx={{ p: 0 }}>
      {pictureUrl ? (
        <Avatar sx={{ bgcolor: "primary.main", color: "white" }} src={pictureUrl} alt={name} />
      ) : (
        <Avatar sx={{ bgcolor: "primary.main", color: "white", fontSize: 14, fontWeight: 700 }} alt={name}>
          {name.charAt(0)}
          {name.split(" ")[1].charAt(0)}
        </Avatar>
      )}
    </IconButton>
  );
};

export default UserAvatar;
