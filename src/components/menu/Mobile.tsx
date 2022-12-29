import useStore from "@/hooks/useStore";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import dynamic from "next/dynamic";
import * as React from "react";

const LeftSideBar = dynamic(import("@/components/sideBars/LeftSideBar"), {
  ssr: false,
  loading: () => null,
});

export default function Mobile() {
  const { openMobileMenu, setOpenMobileMenu } = useStore((state) => state);

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenMobileMenu(!openMobileMenu);
  };

  const MobileMenu = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer()} onKeyDown={toggleDrawer()}>
      <LeftSideBar />
    </Box>
  );

  return (
    <Drawer anchor="left" open={openMobileMenu} onClose={toggleDrawer()}>
      <MobileMenu />
    </Drawer>
  );
}
