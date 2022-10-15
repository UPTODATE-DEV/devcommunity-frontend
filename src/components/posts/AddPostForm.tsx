import React from "react";
import Stack from "@mui/material/Stack";
import Input from "@/components/common/Input";
import ToastNotification from "@/components/common/Toast";
import Image from "next/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InputBase from "@mui/material/InputBase";
import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { postRequest } from "@/lib/api";
import { toast } from "react-toastify";
import useStore from "@/hooks/useStore";

import { MantineProvider } from "@mantine/core";

import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

const initialValue = "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

const AddPostForm = () => {
  const [value, onChange] = useState(initialValue);
  const user = useStore((state) => state.session?.user);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [post, setPost] = React.useState<{ title: string; content: string; tags: string[] | null }>({
    title: "",
    content: "",
    tags: null,
  });

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

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await postRequest({
      endpoint: "/posts",
      data: { ...post, image, author: user?.id, type: "ARTICLE" },
    });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      toast.success("Post created successfully");
    }
  };

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Stack spacing={2} sx={{ py: 1, pb: 4 }}>
      <ToastNotification />
      <Stack
        justifyContent="center"
        alignItems="center"
        component="label"
        sx={{
          width: 1,
          height: 160,
          bgcolor: "action.hover",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <input hidden accept="image/*" onChange={handleImageChange} type="file" />
        {preview ? (
          <Image src={preview} layout="fill" objectFit="cover" />
        ) : (
          <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 140, opacity: 0.1 }} />
        )}
      </Stack>
      <Autocomplete
        multiple
        id="tags-filled"
        options={tags.map((option) => option.title)}
        freeSolo
        onChange={(event: any, newValue: string[] | null) => {
          setPost((state) => ({ ...state, tags: newValue }));
        }}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            sx={{ "&.MuiTextField-root > .MuiFilledInput-root": { px: 2, py: 1.5 } }}
            {...params}
            variant="filled"
            placeholder="Tags"
          />
        )}
      />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          fontFamily: "Roboto",
          primaryColor: "#0179bb",
          black: "#000f21",
        }}
      >
        <RichTextEditor value={value} onChange={onChange} id="rte" />
      </MantineProvider>
      <InputBase
        name="title"
        placeholder="Post title..."
        onChange={handleChange}
        sx={{ fontSize: 24, fontWeight: 600 }}
      />
      <Divider />
      <InputBase
        name="content"
        placeholder="Post content..."
        multiline
        minRows={6}
        onChange={handleChange}
        sx={{ py: 1 }}
      />
      <div>
        <Fab variant="extended" color="primary" sx={{ px: 4 }} onClick={onSubmit}>
          <SaveIcon sx={{ mr: 1 }} />
          Save
        </Fab>
      </div>
    </Stack>
  );
};

const tags = [
  { title: "ReactJs", year: 1994 },
  { title: "NodeJs", year: 1972 },
  { title: "Web3", year: 1974 },
  { title: "Blockchain", year: 2008 },
  { title: "Cardano", year: 1957 },
  { title: "JavaScript", year: 1993 },
  { title: "Flutter", year: 1994 },
];

export default AddPostForm;
