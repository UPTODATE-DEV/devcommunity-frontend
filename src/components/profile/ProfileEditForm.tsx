import React from "react";
import Input from "@/components/common/Input";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import { patchRequest, postRequest } from "@/lib/api";
import { toast } from "react-toastify";
import useStore from "@/hooks/useStore";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

const ProfileEditForm = ({ user }: { user?: User }) => {
  const setEditProfile = useStore((state) => state.setEditProfile);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    job: user?.profile?.job,
    phone: user?.profile?.phone,
    linkedIn: user?.profile?.linkedIn,
    twitter: user?.profile?.twitter,
    gitHub: user?.profile?.gitHub,
    bio: user?.profile?.bio,
  });

  const { reload } = useRouter();

  const handleChange = (event: { target: { value: string; name: string } }) => {
    const value = event.target.name === "bio" ? event.target.value.substring(0, 210) : event.target.value;
    setState({ ...state, [event.target.name]: value });
  };

  const handleImageChange = async (e: any) => {
    setPreview(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    const response = await postRequest({ endpoint: "/files/upload", data: formData });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      setImage(response.data?.id);
    }
  };

  const onSave = async () => {
    setLoading(true);
    toast.info("In process...");
    const data = await patchRequest({ endpoint: `/users/${user?.id}`, data: { ...state, avatar: image } });
    if (data.error) {
      setLoading(false);
      return toast.error(data.error?.message);
    }
    setEditProfile(false);
    reload();
  };

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Divider />
      <Typography color="text.primary">Personal informations</Typography>
      <Divider />
      <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          component="label"
          sx={{
            width: 160,
            height: 160,
            bgcolor: "action.hover",
            position: "relative",
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: 50,
            flexShrink: 0,
          }}
        >
          <input hidden accept="image/*" onChange={handleImageChange} type="file" />
          {preview ? (
            <Image src={preview} alt="Updev cmmunity" layout="fill" objectFit="cover" />
          ) : (
            <AddPhotoAlternateIcon color="primary" sx={{ opacity: 0.4 }} />
          )}
        </Stack>
        <Stack spacing={2} sx={{ width: 1 }}>
          <Input
            value={state.firstName}
            label="First Name"
            placeholder="Enter your first name"
            handleChange={handleChange}
            name="firstName"
          />
          <Input
            value={state.lastName}
            label="Last Name"
            placeholder="Enter your last name"
            handleChange={handleChange}
            name="lastName"
          />
        </Stack>
      </Stack>

      <Input
        value={state.phone}
        label="Phone"
        placeholder="Enter your phone number"
        handleChange={handleChange}
        name="phone"
      />
      <Input
        value={state.job}
        label="Current Job"
        placeholder="Enter your current job"
        handleChange={handleChange}
        name="job"
      />
      <Input
        label="Short Bio (Max: 210 Char)"
        placeholder="Enter a short bio"
        handleChange={handleChange}
        name="bio"
        value={state.bio}
        type="textarea"
        rows={4}
      />
      <Divider />
      <Typography color="text.primary">Others informations</Typography>
      <Divider />
      <Input
        icon={<GitHubIcon />}
        placeholder="https://github.com/username"
        handleChange={handleChange}
        name="gitHub"
        value={state.gitHub}
      />
      <Input
        icon={<TwitterIcon />}
        placeholder="https://twitter.com/username"
        handleChange={handleChange}
        name="twitter"
        value={state.twitter}
      />
      <Input
        icon={<LinkedInIcon />}
        placeholder="https://linkedin.com/in/username"
        handleChange={handleChange}
        name="linkedIn"
        value={state.linkedIn}
      />
      <Stack direction="row" spacing={2} sx={{ py: 2 }} justifyContent="flex-end">
        <Button color="secondary" sx={{ px: 4 }} variant="outlined" onClick={() => setEditProfile(false)}>
          cancel
        </Button>
        <Button
          color="primary"
          sx={{ px: 4 }}
          disabled={loading}
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={onSave}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfileEditForm;
