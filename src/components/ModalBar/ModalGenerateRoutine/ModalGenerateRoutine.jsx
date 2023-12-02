/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ParameterList from "../../../pages/ParametersExercisesPage/ParameterList";

import SelectBar from "../../Buttons/SelectBar/SelectBar";
import BasicButtons from "../../Buttons/BasicButtons/BasicButtons";

const ModalGenerateRoutine = ({ open, handleClose, onClick }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const methods = useForm(); // Inicializando métodos de formulario usando el hook useForm
  const optionList = ParameterList();

  const handleSelectChange = (selectedValue) => {
    setSelectedLevel(selectedValue);
  };

  const onSubmit = () => {
    console.log(selectedLevel);
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
              <SelectBar
                id="selectedLevels"
                name="selectedLevels"
                option={optionList.levels}
                title="Selecciona tu nivel"
                icon={FormatListBulletedIcon}
                onSelectChange={handleSelectChange}
              />
            </div>
            <div className="flex justify-center mt-10">
              <BasicButtons
                title="Cancelar"
                variant="outlined"
                onClick={onClick}
              />
              <BasicButtons title="Ok" variant="contained" type="submit" />
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default ModalGenerateRoutine;
