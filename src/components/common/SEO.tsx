import { ArticleJsonLd, NextSeo } from "next-seo";
import React from "react";

interface PostSEO {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime: string;
  authors: User;
  tags: string[];
  image?: File;
}

const PostSEO: React.FC<PostSEO> = ({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  image = {
    url: `${process.env.NEXT_PUBLIC_URL}/images/og-image.jpg`,
    width: 850,
    height: 650,
    name: "Updev Community",
  },
}) => {
  function removeTags(str: string): string {
    if (str === null || str === "") return "";
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      <NextSeo
        openGraph={{
          title,
          description: removeTags(description),
          url,
          type: "article",
          article: {
            publishedTime,
            modifiedTime,
            authors: [`${authors.firstName} ${authors.lastName}`],
            tags,
          },
          images: image.url
            ? [
                {
                  url: process.env.NEXT_PUBLIC_FILES_BASE_URL + image.url,
                  width: image.width,
                  height: image.height,
                  alt: image.name,
                },
              ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={url}
        title={title}
        images={[`${process.env.NEXT_PUBLIC_API_URL}/assets/${image.url}`]}
        datePublished={publishedTime}
        dateModified={modifiedTime}
        authorName={`${authors.firstName} ${authors.lastName}`}
        description={description}
        isAccessibleForFree={true}
        publisherName="Updev Community"
      />
    </>
  );
};

export default PostSEO;
