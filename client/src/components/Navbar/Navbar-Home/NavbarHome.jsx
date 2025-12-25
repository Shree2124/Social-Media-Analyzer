import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ThemeToggleButton from "../../buttons/ThemeToggleButton/ThemeToggleButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { Menu, X } from "lucide-react";
import { Drawer, Box, ListItemText, ListItem, List } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";

const NavbarHome = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const mode = useAppSelector((state) => state.theme.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItem = [
    { text: "Home", link: "/" },
    { text: "Login", link: "/login" },
    { text: "Register", link: "/register" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {!isMobile ? (
            <>
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Social Media Analyzer
                </h1>
              </div>

              <nav>
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  {menuItem.map((item) => (
                    <a
                      key={item.text}
                      href={item.link}
                      className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 dark:after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.text}
                    </a>
                  ))}
                  <div className="flex items-center">
                    <ThemeToggleButton />
                  </div>
                </div>
              </nav>
            </>
          ) : (
            <>
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                  color: mode === "dark" ? "#ffffff" : "#111827",
                  "&:hover": {
                    bgcolor:
                      mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <Menu />
              </IconButton>
            </>
          )}

          {/* Drawer / Sidebar */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                bgcolor: mode === "dark" ? "#111827" : "#ffffff",
                color: mode === "dark" ? "#ffffff" : "#111827",
                borderRight:
                  mode === "dark" ? "1px solid #1f2937" : "1px solid #e5e7eb",
              },
            }}
          >
            <Box
              sx={{
                width: 280,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                pt: 2,
              }}
              role="presentation"
            >
              <Box
                sx={{
                  px: 2,
                  pb: 2,
                  borderBottom:
                    mode === "dark" ? "1px solid #1f2937" : "1px solid #e5e7eb",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: mode === "dark" ? "#ffffff" : "#111827",
                      margin: 0,
                      fontFamily: "inherit",
                    }}
                  >
                    Menu
                  </h2>
                  <IconButton
                    sx={{
                      color: mode === "dark" ? "#ffffff" : "#111827",
                      "&:hover": {
                        bgcolor:
                          mode === "dark"
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <X />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ flex: 1, pt: 2 }}>
                <List sx={{ px: 1 }}>
                  {menuItem.map((item) => (
                    <ListItem
                      key={item.text}
                      component="a"
                      href={item.link}
                      sx={{
                        borderRadius: "8px",
                        mb: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor:
                            mode === "dark"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.04)",
                          transform: "translateX(4px)",
                          "& .MuiTypography-root": {
                            color: mode === "dark" ? "#60a5fa" : "#2563eb",
                          },
                        },
                      }}
                    >
                      <ListItemText
                        primary={item.text}
                        sx={{
                          "& .MuiTypography-root": {
                            color: mode === "dark" ? "#d1d5db" : "#374151",
                            fontWeight: 500,
                            fontSize: "1rem",
                            fontFamily: "inherit",
                            transition: "color 0.2s ease",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <div className="p-5 flex items-center">
                <ThemeToggleButton />
              </div>
            </Box>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
