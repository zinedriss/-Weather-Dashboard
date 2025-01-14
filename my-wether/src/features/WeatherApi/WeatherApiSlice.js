import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ cityName }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
    try {
      const response = await axios.get(url);
      const res = response.data;
      const description = res.weather[0].description;
      const clouds = Math.round(res.main.temp - 273.15);
      const tempMin = Math.round(res.main.temp_min - 273.15);
      const humidity = Math.round(res.main.humidity);
      const pressure = Math.round(res.main.pressure);
      const tempMax = Math.round(res.main.temp_max - 273.15);
      const feelsLike = Math.round(res.main.feels_like - 273.15);
      const wind = res.wind.speed;
      const city = res.name;
      const country = res.sys.country;
      const weatherTitle = res.weather[0].description;
      const IconWeather = res.weather[0].icon;
      // Function to convert Unix timestamp to readable time
      const timestampToTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const hours = date.getHours().toString().padStart(2, "0"); // Ensure 2 digits
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      // Extract and convert sunrise and sunset times
      const sunrise = timestampToTime(res.sys.sunrise);
      const sunset = timestampToTime(res.sys.sunset);

      return {
        pressure,
        sunrise,
        sunset,
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

export const GetLatLon = createAsyncThunk(
  "api/GetLatLon",
  async ({ cityName }) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
    try {
      const response = await axios.get(url);
      // const data = response.data;
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      return { lat, lon };
    } catch {
      console.log("error");
    }
  }
);

// Fetch hourly forecast data today (filtered for specific hours)
export const GetTodayHours = createAsyncThunk(
  "api/GetHours",
  async ({ lat, lon }) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&&units=metric&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
    try {
      const response = await axios.get(url);
      const forecastData = response.data.list;

      // Get today's date
      const today = new Date().setHours(0, 0, 0, 0);

      // Filter the forecast data for today
      const filteredData = forecastData.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000).setHours(0, 0, 0, 0);
        return forecastDate === today; // Include only forecasts for today
      });

      // Extract the hours from filteredData and prepare them for display
      const hoursData = filteredData.map((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const hour = date.getHours(); // Get the hour from the timestamp
        const temperature = forecast.main.temp; // Get the temperature
        const weatherDescription = forecast.weather[0].description; // Get weather description
        const weatherIconCode = forecast.weather[0].icon; // Get weather description

        return {
          hour,
          temperature,
          weatherDescription,
          weatherIconCode,
        };
      });

      return { hoursData }; // Return both the original filtered data and the processed hours data
    } catch {
      console.log("Error fetching hourly forecast");
      return { filteredData: [], hoursData: [] }; // Return empty data in case of an error
    }
  }
);
// Fetch tomorrow's hourly forecast
export const GetTomorrowWeather = createAsyncThunk(
  "api/GetTomorrowWeather",
  async ({ lat, lon }) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
    try {
      const response = await axios.get(url);
      const forecastData = response.data.list;

      // Get tomorrow's date
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowDateString = tomorrow.toISOString().split("T")[0];

      // Filter forecast data for tomorrow
      const tomorrowData = forecastData.find((forecast) =>
        forecast.dt_txt.startsWith(tomorrowDateString)
      );

      // Process and extract relevant data

      const description = tomorrowData.weather[0].description;
      const IconWeather = tomorrowData.weather[0].icon;
      const city = response.data.city.name;
      const country = response.data.city.country;

      const clouds = Math.round(tomorrowData.main.temp - 273.15);
      const tempMin = Math.round(tomorrowData.main.temp_min - 273.15);
      const humidity = Math.round(tomorrowData.main.humidity);
      const pressure = Math.round(tomorrowData.main.pressure);
      const tempMax = Math.round(tomorrowData.main.temp_max - 273.15);
      const feelsLike = Math.round(tomorrowData.main.feels_like - 273.15);
      const wind = tomorrowData.wind.speed;

      return {
        tempMin,
        tempMax,
        description,
        IconWeather,
        city,
        country,
        clouds,
        humidity,
        pressure,
        feelsLike,
        wind,
      };
    } catch (error) {
      console.log("Error fetching tomorrow's weather");
      return {};
    }
  }
);
// Fetch hourly forecast data for tomorrow (filtered for specific hours)
export const GetTomorrowHours = createAsyncThunk(
  "api/GetTomorrowHours",
  async ({ lat, lon }) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&&units=metric&appid=2817f496ccd6b0ff0e10347216f4d6bd`;
    try {
      const response = await axios.get(url);
      const forecastData = response.data.list;

      // Get tomorrow's date
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      // Filter the forecast data for tomorrow
      const filteredData = forecastData.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000).setHours(0, 0, 0, 0);
        return forecastDate === tomorrow.getTime(); // Include only forecasts for tomorrow
      });

      // Extract the hours from filteredData and prepare them for display
      const hoursData = filteredData.map((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const hour = date.getHours(); // Get the hour from the timestamp
        const temperature = forecast.main.temp; // Get the temperature
        const weatherDescription = forecast.weather[0].description; // Get weather description
        const weatherIconCode = forecast.weather[0].icon; // Get weather description

        return {
          hour,
          temperature,
          weatherDescription,
          weatherIconCode,
        };
      });
      console.log("the horse data for tomorrow is ", hoursData);

      return { hoursData }; // Return both the original filtered data and the processed hours data
    } catch {
      console.log("Error fetching hourly forecast");
      return { filteredData: [], hoursData: [] }; // Return empty data in case of an error
    }
  }
);

// Fetch forecast data for the upcoming days starting from tomorrow
export const GetUpcomingDays = createAsyncThunk(
  "api/GetUpcomingDays",
  async ({ lat, lon }) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=2817f496ccd6b0ff0e10347216f4d6bd`;

    try {
      const response = await axios.get(url);
      const forecastData = response.data.list;

      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Calculate tomorrow and the next days
      const upcomingDays = [1, 2, 3, 4].map((dayOffset) => {
        const day = new Date(today);
        day.setDate(today.getDate() + dayOffset);
        return day;
      });

      // Filter and map the data for each upcoming day
      const daysData = upcomingDays.map((day) => {
        // Find the forecast closest to 12:00 PM for the day
        const middayForecast = forecastData.find((forecast) => {
          const forecastDate = new Date(forecast.dt * 1000);

          // Match the same day and find a forecast close to 12:00 PM
          return (
            forecastDate.getDate() === day.getDate() &&
            forecastDate.getMonth() === day.getMonth() &&
            Math.abs(forecastDate.getHours() - 12) <= 2 // Allow a range around midday
          );
        });

        if (middayForecast) {
          const date = new Date(middayForecast.dt * 1000);
          const temperature = middayForecast.main.temp;
          const humidity = middayForecast.main.humidity;
          const wind = middayForecast.wind.speed;
          const weatherDescription = middayForecast.weather[0].description;
          const weatherIconCode = middayForecast.weather[0].icon;

          // Format the date as "Thu, 27 January"
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            day: "numeric",
            month: "long",
          }).format(date);

          return {
            date: formattedDate,
            temperature,
            weatherDescription,
            weatherIconCode,
            humidity,
            wind,
          };
        }

        return null; // No forecast data available for the day
      });

      // console.log("Filtered daysData:", daysData);

      return { daysData };
    } catch (error) {
      console.error("Error fetching forecast for upcoming days:", error);
      return { daysData: [] };
    }
  }
);

// Async thunk to fetch the city name
export const fetchCity = createAsyncThunk(
  "location/fetchCity",
  async (_, thunkAPI) => {
    try {
      const getUserLocation = () => {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
              },
              (error) => {
                reject(error.message);
              }
            );
          } else {
            reject("Geolocation is not supported by this browser.");
          }
        });
      };

      const location = await getUserLocation();

      // Call reverse geocoding API to get the city
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat: location.latitude,
            lon: location.longitude,
            format: "json",
          },
        }
      );

      return (
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ lat, lon }) => {
    const apiKey = "2817f496ccd6b0ff0e10347216f4d6bd"; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.list; // Returning the forecast data
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return [];
    }
  }
);

export const weatherApiSlice = createSlice({
  name: "api",
  initialState: {
    temperature: "NO temperature",
    LatLon: "NO langitude and latitude",
    hours: [], // Empty array for filtered hourly data
    tomorrowHours: [], // Empty array for filtered hourly data
    tomorrowWeather: null,
    days: null, // Empty array for filtered hourly data
    upcomingDays: "[]", // Empty array for filtered hourly data
    city: null,
    synopsis: [],
    loading: {
      fetchData: false,
      getLatLon: false,
      getTodayHours: false,
      getTomorrowWeather: false,
      getTomorrowHours: false,
      getUpcomingDays: false,
      fetchCity: false,
      fetchWeatherData: false,
    },
    error: {
      fetchData: null,
      getLatLon: null,
      getTodayHours: null,
      getTomorrowWeather: null,
      getTomorrowHours: null,
      getUpcomingDays: null,
      fetchCity: null,
      fetchWeatherData: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading.fetchData = true;
        state.error.fetchData = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading.fetchData = false;
        state.error.fetchData = false;
        state.temperature = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading.fetchData = false;
        state.error.fetchData = true
      })
      .addCase(GetLatLon.pending, (state) => {
        state.loading.getLatLon = true;
        state.error.getLatLon = null;
      })
      .addCase(GetLatLon.fulfilled, (state, action) => {
        state.loading.getLatLon = false;
        state.LatLon = action.payload;
      })
      .addCase(GetLatLon.rejected, (state, action) => {
        state.loading.getLatLon = false;
        state.error.getLatLon = true
      })
      .addCase(GetTodayHours.pending, (state) => {
        state.loading.GetTodayHours = true;
        state.error.GetTodayHours = null;
      })
      .addCase(GetTodayHours.fulfilled, (state, action) => {
        state.loading.GetTodayHours = false;
        state.hours = action.payload;
      })
      .addCase(GetTodayHours.rejected, (state, action) => {
        state.loading.fetcGetTodayHourshData = false;
        state.error.GetTodayHours = true
      })
      .addCase(GetUpcomingDays.pending, (state) => {
        state.loading.GetUpcomingDays = true;
        state.error.GetUpcomingDays = null;
      })
      .addCase(GetUpcomingDays.fulfilled, (state, action) => {
        state.loading.GetUpcomingDays = false;
        state.upcomingDays = action.payload;
      })
      .addCase(GetUpcomingDays.rejected, (state, action) => {
        state.loading.GetUpcomingDays = false;
        state.error.GetUpcomingDays = true
      })
      .addCase(fetchCity.pending, (state) => {
        state.loading.fetchCity = true;
        state.error.fetchCity = null;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.loading.fetchCity = false;
        state.city = action.payload;
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.loading.fetchCity = false;
        state.error.fetchCity = true
      })
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading.fetchWeatherData = true;
        state.error.fetchWeatherData = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading.fetchWeatherData = false;
        state.synopsis = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading.fetchWeatherData = false;
        state.error.fetchWeatherData = true
      })
      .addCase(GetTomorrowWeather.pending, (state) => {
        state.loading.GetTomorrowWeather = true;
        state.error.GetTomorrowWeather = null;
      })
      .addCase(GetTomorrowWeather.fulfilled, (state, action) => {
        state.loading.GetTomorrowWeather = false;
        state.tomorrowWeather = action.payload;
      })
      .addCase(GetTomorrowWeather.rejected, (state, action) => {
        state.loading.GetTomorrowWeather = false;
        state.error.GetTomorrowWeather = true
      })
      .addCase(GetTomorrowHours.pending, (state) => {
        state.loading.GetTomorrowHours = true;
        state.error.GetTomorrowHours = null;
      })
      .addCase(GetTomorrowHours.fulfilled, (state, action) => {
        state.loading.GetTomorrowHours = false;
        state.tomorrowHours = action.payload;
      })
      .addCase(GetTomorrowHours.rejected, (state, action) => {
        state.loading.GetTomorrowHours = false;
        state.error.GetTomorrowHours = true
      });
  },
});
export default weatherApiSlice.reducer;
