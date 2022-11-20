import RichTextEditor from "@/components/common/RichTextEditor";
import useStore from "@/hooks/useStore";
import { getRequest, patchRequest, postRequest } from "@/lib/api";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FILES_BASE_URL } from "config/url";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const AddQuestionForm = ({ data }: { data?: Post }) => {
  const [loading, setLoading] = React.useState(false);
  const user = useStore((state) => state.session?.user);
  const [tags, setTags] = React.useState<Tag[]>([{ id: "0", name: "default", _count: 0 }]);
  const [preview, setPreview] = React.useState("");
  const [post, setPost] = React.useState<{ title?: string; content?: string; tags: string[] | null }>({
    title: data?.title || "",
    content: data?.content || "",
    tags: data?.tags?.map((el) => el.tag.name) || [],
  });

  const { push, locale, replace } = useRouter();

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
    const response = data?.id
      ? await patchRequest({
          endpoint: `/posts/${data?.id}`,
          data: { ...post, author: user?.id, type: "QUESTION" },
        })
      : await postRequest({
          endpoint: "/posts",
          data: { ...post, author: user?.id, type: "QUESTION" },
        });
    if (response.error) {
      setLoading(false);
      toast.error(response.error?.message);
    }
    if (response.data) {
      setLoading(false);
      toast.success(data?.title ? "Post updated" : "Post created");
      replace(`/posts/${response.data?.slug}`);
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
        value={post?.title}
        placeholder={locale === "en" ? "Title" : "Titre"}
        onChange={handleChange}
        sx={{ "&.MuiTextField-root > .MuiFilledInput-root": { px: 2, pb: 1 } }}
      />
      <Autocomplete
        multiple
        id="tags-filled"
        options={tags.map((el) => el.name)}
        freeSolo
        defaultValue={post?.tags as any}
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
      <Stack spacing={2} direction="row" alignItems="center">
        <Fab
          variant="extended"
          disabled={loading}
          sx={{ px: 4 }}
          onClick={() => push({ pathname: "/posts" }, undefined, { shallow: true })}
        >
          {locale === "en" ? "Cancel" : "Annuler"}
        </Fab>
        <Fab
          variant="extended"
          disabled={!post.title || !post.content || !post.tags?.length || loading}
          color="primary"
          sx={{ px: 4 }}
          onClick={onSubmit}
        >
          {loading ? (locale === "en" ? "Loading..." : "Chargement") : locale === "en" ? "Publish" : "Publier"}
        </Fab>
      </Stack>
    </Stack>
  );
};

export default AddQuestionForm;
