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
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  ArrowDropDown,
  ArrowBack,
  Logout,
  Person,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { useCurrentUser } from "../../../hooks/index";
import { AvatarLogo } from "../../../utils";
import ThemeToggleButton from "../../buttons/ThemeToggleButton/ThemeToggleButton";

const navTabs = [{ name: "Home", path: "/dashboard", icon: <Home /> }];

const SideBar = ({ w, handleDrawerToggle, isMinimized, setIsMinimized }) => {
  const theme = useTheme();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openTabs, setOpenTabs] = useState({});
  const location = useLocation();

  const toggleDropdown = (tabName) => {
    setOpenTabs((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const isActive = (path) => location.pathname === path;
  const isSubActive = (basePath, subPath) =>
    subPath ? location.pathname === basePath + subPath : false;

  const sidebarBg = isDark
    ? "linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)"
    : "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)";

  return (
    <Stack
      width={w}
      height="100vh"
      p={isMinimized ? 1 : 2}
      spacing={2}
      sx={{
        background: sidebarBg,
        borderRight: `1px solid ${
          isDark ? "rgba(255, 255, 255, 0.1)" : theme.palette.divider
        }`,
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      {/* Minimize Toggle Button */}
      {!isMobile && (
        <IconButton
          onClick={() => setIsMinimized(!isMinimized)}
          sx={{
            position: "absolute",
            right: 3,
            top: 10,
            bgcolor: isDark ? "#2d2d44" : "#ffffff",
            border: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.1)" : theme.palette.divider
            }`,
            width: 32,
            height: 32,
            zIndex: 1200,
            boxShadow: isDark
              ? "0 4px 12px rgba(0, 0, 0, 0.5)"
              : "0 2px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              bgcolor: isDark ? "#3d3d54" : "#f5f5f5",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease",
          }}
        >
          {isMinimized ? (
            <ChevronRight sx={{ color: isDark ? "#ffffff" : "#333" }} />
          ) : (
            <ChevronLeft sx={{ color: isDark ? "#ffffff" : "#333" }} />
          )}
        </IconButton>
      )}

      {/* Logo/Header */}
      <Box
        sx={{
          py: 2,
          pt: 3,
          borderBottom: `2px solid #ff8f07`,
          mt: 3,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {isMinimized ? (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#ff8f07",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            W
          </Box>
        ) : (
          <img
            alt="weCHANGE Logo"
            style={{
              height: "100%",
              width: "clamp(80px, 10vw, 180px)",
              maxHeight: "100px",
              objectFit: "contain",
            }}
          />
        )}
      </Box>

      {/* Navigation Tabs */}
      <Stack spacing={1} width="100%" sx={{ flexGrow: 1, overflow: "hidden", }}>
        {navTabs.map((tab) => (
          <Box key={tab.path} width="100%">
            {tab.subTabs ? (
              <>
                <Tooltip
                  title={isMinimized ? tab.name : ""}
                  placement="right"
                  arrow
                >
                  <Button
                    onClick={() => toggleDropdown(tab.name)}
                    fullWidth
                    sx={{
                      justifyContent: isMinimized ? "center" : "space-between",
                      color: isActive(tab.path)
                        ? "#ffffff"
                        : isDark
                        ? "#e0e0e0"
                        : theme.palette.text.primary,
                      bgcolor: isActive(tab.path)
                        ? "linear-gradient(135deg, #ff8f07 0%, #ff6b35 100%)"
                        : openTabs[tab.name]
                        ? isDark
                          ? "rgba(255, 143, 7, 0.15)"
                          : "#ff8f0720"
                        : "transparent",
                      "&:hover": {
                        bgcolor: isActive(tab.path)
                          ? "linear-gradient(135deg, #ff8f07 0%, #ff6b35 100%)"
                          : isDark
                          ? "rgba(255, 143, 7, 0.15)"
                          : "#ff8f0720",
                        color: isActive(tab.path)
                          ? "#ffffff"
                          : isDark
                          ? "#ffffff"
                          : theme.palette.text.primary,
                      },
                      py: 1.5,
                      px: isMinimized ? 1 : 2,
                      borderRadius: 1,
                      transition: "all 0.2s ease",
                      minWidth: isMinimized ? "auto" : "unset",
                    }}
                  >
                    {isMinimized ? (
                      <Box sx={{ color: isActive(tab.path) ? "#ffffff" : "#ff8f07" }}>
                        {tab.icon}
                      </Box>
                    ) : (
                      <>
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
                      </>
                    )}
                  </Button>
                </Tooltip>
                {!isMinimized && (
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
                              : isDark
                              ? "#b0b0b0"
                              : theme.palette.text.secondary,
                            bgcolor: isSubActive(tab.path, subTab.path)
                              ? isDark
                                ? "rgba(255, 143, 7, 0.15)"
                                : "#ff8f0720"
                              : "transparent",
                            py: 1,
                            px: 2,
                            borderRadius: 1,
                            "&:hover": {
                              bgcolor: isDark
                                ? "rgba(255, 143, 7, 0.15)"
                                : "#ff8f0720",
                            },
                            fontSize: "0.875rem",
                          }}
                        >
                          {subTab.name}
                        </Button>
                      ))}
                    </Stack>
                  </Collapse>
                )}
              </>
            ) : (
              <Tooltip
                title={isMinimized ? tab.name : ""}
                placement="right"
                arrow
              >
                <Button
                  component={RouterLink}
                  to={tab.path}
                  onClick={handleDrawerToggle}
                  fullWidth
                  sx={{
                    justifyContent: isMinimized ? "center" : "flex-start",
                    color: isActive(tab.path)
                      ? "#ffffff"
                      : isDark
                      ? "#e0e0e0"
                      : theme.palette.text.primary,
                    background: isActive(tab.path)
                      ? "linear-gradient(135deg, #ff8f07 0%, #ff6b35 100%)"
                      : "transparent",
                    py: 1.5,
                    px: isMinimized ? 1 : 2,
                    borderRadius: 1,
                    minWidth: isMinimized ? "auto" : "unset",
                    "&:hover": {
                      background: isActive(tab.path)
                        ? "linear-gradient(135deg, #ff8f07 0%, #ff6b35 100%)"
                        : isDark
                        ? "rgba(255, 143, 7, 0.15)"
                        : "#ff8f0720",
                      color: isActive(tab.path)
                        ? "#ffffff"
                        : isDark
                        ? "#ffffff"
                        : theme.palette.text.primary,
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box
                    sx={{
                      color: isActive(tab.path) ? "#ffffff" : "#ff8f07",
                      mr: isMinimized ? 0 : 2,
                    }}
                  >
                    {tab.icon}
                  </Box>
                  {!isMinimized && (
                    <Typography fontWeight={500}>{tab.name}</Typography>
                  )}
                </Button>
              </Tooltip>
            )}
          </Box>
        ))}
      </Stack>

      {/* Back to main button */}
      <Box
        sx={{
          borderTop: `1px solid ${
            isDark ? "rgba(255, 255, 255, 0.1)" : theme.palette.divider
          }`,
          pt: 2,
        }}
      >
        <Tooltip
          title={"Theme"}
          placement="top"
          arrow
          sx={{
            backgroundColor:isDark ? "black" : "white",
            color: isDark ? "white" : "black"
          }}
        >
          <ThemeToggleButton />
        </Tooltip>
      </Box>
    </Stack>
  );
};

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const user = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [loading, _] = useState(false);

  const sidebarWidth = isMinimized ? 80 : 280;
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
          width: { md: `calc(100% - ${sidebarWidth}px)` },
          ml: { md: `${sidebarWidth}px` },
          background: isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          color: isDark ? "#e0e0e0" : "#333333",
          boxShadow: isDark
            ? "0 2px 8px rgba(0, 0, 0, 0.5)"
            : "0 1px 3px rgba(0,0,0,0.1)",
          zIndex: theme.zIndex.drawer - 1,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar>
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.04)",
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
                {loading ? "Loading..." : user?.name || "User Name"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: isDark ? "#b0b0b0" : "text.secondary" }}
              >
                {loading ? "..." : user?.email || "user@example.com"}
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                width: 220,
                boxShadow: isDark
                  ? "0px 5px 20px rgba(0, 0, 0, 0.7)"
                  : "0px 5px 15px rgba(0, 0, 0, 0.1)",
                mt: 1.5,
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: isDark ? "#1a1a2e" : "#ffffff",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(135deg, #ff8f07 0%, #ff6b35 100%)",
                color: "white",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {user?.name || "User Name"}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {user?.email || "user@example.com"}
              </Typography>
            </Box>
            <MenuItem
              onClick={handleProfileClick}
              sx={{ color: isDark ? "#e0e0e0" : "inherit" }}
            >
              <Person sx={{ mr: 2, color: "#666" }} />
              Profile
            </MenuItem>
            <Divider sx={{ bgcolor: isDark ? "rgba(255,255,255,0.1)" : undefined }} />
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

      {/* Desktop sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.1)" : theme.palette.divider
            }`,
            transition: "width 0.3s ease",
          },
        }}
        open
      >
        <SideBar
          w="100%"
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
        />
      </Drawer>

      {/* Mobile drawer */}
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
        <SideBar
          w="100%"
          handleDrawerToggle={handleDrawerToggle}
          isMinimized={false}
          setIsMinimized={() => {}}
        />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            xs: "100%",
            md: `calc(100% - ${sidebarWidth}px)`,
          },
          marginLeft: {
            xs: 0,
            md: `${sidebarWidth}px`,
          },
          marginTop: "64px",
          background: isDark
            ? "linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 100%)"
            : "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)",
          minHeight: "calc(100vh - 64px)",
          overflowX: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;