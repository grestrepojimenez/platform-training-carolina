/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Card,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TimelineIcon from "@mui/icons-material/Timeline";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import Autor from "../Autor/Autor";

import { Images } from "../../images/Images/Images";
import "./NavBar.css";

const NavBar = () => {
  const [value, setValue] = useState("recents");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openDrawer, setOpenDrawer] = useState(!isMobile);
  const location = useLocation();

  useEffect(() => {
    // Actualizar el valor basado en la ruta actual
    const currentPath = location.pathname;
    const selectedItem = menuItems.find((item) => item.link === currentPath);
    if (selectedItem) {
      setValue(selectedItem.value);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const menuItems = [
    {
      label: "Rutinas",
      value: "rutinas",
      icon: <StorageIcon />,
      link: "/trainingPlanPage",
    },
    {
      label: "Crear",
      value: "newRoutine",
      icon: <FitnessCenterIcon />,
      link: "/createTrainingPage",
    },
    {
      label: "Historial",
      value: "lineTime",
      icon: <TimelineIcon />,
      link: "/lineTimeRoutinePage",
    },
    {
      label: "Comentarios",
      value: "comment",
      icon: <CommentOutlinedIcon />,
      link: "/commentsPage",
    },
  ];

  const renderMobileMenu = (
    <>
      <BottomNavigation
        sx={{ width: 500, background: "#191A1F" }}
        value={value}
        onChange={handleChange}
      >
        {menuItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
            component={Link}
            to={item.link}
            sx={{
              "& .MuiBottomNavigationAction-label": {
                color: value === item.value ? "#FD3C3D" : "#b0abab", // Color activo / inactivo
                fontSize: "8px",
              },
              "& .MuiSvgIcon-root": {
                fill: value === item.value ? "#FD3C3D" : "#b0abab", // Color del icono activo / inactivo
                width: "20px",
              },
            }}
          />
        ))}
      </BottomNavigation>
    </>
  );

  const renderDesktopMenu = (
    <Card>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className="bg-black"
      >
        <Link to="/">
          <div className="flex justify-center pt-8 pl-5 px-3 mb-32">
            <img className="w-20" src={Images.logo} alt="logo training" />
          </div>
        </Link>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.value}
              button
              selected={value === item.value}
              onClick={(event) => handleChange(event, item.value)}
              component={Link}
              to={item.link}
            >
              <Tooltip title={item.label} placement="right">
                <ListItemIcon className="text-white flex justify-center ml-3 py-2 px-3">
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Card>
  );

  return (
    <>
      <AppBar
        position="fixed"
        className="bg-black pb-2"
        sx={{
          top: "auto",
          bottom: 0,
          flexDirection: isMobile ? "row" : "column",
          justifyContent: isMobile ? "space-around" : "flex-start",
          alignItems: isMobile ? "center" : "flex-start",
        }}
      >
        {isMobile ? renderMobileMenu : renderDesktopMenu}
      </AppBar>
      <div className="mt-14">
        <Autor />
      </div>
    </>
  );
};

export default NavBar;
