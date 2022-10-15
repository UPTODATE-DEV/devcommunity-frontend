import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React from "react";

const CallToAction = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    push("/auth/login");
  };

  const handleRegister = () => {
    push("/auth/register");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={handleRegister}
        variant="outlined"
        color="secondary"
        sx={{ borderRadius: 10, px: 4, py: 1 }}
        disableElevation
      >
        Register
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ borderRadius: 10, px: 4, py: 1 }}
        disableElevation
      >
        Log In
      </Button>
    </Stack>
  );
};

export default CallToAction;
