import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import { Images } from "../../images/Images/Images";
import { useAvatarContext } from "../../hooks/useAvatarContext";

const pages = [
  { name: "Crear Rutina", ruta: "/createTrainingPage" },
  { name: "Plan Entrenamiento", ruta: "/trainingPlan" },
  { name: "Comentarios", ruta: "/comments" },
  { name: "Cerrar Sesion", ruta: "/registerPage" },
];

const settings = [
  { name: "Pixelito", avatar: Images.avatar_1 },
  { name: "NeoFaro", avatar: Images.avatar_2 },
  { name: "AstraVisor", avatar: Images.avatar_3 },
  { name: "TechNova", avatar: Images.avatar_4 },
];
// Estilos para el estado activo
const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 1px #44b700`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { selectedAvatar, setSelectedAvatar } = useAvatarContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    handleCloseUserMenu();
  };
  return (
    <AppBar position="fixed" className="bg-black">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between items-center">
          {/* Menu Escritorio */}
          <div className="hidden lg:block">
            <Link to="/">
              <img className="w-20" src={Images.logo} alt="logo training" />
            </Link>
          </div>

          {/* Menu hamburguesa */}
          <div className="lg:hidden text-red">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                className: "bg-black",
              }}
              className="xs:flex lg:hidden"
            >
              {pages.map((page) => (
                <Link key={page.name} to={page.ruta}>
                  <Button
                    onClick={handleCloseNavMenu}
                    className="text-red flex font-normal"
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Menu>
          </div>

          {/* Menu dispositivos pequeños */}
          <div className="flex items-center justify-center">
            <Link to="/">
              <img
                className="w-20 xl:hidden"
                src={Images.logo}
                alt="logo training"
              />
            </Link>
          </div>

          {/* Items Menu Escritorio  */}
          <div className="hidden lg:flex text-red ml-96">
            {pages.map((page) => (
              <Link key={page.name} to={page.ruta}>
                <Button
                  onClick={handleCloseNavMenu}
                  className="text-red flex font-normal"
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Avatar */}
          <div>
            <Tooltip title="Selecciona Avatar" >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="avatar" src={selectedAvatar} />
                </StyledBadge>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                className: "bg-black",
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleAvatarChange(setting.avatar)}
                >
                  <Avatar alt={setting.name} src={setting.avatar} />
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
