/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import { useInputContext } from "../../hooks/useInputContext";

const InputsBar = ({
  id,
  label,
  icon,
  type,
  className,
  onClick,
  name,
  maxRows,
  defaultValue,
}) => {
  const { inputData, handleInputChange } = useInputContext();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

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
          "El nombre solo puede contener letras y espacios, no debe icluir tildes",
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
        message: "No debe tener campos vacios",
      };
      break;
  }

  return (
    <>
      <TextField
        {...register(name, validationRules)}
        className={className}
        color="error"
        error={!!errors[name]}
        helperText={errors[name] ? errors[name].message : ""}
        id={id}
        InputLabelProps={{
          style: {
            color: "#b0abab7f",
            fontWeight: 300,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClick}>
                <div className="text-red">{icon}</div>
              </IconButton>
            </InputAdornment>
          ),
          style: {
            color: "#b0abab",
            fontWeight: 300,
            borderBottom: "1px solid #fd3c3c8f",
          },
        }}
        label={label}
        name={name}
        onChange={handleChange}
        required
        type={type}
        value={inputData[label.toLowerCase()]}
        variant="standard"
        multiline
        maxRows={maxRows}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default InputsBar;
