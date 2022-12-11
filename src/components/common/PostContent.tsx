import { Typography } from "@mui/material";
import hljs from "highlight.js";
import React, { useCallback, useLayoutEffect, useRef } from "react";

const PostContent = ({ content }: { content: string }) => {
  const preElements = useRef([]);

  const highlightPreElements = useCallback<any>(() => {
    // @ts-ignore
    preElements.current = document.querySelectorAll("pre");

    preElements.current.forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  useLayoutEffect(() => {
    highlightPreElements();
  }, [highlightPreElements]);

  return (
    <Typography
      color="text.secondary"
      component="div"
      className="content"
      gutterBottom
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default PostContent;
