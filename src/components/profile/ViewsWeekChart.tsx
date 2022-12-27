import useStore from "@/hooks/useStore";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getRequest } from "../../lib";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
const labelsEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const labelsFr = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function ViewsWeekChart() {
  const { locale } = useRouter();
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);

  const labels = locale === "fr" ? labelsFr : labelsEn;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: locale === "en" ? "Views number" : "Nombre de vues",
        data: views,
        borderColor: "#0179bb",
        backgroundColor: "#0179bb57",
      },
    ],
  };

  useEffect(() => {
    async function getUserViews(userId: string) {
      const response = await getRequest({ endpoint: `/users/${userId}/weekly-views` });
      if (!response.error) {
        setViews(Object.values(response.data));
      }
    }
    if (user) {
      getUserViews(user.id);
    }
  }, []);

  return <Line options={options} data={data} height={100} />;
}

export default ViewsWeekChart;
