import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

export function ViewsDaysChart() {
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);
  const [reactions, setReactions] = useState<number[]>([]);

  const labels = Object.keys(views).map((el) => el.substring(0, 10));

  useEffect(() => {
    async function getUserStats(userId: string) {
      const [views, reactions] = await Promise.all([
        getRequest({ endpoint: `/users/${userId}/monthly-views` }),
        getRequest({ endpoint: `/users/${userId}/monthly-reactions` }),
      ]);
      if (!views.error) setViews(Object.values(views.data));
      if (!reactions.error) setReactions(Object.values(reactions.data));
    }
    if (user) {
      getUserStats(user.id);
    }
  }, []);

  return (
      <ChartComponent views={views} reactions={reactions} labels={labels} />
  )
}

export default ViewsDaysChart;
