import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { Images } from "../../images/Images/Images";
import { useAvatarContext } from "../../hooks/useAvatarContext";

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

const BannerNavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { selectedAvatar, setSelectedAvatar } = useAvatarContext();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    handleCloseUserMenu();
  };

  return (
    <Container
      position="static"
      className="flex justify-between"
      maxWidth="xl"
      sx={{ background: "transparent" }}
    >
      <Link to="/">
        <div className="p-5">
          <img
            className="w-20 xl:hidden"
            src={Images.logo}
            alt="logo training"
          />
        </div>
      </Link>
      {/* Avatar */}
      <div className="p-5">
        <Tooltip title="Selecciona Avatar">
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
          sx={{ mt: "50px" }}
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
    </Container>
  );
};

export default BannerNavBar;
