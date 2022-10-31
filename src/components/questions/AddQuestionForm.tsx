import React from "react";
import Stack from "@mui/material/Stack";
import Input from "@/components/common/Input";
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
import dynamic from "next/dynamic";
import { useState } from "react";
import RichTextEditor from '@/components/common/RichTextEditor'
import { FILES_BASE_URL } from "config/url";
import { useRouter } from "next/router";

const initialValue = "<p>Type your <b>content</b> here</p>";

const AddQuestionForm = () => {
  const [loading, setLoading] = React.useState(false);
  const user = useStore((state) => state.session?.user);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [post, setPost] = React.useState<{ title: string; content: string; tags: string[] | null }>({
    title: "",
    content: initialValue,
    tags: null,
  });

  const { push } = useRouter();

  // const handleImageChange = async (e: any) => {
  //   setPreview(URL.createObjectURL(e.target.files[0]));

  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0], e.target.files[0].name);
  //   const response = await postRequest({ endpoint: "/files/upload", data: formData });
  //   if (response.error) {
  //     toast.error(response.error?.message);
  //   }
  //   if (response.data) {
  //     setImage(response.data?.id);
  //   }
  // };

  const handleImageUpload = React.useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const response = await postRequest({ endpoint: "/files/upload", data: formData });
    if (response.error) {
      toast.error(response.error?.message);
    }
    return FILES_BASE_URL + response.data?.url;
  }, []);

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    toast.info("In process...");
    const response = await postRequest({
      endpoint: "/posts",
      data: { ...post, author: user?.id, type: "QUESTION" },
    });
    if (response.error) {
      setLoading(false);
      toast.error(response.error?.message);
    }
    if (response.data) {
      setLoading(false);
      toast.success("Post created successfully");
      push(`/posts/${response.data?.slug}`);
    }
  };

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Stack spacing={2} sx={{ py: 1, pb: 4, minHeight: "100vh" }}>
      {/* <Stack
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
      </Stack> */}
      <TextField
        name="title"
        variant="filled"
        placeholder="Post title..."
        onChange={handleChange}
        sx={{ "&.MuiTextField-root > .MuiFilledInput-root": { px: 2, pb: 1 } }}
      />
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
            <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
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

      <RichTextEditor
        value={post.content}
        onChange={(value) => setPost((state) => ({ ...state, content: value }))}
        stickyOffset={70}
        onImageUpload={handleImageUpload}
        id="rte"
        controls={[
          ["bold", "italic", "underline", "link", "code"],
          ["unorderedList", "orderedList", "sup", "sub"],
          ["codeBlock", "blockquote", "link"],
          ["image", "video", "strike"],
        ]}
      />
      <div>
        <Fab
          variant="extended"
          disabled={!post.title || !post.content || !post.tags?.length || loading}
          color="primary"
          sx={{ px: 4 }}
          onClick={onSubmit}
        >
          <SaveIcon sx={{ mr: 1 }} />
          {loading ? "Loading..." : "Save"}
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

export default AddQuestionForm;
