import "./App.css";

import TodayWeather from "./TodayWeather";
import { createTheme, ThemeProvider } from "@mui/material";
import AppAppBar from "./AppAppBar";

import NextSevenDay from "./NextSevenDay";
import { Navigate, Route, Routes } from "react-router-dom";
import TomorrowWeather from "./TomorrowWeather";



function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["OpenSans", "Merriweather"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App ">
        <AppAppBar />

      </div>
      <Routes>
        {/* Redirecting to /Today as the default route */}
        <Route path="/" element={<Navigate to="/Today" />} />
        <Route path="/Today" Component={TodayWeather} />
        <Route path="/Nextweek" Component={NextSevenDay} />
        <Route path="/Tomorrow" Component={TomorrowWeather} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
