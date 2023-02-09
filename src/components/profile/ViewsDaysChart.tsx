import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

function ViewsDaysChart() {
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);
  const [reactions, setReactions] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function getUserStats(userId: string) {
      const [views, reactions] = await Promise.all([
        getRequest({ endpoint: `/users/${userId}/monthly-views` }),
        getRequest({ endpoint: `/users/${userId}/monthly-reactions` }),
      ]);
      if (!views.error) setViews(Object.values(views.data));
      if (!views.error) setLabels(Object.keys(views.data));
      if (!reactions.error) setReactions(Object.values(reactions.data));
    }
    if (user) {
      getUserStats(user.id);
    }
  }, []);

  return <ChartComponent views={views} reactions={reactions} labels={labels} />;
}

export default ViewsDaysChart;
