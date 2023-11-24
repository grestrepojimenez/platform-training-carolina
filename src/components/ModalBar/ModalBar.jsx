/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import { useRoutineContext } from "../../hooks/useRoutineContext";
import InputsBar from "../InputsBar/InputsBar";
import BasicButtons from "../Buttons/BasicButtons/BasicButtons";

const ModalBar = ({ open, handleClose, onClick }) => {
  const { handleInputChange } = useRoutineContext();

  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let storedRoutine = JSON.parse(localStorage.getItem("routineData")) || [];

    // Check if the stored data is an array, if not, initialize an empty array
    if (!Array.isArray(storedRoutine)) {
      storedRoutine = [];
    }

    const newRoutine = {
      routineName: data.routineName,
    };

    storedRoutine.push(newRoutine);

    localStorage.setItem("routineData", JSON.stringify(storedRoutine));

    methods.reset();
    navigate("/exercisesPage", { state: { routineName: data.routineName } });
  };

  const handleNavigatation = async () => {
    const isValid = await methods.trigger(); // Trigger validation

    if (isValid) {
      const formData = methods.getValues(); // Get form data
      onSubmit(formData); // Handle form submission
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
