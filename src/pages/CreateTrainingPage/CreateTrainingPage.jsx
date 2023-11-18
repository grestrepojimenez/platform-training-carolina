import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useInputContext } from "../../hooks/useInputContext";
import { Images } from "../../images/Images/Images";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import ModalBar from "../../components/ModalBar/ModalBar";

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
    <>
      <header className="relative">
        <div className="relative">
          <div className="m-5 absolute">
            <Link to="/registerPage">
              <IconButton color="error">
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </div>
          <img
            src={Images.headerImg}
            alt="imagen gimnasio"
            className="w-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              className="sm:w-28 md:w-40 lg:w-32 xl:w-48"
              src={Images.logo}
              alt="logo training"
            />
          </div>
        </div>
      </header>
      <main>
        <h1 className="uppercase tracking-wider font-medium   text-xl sm:mt-20 md:mt-20 xl:mt-8 text-center text-red mb-28 md:mb-10  ">
          Plan de entrenamiento
        </h1>

        <div className="text-center xl:mb-10 ">
          <div className="flex items-center justify-center text-red text-lg mb-6 xl:mt-0 sm:mt-10 tracking-wider">
            <h2>¡ Hola ! {inputData.name}</h2>
            <i className="bx bx-dumbbell bx-tada text-2xl ml-2" />
          </div>
          <p className="text-sm tracking-wider md:mb-10 sm:mb-20">
            Preparate, hoy es dia de entrenamiento
          </p>
        </div>

        <div className="flex justify-center items-center ">
          <BasicButtons
            title="Crear Plan"
            variant="outlined"
            onClick={handleOpenModal}
          />
        </div>
        <ModalBar
          open={openModal}
          handleClose={handleCloseModal}
          onClick={handleCloseModal}
        />
      </main>
    </>
  );
};

export default CreateTrainingPage;
