import Typography from "@mui/material/Typography";
import hljs from "highlight.js";
import { useCallback, useLayoutEffect, useRef } from "react";

const Content = ({ content, fontSize = 14 }: { content: string; fontSize?: number }) => {
  const preElements = useRef([]);

  function addCrossOriginAttributeToImages(htmlString: string): string {
    // Création d'un élément temporaire pour stocker le code HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Récupération de toutes les balises img dans l'élément temporaire
    const imgs = tempDiv.getElementsByTagName("img");

    // Parcours de toutes les balises img et ajout de l'attribut crossorigin="anonymous"
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute("crossorigin", "anonymous");
    }

    // Retour du code HTML mis à jour
    return tempDiv.innerHTML;
  }

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
        __html: addCrossOriginAttributeToImages(content),
      }}
    />
  );
};

export default Content;
