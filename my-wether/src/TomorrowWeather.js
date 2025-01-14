// Icons

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import OpacityIcon from "@mui/icons-material/Opacity";
// import Timeline from "./TimeLine.js";
import { useSelector, useDispatch } from "react-redux";
import {
  GetTomorrowHours,
  GetTomorrowWeather,
} from "./features/WeatherApi/WeatherApiSlice.js";
// import { getLongDescription } from "./weatherDescriptions";

// Material-UI Core Components
import {
  Box,
  //   Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { useEffect } from "react";
import { getLongDescription } from "./weatherDescriptions.js";
import TomorrowTimeline from "./TomorrowTimeline.js";

export default function TomorrowWeather() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.data.tomorrowWeather); // Selector for tomorrow's weather

  const LatLon = useSelector((state) => state.data.LatLon);
  const lat = LatLon?.lat;
  const lon = LatLon?.lon;
  // Assuming res.weather[0].description contains the weather description
  const description = weather?.description;
  // Get the long description
  const longDescription = getLongDescription(description);

  // Fetch hourly weather when lat and lon are available
  useEffect(() => {
    if (lat && lon) {
      dispatch(GetTomorrowWeather({ lat, lon }));
    }
  }, [dispatch, lat, lon]);

  // Fetch hourly weather when lat and lon are available
  useEffect(() => {
    if (lat && lon) {
      dispatch(GetTomorrowHours({ lat, lon }));
    }
  }, [dispatch, lat, lon]);

  // Data Arrays
  const conditions = [
    {
      icon: <ThermostatIcon />,
      title: "Real Feel",
      value: weather?.feelsLike + "°C",
    },
    {
      icon: <ArrowDownwardIcon />,
      title: "Min Temp",
      value: weather?.tempMin + "°C",
    },
    {
      icon: <ArrowUpwardIcon />,
      title: "Max Temp",
      value: weather?.tempMax + "°C",
    },
    {
      icon: <WbSunnyIcon />,
      title: "pressure",
      value: weather?.pressure + " hPa",
    },
    {
      icon: <OpacityIcon />,
      title: "Humidity",
      value: weather?.humidity + "%",
    },
    { icon: <AirIcon />, title: "Wind", value: weather?.wind + " km/h" },
  ];
   // Get today's date and add one day to it
   const tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
 
   // Format tomorrow's date
   const formattedDate = tomorrow.toLocaleDateString('en-US', {
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
                    {weather?.city},{" "}
                    <i style={{ fontSize: "20px" }} className="text-gray-700 ">
                      {weather?.country}
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
                  {weather?.clouds}°
                </Typography>
                <IconButton>
                  <img
                    alt="images"
                    src={`https://openweathermap.org/img/wn/${weather?.IconWeather}@2x.png`}
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
              Tomorrow's Forecast
            </Typography>
            <TomorrowTimeline />
          </Card>
        </Box>
      </Container>
    </div>
  );
}
