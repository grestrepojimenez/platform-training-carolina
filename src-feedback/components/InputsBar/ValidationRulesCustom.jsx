const ValidationRulesCustom = (type) => {
    
  const validationRules = {
    required: true,
  };

  switch (type) {
    case "email":
      validationRules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Dirección de correo electrónico no válida",
      };
      break;
    case "password":
      validationRules.minLength = {
        value: 6,
        message: "La contraseña debe tener al menos 6 caracteres.",
      };
      break;

    case "name":
      validationRules.pattern = {
        value: /^[A-Za-z\s]+$/i,
        message:
          "El nombre solo puede contener letras y espacios, no debe incluir tildes",
      };
      break;

    case "number":
      validationRules.pattern = {
        value: /^\d+$/,
        message: "Este campo solo puede contener números.",
      };
      break;

    default:
      validationRules.pattern = {
        message: "No debe tener campos vacíos",
      };
      break;
  }

  return validationRules;
};

export default ValidationRulesCustom;
