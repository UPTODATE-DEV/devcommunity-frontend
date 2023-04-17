import RichTextEditor from "@/components/common/RichTextEditor";
import { FILES_BASE_URL } from "@/config/url";
import useStore from "@/hooks/useStore";
import { getRequest, patchRequest, postRequest } from "@/lib/api";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EventIcon from "@mui/icons-material/Event";
import PollIcon from "@mui/icons-material/Poll";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton, Typography } from "@mui/material";
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
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Input from "../common/Input";

const AddQuestionForm = ({ data }: { data?: Post }) => {
  const [loading, setLoading] = React.useState(false);
  const user = useStore((state) => state.session?.user);
  const [tags, setTags] = React.useState<Tag[]>([{ id: "0", name: "default", _count: { posts: 0 } }]);
  const [preview, setPreview] = React.useState("");
  const [post, setPost] = React.useState<{ title: string; locale: string; content?: string; tags: string[] | null }>({
    content: data?.content || "",
    tags: data?.tags?.map((el) => el.tag.name) || [],
    locale: data?.locale || "FR",
    title: data?.title || "",
  });
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [survey, setSurvey] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState<string[]>(["", ""]);
  const [duration, setDuration] = React.useState("7");
  const [event, setEvent] = React.useState(false);

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

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, e: { target: { value: string; name: string } }) => {
    if (e.target.value.length > 30) {
      return;
    }
    const newOptions = [...options];
    newOptions[index] = e?.target?.value;
    setOptions(newOptions);
  };

  const handleQuestionChange = (e: { target: { value: string; name: string } }) => {
    if (e.target.value.length > 140) {
      return;
    }
    setQuestion(e.target.value);
  };

  const handleDurationChange = (e: { target: { value: string; name: string } }) => {
    if (+e.target.value.length < 1) {
      setDuration("1");
    }
    setDuration(e.target.value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleAddOption = () => {
    if (options.length > 3) {
      return;
    }
    setOptions([...options, ""]);
  };

  const toggleSurvey = () => {
    setSurvey((state) => !state);
  };

  const toggleEvent = () => {
    setEvent((state) => !state);
  };

  const handleLocaleChange = (event: SelectChangeEvent) => {
    setPost({ ...post, locale: event.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = data?.id
      ? await patchRequest({
          endpoint: `/posts/${data?.id}`,
          data: { ...post, author: user?.id, type: "QUESTION", draft: true, title: post.title || "Untitled" },
        })
      : await postRequest({
          endpoint: "/posts",
          data: {
            ...post,
            author: user?.id,
            type: "QUESTION",
            draft: true,
            survey,
            surveyQuestion: question,
            duration: +duration,
            surveyOptions: options,
            title: post.title || "Untitled",
          },
        });
    if (response.error) {
      setLoading(false);
      toast.error(response.error?.message);
    }
    if (response.data) {
      setLoading(false);
      toast.success(data?.id ? "Post updated" : "Post saved");
      replace(`/posts/${response.data?.slug}/preview`);
    }
  };

  const onPublish = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = data?.id
      ? await patchRequest({
          endpoint: `/posts/${data?.id}`,
          data: { ...post, author: user?.id, type: "QUESTION", draft: false },
        })
      : await postRequest({
          endpoint: "/posts",
          data: {
            ...post,
            author: user?.id,
            type: "QUESTION",
            draft: false,
            survey,
            surveyQuestion: question,
            duration: +duration,
            surveyOptions: options,
          },
        });
    if (response.error) {
      setLoading(false);
      toast.error(response.error?.message);
    }
    if (response.data) {
      setLoading(false);
      toast.success(data?.id ? "Post updated" : "Post created");
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
    <Paper variant="outlined" component={Stack} spacing={3} sx={{ py: 1, p: 2 }}>
      {event && (
        <TextField
          name="title"
          variant="filled"
          value={post?.title}
          placeholder={locale === "en" ? "Title" : "Titre"}
          onChange={handleChange}
          sx={{ "&.MuiTextField-root > .MuiFilledInput-root": { px: 2, pb: 1 } }}
        />
      )}

      <RichTextEditor
        value={post.content}
        onChange={(value) => setPost((state) => ({ ...state, content: value }))}
        stickyOffset={70}
        onImageUpload={handleImageUpload}
        id="rte"
        controls={[
          ["h2", "h3", "bold", "italic", "underline", "link", "code"],
          ["unorderedList", "orderedList", "sup", "sub"],
          ["codeBlock", "blockquote", "link"],
        ]}
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

      <FormControl variant="filled">
        <InputLabel id="demo-simple-select-filled-label">{locale === "fr" ? "Langue" : "Language"}</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={post.locale}
          onChange={handleLocaleChange}
        >
          <MenuItem value="FR">{locale === "fr" ? "Français" : "French"}</MenuItem>
          <MenuItem value="EN">{locale === "fr" ? "Anglais" : "English"}</MenuItem>
        </Select>
      </FormControl>

      {survey && (
        <Paper
          component={Stack}
          variant="outlined"
          spacing={2}
          sx={{ px: 2, py: 3, borderRadius: 2, borderColor: "divider" }}
        >
          <Stack sx={{ position: "relative" }}>
            <Input
              type="textarea"
              name="question"
              value={question}
              placeholder={locale === "en" ? "Ajouter une question" : "Add question"}
              handleChange={handleQuestionChange}
              label={locale === "en" ? "Your question" : "Votre question"}
            />
            <Typography variant="caption" sx={{ position: "absolute", right: 5, bottom: -25, zIndex: 4 }}>
              {question.length}/140
            </Typography>
          </Stack>
          <Stack sx={{ py: 3 }} spacing={4}>
            {options.map((option, index) => (
              <Stack key={index} sx={{ position: "relative" }}>
                {index > 1 && (
                  <IconButton
                    sx={{ position: "absolute", right: 0, top: -2, zIndex: 2 }}
                    onClick={() => handleRemoveOption(index)}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>
                )}
                <Typography variant="caption" sx={{ position: "absolute", right: 5, bottom: -25, zIndex: 4 }}>
                  {option.length}/30
                </Typography>
                <Input
                  name="question"
                  label={`Option ${index + 1}`}
                  value={options[index]}
                  handleChange={(e: any) => handleOptionChange(index, e)}
                  placeholder={locale === "en" ? "Add option" : "Ajouter une option"}
                />
              </Stack>
            ))}
          </Stack>

          <Button
            disabled={options.length > 3}
            onClick={handleAddOption}
            startIcon={<AddIcon />}
            variant="outlined"
            sx={{ width: 1 }}
          >
            Add Option
          </Button>

          <Input
            name="duration"
            label={locale === "en" ? "Duration" : "Durée"}
            value={duration}
            handleChange={handleDurationChange}
            placeholder={locale === "en" ? "Poll duration in days" : "Durée du sondage en jours"}
          />
        </Paper>
      )}

      <Stack spacing={2} rowGap={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
        <Stack sx={{ position: "relative" }}>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            disableElevation
            aria-label="split button"
            sx={{ borderRadius: 50 }}
            disabled={
              !post.content ||
              !post.tags?.length ||
              loading ||
              (survey && !question) ||
              (survey && options.length < 2) ||
              (survey && +duration < 1)
            }
          >
            <Button sx={{ px: 4, borderRadius: 50 }} onClick={onPublish}>
              {loading ? (locale === "en" ? "Loading..." : "Chargement") : locale === "en" ? "Publish" : "Publier"}
            </Button>
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
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
                  transformOrigin: placement === "bottom" ? "left top" : "left bottom",
                }}
              >
                <div>
                  <ClickAwayListener onClickAway={handleClose}>
                    <Button
                      sx={{ px: 4, borderRadius: 50, my: 0.5 }}
                      variant="contained"
                      color="secondary"
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

        {!data?.id && !event && (
          <Button
            disableElevation
            color={survey ? "primary" : "inherit"}
            variant={survey ? "contained" : "outlined"}
            disabled={loading}
            startIcon={<PollIcon />}
            sx={{ px: 4, borderRadius: 50 }}
            onClick={toggleSurvey}
          >
            {survey
              ? locale === "en"
                ? "Remove the poll"
                : "Retirer un sondage"
              : locale === "en"
              ? "Add a poll"
              : "Ajouter un sondage"}
          </Button>
        )}

        {!data?.id && !survey && (
          <Button
            disableElevation
            color={event ? "primary" : "inherit"}
            variant={event ? "contained" : "outlined"}
            disabled={loading}
            startIcon={<EventIcon />}
            sx={{ px: 4, borderRadius: 50 }}
            onClick={toggleEvent}
          >
            {event
              ? locale === "en"
                ? "Remove the event"
                : "Retirer un événement"
              : locale === "en"
              ? "Add an event"
              : "Ajouter un événement"}
          </Button>
        )}

        <Button
          disableElevation
          color="inherit"
          variant="outlined"
          disabled={loading}
          sx={{ px: 4, borderRadius: 50 }}
          onClick={() => push({ pathname: "/posts" }, undefined, { shallow: true })}
        >
          {locale === "en" ? "Cancel" : "Annuler"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddQuestionForm;
