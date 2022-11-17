import Input from "@/components/common/Input";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { patchRequest, postRequest } from "@/lib/api";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const ProfileEditForm = ({ user }: { user?: User }) => {
  const { editProfile, setEditProfile } = useStoreNoPersist((state) => state);
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

  const { reload, locale } = useRouter();

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

  React.useEffect(() => {
    return () => setEditProfile(false);
  }, []);

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Divider />
      <Typography color="text.primary">
        {locale === "en" ? "Personal informations" : "Informations personnelles"}
      </Typography>
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
            placeholder={locale === "en" ? "Enter your first Name" : "Entrez votre prénom"}
            handleChange={handleChange}
            name="firstName"
          />
          <Input
            value={state.lastName}
            label="Last Name"
            placeholder={locale === "en" ? "Enter your last name" : "Entrez votre nom"}
            handleChange={handleChange}
            name="lastName"
          />
        </Stack>
      </Stack>

      <Input
        value={state.phone}
        label="Phone"
        placeholder={locale === "en" ? "Enter your phone number" : "Entrez votre numéro de téléphone"}
        handleChange={handleChange}
        name="phone"
      />
      <Input
        value={state.job}
        label="Current Job"
        placeholder={locale === "en" ? "Enter your current job" : "Entrez votre emploi actuel"}
        handleChange={handleChange}
        name="job"
      />
      <Input
        label="Short Bio (Max: 210 Char)"
        placeholder={
          locale === "en"
            ? "Describe yourself in few lines (less than 210 characters)"
            : "Décrivez-vous en quelques lignes (moins de 210 caractères)"
        }
        handleChange={handleChange}
        name="bio"
        value={state.bio}
        type="textarea"
        rows={4}
      />
      <Divider />
      <Typography color="text.primary">{locale === "en" ? "More infos" : "Plus d'infos"}</Typography>
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
          {locale === "en" ? "Cancel" : "Annuler"}
        </Button>
        <Button
          color="primary"
          sx={{ px: 4 }}
          disabled={loading}
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={onSave}
        >
          {locale === "en" ? "Update" : "Mettre à jour"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProfileEditForm;
