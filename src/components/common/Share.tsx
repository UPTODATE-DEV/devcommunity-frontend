import { NEXT_PUBLIC_URL } from "@/config/url";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';

const Share = ({ data }: { data: Post | null }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { locale } = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: { xs: 1, md: 450 } }}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<WhatsAppIcon />}
                disableElevation
                color="secondary"
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${NEXT_PUBLIC_URL}/${data?.type === "ARTICLE" ? "articles" : "posts"}/${
                      data?.slug
                    }`
                  );
                }}
              >
                WhatsApp
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                disableElevation
                variant="contained"
                color="secondary"
                startIcon={<TwitterIcon />}
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${NEXT_PUBLIC_URL}/${
                      data?.type === "ARTICLE" ? "articles" : "posts"
                    }/${data?.slug}`
                  );
                }}
              >
                Twitter
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                disableElevation
                variant="contained"
                color="secondary"
                startIcon={<FacebookIcon />}
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${NEXT_PUBLIC_URL}/${
                      data?.type === "ARTICLE" ? "articles" : "posts"
                    }/${data?.slug}`
                  );
                }}
              >
                Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                disableElevation
                variant="contained"
                color="secondary"
                startIcon={<LinkedInIcon />}
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${NEXT_PUBLIC_URL}/${
                      data?.type === "ARTICLE" ? "articles" : "posts"
                    }/${data?.slug}`
                  );
                }}
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>

          <Divider />
          <Stack sx={{ p: 2 }}>
            <Typography sx={{ p: 1 }} variant="body2">
              {locale === "en" ? "Permalink" : "Lien permanent"}
            </Typography>

            <Stack component={Paper} alignItems="center" variant="outlined" direction="row" sx={{ width: 1, px: 1 }}>
              <Typography variant="body2" noWrap>
                {`${NEXT_PUBLIC_URL}/${data?.type === "ARTICLE" ? "articles" : "posts"}/${data?.slug}`}
              </Typography>
              <Tooltip title={locale === "en" ? "Copier" : "Copy"} placement="bottom" arrow>
                <IconButton
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${NEXT_PUBLIC_URL}/${data?.type === "ARTICLE" ? "articles" : "posts"}/${data?.slug}`
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Box>
      </Popover>
      <Tooltip title={locale === "en" ? "Share" : "Partager"} placement="bottom" arrow>
        <IconButton onClick={onShare}>
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Share;
