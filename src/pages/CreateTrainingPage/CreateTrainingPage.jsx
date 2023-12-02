import { useState } from "react";

import { useInputContext } from "../../hooks/useInputContext";
import { Images } from "../../images/Images/Images";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import ModalCreateRoutine from "../../components/ModalBar/ModalCreateRoutine/ModalCreateRoutine";
import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";
import NavBar from "../../layout/NavBar/NavBar";

const CreateTrainingPage = () => {
  const { inputData } = useInputContext(); // Acceder al contexto
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed w-screen h-screen"
      style={{ backgroundImage: `url(${Images.bg_cratePage})` }}
    >
      <div>
        <BannerNavBar />
      </div>

      <div className="mt-32 lg:mt-44">
        <div className="text-center xl:mb-5">

          <h2 className=" text-red tracking-wider text-xl lg:text-2xl  uppercase mb-10">
            Prepara tu rutina
          </h2>

          <div className="flex items-center justify-center text-red text-lg mb-2 xl:mt-0 sm:mt-5 tracking-wider">
            <h2>¡ Hola ! {inputData.name}</h2>
            <i className="bx bx-dumbbell bx-tada text-2xl ml-2" />
          </div>

          <p className="text-sm tracking-wider md:mb-5 sm:mb-10">
            Preparate, hoy es día de entrenamiento
          </p>
        </div>

        <div className="md:flex justify-center mt-10">
          <div className="flex flex-col items-center md:flex-row md:gap-4">
            <BasicButtons
              title="Crear Rutina"
              variant="contained"
              onClick={handleOpenModal}
            />
          </div>
        </div>
        <ModalCreateRoutine
          open={openModal}
          handleClose={handleCloseModal}
          onClick={handleCloseModal}
        />
      </div>

      <div className="pb-24">
        <NavBar />
      </div>
    </div>
  );
};

export default CreateTrainingPage;
