import React from "react";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useRouter } from "next/router";

const Logo = () => {
  const { push } = useRouter();
  const handleGoHome = () => {
    push("/");
  };

  return (
    <Stack sx={{ width: 110, height: 50, position: "relative", cursor: "pointer" }} onClick={handleGoHome}>
      <Image src="/logo.svg" layout="fill" objectFit="contain" />
    </Stack>
  );
};

export default Logo;
