import RichTextEditor from "@/components/common/RichTextEditor";
import { FILES_BASE_URL } from "@/config/url";
import useStore from "@/hooks/useStore";
import { getRequest, patchRequest, postRequest } from "@/lib/api";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControl from "@mui/material/FormControl";
import Grow from "@mui/material/Grow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const AddPostForm = ({ data }: { data?: Post }) => {
  const getImage = data?.article?.image.id;
  const getPreview = data?.article?.image.url;
  const [loading, setLoading] = React.useState(false);
  const user = useStore((state) => state.session?.user);
  const [tags, setTags] = React.useState<Tag[]>([
    { id: "0", name: "default", _count: { posts: 0 } },
  ]);
  const [image, setImage] = React.useState(getImage || "");
  const [preview, setPreview] = React.useState<string>(
    getPreview ? FILES_BASE_URL + getPreview : ""
  );
  const [post, setPost] = React.useState<{
    title?: string;
    locale: string;
    content?: string;
    tags: string[] | null;
  }>({
    title: data?.title || "",
    content: data?.content || "",
    tags: data?.tags?.map((el) => el.tag.name) || [],
    locale: data?.locale || "FR",
  });
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const { push, locale, replace, events } = useRouter();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleImageChange = async (e: any) => {
    setPreview(URL?.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    const response = await postRequest({
      endpoint: "/files/upload",
      data: formData,
    });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      setImage(response.data?.id);
    }
  };

  const handleImageUpload = React.useCallback(
    async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const response = await postRequest({
        endpoint: "/files/upload",
        data: formData,
      });
      if (response.error) {
        toast.error(response.error?.message);
      }
      return FILES_BASE_URL + response.data?.url;
    },
    []
  );

  const handleLocaleChange = (event: SelectChangeEvent) => {
    setPost({ ...post, locale: event.target.value });
  };

  const handleChange = (event: { target: { value: string; name: string } }) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = data?.id
      ? await patchRequest({
          endpoint: `/posts/${data?.id}`,
          data: {
            ...post,
            image,
            author: user?.id,
            type: "ARTICLE",
            draft: true,
          },
        })
      : await postRequest({
          endpoint: "/posts",
          data: {
            ...post,
            image,
            author: user?.id,
            type: "ARTICLE",
            draft: true,
          },
        });
    if (response.error) {
      setLoading(false);
      toast.error(response.error?.message);
    }
    if (response.data) {
      setLoading(false);
      toast.success(data?.title ? "Post updated" : "Post saved");
      replace(`/articles/${response.data?.slug}/preview`);
    }
  };

  const onPublish = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = data?.id
      ? await patchRequest({
          endpoint: `/posts/${data?.id}`,
          data: {
            ...post,
            image,
            author: user?.id,
            type: "ARTICLE",
            draft: false,
          },
        })
      : await postRequest({
          endpoint: "/posts",
          data: {
            ...post,
            image,
            author: user?.id,
            type: "ARTICLE",
            draft: false,
          },
        });
    if (response.error) {
      setLoading(false);
      toast.error(response.error?.message);
    }
    if (response.data) {
      setLoading(false);
      toast.success(data?.title ? "Post updated" : "Post created");
      replace(`/articles/${response.data?.slug}`);
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

  // React.useEffect(() => {
  //   const confirmationMessage = "Changes you made may not be saved.";
  //   const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
  //     (e || window.event).returnValue = confirmationMessage;
  //     return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
  //   };
  //   const beforeRouteHandler = (url: string) => {
  //     if (pathname !== url && !confirm(confirmationMessage)) {
  //       // to inform NProgress or something ...
  //       events.emit("routeChangeError", "You have unsaved changes", url, {
  //         shallow: false,
  //       });

  //       // tslint:disable-next-line: no-string-throw
  //       throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
  //     }
  //   };
  //   if (post.content !== "") {
  //     window.addEventListener("beforeunload", beforeUnloadHandler);
  //     events.on("routeChangeStart", beforeRouteHandler);
  //   } else {
  //     window.removeEventListener("beforeunload", beforeUnloadHandler);
  //     events.off("routeChangeStart", beforeRouteHandler);
  //   }
  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnloadHandler);
  //     events.off("routeChangeStart", beforeRouteHandler);
  //   };
  // }, [post]);

  React.useEffect(() => {
    const preventMessage =
      locale === "en"
        ? "You have unsaved changes. Do you really want to leave"
        : "Vous avez des changements non enregistrés. Voulez-vous vraiment quitter ?";

    // For reloading.
    window.onbeforeunload = () => {
      if (post.content !== "") {
        return preventMessage;
      }
    };

    // For changing in-app route.
    if (post.content !== "") {
      const handleRouteChange = (url: string) => {
        const ok = confirm(preventMessage);
        if (!ok) {
          events.emit("routeChangeError", "You have unsaved changes", url, {
            shallow: false,
          });
          throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
        }
      };

      events.on("routeChangeStart", handleRouteChange);
      return () => {
        events.off("routeChangeStart", handleRouteChange);
      };
    }
  }, [post]);

  return (
    <Paper
      variant='outlined'
      component={Stack}
      spacing={2}
      sx={{ px: 2, pt: 2, pb: 6 }}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        component='label'
        sx={{
          width: 1,
          paddingTop: image ? "52.34%" : "34%",
          bgcolor: "action.hover",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <input
          hidden
          accept='image/*'
          onChange={handleImageChange}
          type='file'
        />
        {preview ? (
          <Image
            src={preview}
            alt='Updev cmmunity'
            layout='fill'
            objectFit='cover'
          />
        ) : (
          <Stack
            justifyContent='center'
            alignItems='center'
            sx={{ position: "absolute", top: 50 }}
          >
            <AddPhotoAlternateIcon
              color='primary'
              sx={{ fontSize: 140, opacity: 0.1 }}
            />
            <Typography color='primary' textAlign='center'>
              1024x536
            </Typography>
          </Stack>
        )}
      </Stack>
      <Autocomplete
        multiple
        id='tags-filled'
        options={tags.map((el) => el.name)}
        freeSolo
        defaultValue={post.tags as any}
        onChange={(event: any, newValue: string[] | null) => {
          setPost((state) => ({ ...state, tags: newValue }));
        }}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant='outlined'
              label={option}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            sx={{
              "&.MuiTextField-root > .MuiFilledInput-root": { px: 2, py: 1.5 },
            }}
            {...params}
            variant='filled'
            placeholder='Tags'
          />
        )}
      />
      <TextField
        name='title'
        variant='filled'
        value={post.title}
        placeholder={locale === "en" ? "Title" : "Titre"}
        onChange={handleChange}
        sx={{
          "&.MuiTextField-root > .MuiFilledInput-root": { px: 2, pb: 1 },
          width: 1,
        }}
      />
      <FormControl variant='filled'>
        <InputLabel id='demo-simple-select-filled-label'>
          {locale === "fr" ? "Langue" : "Language"}
        </InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={post.locale}
          onChange={handleLocaleChange}
        >
          <MenuItem value='FR'>
            {locale === "fr" ? "Français" : "French"}
          </MenuItem>
          <MenuItem value='EN'>
            {locale === "fr" ? "Anglais" : "English"}
          </MenuItem>
        </Select>
      </FormControl>
      <RichTextEditor
        value={post.content}
        onChange={(value) => setPost((state) => ({ ...state, content: value }))}
        stickyOffset={160}
        onImageUpload={handleImageUpload}
        id='rte'
        controls={[
          ["h2", "h3", "bold", "italic", "underline", "link", "code"],
          ["unorderedList", "orderedList", "sup", "sub"],
          ["codeBlock", "blockquote", "link"],
          ["image", "video", "strike"],
        ]}
      />
      <Stack
        spacing={2}
        direction='row'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
      >
        <Stack sx={{ position: "relative" }}>
          <ButtonGroup
            variant='contained'
            ref={anchorRef}
            disableElevation
            aria-label='split button'
            sx={{ borderRadius: 50 }}
            disabled={
              !post.title || !post.content || !post.tags?.length || loading
            }
          >
            <Button sx={{ px: 4, borderRadius: 50 }} onClick={onPublish}>
              {loading
                ? locale === "en"
                  ? "Loading..."
                  : "Chargement"
                : locale === "en"
                ? "Publish"
                : "Publier"}
            </Button>
            <Button
              size='small'
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label='select merge strategy'
              aria-haspopup='menu'
              sx={{ px: 2, borderRadius: 50 }}
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          {/* @ts-ignore */}
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "left top" : "left bottom",
                }}
              >
                <div>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Button
                      sx={{ px: 4, borderRadius: 50, my: 0.5 }}
                      variant='contained'
                      color='secondary'
                      disableElevation
                      onClick={onSubmit}
                    >
                      {loading
                        ? locale === "en"
                          ? "Loading..."
                          : "Chargement"
                        : locale === "en"
                        ? "Draft"
                        : "Brouillon"}
                    </Button>
                  </ClickAwayListener>
                </div>
              </Grow>
            )}
          </Popper>
        </Stack>

        <Button
          disableElevation
          color='inherit'
          variant='outlined'
          disabled={loading}
          sx={{ px: 4, borderRadius: 50 }}
          onClick={() =>
            push({ pathname: "/articles" }, undefined, { shallow: true })
          }
        >
          {locale === "en" ? "Cancel" : "Annuler"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddPostForm;
