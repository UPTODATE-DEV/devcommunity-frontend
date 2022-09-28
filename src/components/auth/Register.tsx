import Input from "@/components/common/Input";
import ToastNotification from "@/components/common/Toast";
import KeyIcon from "@mui/icons-material/Key";
import MailIcon from "@mui/icons-material/Mail";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, styled } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import PasswordIcon from "@mui/icons-material/Password";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import CustomCheckbox from "@/components/common/CustomCheckbox";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const Register = () => {
  const router = useRouter();

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const { email, password } = state;

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Login successful!");
      router.push("/");
      setState({ email: "", password: "" });
      return { data: res.data };
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response?.data?.message);
      return { error: e.response?.data?.message };
    }
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <ToastNotification />
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Container>
            <Stack spacing={3} justifyContent="center" sx={{ minHeight: { xs: "auto", md: "100vh" }, py: 4, px: 4 }}>
              <Stack onClick={handleGoHome} sx={{ width: 200, height: 120, cursor: "pointer", position: "relative" }}>
                <Image src="/logo.svg" layout="fill" objectFit="contain" />
              </Stack>
              <Typography color="text.secondary" gutterBottom>
                Continually facilitate distinctive services before transparent relationships. Enthusiastically develop
                client-centered
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Input
                  label="First Name"
                  icon={<MailIcon />}
                  placeholder="Entrer votre adresse mail"
                  handleChange={handleChange}
                  name="email"
                  type="email"
                />
                <Input
                  label="Last Name"
                  icon={<MailIcon />}
                  placeholder="Entrer votre adresse mail"
                  handleChange={handleChange}
                  name="email"
                  type="email"
                />
              </Stack>
              <Input
                label="Email"
                icon={<MailIcon />}
                placeholder="Entrer votre adresse mail"
                handleChange={handleChange}
                name="email"
                type="email"
              />
              <Input
                label="Mot de passe"
                icon={<LockIcon />}
                placeholder="Entrer votre mot de passe"
                handleChange={handleChange}
                name="password"
                type="password"
                isPassword
              />

              <LoadingButton size="small" onClick={onLogin} loading={loading} variant="contained" sx={{ py: 1 }}>
                Register
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
              {/* <LoadingButton
                variant="outlined"
                size="small"
                startIcon={<GoogleIcon />}
                onClick={onLogin}
                loading={loading}
                sx={{ py: 1 }}
              >
                Login with Google
              </LoadingButton> */}
            </Stack>
          </Container>
        </Grid>
        <Grid item xs={12} md={6} sx={{ bgcolor: "action.hover", position: "relative" }}>
          <Stack spacing={4} sx={{ width: 1, height: 1 }} justifyContent="center" alignItems="center">
            <Typography variant="h4" sx={{ color: "text.primary", fontWeight: "bold" }}>
              Welcome Back!
            </Typography>
            <Stack sx={{ width: 400, height: 300, position: "relative" }}>
              <Image src="/auth.svg" layout="fill" objectFit="contain" />
            </Stack>
            <Typography color="text.secondary" textAlign="center" sx={{ color: "text.secondary", width: 500 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cupiditate explicabo inventore esse unde
              repellat!
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
