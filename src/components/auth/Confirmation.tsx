import Input from "@/components/common/Input";
import ToastNotification from "@/components/common/Toast";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const Confirmation = () => {
  const router = useRouter();

  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setCode(event.target.value);
  };

  const onConfirmation = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/confirmation",
        { code },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Your account has been confirmed");

      router.push("/auth/login");
      setCode("");

      return { data: res.data };
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response?.data?.message);
      return { error: e.response?.data?.message };
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <ToastNotification />
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} sx={{ bgcolor: "action.hover", position: "relative" }}>
          <Stack spacing={4} sx={{ width: 1, height: 1 }} justifyContent="center" alignItems="center">
            <Typography variant="h4" sx={{ color: "text.primary", fontWeight: "bold" }}>
              Account Confirmation
            </Typography>
            <Stack sx={{ width: 400, height: 300, position: "relative" }}>
              <Image src="/auth.svg" layout="fill" objectFit="contain" />
            </Stack>
            <Typography color="text.secondary" textAlign="center" sx={{ color: "text.secondary", width: 500 }}>
              Please check your email for confirmation link. If you did not receive the email, please check your spam
              folder.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Container>
            <Stack spacing={3} justifyContent="center" sx={{ minHeight: { xs: "auto", md: "100vh" }, py: 4, px: 4 }}>
              <Stack onClick={handleGoHome} sx={{ width: 200, height: 120, cursor: "pointer", position: "relative" }}>
                <Image src="/logo.svg" layout="fill" objectFit="contain" />
              </Stack>
              <Typography color="text.secondary" gutterBottom>
                Please check your email for confirmation link. If you did not receive the email, please check your spam
                folder.
              </Typography>
              <Input
                label="Confirmation Code"
                icon={<VpnKeyIcon />}
                placeholder="Enter your confirmation code"
                handleChange={handleChange}
                name="code"
                type="number"
              />

              <LoadingButton size="small" onClick={onConfirmation} loading={loading} variant="contained" sx={{ py: 1 }}>
                Confirm my account
              </LoadingButton>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Already have an account ?{" "}
                <Link href="/auth/login" passHref>
                  <Typography
                    variant="body2"
                    component="a"
                    fontWeight="bold"
                    color="secondary.main"
                    sx={{ "&:hover": { textDecoration: "underline" } }}
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Confirmation;
