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
const labelsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const labelsFr = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export function ViewsMonthsChart() {
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
      const response = await getRequest({ endpoint: `/users/${userId}/yearly-views` });
      if (!response.error) {
        setViews(Object.values(response.data));
      }
    }
    if (user) {
      getUserViews(user.id);
    }
  }, []);

  // [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1]

  return <Line options={options} data={data} height={100} />;
}

export default ViewsMonthsChart;
