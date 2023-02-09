import { useRouter } from "next/router";

const SeeMore = () => {
  const { locale } = useRouter();

  return (
    <>{`<a href="#" hrefLang={locale}>
  ${locale === "fr" ? "Voir plus" : "See more"}
</a>`}</>
  );
};

export default SeeMore;
