import PostContent from "@/components/common/Content";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDrag } from "react-dnd";

const SeriesCard: React.FC<{
  data: Post;
  checked?: boolean;
  handleCheck: () => void;
  showDragIcon?: boolean;
}> = ({ data, checked = false, handleCheck, showDragIcon = false }) => {
  const { asPath, locale } = useRouter();
  const [isDragging, setIsDragging] = React.useState(false);
  const theme = useTheme();
  const { author } = data;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: data.id,
      item: data,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  const handleDrag = useCallback((e: any) => {
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  return (
    <Paper
      ref={dragRef}
      variant="outlined"
      sx={{
        px: 2,
        py: 1.5,
        position: "relative",
        opacity,
        borderColor: checked ? "primary.main" : "divider",
        bgcolor: (theme) => (checked ? alpha(theme.palette.primary.main, 0.1) : "background.paper"),
      }}
      component={Stack}
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="flex-start"
    >
      <IconButton size="small" onClick={handleCheck} onDrag={handleDrag}>
        {checked ? <CheckCircleIcon color="primary" /> : <RadioButtonUncheckedIcon />}
      </IconButton>
      <Stack>
        <Typography fontWeight={700} color="text.primary">
          {data?.title}
        </Typography>
        <Stack sx={{ cursor: "pointer" }} onClick={handleCheck}>
          <PostContent content={`${data?.content.substring(0, 130)}...`} fontSize={13} />
        </Stack>
      </Stack>
      <Stack alignItems="center">
        {showDragIcon && (
          <Stack onClick={handleCheck} sx={{ cursor: "move", height: 80, width: 30 }}>
            <DragIndicatorIcon />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default SeriesCard;
