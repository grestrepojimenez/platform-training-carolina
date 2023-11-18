import { Box, Tab, Tabs } from "@mui/material";
import { useTabsContext } from "../../hooks/useTabsContext";
import Login from "../../layout/Login/Login";
import Register from "../../layout/Register/Register";

import "./TabsBar.css";
const TabsBar = () => {
  // Obtiene el estado de las pestañas y la función para cambiarlas del contexto
  const { value, handleChange } = useTabsContext();

  return (
    <Box className="p-4">
      {/* Componente Tabs de Material-UI */}
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#FD3C3D",
          },
        }}
      >
        {/* Pestañas de las tabs */}
        <Tab
          label="Iniciar Sesión"
          className="text-white font-normal tracking-wider"
        />
        <Tab
          label="Registrarse"
          className="text-white font-normal tracking-wider"
        />
      </Tabs>
      <div className="mt-7">
        {/* Renderiza el componente de inicio de sesión o registro según la pestaña seleccionada */}
        {value === 0 ? <Login /> : <Register />}
      </div>
    </Box>
  );
};

export default TabsBar;
