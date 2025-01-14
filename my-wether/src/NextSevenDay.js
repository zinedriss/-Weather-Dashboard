import {
  Box,
  CardMedia,
  Typography,
  Paper,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// Icons
// import { WbSunny, Cloud } from "@mui/icons-material"; // Import MUI icons

import Mapweather from "./Mapweather";
import { useEffect, useState } from "react";
import {fetchData, fetchWeatherData } from "./features/WeatherApi/WeatherApiSlice";
import FeaturesPlanet from "./FeaturesPlanet";

function NextSevenDay() {
  const dispatch = useDispatch();
  const TodayData = useSelector((state) => state.data.temperature);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday: "short", day: "2-digit", month: "long" };
    return today.toLocaleDateString("en-US", options);
  };

  const LatLon = useSelector((state) => state.data.LatLon);
  const lat = LatLon?.lat;
  const lon = LatLon?.lon;

  const forecastData = useSelector((state) => state.data.synopsis);
  const [weatherSynopsis, setWeatherSynopsis] = useState("");

  useEffect(() => {
    // Dispatch the action to fetch weather data
    dispatch(fetchWeatherData({ lat, lon }));
  }, [lat, lon, dispatch]);

  useEffect(() => {
    // Process and format the weather data when it's fetched
    if (forecastData.length > 0) {
      let days = [];
      let minTemp = Infinity;
      let maxTemp = -Infinity;
      let windSpeed = 0;
      let humidity = 0;
      let weatherConditions = [];

      // Extract and format the data for the next days
      for (let i = 0; i < forecastData.length; i++) {
        const forecast = forecastData[i];
        const date = new Date(forecast.dt * 1000);
        const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });

        // Collect weather conditions and data
        weatherConditions.push(forecast.weather[0].main); // main condition (clear, rain, etc.)
        windSpeed += forecast.wind.speed;
        humidity += forecast.main.humidity;

        // Update temperature ranges
        minTemp = Math.min(minTemp, forecast.main.temp_min);
        maxTemp = Math.max(maxTemp, forecast.main.temp_max);

        // Collect days with rainy or snowy weather
        if (!days.includes(dayOfWeek) && forecast.weather[0].main !== "Clear") {
          days.push(dayOfWeek);
        }
      }

      // Calculate average wind speed and humidity
      windSpeed = (windSpeed / forecastData.length).toFixed(2);
      humidity = (humidity / forecastData.length).toFixed(2);

      // Create the weather synopsis message with various choices
      let conditionSummary = "";
      if (weatherConditions.includes("Rain")) {
        conditionSummary = "🌧️ Rain showers expected,";
      } else if (weatherConditions.includes("Snow")) {
        conditionSummary = "❄️ Snowfall expected,";
      } else if (weatherConditions.includes("Clear")) {
        conditionSummary = "☀️ Clear skies,";
      } else if (weatherConditions.includes("Clouds")) {
        conditionSummary = "☁️ Cloudy weather,";
      } else {
        conditionSummary = "🌥️ Mixed weather,";
      }

      setWeatherSynopsis(
        `${conditionSummary} expect temperatures between ${minTemp}°C and ${maxTemp}°C with an average wind speed of ${windSpeed} m/s and humidity around ${humidity}%.`
      );
    }
  }, [forecastData]);

  return (
    <div
      style={{
        backgroundImage: "url(Pics/pexels-apasaric-325185.jpg)",
        backgroundSize: "cover", // Ensure the image covers the container
        backgroundPosition: "center", // Center the image
        backgroundAttachment: "fixed", // Center the image
        //   // minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      <Container
        maxWidth="xl"
        className="pt-10"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr 2fr",
            gap: 2,
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
            padding: "6px",
            "@media (max-width: 768px)": {
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",
            },
            "@media (min-width: 768px) and (max-width: 992px)": {
              display: "grid",
              gridTemplateColumns: "1fr",
            },
            "@media (min-width: 992px) and (max-width: 1199px)": {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            },
          }}
        >
          {/* Start Main Card Weather Info */}
          {/* Start Main Card Weather Info */}
          {/* Start Main Card Weather Info */}
          <div
            style={{
              width: "400px",
            }}
          >
            <div
              sx={{
                width: "300px",

                mt: 4,
                "@media (max-width: 1024px)": {
                  width: "300px", // Same fixed width
                },
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "10%",
                  overflow: "hidden",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography
                  className="py-2"
                  variant="h5"
                  component="h5"
                  sx={{
                    textAlign: "center",
                    padding: 2,
                    backgroundColor: "#1F1F1F",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {getFormattedDate()}
                </Typography>
                <Box position="relative">
                  <CardMedia
                    component="img"
                    image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                    alt="weather"
                    sx={{ filter: "brightness(0.7)" }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "white",
                      p: 2,
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* Temperature and Details */}
                    <Box>
                      <Typography
                        variant="h1"
                        component="p"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "3rem", // Reduced font size
                          marginBottom: 2,
                          color: "#FFDD57",
                        }}
                      >
                        {TodayData?.clouds ?? "N/A"}°C
                      </Typography>
                      {[
                        {
                          label: "Feels Like",
                          value: TodayData.feelsLike + "°C",
                        },
                        { label: "Wind", value: TodayData.wind + "km/h" },
                        {
                          label: "Pressure",
                          value: TodayData.pressure + "hPa",
                        },
                        { label: "Humidity", value: TodayData.humidity + "%" },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            mb: 1,
                            whiteSpace: "nowrap", // Prevent wrapping
                          }}
                        >
                          <Typography
                            variant="body2" // Reduced font size
                            sx={{
                              flex: 1,
                              textAlign: "left",
                            }}
                          >
                            {item.label} :
                          </Typography>
                          <Typography
                            variant="body2" // Reduced font size
                            sx={{
                              flex: 1,
                              textAlign: "right",
                            }}
                          >
                            <strong>{item.value}</strong>
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Weather Icon and Times */}
                    <Box
                      sx={{
                        // background: "rgba(0, 0, 0, 0.5)",
                        padding: 2,
                        borderRadius: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignSelf: "flex-end",
                      }}
                    >
                      
                      <IconButton>
                  <img
                    alt="images"
                    src={`https://openweathermap.org/img/wn/${TodayData.IconWeather}@2x.png`}
                  ></img>
                </IconButton>
                      <Typography
                        variant="h5"
                        component="p"
                        sx={{ mt: 1, color: "black", paddingBottom: 2 }}
                      >
                        <strong>{TodayData.description}</strong>
                      </Typography>
                      {[
                        { label: "Sunrise ", value: TodayData.sunrise },
                        { label: "Sunset ", value: TodayData.sunset },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            mb: 1,
                            whiteSpace: "nowrap", // Prevent wrapping
                          }}
                        >
                          <Typography
                            variant="body2" // Reduced font size
                            sx={{
                              flex: 1,
                              textAlign: "left",
                            }}
                          >
                            {item.label}:
                          </Typography>
                          <Typography
                            variant="body2" // Reduced font size
                            sx={{
                              flex: 1,
                              textAlign: "right",
                            }}
                          >
                            <strong>{item.value}</strong>
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </div>
          </div>
          {/* End Main Card Weather Info */}
          {/* End Main Card Weather Info */}
          {/* End Main Card Weather Info */}
          {/* ########################## */}
          <div className="pt-16">
          <Box
  sx={{
    textAlign: "first",
    marginBottom: "20px",
    padding: "20px",
    // background: "linear-gradient(135deg, #2193b0, #6dd5ed)", // Gradient background
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#fff",
  }}
>
  <h1
    style={{
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: "0",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      color: "#FFF"
    }}
  >
    Location : <strong>{TodayData?.city?.toUpperCase()}</strong>
  </h1>
  <Box
    className="weather-highlight"
    sx={{
      marginTop: "15px",
      padding: "15px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "10px",
      backdropFilter: "blur(5px)", // Adds a frosted glass effect
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
  >
    <h2
      style={{
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "10px",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
      }}
    >
      This Week's Weather Synopsis
    </h2>
    <p
      style={{
        fontSize: "1.2rem",
        lineHeight: "1.5",
        margin: "0",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      {weatherSynopsis}
    </p>
  </Box>
</Box>

          </div>
          {/* ########################## */}
          {/* ########################## */}
          {/* ########################## */}
          {/* Start Weather Map */}
          {/* Start Weather Map */}
          {/* Start Weather Map */}

          <div style={{ width: "400px", pt: 4 }}>
            <Mapweather />
          </div>
          {/* End Weather Map */}
          {/* End Weather Map */}
          {/* End Weather Map */}
          {/* ############### */}
          {/* ############### */}
          {/* ############### */}
        </Grid>
      </Container>
      <FeaturesPlanet/>
    </div>
  );
}

export default NextSevenDay;
