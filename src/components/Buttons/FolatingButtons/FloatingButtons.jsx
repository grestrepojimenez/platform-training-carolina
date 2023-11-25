/* eslint-disable react/prop-types */
import { Box, Fab } from "@mui/material";

const FloatingButtons = ({ variant, icon, size, onClick }) => {
  // Definir estilos de variantes para las clases de color CSS de Tailwind
  const variantToColor = {
    contained: "bg-red hover:bg-red text-black",
    outlined: "border border-solid text-red hover:bg-black",
  };

  //Obtener la clase de color CSS Tailwind correspondiente según la variante
  const colorClass = variantToColor[variant] || "";

  return (
    <Box>
      <Fab size={size} className={colorClass} onClick={onClick}>
        {icon}
      </Fab>
    </Box>
  );
};

export default FloatingButtons;
