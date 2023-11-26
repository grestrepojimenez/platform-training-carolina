/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import InputsBar from "../InputsBar/InputsBar";
import BasicButtons from "../Buttons/BasicButtons/BasicButtons";

const ModalBar = ({ open, handleClose, onClick }) => {
  const { addRoutine, handleRoutineInputChange } = useRoutineContext(); // Uso de un enlace de contexto personalizado para acceder a rutinas
  const methods = useForm(); // Inicializando métodos de formulario usando el hook useForm
  const navigate = useNavigate(); // Accediendo a las funcionalidades de navegación usando el gancho hook

  const onSubmit = (data) => {
    addRoutine(data.routineName); // Agregar la rutina usando el nombre proporcionado en el formulario
    methods.reset(); // Borrar los input al mandar la informacion
    navigate("/exercisesPage"); // Redirigir a la página de creación de ejercicios
  };

  // Función para manejar la validación y navegación del formulario.
  const handleNavigatation = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      const formData = methods.getValues();
      onSubmit(formData);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper bg-black shadow-xl p-4 w-80 h-60 rounded">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex justify-center mt-7">
              <InputsBar
                id="routineName"
                label="Nombre nueva rutina"
                type="text"
                name="routineName"
                icon={<i className="bx bx-dumbbell" />}
                className="mb-4"
                onChange={(e) =>
                  handleRoutineInputChange("routineName", e.target.value)
                }
                contextType="routine"
              />
            </div>
            <div className="flex justify-center mt-10">
              <BasicButtons
                title="Cancelar"
                variant="outlined"
                onClick={onClick}
              />
              <BasicButtons
                title="Ok"
                variant="contained"
                type="submit"
                onClick={handleNavigatation}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default ModalBar;
