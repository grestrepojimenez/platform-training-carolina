/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import InputsBar from "../InputsBar/InputsBar";
import BasicButtons from "../Buttons/BasicButtons/BasicButtons";

const ModalBar = ({ open, handleClose, onClick }) => {
  // Uso de un enlace de contexto personalizado para acceder a rutinas y manejar entradas de rutinas
  const { addRoutine, handleRoutineInputChange } = useRoutineContext();
  // Inicializando métodos de formulario usando el hook useForm
  const methods = useForm();
  // Accediendo a las funcionalidades de navegación usando el gancho hook
  const navigate = useNavigate();


  const onSubmit = (data) => {
    // Agregar la nueva rutina al contexto
    addRoutine(data.routineName);

    // Obtener rutinas almacenadas en el localStorage (si existen)
    const storedRoutineData =
      JSON.parse(localStorage.getItem("routineData")) || {};

    // Crear una nueva rutina con los datos del formulario
    const newRoutine = {
      routineName: data.routineName,
      exercises: [],
    };

    // Agregar la nueva rutina a las rutinas almacenadas en localStorage
    storedRoutineData[data.routineName] = newRoutine;

    // Guardar las rutinas actualizadas en localStorage
    localStorage.setItem("routineData", JSON.stringify(storedRoutineData));

    // Resetear el formulario después de enviar
    methods.reset();

    // Redirigir a la página de creación de ejercicios
    navigate("/exercisesPage");
  };

  

  // Función para manejar la validación y navegación del formulario.
  const handleNavigatation = async () => {
    // Activar la validación del formulario utilizando el método de activación de react-hook-form
    const isValid = await methods.trigger();

    //Comprueba si los datos del formulario son válidos
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
