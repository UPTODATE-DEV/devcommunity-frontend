import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

const labelsEn = [
  "December",
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
];
const labelsFr = [
  "Décembre",
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
];

export function ViewsMonthsChart() {
  const { locale } = useRouter();
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);
  const [reactions, setReactions] = useState<number[]>([]);

  const labels = locale === "fr" ? labelsFr : labelsEn;

  useEffect(() => {
    async function getUserStats(userId: string) {
      const [views, reactions] = await Promise.all([
        getRequest({ endpoint: `/users/${userId}/yearly-views` }),
        getRequest({ endpoint: `/users/${userId}/yearly-reactions` }),
      ]);
      if (!views.error) setViews(Object.values(views.data));
      if (!reactions.error) setReactions(Object.values(reactions.data));
    }
    if (user) {
      getUserStats(user.id);
    }
  }, []);

  return <ChartComponent views={views} reactions={reactions} labels={labels} />;
}

export default ViewsMonthsChart;
