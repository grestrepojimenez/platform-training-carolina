/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import ValidationRulesCustom from "./ValidationRulesCustom";

import { useRoutineContext } from "../../hooks/useRoutineContext";
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
  isMultiline = false,
  contextType,
}) => {
  const { handleRoutineInputChange } = useRoutineContext();
  const { handleInputChange } = useInputContext();
  const validationRules = ValidationRulesCustom(type);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChange = (field, value) => {
    // Determina en qué contexto guardar la información según el prop 'contextType'
    if (contextType === "routine") {
      handleRoutineInputChange(field, value);
    } else if (contextType === "user") {
      handleInputChange(field, value);
    } else {
      console.log("Error! No se ingreso un Contexto existente");
    }
  };

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
                <div className="text-red text-xl ml-2">{icon}</div>
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
        variant="standard"
        multiline={isMultiline} // Aplicar condicionalmente multilínea según la propiedad
        maxRows={isMultiline ? maxRows : undefined} //Incluir maxRows si isMultiline es verdadera
      />
    </>
  );
};

export default InputsBar;
