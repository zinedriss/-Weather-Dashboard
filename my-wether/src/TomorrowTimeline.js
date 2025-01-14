import React, { useEffect } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { IconButton, Typography } from "@mui/material";
import {  GetTomorrowHours } from "./features/WeatherApi/WeatherApiSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TomorrowTimeline() {
  const dispatch = useDispatch();
  const hourly = useSelector((state) => state.data.tomorrowHours);
  const hourlyRes = hourly?.hoursData || []; // Ensure it's not undefined

   // Fetch hourly weather when lat and lon are available
      useEffect(() => {

            dispatch(GetTomorrowHours());

        }, [dispatch,]);

  // Function to get the correct icon URL based on weather description
  const getWeatherIconUrl = (iconCode) => {
    if (!iconCode) {
      return "https://openweathermap.org/img/wn/01d@2x.png"; // Default icon (clear sky)
    }
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <Timeline>
      {hourlyRes.map((entry, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{
              m: "auto 0",
              whiteSpace: "nowrap",
              textAlign: "right",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            variant="body2"
          >
            {`${entry.hour}:00`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {index !== 0 && <TimelineConnector sx={{ height: "4px" }} />}
            <IconButton sx={{ backgroundColor: "#ffffff", padding: "6px" }}>
              <img
                src={getWeatherIconUrl(entry.weatherIconCode)}
                alt={entry.weatherDescription}
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              ></img>
            </IconButton>
          </TimelineSeparator>
          <TimelineContent
            sx={{
              py: "12px",
              px: 2,
              color: "#ffffff",
              textAlign: "left",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              {`${entry.temperature}°C`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "normal", color: "#e0e0e0", mt: 1 }}
            >
              {entry.weatherDescription}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
