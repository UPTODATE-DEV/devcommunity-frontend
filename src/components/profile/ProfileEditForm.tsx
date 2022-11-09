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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import { patchRequest, postRequest } from "@/lib/api";
import { toast } from "react-toastify";
import useStore from "@/hooks/useStore";

const ProfileEditForm = () => {
  const user = useStore((state) => state.session?.user);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [state, setState] = React.useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    job: "",
    phone: "",
    linkedIn: "",
    twitter: "",
    github: "",
    bio: "",
  });

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setState({ ...state, [event.target.name]: event.target.value });
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
    const data = await patchRequest({ endpoint: `/users/${user?.id}`, data: { ...state, avatar: image } });
    if (data.error) {
      return toast.error(data.error?.message);
    }
    toast.success("Profile updated");
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
        label="Short Bio"
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
        name="github"
        value={state.github}
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
      <div>
        <Button color="primary" sx={{ px: 4 }} startIcon={<SaveIcon />} variant="contained" onClick={onSave}>
          Save
        </Button>
      </div>
    </Stack>
  );
};

export default ProfileEditForm;
