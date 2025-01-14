{/* Start the weekly forest weather */}
        {/* Start the weekly forest weather */}
        {/* Start the weekly forest weather */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 0 0",
              maxWidth: "900px",
              "@media (max-width: 768px)": {
                width: "300px",
              },
              "@media (max-width: 1024px)": {
                width: "600px",
              },
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
              WEEKLY FORECAST
            </Typography>

            <Grid container spacing={2}>
              {/* Map through the forecastData array */}
              {forecastData.map((forecast, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={idx}
                  sx={{
                    padding: "1rem",
                    background:
                      "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%)",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                    {forecast.day}
                  </Typography>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <img src={forecast.icon} alt={forecast.day} width="40" />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {forecast.dataUnavailable
                      ? "Data Unavailable"
                      : `${forecast.temp}`}
                  </Typography>

                  {!forecast.dataUnavailable && (
                    <Grid container spacing={1} sx={{ marginTop: "1rem" }}>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Wind: {forecast.wind}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Humidity: {forecast.humidity}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        {/* End the weekly forest weather */}
        {/* End the weekly forest weather */}
        {/* End the weekly forest weather */}


        {/* Start Large Cities */}
          {/* Start Large Cities */}
          {/* Start Large Cities */}
          <Box
            sx={{
              "@media (max-width: 1024px)": {
                width: "90%", // Adjust width to fit content
                gridColumn: "span 2", // If this is part of a grid, make the item span 2 columns
              },
              "@media (max-width: 768px)": {
                width: "70%", // Adjust width to fit content
              },
            }}
            className="p-6 bg-gray-100 rounded-xl shadow-md w-fit"
          >
            {/* Title */}
            <Typography
              variant="body3"
              className="font-bold text-center  pb-8 uppercase tracking-wide"
            >
              Other Large Cities
            </Typography>

            {/* City Boxes */}
            <Box
              className="space-y-4 max-w-64 w-full"
              sx={{
                "@media (max-width: 1024px)": {
                  display: "flex",
                  justifyContent: "space-around",
                  alignContent: "center",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  maxWidth: "none",
                  // height:"200px"
                },
                "@media (max-width: 768px)": {
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              {cities.map((city, index) => (
                <Box
                  key={index}
                  className="flex justify-between items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                  sx={{
                    "@media (max-width: 1024px)": {
                      height: "100px",
                      minWidth: "100px",
                      width: "200px",
                    },
                  }}
                >
                  {/* Left Side: City Details */}
                  <Box className="flex items-start flex-col space-y-1">
                    <Typography
                      variant="body1"
                      className="font-semibold text-gray-700"
                    >
                      {city.country}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-700"
                    >
                      {city.city}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="font-semibold text-gray-700"
                    >
                      {city.weather}
                    </Typography>
                  </Box>

                  {/* Right Side: Weather Icon & Temperature */}
                  <Box className="flex flex-col items-center space-x-2">
                    {city.icon}
                    <Typography
                      variant="h6"
                      className="font-bold text-gray-800 text-lg"
                    >
                      {city.temp}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* End Large Cities */}
          {/* End Large Cities */}
          {/* End Large Cities */}
          {/* End Large Cities */}

            const cities = [
    {
      country: "US",
      city: "New York",
      weather: "Cloudy",
      icon: <Cloud className="text-gray-400" />,
      temp: "18°C",
    },
    {
      country: "FR",
      city: "Paris",
      weather: "Sunny",
      icon: <WbSunny className="text-yellow-400" />,
      temp: "25°C",
    },
    {
      country: "JP",
      city: "Tokyo",
      weather: "Snowy",
      icon: <AcUnit className="text-blue-400" />,
      temp: "-2°C",
    },
  ];
  const forecastData = [
    {
      day: "Monday",
      icon: "weather-icon.png",
      temp: "25°C",
      wind: "5 m/s",
      humidity: "60%",
    },
    {
      day: "Tuesday",
      icon: "weather-icon.png",
      temp: "22°C",
      wind: "6 m/s",
      humidity: "55%",
    },
    {
      day: "Wednesday",
      icon: "weather-icon.png",
      temp: "28°C",
      wind: "4 m/s",
      humidity: "65%",
    },
    {
      day: "Thursday",
      icon: "weather-icon.png",
      temp: "26°C",
      wind: "7 m/s",
      humidity: "70%",
    },
    {
      day: "Friday",
      icon: "weather-icon.png",
      temp: "27°C",
      wind: "3 m/s",
      humidity: "60%",
    },
    {
      day: "Saturday",
      icon: "weather-icon.png",
      temp: "24°C",
      wind: "5 m/s",
      humidity: "58%",
    },
    {
      day: "Sunday",
      icon: "unknown.png",
      temp: "N/A",
      wind: "N/A",
      humidity: "N/A",
      dataUnavailable: true,
    },
  ];





** 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=fes&lang=en&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
    try {
      const response = await axios.get(url);
      const res = response.data;
      const description = res.weather[0].description;
      const clouds = Math.round(res.main.temp - 273.15);
      const tempMin = Math.round(res.main.temp_min - 273.15);
      const humidity = Math.round(res.main.humidity);
      const tempMax = Math.round(res.main.temp_max - 273.15);
      const feelsLike = Math.round(res.main.feels_like - 273.15);
      const wind = res.wind.speed;
      const city = res.name;
      const country = res.sys.country;
      const weatherTitle = res.weather[0].description;
      const IconWeather = res.weather[0].icon;

      return {
        wind,
        feelsLike,
        humidity,
        country,
        description,
        clouds,
        tempMin,
        tempMax,
        city,
        weatherTitle,
        IconWeather,
      };
    } catch {
      console.log("error");
    }
  }
);

// export const GetLatLon = createAsyncThunk(
//   "api/GetLatLon",
//   async (cityName) => {
//     const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
//     try {
//       const response = await axios.get(url);
//       const data = response.data;
//       const lat = response.data[0].lat;
//       const lon = response.data[0].lon;

//       return { lat, lon, data };
//     } catch {
//       console.log("error");
//     }
//   }
// );
// // Fetch hourly forecast data (filtered for specific hours)
// export const GetHours = createAsyncThunk(
//   "api/GetHours",
//   async ({ lat, lon }) => {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
//     try {
//       const response = await axios.get(url);
//       const forecastData = response.data.list;

//       // Filter for the desired times (6, 9, 12)
//       const filteredData = forecastData.filter((forecast) => {
//         const date = new Date(forecast.dt * 1000);
//         const hour = date.getHours();
//         return hour === 6 || hour === 9 || hour === 12; // Filter for 6 AM, 9 AM, and 12 PM
//       });

//       return filteredData; // Return the filtered data
//     } catch {
//       console.log("Error fetching hourly forecast");
//     }
//   }
// );

export const weatherApiSlice = createSlice({
  name: "api",
  initialState: {
    temperature: "null",
    // lat_lon: null,
    // hours: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch current weather data
      .addCase(fetchData.pending, (state) => {
        console.log(state);
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.temperature = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(state);
      })
      // // Fetch latitude and longitude for the city
      // .addCase(GetLatLon.pending, (state) => {
      //   console.log(state);
      // })
      // .addCase(GetLatLon.fulfilled, (state, action) => {
      //   state.lat_lon = action.payload;
      // })
      // .addCase(GetLatLon.rejected, (state, action) => {
      //   console.log(state);
      // })
      // // Fetch hourly forecast data (filtered for 6 AM, 9 AM, and 12 PM)
      // .addCase(GetHours.pending, (state) => {
      //   console.log(state);
      // })
      // .addCase(GetHours.fulfilled, (state, action) => {
      //   state.hours = action.payload; // Store filtered hourly forecast data
      // })
      // .addCase(GetHours.rejected, (state) => {
      //   console.log(state);
      // });
  },
});
export default weatherApiSlice.reducer;

// export const fetchSevenDays = createAsyncThunk(
//   "api/fetchSevenDays",
//   async () => {
//     const url = `http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
//     try {
//       const response = await axios.get(url);
//       const data = response.data
//       console.log(" 7 days is ", data);

//       return data;
//     } catch {
//       console.log("error");
//     }
//   }
// );

// .addCase(fetchSevenDays.pending, (state) => {
//   console.log(state);
// })
// .addCase(fetchSevenDays.fulfilled, (state, action) => {
//   state.days = action.payload;
// })
// .addCase(fetchSevenDays.rejected, (state, action) => {
//   console.log(state);
// });

 **