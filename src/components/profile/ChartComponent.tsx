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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
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

  return <Line options={options} data={configData} height={110} />;
}

export default memo(ViewsDaysChart);
