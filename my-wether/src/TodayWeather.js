import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import OpacityIcon from "@mui/icons-material/Opacity";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function Todayweather() {
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const conditions = [
    { icon: <ThermostatIcon />, title: "Real Feel", value: "25°C" },
    { icon: <ArrowDownwardIcon />, title: "Min Temp", value: "20°C" },
    { icon: <ArrowUpwardIcon />, title: "Max Temp", value: "30°C" },
    { icon: <WbSunnyIcon />, title: "UV Index", value: "Moderate" },
    { icon: <OpacityIcon />, title: "Humidity", value: "60%" },
    { icon: <AirIcon />, title: "Wind", value: "15 km/h" },
  ];
  const forecast = [
    { time: "6:00 AM", icon: <WbSunnyIcon />, temperature: "18°C" },
    { time: "9:00 AM", icon: <CloudIcon />, temperature: "20°C" },
    { time: "12:00 PM", icon: <WbSunnyIcon />, temperature: "25°C" },
    { time: "3:00 PM", icon: <WbSunnyIcon />, temperature: "28°C" },
    { time: "6:00 PM", icon: <CloudIcon />, temperature: "22°C" },
    { time: "9:00 PM", icon: <AcUnitIcon />, temperature: "15°C" },
  ];
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#EEE",
          padding: 2, // Optional padding
          borderRadius: 2, // Optional border radius
        }}
      >
        {/* header and search bar */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ dispal: "flex", justifyContent: "space-around" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Weather Dita
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box>
                <DarkModeOutlinedIcon sx={{ paddingRight: 2 }} />
                <LightModeOutlinedIcon />
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        {/* main Box */}
        <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
          <Box>
            {/* today 32 */}
            <Box
              sx={{
                padding: 6,
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Typography>TODAY</Typography>
                  <Typography>TOMOROOW</Typography>
                  <Typography>NEXT 7 DAYS</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "center", padding: 6 }}
                >
                  <LocationOnOutlinedIcon />
                  <Box>
                    <Typography>Madrid, spain</Typography>
                    <Typography>(Friday, January 4 )</Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="h1" gutterBottom>
                32 °
              </Typography>
            </Box>
            {/* description */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 2,
              }}
            >
              <Typography variant="h3" gutterBottom>
                OVERCAST CLOUDY
              </Typography>
              <Typography paddingLeft={2} gutterBottom>
                the whole day will be cloudy. not precipitation
              </Typography>
            </Box>
            {/* 
            
          hours*/}
           <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "white",
        // maxWidth: 1,
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
      >
        Today's Forecast
      </Typography>
      <Grid container spacing={2} sx={{display:"grid" , gridTemplateColumns:"repeat(auto-fill,  minmax(100px, 1fr))"}} >
        {forecast.map((hour, index) => (
          <Grid item  key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                flexDirection:"column",
            
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {hour.time}
              </Typography>
              
                {hour.icon}
                <Typography variant="body1">{hour.temperature}</Typography>
              </Box>
            
          </Grid>
        ))}
      </Grid>
    </Box>
          </Box>
          {/* the conditions */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "white",
              maxWidth: 400,
              margin: "auto",
              marginTop: 8,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
            >
              Air Conditions
            </Typography>
            <Grid container spacing={2} sx={{ flexDirection: "column" }}>
              {conditions.map((condition, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      width: 150,
                      alignItems: "center",
                      gap: 1,
                      p: 2,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    {condition.icon}
                    <Box>
                      <Typography
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
          </Box>
        </Box>
      </Container>
    </>
  );
}
