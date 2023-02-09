import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/router";

const Logo = () => {
  const { push } = useRouter();
  const handleGoHome = () => {
    push("/");
  };

  return (
    <Stack
      sx={{
        width: 110,
        display: { xs: "none", md: "flex" },
        height: 1,
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleGoHome}
    >
      <Image src="/logo.png" layout="fill" objectFit="contain" priority />
    </Stack>
  );
};

export default Logo;
