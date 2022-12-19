import Typography from "@mui/material/Typography";
import hljs from "highlight.js";
import { useCallback, useLayoutEffect, useRef } from "react";

const Content = ({ content, fontSize = 14 }: { content: string; fontSize?: number }) => {
  const preElements = useRef([]);

  const wrapCode = (html: any) => {
    const removeStyles = (html: string) => html.replace(/style="[^"]*"/g, "");
    const wrapCode = (html: string) => html.replace(/<code>([^<]*)<\/code>/g, "<pre><code>$1</code></pre>");

    return wrapCode(removeStyles(html));
  };

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
      variant="body2"
      fontSize={fontSize}
      dangerouslySetInnerHTML={{
        __html: wrapCode(content),
      }}
    />
  );
};

export default Content;
