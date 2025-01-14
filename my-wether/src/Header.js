import React, { useEffect, useState } from "react";
import "./Class.css";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCity,
  fetchData,
  GetLatLon,
  GetTodayHours,
  GetUpcomingDays,
} from "./features/WeatherApi/WeatherApiSlice";
import RefreshIcon from "@mui/icons-material/Refresh";

function Header() {
  const locationGPS = useSelector((state) => state.data.city);
  const dispatch = useDispatch();

  const [cityName, setCityName] = useState(() => {
    return localStorage.getItem("city") || "marrakech";
  });
  const loading = useSelector((state) => state.data.loading.getLatLon);
  const error = useSelector((state) => state.data.error.getLatLon);

  const [inputValue, setInputValue] = useState("");
  const getLL = useSelector((state) => state.data.LatLon);
  const lat = getLL?.lat;
  const lon = getLL?.lon;

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);

  useEffect(() => {
    if (isFirstLoad) {
      if (!localStorage.getItem("city") && locationGPS) {
        setCityName(locationGPS);
      }
      setIsFirstLoad(false);
    }
  }, [locationGPS, isFirstLoad]);

  useEffect(() => {
    localStorage.setItem("city", cityName);
  }, [cityName]);

  useEffect(() => {
    dispatch(fetchData({ cityName }));
    dispatch(GetLatLon({ cityName }));
  }, [cityName, dispatch]);

  useEffect(() => {
    if (lat && lon) {
      dispatch(GetTodayHours({ lat, lon }));
      dispatch(GetUpcomingDays({ lat, lon }));
    }
  }, [lat, lon, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchData({ cityName }));
    dispatch(GetLatLon({ cityName }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleRefresh();
    }, 180000);

    return () => clearInterval(timer);
  }, [cityName]);

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      return;
    }
    setCityName(inputValue);
    setInputValue("");
  };

  const handleUseGPSLocation = () => {
    if (locationGPS) {
      setCityName(locationGPS);
      dispatch(fetchData({ cityName: locationGPS }));
      dispatch(GetLatLon({ cityName: locationGPS }));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton>
            <RefreshIcon className="text-blue-900" onClick={handleRefresh} />
          </IconButton>
          <div
            className="flex "
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Box
              className="center-flex"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <LocationOnOutlinedIcon className="text-blue-900" />
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="text-blue-900 pl-2"
              >
                {cityName}
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={1}
              useFlexGap
              sx={{ pl: 2, width: { xs: "250px", sm: "350px" } }}
            >
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                sx={{
                  "@media (max-width: 768px)": {
                    width: "250px",
                  },
                }}
                id="email-hero"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Search ..."
                placeholder="Search ..."
                fullWidth
                slotProps={{
                  htmlInput: {
                    autoComplete: "off",
                    "aria-label": "Search ...",
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  minWidth: "fit-content",
                  cursor:
                    inputValue.trim() === "" ? "not-allowed" : "pointer",
                }}
                onClick={handleSearch}
              >
                <SearchIcon />
              </Button>
            </Stack>
          </div>
          <IconButton>
            <GpsFixedIcon
              className="text-blue-900"
              onClick={handleUseGPSLocation}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      
    </Box>
  );
}

export default Header;

// {/* Error Message */}
// {error && (
//   <Box
//     sx={{
//       position: "absolute",
//       bottom: 0,
//       width: "100%",
//       backgroundColor: "#ffcccc",
//       textAlign: "center",
//       padding: "10px",
//       color: "#900",
//       fontWeight: "bold",
//     }}
//   >
//     {error.message || "City not found. Please check the spelling and try again!"}
//   </Box>
// )}