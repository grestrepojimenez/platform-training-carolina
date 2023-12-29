import { useState } from "react";

import { useInputContext } from "../../hooks/useInputContext";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import ModalCreateRoutine from "../../components/ModalBar/ModalCreateRoutine/ModalCreateRoutine";
import ModalGenerateRoutine from "../../components/ModalBar/ModalGenerateRoutine/ModalGenerateRoutine";

import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";
import NavBar from "../../layout/NavBar/NavBar";

const CreateTrainingPage = () => {
  const { inputData } = useInputContext(); // Acceder al contexto
  const [openModalCreateRoutine, setOpenModalCreateRoutine] = useState(false);
  const [openModalGenerateRoutine, setOpenModalGenerateRoutine] = useState(false);

  const handleOpenModalCreateRoutine = () => {
    setOpenModalCreateRoutine(true);
  };

  const handleCloseModalCreateRoutine = () => {
    setOpenModalCreateRoutine(false);
  };
  
  const handleOpenModalGenerateRoutine = () => {
    setOpenModalGenerateRoutine(true);
  };

  const handleCloseModalGenerateRoutine = () => {
    setOpenModalGenerateRoutine(false);
  };

  return (
    <>
      <div>
        <BannerNavBar />
      </div>

      <div className="mt-14">
        <div className="text-center xl:mb-5">
          <h2 className="text-red tracking-wider text-xl lg:text-2xl font-medium uppercase mb-2">
            Prepara tu rutina
          </h2>

          <div className="flex items-center justify-center text-red text-lg mb-2 mt-10 tracking-wider">
            <h2>¡ Hola ! {inputData.name}</h2>
            <i className="bx bx-dumbbell bx-tada text-2xl ml-2" />
          </div>

          <p className="text-sm tracking-wider mb-20">
            Preparate, hoy es día de entrenamiento
          </p>
        </div>

        <div  className="flex justify-center">
          <div>
            <div >
              <BasicButtons
                title="Crear nueva Rutina"
                variant="contained"
                onClick={handleOpenModalCreateRoutine}
              />
            </div>
          </div>
          <ModalCreateRoutine
            open={openModalCreateRoutine}
            handleClose={handleCloseModalCreateRoutine}
            onClick={handleCloseModalCreateRoutine}
          />
        </div>

        <div  className="flex justify-center">
          <div>
            <BasicButtons
              title="Rutina Aleatoria"
              variant="outlined"
              onClick={handleOpenModalGenerateRoutine}
            />
          </div>
          <ModalGenerateRoutine
            open={openModalGenerateRoutine}
            onClick={handleCloseModalGenerateRoutine }
            handleClose={handleCloseModalGenerateRoutine }
          />
        </div>
      </div>

      <div className="pb-24">
        <NavBar />
      </div>
    </>
  );
};

export default CreateTrainingPage;
