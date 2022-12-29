import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

const labelsEn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const labelsFr = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function ViewsWeekChart() {
  const { locale } = useRouter();
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);
  const [reactions, setReactions] = useState<number[]>([]);

  const labels = locale === "fr" ? labelsFr : labelsEn;

  useEffect(() => {
    async function getUserStats(userId: string) {
      const [reactions, views] = await Promise.all([
        getRequest({ endpoint: `/users/${userId}/weekly-views` }),
        getRequest({ endpoint: `/users/${userId}/weekly-reactions` }),
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

export default ViewsWeekChart;
