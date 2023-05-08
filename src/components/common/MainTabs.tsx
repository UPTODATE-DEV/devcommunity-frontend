import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FcHome, FcNook, FcPositiveDynamic, FcSms } from "react-icons/fc";

const ImageLogo = ({ size, url, alt }: { size: number; url: string; alt: string }) => (
  <Image src={url} alt={alt} width={size} height={size} />
);

interface Props {}

const MainTabs: React.FC<Props> = () => {
  const { locale, route } = useRouter();

  const tabs = [
    { path: "/", icon: <FcHome fontSize={28} />, label: locale === "fr" ? "Accueil" : "Home" },
    { path: "/articles", icon: <FcNook fontSize={28} />, label: "Articles" },
    { path: "/posts", icon: <FcSms fontSize={28} />, label: "Posts" },
    { path: "/tags", icon: <ImageLogo url="/icons/tags.png" alt="Tag Icon" size={28} />, label: "Tags" },
    { path: "/top-posts", icon: <FcPositiveDynamic fontSize={28} />, label: "Top posts" },
  ];

  return (
    <Paper
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      variant="outlined"
      p={1}
      sx={{
        position: "sticky",
        top: 90,
        zIndex: 999,
        "&:before": {
          width: "102%",
          height: 20,
          bgcolor: "background.default",
          content: "''",
          position: "absolute",
          top: "-21px",
        },
      }}
      component={Stack}
    >
      {tabs.map(({ path, icon, label }, i) => (
        <Tab icon={icon} label={label} path={path} key={i} />
      ))}
    </Paper>
  );
};

const Tab = ({ icon, label, path }: { icon: any; label: string; path: string }) => {
  const { route } = useRouter();

  const matches = (path: string): boolean => `/${route.split("/")[1]}` === path;

  return (
    <Link href={path} passHref>
      <Button
        color={matches(path) ? "primary" : "inherit"}
        sx={{
          width: 1,
          py: 1.5,
          borderBottom: (theme) => (matches(path) ? `3px solid ${theme.palette.primary.main}` : "none"),
          bgcolor: (theme) => (matches(path) ? theme.palette.action.hover : "none"),
        }}
        startIcon={icon}
      >
        {label}
      </Button>
    </Link>
  );
};

export default MainTabs;
