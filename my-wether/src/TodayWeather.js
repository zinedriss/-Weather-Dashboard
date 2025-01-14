// Icons

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import OpacityIcon from "@mui/icons-material/Opacity";
import Timeline from "./TimeLine.js";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  GetTodayHours,
} from "./features/WeatherApi/WeatherApiSlice.js";
import { getLongDescription } from "./weatherDescriptions";


// Material-UI Core Components
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";

export default function Todayweather() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.data.temperature);
  const loading = useSelector((state) => state.data.loading.fetchData);
  const error = useSelector((state) => state.data.error.fetchData);
  
  const LatLon = useSelector((state) => state.data.LatLon);
  const lat = LatLon?.lat;
  const lon = LatLon?.lon;

  // Assuming res.weather[0].description contains the weather description
  const description = weather.description;
  // Get the long description
  const longDescription = getLongDescription(description);


  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Fetch hourly weather when lat and lon are available
  useEffect(() => {
    if (lat && lon) {
      dispatch(GetTodayHours({ lat, lon }));
    }
  }, [dispatch, lat, lon]);

  // Data Arrays
  const conditions = [
    {
      icon: <ThermostatIcon />,
      title: "Real Feel",
      value: weather.feelsLike + "°C",
    },
    {
      icon: <ArrowDownwardIcon />,
      title: "Min Temp",
      value: weather.tempMin + "°C",
    },
    {
      icon: <ArrowUpwardIcon />,
      title: "Max Temp",
      value: weather.tempMax + "°C",
    },
    {
      icon: <WbSunnyIcon />,
      title: "pressure",
      value: weather.pressure + " hPa",
    },
    { icon: <OpacityIcon />, title: "Humidity", value: weather.humidity + "%" },
    { icon: <AirIcon />, title: "Wind", value: weather.wind + " km/h" },
  ];
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',  // Full day name (e.g., "Monday")
    month: 'long',    // Full month name (e.g., "January")
    day: 'numeric',   // Day of the month (e.g., 4)
  });

  return (
    // Background Section
    <div
      style={{
        backgroundImage: "url(Pics/pexels-apasaric-325185.jpg)",
        backgroundSize: "cover", // Ensure the image covers the container
        backgroundPosition: "center", // Center the image
        backgroundAttachment: "fixed", // Center the image
      }}
      className="pt-32"
    >
      {loading ? (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          {/* Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-200 animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-lg font-semibold text-gray-600">
          Fetching weather data, please wait...
        </p>
      </div>
    ) : error ? (
      // Error UI
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          {/* Error Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.93-11.36a.75.75 0 00-1.86 0l-.82 3.29h-1.44a.75.75 0 000 1.5h1.27l-.35 1.41h-1.06a.75.75 0 000 1.5h.8l-.23.92a.75.75 0 101.46.35l.35-1.41h1.44a.75.75 0 100-1.5h-1.27l.82-3.29zm-.93 7.36a1 1 0 110-2 1 1 0 010 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Error Text */}
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            Something went wrong!
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Unable to fetch the weather data. Please try again later.
          </p>

          {/* Retry Button */}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    ) : (
      <Container
        maxWidth="xl"
        sx={{
          padding: 2, // Optional padding
          borderRadius: 2, // Optional border radius
          "@media (max-width: 768px)": {
            // Media query for smaller screens

            justifyItems: "center", // Centering content horizontally
            alignItems: "center",
          },
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 4,
            "@media (max-width: 900px)": {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <Box
            sx={{
              "@media (max-width: 768px)": {
                // Media query for smaller screens
                display: "flex",
                flexDirection: "column",
                justifyItems: "center", // Centering content horizontally
                alignItems: "center",
              },
            }}
          >
            {/* Weather Details */}
            <Box
              sx={{
                padding: 4,
                display: "grid",
                gridTemplateColumns: "2fr 1fr", // Default layout for larger screens
                gap: 3,
                justifyItems: "space-between",
                "@media (max-width: 768px)": {
                  // Media query for smaller screens
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center", // Centering content horizontally
                  alignItems: "center",
                },
              }}
            >
              {/*  */}
              <Box
                sx={{ display: "flex", justifyContent: "center", padding: 2 }}
              >
                <LocationOnOutlinedIcon />
                <Box>
                  <Typography style={{ paddingLeft: 4, fontSize: "30px" }}>
                    {weather.city},{" "}
                    <i style={{ fontSize: "20px" }} className="text-gray-700 ">
                      {weather.country}
                    </i>
                  </Typography>
                  <Typography>{`(${formattedDate})`}</Typography>
                </Box>
              </Box>
              {/*  */}

              <Box
                style={{
                  display: "flex",

                  gap: 20,
                }}
              >
                <Typography variant="h1" gutterBottom>
                  {weather.clouds}°
                </Typography>
                <IconButton>
                  <img
                    alt="images"
                    src={`https://openweathermap.org/img/wn/${weather.IconWeather}@2x.png`}
                  ></img>
                </IconButton>
                {/* Displaying the icon */}
              </Box>
            </Box>

            {/* Weather Description */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 1,
              }}
            >
              <h1
                className="text-4xl tracking-tight font-extrabold text-gray-900 p-6  sm:text-5xl md:text-6xl"
                data-aos="zoom-y-out"
                data-aos-delay={150}
              >
                {weather?.description?.toUpperCase()}{" "}
                <br className="max-lg:hidden" />
              </h1>

              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  width: { sm: "100%", md: "80%" },
                }}
              >
                {longDescription}
              </Typography>
            </Box>

            {/* Air Conditions */}
            <CardContent
              sx={{
                p: 3,
                width: "fit-content",
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "rgba(0,0,0, 0.5)",
                color: "#E5E3D4",
                marginTop: 4,
                marginBottom: 4,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
              >
                Air Conditions
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gridTemplateColumns: "1fr 1fr 1fr ",
                  "@media (max-width: 768px)": {
                    width: 1,
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    gridTemplateColumns: "1fr 1fr 1fr ",
                  },
                }}
              >
                {conditions.map((condition, index) => (
                  <Grid item key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        minWidth: 150,
                        alignItems: "center",
                        gap: 1,
                        p: 2,
                        backgroundColor: "#fff",
                        borderRadius: 1,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                      className="text-[#F29F58]"
                    >
                      {condition.icon}
                      <Box>
                        <Typography
                          className="text-[#F29F58]"
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          {condition.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {condition.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <CardActions>
                {/* <Button size="small" sx={{ color: "#E5E3D4" }}>
                  See More
                </Button> */}
              </CardActions>
            </CardContent>
          </Box>

          {/* Hourly Forecast */}
          <Card
            className="center-flex "
            sx={{
              width: "80%",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundImage: "url(/Pics/pexels-ekamelev-813872.jpg)", // Replace with your image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
              display: "flex",
              justifyContent: "center" /* Aligns items horizontally */,
              alignItems: "center" /* Aligns items vertically */,
              flexDirection: "column",
              color: "#E5E3D4", // Text color
              "@media (max-width: 768px)": {
                width: "70%",
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
                color: "#E5E3D4",
              }}
            >
              Today's Forecast
            </Typography>
            <Timeline />
          </Card>
        </Box>
      </Container>
      )}
    </div>
  );
}
