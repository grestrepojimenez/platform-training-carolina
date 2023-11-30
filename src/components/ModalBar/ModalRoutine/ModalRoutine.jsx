/* eslint-disable react/prop-types */
import { Card, CardContent, Modal } from "@mui/material";
import AcordionModal from "../../AccordionBar/AcordionModal/AcordionModal";

const ModalRoutine = ({ open, handleClose }) => {
  // Obtener datos del localStorage al renderizar el componente
  const storedData =
    JSON.parse(localStorage.getItem("dataRoutineFinished")) || [];

  // Obtener la última entrada del arreglo (si existe)
  const lastEntry = storedData[storedData.length - 1];

  // Extraer valores de lastEntry.elapsedTime si existe
  const { hours, minutes, seconds } = lastEntry?.elapsedTime || {};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Card className="bg-black mx-5 my-8 lg:mx-80">
          <CardContent style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <div className="text-center mb-3 tracking-wide ">
              <h2 className="uppercase mb-5 text-red text-center text-xl">
                ¡Gran Trabajo!
              </h2>
              <p className="text-white">Terminaste el entrenamiento del dia</p>
            </div>
            {/* Mostrar solo la última información si existe */}
            {lastEntry && (
              <>
                <p className=" text-red capitalize text-base p-3 tracking-wide text-center">
                  Rutina - {lastEntry.routineName}
                </p>
                <div className="flex justify-center space-x-8 mt-4 tracking-wide">
                  <Card className="bg-grey text-xs w-40 p-1 text-center">
                    <p className="text-white mb-2">Tiempo Entrenamiento</p>
                    <div className="flex text-red justify-around">
                      <i className="bx bx-timer bx-tada text-lg" />
                      <p className="mt-1">
                        {hours}h:{minutes}m:{seconds}s
                      </p>
                    </div>
                  </Card>
                  <Card className="bg-grey text-xs w-40 p-1 text-center">
                    <p className="text-white mb-2">Dia Entrenamiento</p>
                    <div className="flex text-red justify-around">
                      <i className="bx bx-calendar bx-tada text-base" />
                      <p className="mt-1">{lastEntry.currentDate}</p>
                    </div>
                  </Card>
                </div>

                <div className="mt-5">
                  <AcordionModal />
                </div>

                <p className=" text-red text-base p-5 tracking-wide text-center ">
                  Deja un comentario
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalRoutine;
