import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

import Header from "./Header";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* start the box  */}
          {/* start the box  */}
          {/* start the box  */}
          <Box
            sx={{
              flexGrow: 1,
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link to="/Today">
              <Button variant="text" color="info" size="small">
                Today
              </Button>
              </Link>
              <Link to="tomorrow">
              <Button variant="text" color="info" size="small">
                TOMORROW
              </Button>
              </Link>
              <Link to="Nextweek">
              <Button variant="text" color="info" size="small">
                NEXT 7 DAYS
              </Button>
              </Link>
            </Box>

            <Header />
          </Box>
          {/* end of th efirst box */}
          {/* end of th efirst box */}
          {/* end of th efirst box */}
          
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            {/* the drawer  */}
            {/* the drawer  */}
            {/* the drawer  */}
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link to="/Today">
                <MenuItem>TODAY</MenuItem>
                </Link>
                <Link to="Tomorrow">
                <MenuItem>TOMORROW</MenuItem>
                </Link>
                <Link to="Nextweek">
                <MenuItem>NEXT 7 DAYS</MenuItem>
                </Link>

                <Divider sx={{ my: 3 }} />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
