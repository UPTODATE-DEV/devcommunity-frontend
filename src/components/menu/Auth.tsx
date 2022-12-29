import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { postLocalRequest } from "@/lib/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";

const Auth = () => {
  const { authLoading, setAuthLoading } = useStoreNoPersist((state) => state);
  const setSession = useStore((state) => state.setSession);

  const onLogin = async (token?: string) => {
    setAuthLoading(true);
    const res = await postLocalRequest({ endpoint: "/api/login", data: { token } });

    if (!res.data) {
      toast.error("Error logging in");
      console.log(res);
      setAuthLoading(false);
    }
    setSession(res.data);
    setAuthLoading(false);
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
        (authLoading ? (
          <LoadingButton
            loading
            variant="contained"
            sx={{ borderRadius: 50, width: 250, height: 40 }}
            loadingPosition="start"
          >
            Loading...
          </LoadingButton>
        ) : (
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              text="continue_with"
              theme="filled_blue"
              shape="circle"
              locale="en"
              onSuccess={(credentialResponse) => {
                onLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        ))}
    </>
  );
};

export default Auth;
