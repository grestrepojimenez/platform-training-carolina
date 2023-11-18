/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import { useInputContext } from "../../hooks/useInputContext";
import InputsBar from "../InputsBar/InputsBar";
import BasicButtons from "../Buttons/BasicButtons/BasicButtons";

const ModalBar = ({ open, handleClose, onClick }) => {
  const { handleInputChange } = useInputContext();
  const methods = useForm();
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    // Obtener los datos de la rutina almacenados en localStorage
    const storedRoutine = JSON.parse(localStorage.getItem("routine")) || [];

    console.log(storedRoutine);
    // Crear un nuevo objeto de rutinas con los datos del formulario
    const newRoutine = {
      routineName: data.routineName,
    };

    // Agregar el nuevo usuario al arreglo de usuarios almacenados
    storedRoutine.push(newRoutine);

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("routine", JSON.stringify(storedRoutine));

    methods.reset();
  };

  const handleNavigatation = () => {
    methods.handleSubmit(onSubmit)();

    if (methods.formState.isValid) {
      navigate("/exercisesPage");
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
                label="Nombre Rutina"
                type="text"
                name="routineName"
                icon={<i className="bx bx-dumbbell" />}
                className="mb-4"
                onChange={(e) =>
                  handleInputChange("routineName", e.target.value)
                }
              />
            </div>
            <div className="flex justify-center mt-10">
              <BasicButtons
                title="Cancelar"
                variant="outlined"
                type="submit"
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
