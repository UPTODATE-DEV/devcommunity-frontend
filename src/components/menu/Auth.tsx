import FirstLoginChooseTags from "@/components/common/FirstLoginChooseTags";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { getRequest, postLocalRequest } from "@/lib/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const Auth = () => {
  const { reload } = useRouter();
  const { authLoading, setAuthLoading } = useStoreNoPersist((state) => state);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | undefined>();
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    reload();
  };

  const getTags = async () => {
    setIsLoading(true);
    const tags = await getRequest({ endpoint: "/tags" });
    if (!tags.error) {
      setTags(tags.data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const onLogin = async (token?: string) => {
    setAuthLoading(true);
    const res = await postLocalRequest({ endpoint: "/api/login", data: { token } });

    if (!res.data) {
      toast.error("Error logging in");
      console.log(res);
      setAuthLoading(false);
    }

    if (res.data?.newUser) {
      setUser(res.data?.user);
      getTags();
      setOpen(true);
    } else {
      reload();
    }
  };

  return (
    <>
      <FirstLoginChooseTags open={open} user={user} isLoading={isLoading} tags={tags} handleClose={handleClose} />
      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
        (authLoading ? (
          <LoadingButton
            loading
            variant="contained"
            sx={{ borderRadius: 50, width: 250, height: 40 }}
            loadingPosition="start"
            startIcon={<Image width={16} height={16} src="/icons/google.svg" alt="google" />}
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
