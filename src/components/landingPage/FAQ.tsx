import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";

const faq = [
  [
    {
      id: "1",
      question: "Is Dev Community an Open Source Project?",
      answer:
        "Dev Community is actually an open source/participative project being built by the fellowship of developers. Learn how you can contribute",
    },
    {
      id: "2",
      question: "Can I sign up to Dev Community without being a developer?",
      answer:
        "Yes, as long as you are interested in technology and want to see what the community has to share. Dev Community is made up of members of all levels, from the simple technology enthusiast to the most experienced developer.",
    },
    {
      id: "3",
      question: "What is the difference between an and a post?",
      answer:
        "Use articles to share relatively long writings. Add a title, a cover image, some hashtags and go ahead sharing about anything tech or related. You can easily format your text, add images and even insert pieces of code as inline or block elements. As for posts, they are commonly short. Use posts to ask questions, share quick tips, spontaneous discoveries.",
    },
    {
      id: "4",
      question: "What are tags for and why should I add them in my posts/articles?",
      answer:
        "Tags (sometimes hashtags) are used to classify the content published in Dev Community and filter the content presented to the reader according to the topics, areas and trends in which they are interested.",
    },
  ],
  [
    {
      id: "1",
      question: "Dev Community est-il un projet Open Source? Comment contribuer à son développement?",
      answer: "Dev community est un projet développé par toute la communauté",
    },
    {
      id: "2",
      question: "Puis-je intégrer Dev Community sans être un développeur?",
      answer:
        "Oui, du moment que vous vous intéressez à la technologie et voulez découvrir ce que la communauté a à partager. Dev Community regroupe est composé des membres de tous les niveaux, du simple enthousiaste à la technologie au développeur le plus expérimenté.",
    },
    {
      id: "3",
      question: "Quelle est la différence entre un post et un article?",
      answer:
        "Utilisez des articles pour partager des idées relativement longues. Ajoutez un titre, une image de couverture, des hashtags et développez votre idée. Vous pouvez facilement formater votre texte, ajouter des images et même insérer des portions de code en tant qu'éléments ‘inline’ ou ‘block’. Quant aux posts, ils sont généralement courts. Utilisez les posts pour poser des questions, partager des astuces, des découvertes spontanées, etc.",
    },
    {
      id: "4",
      question: "A quoi servent les tags pourquoi devrais-je en ajouter dans mes publications?",
      answer:
        "Les tags (parfois hashtags) servent à catégoriser le contenu publié dans Dev Community et filtrer les publications présentées au lecteur selon les sujets, les domaines et les tendances qui l’intéressent.",
    },
  ],
];

const data = [
  {
    title: "Frequently Asked Questions",
    description: "You have questions? We have answers",
  },
  {
    title: "Foire aux questions",
    description: "Vous avez des questions? Nous avons des réponses",
  },
];

const FAQ: React.FC = () => {
  const { locale } = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const { title, description } = data[locale === "en" ? 0 : 1];

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const {} = faq[locale === "en" ? 0 : 1];

  return (
    <Container sx={{ position: "relative", py: 6 }}>
      <Stack justifyContent="center" sx={{ width: { xs: 1, md: 0.5 }, mx: "auto" }}>
        <Typography textAlign="center" color="text.primary" fontWeight={700} variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography textAlign="center" color="text.secondary" gutterBottom>
          {description}
        </Typography>
      </Stack>
      <Stack sx={{ py: 6 }}>
        <Grid container>
          {faq[locale === "en" ? 0 : 1].map((el, i) => (
            <Grid key={i} item xs={12} md={6}>
              <Accordion
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
                TransitionProps={{ unmountOnExit: true }}
                elevation={0}
                sx={{
                  my: 1,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${i}` ? <CancelIcon color="primary" /> : <AddCircleIcon color="primary" />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ borderTop: "none" }}
                >
                  <Typography color="text.primary" fontWeight={700}>
                    {el?.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{el.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default FAQ;
