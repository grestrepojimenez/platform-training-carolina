/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// hook personalizado para acceder a los valores de InputContext.
const InputContext = createContext();

// Función personalizada que devuelve el valor del contexto de los input.
export const useInputContext = () => {
  return useContext(InputContext);
};

// Proveedor de contexto que administra el estado de los input y proporciona el contexto a los componentes hijos.
export const InputProvider = ({ children }) => {
  //Estado para gestionar los datos de entrada
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Función para actualizar inputData según el campo y el valor
  const handleInputChange = (field, value) => {
    setInputData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Proporciona inputData y handleInputChange como valores para InputContext
  return (
    <InputContext.Provider
      value={{
        inputData,
        handleInputChange,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
