import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React from "react";
import { useGoogleLogin, GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";

const Auth = () => {
  const { push, reload } = useRouter();

  const setSession = useStore((state) => state.setSession);

  const handleLogin = () => {
    push("/auth/login");
  };

  const handleRegister = () => {
    push("/auth/register");
  };

  const onLogin = async (token?: string) => {
    const res = await axios.post(
      "/api/login",
      { token },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("🚀 ~ file: Auth.tsx ~ line 35 ~ onLogin ~ res", res.data);
    setSession(res.data);
    reload();
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="1028931681154-43g8plf4on002bj86k3t765cp58q4k5s.apps.googleusercontent.com">
        <GoogleLogin
          auto_select
          text="continue_with"
          theme="filled_blue"
          shape="circle"
          onSuccess={(credentialResponse) => {
            onLogin(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Auth;
