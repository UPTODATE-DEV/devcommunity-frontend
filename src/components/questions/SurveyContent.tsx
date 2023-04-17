import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { patchRequest } from "@/lib";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { alpha, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { shortenNumber } from "../../lib/shorterNumber";
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

const Options = ({ options, onVote }: { options: SurveyOption[]; onVote: (optionId: string) => void }) => {
  return (
    <Stack spacing={1}>
      {options.map((option) => (
        <Button
          key={option.id}
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "primary.main",
            borderRadius: 50,
          }}
          onClick={() => onVote(option.id)}
        >
          {option.content}
        </Button>
      ))}
    </Stack>
  );
};

const Results = ({ options }: { options: SurveyOption[] }) => {
  const { session } = useStore((state) => state);
  const totalVotes = options.reduce((acc, option) => acc + option.votes.length, 0) || 0;
  const userVote = options.find((option) => option.votes.find((vote) => vote.user.id === session?.user?.id));

  function formatNumber(number: Number) {
    const formattedNumber = parseFloat(number.toString()).toFixed(2);
    return formattedNumber.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
  }

  return (
    <Stack spacing={1}>
      {options.map((option) => (
        <Paper
          key={option.id}
          component={Stack}
          alignItems="center"
          justifyContent="space-between"
          variant="outlined"
          direction="row"
          sx={{
            borderRadius: 50,
            borderColor: "divider",
            py: 1,
            px: 2,
            position: "relative",
          }}
        >
          <Typography variant="body2" component="div" color="text.secondary">
            {option.content}
            {userVote?.id === option.id && (
              <CheckCircleIcon sx={{ position: "relative", top: 2, left: 4, fontSize: 14 }} />
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalVotes > 0 ? formatNumber((option.votes.length / totalVotes) * 100) : 0}%
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${(option.votes.length / totalVotes) * 100}%`,
              borderRadius: 50,
              display: option.votes.length > 0 ? "block" : "none",
              bgcolor: (theme) => alpha(theme.palette.action.hover, 0.1),
            }}
          />
        </Paper>
      ))}
    </Stack>
  );
};

const SurveyContent = ({ survey }: { survey: Survey }) => {
  const [vote, setVote] = useState(false);
  const { session } = useStore((state) => state);
  const { setOpenLoginModal } = useStoreNoPersist((state) => state);
  const [surveyOptions, setSurveyOptions] = useState<SurveyOption[]>(survey.options);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const { locale } = useRouter();

  const lastDayOfSurvey = dayjs(survey.createdAt).add(survey.duration, "days");
  const isLastDayOfSurvey = lastDayOfSurvey.isSameOrBefore(dayjs());
  const timeLeftText = isLastDayOfSurvey ? dayjs().to(lastDayOfSurvey) : dayjs().to(lastDayOfSurvey, true);

  const handleVote = () => {
    setVote(true);
  };

  const onVote = async (optionId: string) => {
    if (!session?.user?.id) return setOpenLoginModal(true);
    setIsLoading(true);
    const response = await patchRequest({
      endpoint: `/posts/${session?.user?.id}/vote`,
      data: { surveyId: survey.id, optionId },
    });

    if (response.error) {
      toast.error(response.error.message);
    } else {
      setSurveyOptions(response.data?.options);
      handleVote();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.user?.id) {
      const userVote = surveyOptions.find((option) => option.votes.find((vote) => vote.user.id === session?.user?.id));
      if (userVote) handleVote();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    if (dayjs(survey.createdAt).add(survey.duration, "days").isSameOrBefore(dayjs())) setIsExpired(true);
  }, [surveyOptions]);

  return (
    <Paper
      component={Stack}
      variant="outlined"
      spacing={2}
      sx={{ px: 2, py: 3, borderRadius: 2, borderColor: "divider" }}
    >
      <Typography variant="body1" component="h2" fontWeight={600} gutterBottom>
        {survey?.question?.content}
      </Typography>

      <Stack sx={{ position: "relative" }}>
        {isLoading && (
          <Stack sx={{ width: 1, height: 200 }} justifyContent="center" alignItems="center">
            <CircularProgress color="inherit" />
          </Stack>
        )}

        {!isLoading &&
          (vote || isExpired ? (
            <Results options={surveyOptions} />
          ) : (
            <Options options={surveyOptions} onVote={onVote} />
          ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="caption" component="h2" gutterBottom>
          {shortenNumber(surveyOptions.reduce((acc, option) => acc + option.votes.length, 0))} votes
        </Typography>
        <Typography variant="caption" component="h2" gutterBottom>
          -
        </Typography>
        <Typography variant="caption" component="h2" gutterBottom>
          {locale === "fr" ? "Expire" : "Expires"} {timeLeftText}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SurveyContent;
