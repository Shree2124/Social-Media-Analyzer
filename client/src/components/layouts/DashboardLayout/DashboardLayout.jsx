import {
  Box,
  Stack,
  Typography,
  Button,
  Collapse,
  IconButton,
  Drawer,
  useTheme,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  ArrowDropDown,
  ArrowBack,
  Logout,
  Person,
} from "@mui/icons-material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { useCurrentUser } from "../../../hooks/index";
import { AvatarLogo } from "../../../utils";

const navTabs = [{ name: "Home", path: "/dashboard", icon: <Home /> }];

const SideBar = ({ w, handleDrawerToggle }) => {
  const theme = useTheme();
  const mode = useAppSelector((state) => state.theme.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openTabs, setOpenTabs] = useState({});
  const location = useLocation();

  const toggleDropdown = (tabName) => {
    setOpenTabs((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const isActive = (path) => location.pathname === path;
  const isSubActive = (basePath, subPath) =>
    subPath ? location.pathname === basePath + subPath : false;

  return (
    <Stack
      width={w}
      height="100vh"
      p={2}
      spacing={2}
      sx={{
        background: "#ffffff",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Logo/Header */}
      <Box
        sx={{
          py: 2,
          borderBottom: `2px solid #ff8f07`,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          // src={weChangeLogo}
          alt="weCHANGE Logo"
          style={{
            height: "100%",
            width: "clamp(80px, 10vw, 180px)",
            maxHeight: "100px",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Navigation Tabs */}
      <Stack spacing={1} width="100%" sx={{ flexGrow: 1, overflowY: "auto" }}>
        {navTabs.map((tab) => (
          <Box key={tab.path} width="100%">
            {tab.subTabs ? (
              <>
                <Button
                  onClick={() => toggleDropdown(tab.name)}
                  fullWidth
                  sx={{
                    justifyContent: "space-between",
                    color: isActive(tab.path)
                      ? "#ffffff"
                      : theme.palette.text.primary,
                    bgcolor: isActive(tab.path)
                      ? "#ff8f07"
                      : openTabs[tab.name]
                      ? "#ff8f0720"
                      : "transparent",
                    "&:hover": {
                      bgcolor: isActive(tab.path) ? "#ff8f07" : "#ff8f0720",
                      color: isActive(tab.path)
                        ? "#ffffff"
                        : theme.palette.text.primary,
                    },
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        color: isActive(tab.path) ? "#ffffff" : "#ff8f07",
                      }}
                    >
                      {tab.icon}
                    </Box>
                    <Typography fontWeight={500}>{tab.name}</Typography>
                  </Stack>
                  <ArrowDropDown
                    sx={{
                      transform: openTabs[tab.name]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "0.3s",
                      color: isActive(tab.path) ? "#ffffff" : "#ff8f07",
                    }}
                  />
                </Button>
                <Collapse in={openTabs[tab.name]} timeout="auto">
                  <Stack pl={4} mt={0.5} spacing={0.5}>
                    {tab.subTabs.map((subTab) => (
                      <Button
                        key={subTab.path}
                        component={RouterLink}
                        to={tab.path + subTab.path}
                        onClick={handleDrawerToggle}
                        sx={{
                          justifyContent: "flex-start",
                          textTransform: "none",
                          color: isSubActive(tab.path, subTab.path)
                            ? "#ff8f07"
                            : theme.palette.text.secondary,
                          bgcolor: isSubActive(tab.path, subTab.path)
                            ? "#ff8f0720"
                            : "transparent",
                          py: 1,
                          px: 2,
                          borderRadius: 1,
                          "&:hover": {
                            bgcolor: "#ff8f0720",
                          },
                          fontSize: "0.875rem",
                        }}
                      >
                        {subTab.name}
                      </Button>
                    ))}
                  </Stack>
                </Collapse>
              </>
            ) : (
              <Button
                component={RouterLink}
                to={tab.path}
                onClick={handleDrawerToggle}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  color: isActive(tab.path)
                    ? "#ffffff"
                    : theme.palette.text.primary,
                  bgcolor: isActive(tab.path) ? "#ff8f07" : "transparent",
                  py: 1.5,
                  px: 2,
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: isActive(tab.path) ? "#ff8f07" : "#ff8f0720",
                    color: isActive(tab.path)
                      ? "#ffffff"
                      : theme.palette.text.primary,
                  },
                }}
              >
                <Box
                  sx={{
                    color: isActive(tab.path) ? "#ffffff" : "#ff8f07",
                    mr: 2,
                  }}
                >
                  {tab.icon}
                </Box>
                <Typography fontWeight={500}>{tab.name}</Typography>
              </Button>
            )}
          </Box>
        ))}
      </Stack>

      {/* Back to main button moved to navbar */}
      <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBack />}
          sx={{
            justifyContent: "flex-start",
            color: theme.palette.text.secondary,
            py: 1.5,
            px: 2,
            borderRadius: 1,
            width: "100%",
            "&:hover": {
              bgcolor: "#ff8f0720",
              color: "#ff8f07",
            },
          }}
        >
          Back to main
        </Button>
      </Box>
    </Stack>
  );
};

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mode = useAppSelector((state) => state.theme.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [loading, _] = useState(false);

  // Profile menu state
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post("/user/logout");

      if (response) {
        dispatch(setAuth(false));
        localStorage.clear();
        toast.success("Logged out successfully!");
        navigate("/");
      } else {
        toast.error("Something went wrong while logging out!");
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
    handleProfileMenuClose();
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
    handleProfileMenuClose();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - 280px)` },
          ml: { md: "280px" },
          backgroundColor: "#ffffff",
          color: "#333333",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          zIndex: theme.zIndex.drawer - 1,
        }}
      >
        <Toolbar>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              color: "#ff8f07",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              px: 1,
              py: 0.5,
            }}
            onClick={handleProfileMenuOpen}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mr: 2,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {loading ? "Loading..." : user?.name || "user User"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {loading ? "..." : user?.email || "user@example.com"}
              </Typography>
            </Box>
            {/* <AvatarLogo
              sx={{
                bgcolor: "#ff8f07",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {user?.name ? getInitials(user.name) : "A"}
            </AvatarLogo> */}
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                width: 220,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                mt: 1.5,
                borderRadius: 2,
                overflow: "hidden",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ p: 2, bgcolor: "#ff8f07", color: "white" }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {user?.name || "user User"}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {user?.email || "user@example.com"}
              </Typography>
            </Box>
            <MenuItem onClick={handleProfileClick}>
              <Person sx={{ mr: 2, color: "#666" }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ color: theme.palette.error.main }}
            >
              <Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Desktop sidebar (280px) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
        open
      >
        <SideBar w="100%" />
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        <SideBar w="100%" handleDrawerToggle={handleDrawerToggle} />
        <SideBar w="100%" />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            xs: "100%", // Full width on mobile
            md: `calc(100% - 280px)`, // Account for sidebar on desktop
          },
          marginLeft: {
            xs: 0, // No margin on mobile
            md: "280px", // Push content right by sidebar width on desktop
          },
          marginTop: "64px", // Account for top AppBar height
          backgroundColor: theme.palette.grey[50],
          minHeight: "calc(100vh - 64px)", // Adjust for AppBar height
          overflowX: "hidden", // Prevent horizontal scrolling
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
