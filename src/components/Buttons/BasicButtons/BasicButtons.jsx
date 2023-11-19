/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

const BasicButtons = ({ title, icon, onClick, variant, type, disabled }) => {
  // Definir estilos de variantes para las clases de color CSS de Tailwind
  const variantToColor = {
    contained:
      "bg-red hover:bg-red text-black tracking-wider px-8 ",
    outlined:
      "border border-solid text-red text-red font-normal tracking-wider px-8",
  };

  //Obtener la clase de color CSS Tailwind correspondiente según la variante
  const colorClass = variantToColor[variant] || "";

  return (
    <>
      <div className="px-5 py-3">
        <Button
          className={colorClass}
          endIcon={icon}
          onClick={onClick}
          variant={variant}
          color="error"
          type={type}
          disabled={disabled}
        >
          {title}
        </Button>
      </div>
    </>
  );
};

export default BasicButtons;
