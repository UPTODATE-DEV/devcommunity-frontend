import useStore from "@/hooks/useStore";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const SuggestionViewMore = ({ tags }: { tags: Tags[] }) => {
  const { setMultiTagsFilters, setShowTagsFilters } = useStore((state) => state);
  const { push, locale } = useRouter();

  const handleViewMore = () => {
    setShowTagsFilters(true);
    setMultiTagsFilters(tags.map((el) => el.tag));
    push("/tags");
  };

  return <Button onClick={handleViewMore}>{locale === "en" ? "View more" : "Voir plus"}</Button>;
};

export default SuggestionViewMore;
