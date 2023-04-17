import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Sheet = ({ data }: { data: any }) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
      }}
    >
      <Stack
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 4,
          m: 1,
          width: "100%",
          maxWidth: "210mm",
          flexGrow: 1,
          mx: "auto",
          my: 5,
        }}
      >
        <Typography
          color="text.secondary"
          component="div"
          dangerouslySetInnerHTML={{ __html: data?.content }}
          textAlign="justify"
        ></Typography>
      </Stack>
    </Stack>
  );
};

export default Sheet;
