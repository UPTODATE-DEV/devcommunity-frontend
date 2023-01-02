import { shortenNumber } from "@/lib/shorterNumber";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useRouter } from "next/router";
import { memo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ViewsDaysChart({
  views,
  reactions,
  labels,
}: {
  views: number[];
  reactions: number[];
  labels: string[];
}) {
  const { locale } = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    yAxis: {
      min: 10,
      max: 100,
    },
  };

  const configData = {
    labels,
    datasets: [
      {
        label: locale === "en" ? "Views number" : "Nombre de vues",
        data: views,
        borderColor: "#0179bb",
        backgroundColor: "#0179bb",
      },
      {
        label: locale === "en" ? "Reactions number" : "Nombre de reactions",
        data: reactions,
        borderColor: "#e18e11",
        backgroundColor: "#e18e11",
      },
    ],
  };

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Stack spacing={2} direction="row">
        <Paper sx={{ p: 2, width: 1 }} variant="outlined">
          <Typography variant="h4" color="primary.main" fontWeight={700}>
            {shortenNumber(views.reduce((a, b) => a + b, 0))}
          </Typography>
          <Typography color="text.secondary">{locale === "en" ? "Views number" : "Nombre de vues"}</Typography>
        </Paper>
        <Paper sx={{ p: 2, width: 1 }} variant="outlined">
          <Typography variant="h4" color="secondary.main" fontWeight={700}>
            {shortenNumber(reactions.reduce((a, b) => a + b, 0))}
          </Typography>
          <Typography color="text.secondary">{locale === "en" ? "Reactions number" : "Nombre de reactions"}</Typography>
        </Paper>
      </Stack>
      <Line options={options} data={configData} height={isMobile ? 250 : 110} />
    </Stack>
  );
}

export default memo(ViewsDaysChart);
