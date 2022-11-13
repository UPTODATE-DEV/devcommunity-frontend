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
import { getRequest, postRequest } from "@/lib/api";
import { toast } from "react-toastify";
import useStore from "@/hooks/useStore";
import dynamic from "next/dynamic";
import { useState } from "react";
import RichTextEditor from "@/components/common/RichTextEditor";
import { FILES_BASE_URL } from "config/url";
import { useRouter } from "next/router";

const AddQuestionForm = () => {
  const [loading, setLoading] = React.useState(false);
  const user = useStore((state) => state.session?.user);
  const [tags, setTags] = React.useState<Tag[]>([{ id: "0", name: "default", _count: 0 }]);
  const [preview, setPreview] = React.useState("");
  const [post, setPost] = React.useState<{ title: string; content: string; tags: string[] | null }>({
    title: "",
    content: "",
    tags: null,
  });

  const { push } = useRouter();

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

  const modules = React.useMemo(
    () => ({
      clipboard: {
        allowed: {
          tags: [
            "a",
            "b",
            "strong",
            "code",
            "blockquote",
            "img",
            "u",
            "s",
            "i",
            "p",
            "br",
            "ul",
            "ol",
            "li",
            "span",
            "h2",
          ],
          attributes: ["href", "rel", "target", "class", "src"],
        },
        keepSelection: true,
        substituteBlockElements: true,
        magicPasteLinks: true,
      },
    }),
    []
  );

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
    const getTags = async () => {
      const tags = await getRequest({ endpoint: "/tags" });
      if (!tags.error) {
        setTags(tags.data);
      }
    };

    getTags();

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, []);

  return (
    <Stack spacing={2} sx={{ py: 1, pb: 4, minHeight: "100vh" }}>
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
        options={tags.map((el) => el.name)}
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
        // modules={modules}
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

export default AddQuestionForm;
