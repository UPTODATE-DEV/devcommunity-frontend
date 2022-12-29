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
import { getRequest } from "@/lib";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export function ViewsDaysChart() {
  const { locale } = useRouter();
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);

  const labels = Object.keys(views).map((el) => el.substring(0, 10));

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
      const response = await getRequest({ endpoint: `/users/${userId}/monthly-views` });
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

export default ViewsDaysChart;
