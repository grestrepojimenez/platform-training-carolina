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
      <header className="relative overflow-hidden">
        <div className="w-full h-screen">
          <div className="absolute inset-0 ">
            <img
              className="w-full h-full object-cover absolute top-0 left-0"
              src={Images.bg_cratePage}
              alt="fondo gimnasio"
            />
          </div>

          <div className="relative">
            <div className="m-5">
              <Link to="/registerPage">
                <IconButton color="error">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
            </div>

            <div className="w-full h-screen relative ">
              <div className="absolute inset-0 flex flex-col ">
                <img
                  className="sm:w-36 md:w-48 xl:w-64 mb-20 mx-auto"
                  src={Images.logo}
                  alt="logo training"
                />

                <h1 className="uppercase tracking-wider font-medium md:text-xl xl:mt-8 text-center text-red mb-3 md:mb-5">
                  Plan de entrenamiento
                </h1>

                <div className="text-center xl:mb-5">
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
                    <BasicButtons
                      title="Ver Rutinas"
                      variant="outlined"
                      onClick={handleOpenModal}
                    />
                  </div>
                </div>
                <ModalBar
                  open={openModal}
                  handleClose={handleCloseModal}
                  onClick={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default CreateTrainingPage;
