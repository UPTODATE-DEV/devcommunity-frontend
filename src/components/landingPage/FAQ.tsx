import useStore from "@/hooks/useStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";

const faq = [
  {
    id: "1",
    question: "How can I properly setup an account?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Invidiosum nomen est, infame, suspectum. Utilitatis causa amicitia est quaesita. Non laboro, inquit, de nomine. Duo Reges: constructio interrete. Aliter homines, aliter philosophos loqui putas oportere?",
  },
  {
    id: "2",
    question: "How can I properly setup an account?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Invidiosum nomen est, infame, suspectum. Utilitatis causa amicitia est quaesita. Non laboro, inquit, de nomine. Duo Reges: constructio interrete. Aliter homines, aliter philosophos loqui putas oportere?",
  },
  {
    id: "3",
    question: "How can I properly setup an account?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Invidiosum nomen est, infame, suspectum. Utilitatis causa amicitia est quaesita. Non laboro, inquit, de nomine. Duo Reges: constructio interrete. Aliter homines, aliter philosophos loqui putas oportere?",
  },
  {
    id: "4",
    question: "How can I properly setup an account?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Invidiosum nomen est, infame, suspectum. Utilitatis causa amicitia est quaesita. Non laboro, inquit, de nomine. Duo Reges: constructio interrete. Aliter homines, aliter philosophos loqui putas oportere?",
  },
];

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container sx={{ position: "relative", py: 6 }}>
      <Stack justifyContent="center" sx={{ width: { xs: 1, md: 0.5 }, mx: "auto" }}>
        <Typography textAlign="center" color="text.primary" fontWeight={700} variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography textAlign="center" color="text.secondary" gutterBottom>
          Everything you need to know to get started
        </Typography>
      </Stack>
      <Stack sx={{ py: 6 }}>
        <Grid container>
          {faq.map((el, i) => (
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
                  <Typography variant="h6" fontWeight={700}>
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
