import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Image from "next/image";

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
        <Stack
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: { xs: 32, md: 42 },
            height: { xs: 32, md: 42 },
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image src={pictureUrl} alt={name} layout="fill" objectFit="cover" />
        </Stack>
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
