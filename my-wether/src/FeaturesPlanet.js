import Planet from "./assets/images/planet.png";
import PlanetOverlayImg from "./assets/images/planet-overlay.svg";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import "./Class.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetUpcomingDays } from "./features/WeatherApi/WeatherApiSlice";

export default function FeaturesPlanet() {
  const dispatch = useDispatch();
  const upcomingDays = useSelector((state) => state.data.upcomingDays);
  const forecastdays = upcomingDays?.daysData || []; // Handle potential undefined state

  useEffect(() => {
    dispatch(GetUpcomingDays({ lat: 33.5731, lon: -7.5898 }));
  }, []);

  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-[#8ecae6]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 0 0",
              maxWidth: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                paddingBottom: "8rem",
                fontWeight: "bold",
                textAlign: "center",
                background: "linear-gradient(to right, #4facfe, #A66)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WEEKLY FORECAST
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                "@media (max-width: 768px)": {
                  gridTemplateColumns: "1fr 1fr ",
                },
              }}
              className=" overflow-hidden sm:grid-cols-2 lg:grid-cols-3 gap-8 "
            >
              {forecastdays.map((forecast, idx) => (
                <Grid
                  item
                  key={idx}
                  sx={{
                    padding: "1.5rem",
                    background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow:
                        "0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      paddingBottom: "1rem",
                      color: "#fb8500",
                      fontWeight: "600",
                    }}
                  >
                    {forecast.date}
                  </Typography>
                  <Box
                    sx={{
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton>
                      <img
                        alt="images"
                        src={`https://openweathermap.org/img/wn/${forecast.weatherIconCode}@2x.png`}
                        width="60"
                        style={{ animation: "pulse 2s infinite" }}
                      ></img>
                    </IconButton>
                    <Typography>{forecast.weatherDescription}</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#1d4ed8",
                    }}
                  >
                    {`${forecast.temperature}°C`}
                  </Typography>
                  <Grid container spacing={1} sx={{ marginTop: "1rem" }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: "#023047" }}>
                        Wind:{" "}
                        <span style={{ color: "#415a77" }}>
                        {`${forecast.wind} km/h`}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: "#023047" }}>
                        Humidity:{" "}
                        <span style={{ color: "#415a77" }}>
                         {`${forecast.humidity}%`}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20 pt-24">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Major Cities Around the World
            </h2>
          </div>
          {/* Planet */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:bg-gradient-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,theme(colors.blue.500),transparent)]">
                <img
                  className="rounded-full bg-gray-900"
                  src={Planet}
                  alt="Planet"
                  width={400}
                  height={400}
                />
                <div className="pointer-events-none" aria-hidden="true">
                  <img
                    className="absolute -right-64 -top-20 z-10 max-w-none"
                    src={PlanetOverlayImg}
                    alt="Planet decoration"
                    width={789}
                    height={755}
                  />
                  <div>
                    {/* ####################################################### */}
                    <div className="absolute -left-28 top-16 z-10 opacity-80  hover:opacity-100">
                      <div className="max-w-xs rounded-lg shadow-lg bg-gray-900 p-4 gap-4 center-flex">
                        <img
                          src="https://flagsapi.com/FR/flat/32.png"
                          alt="Morocco"
                        />
                        <h3 className="text-lg font-bold text-gray-200">
                          PARIS,<span className="text-xs">France</span>
                        </h3>
                        <div className="flex items-center mt-2">
                          <p className="text-xl text-blue-500">25°C</p>
                          <img
                            className="ml-2 w-8 h-8"
                            src="https://openweathermap.org/img/wn/04d.png"
                            alt="weather icon"
                          />
                        </div>
                      </div>
                    </div>
                    {/* ####################################################### */}

                    <div className="absolute left-56 top-7 z-10 opacity-30 hover:opacity-100 duration-500">
                      <div className="w-fit rounded-lg shadow-lg bg-gray-900 p-4 gap-4 center-flex">
                        <img
                          src="https://flagsapi.com/RU/flat/32.png"
                          alt="Morocco"
                        />
                        <h3 className="text-lg font-bold text-gray-200">
                          MOSCOW,<span className="text-xs">Russia</span>
                        </h3>
                        <div className="flex items-center mt-2">
                          <p className="text-xl text-blue-500">12°C</p>
                          <img
                            className="ml-2 w-8 h-8"
                            src="https://openweathermap.org/img/wn/03d.png"
                            alt="weather icon"
                          />
                        </div>
                      </div>
                    </div>
                    {/* ####################################################### */}

                    <div className="absolute -left-20 bottom-24 z-10 opacity-25 duration-500 hover:opacity-100">
                      <div className="max-w-xs rounded-lg shadow-lg bg-gray-900 p-4 gap-4 center-flex">
                        <img
                          src="https://flagsapi.com/MA/flat/32.png"
                          alt="Morocco"
                        />
                        <h3 className="text-lg font-bold text-gray-200">
                          CASABLANCA,<span className="text-xs">Morocco</span>
                        </h3>
                        <div className="flex items-center mt-2">
                          <p className="text-xl text-blue-500">18°C</p>
                          <img
                            className="ml-2 w-8 h-8"
                            src="https://openweathermap.org/img/wn/01d.png"
                            alt="weather icon"
                          />
                        </div>
                      </div>
                    </div>
                    {/* ####################################################### */}

                    <div className="absolute bottom-32 left-64 z-10 opacity-80 duration-500 hover:opacity-100">
                      <div className="max-w-xs rounded-lg shadow-lg bg-gray-900 p-4 gap-4 center-flex">
                        <img
                          src="https://flagsapi.com/SA/flat/32.png"
                          alt="Morocco"
                        />
                        <h3 className="text-lg font-bold text-gray-200">
                          RIYADH,<span className="text-xs">Saudi</span>
                        </h3>
                        <div className="flex items-center mt-2">
                          <p className="text-xl text-blue-500">15°C</p>
                          <img
                            className="ml-2 w-8 h-8"
                            src="https://openweathermap.org/img/wn/02d.png"
                            alt="weather icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
