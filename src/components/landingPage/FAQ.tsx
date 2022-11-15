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
      question: "Is Updev Community an Open Source Project?",
      answer:
        "Yes, Updev Community is an open source project. You can contribute to the project by submitting a pull request on Github.",
    },
    {
      id: "2",
      question: "Can I sign up to Updev Community without being a developer?",
      answer:
        "Yes, you can sign up to Updev Community without being a developer. You can follow content and topics of choice by using tags as all posts and articles are assigned to one or more hashtags.",
    },
    {
      id: "3",
      question: "Can I sign up to Updev Community without being a developer?",
      answer:
        "Vous pouvez configurer un compte en cliquant sur le bouton d'inscription dans le coin supérieur droit de la page.",
    },
    {
      id: "4",
      question: "Can I sign up to Updev Community without being a developer?",
      answer: "Yes, you can sign up to Updev Community without being a developer.",
    },
  ],
  [
    {
      id: "1",
      question: "Updev Community est-il un Projet Open Source?",
      answer:
        "Oui, Updev Community est un projet open source. Vous pouvez contribuer au projet en soumettant une demande de tirage sur Github.",
    },
    {
      id: "2",
      question: "Puis-je m'inscrire à Updev Community sans être développeur?",
      answer:
        "Oui, vous pouvez vous inscrire à Updev Community sans être développeur. Vous pouvez suivre le contenu et les sujets de votre choix en utilisant des balises car tous les messages et articles sont attribués à une ou plusieurs balises.",
    },
    {
      id: "3",
      question: "Puis-je m'inscrire à Updev Community sans être développeur?",
      answer:
        "Vous pouvez configurer un compte en cliquant sur le bouton d'inscription dans le coin supérieur droit de la page.",
    },
    {
      id: "4",
      question: "Puis-je m'inscrire à Updev Community sans être développeur?",
      answer: "Oui, vous pouvez vous inscrire à Updev Community sans être développeur.",
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
