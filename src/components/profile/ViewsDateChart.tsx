import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

function ViewsDateChart() {
  const user = useStore((state) => state.session?.user);
  const [views, setViews] = useState<number[]>([]);
  const [reactions, setReactions] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000))
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const { locale } = useRouter();

  useEffect(() => {
    async function getUserStats(userId: string) {
      const [views, reactions] = await Promise.all([
        getRequest({
          endpoint: `/users/${userId}/views-period?start=${startDate}&end=${endDate}`,
        }),
        getRequest({
          endpoint: `/users/${userId}/reactions-period?start=${startDate}&end=${endDate}`,
        }),
      ]);
      if (!views.error) setViews(Object.values(views.data));
      if (!views.error) setLabels(Object.keys(views.data));
      if (!reactions.error) setReactions(Object.values(reactions.data));
    }
    if (user) {
      getUserStats(user.id);
    }
  }, [startDate, endDate]);

  return (
    <Stack spacing={1}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
        <Grid item xs={12} md={5.5}>
          <DatePicker
            value={startDate}
            maxDate={dayjs(new Date())}
            desktopModeMediaQuery="(min-width: 768px)"
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 1,
                  border: 1,
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  borderColor: "action.disabled",
                  "&:hover": {
                    borderColor: "action.active",
                  },
                }}
              >
                <InputBase placeholder="Hello" ref={inputRef} {...(inputProps as any)} sx={{ width: 1 }} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </Grid>
        <Grid item md={1} justifyContent="center" sx={{ width: 1 }}>
          <HorizontalRuleIcon sx={{ width: 1, mt: 1, mx: "auto" }} />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <DatePicker
            label={locale === "en" ? "To" : "Au"}
            value={endDate}
            minDate={startDate}
            maxDate={dayjs(new Date())}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 1,
                  border: 1,
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  borderColor: "action.disabled",
                  "&:hover": {
                    borderColor: "action.active",
                  },
                }}
              >
                <InputBase placeholder="Hello" ref={inputRef} {...(inputProps as any)} sx={{ width: 1 }} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </Grid>
      </Grid>
      <ChartComponent views={views} reactions={reactions} labels={labels} />
    </Stack>
  );
}

export default ViewsDateChart;
