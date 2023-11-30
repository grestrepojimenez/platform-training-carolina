/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import BasicButtons from "../Buttons/BasicButtons/BasicButtons";
import CardTraining from "../Cards/CardTraining/CardTraining";
import AccordionBar from "../AccordionBar/AccordionBar";
import CardCheck from "../Cards/CardCheckbox/CardCheck";
import SnackBarCustom from "../SnackBarCustom/SnackBarCustom";
import TimerBar from "../TimerBar/TimerBar";

import "./StepperTraining.css";
import ModalRoutine from "../ModalBar/ModalRoutine/ModalRoutine";

const StepperTraining = ({ exerciseCount, selectedRoutine }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardChecksStatus, setCardChecksStatus] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [partyLoaded, setPartyLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectedRoutine && selectedRoutine.exercises) {
      // Al cambiar de paso, resetea el estado de las CardCheck
      setCardChecksStatus(
        Array(selectedRoutine.exercises[activeStep].selectedSeries).fill(false)
      );
    }
  }, [activeStep, selectedRoutine]);

  const handleCardCheckClick = (index) => {
    const updatedStatus = [...cardChecksStatus];
    updatedStatus[index] = !updatedStatus[index];
    setCardChecksStatus(updatedStatus);
  };

  const handleNext = () => {
    // Verifica si todas las CardCheck están marcadas antes de avanzar al siguiente paso
    const allChecked = cardChecksStatus.every((status) => status);
    if (allChecked) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleTimeElapsed = (elapsedTime) => {
    setElapsedTime(elapsedTime); // Almacenar el tiempo transcurrido en el estado
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const loadPartyLibrary = () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js";
      script.async = true;

      script.onload = () => {
        setPartyLoaded(true);
      };

      document.body.appendChild(script);
    };

    loadPartyLibrary();
  }, []);

  const handleFinish = (totalSeconds) => {
    setStopTimer(true); // Establecer el estado para detener el temporizador

    const idDataRoutine = uuidv4();
    const routineName = selectedRoutine.routineName;
    const currentDate = new Date().toLocaleDateString();
    const exerciseCount = selectedRoutine.exercises;
    const seriesCount = selectedRoutine.selectedSeries;
    const repetitionsCount = selectedRoutine.numberRepetitions;

    // Convertir el totalSeconds a horas, minutos y segundos
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Crear un objeto con los datos de la rutina finalizada
    const newDataRoutineFinished = {
      id: idDataRoutine,
      routineName,
      currentDate,
      elapsedTime: { hours, minutes, seconds },
      exerciseCount, // Suponiendo que esta variable está definida en tu contexto
      seriesCount,
      repetitionsCount,
    };

    // Obtener datos actuales del localStorage
    const storedData =
      JSON.parse(localStorage.getItem("dataRoutineFinished")) || [];

    // Agregar el nuevo objeto al arreglo existente
    storedData.push(newDataRoutineFinished);

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("dataRoutineFinished", JSON.stringify(storedData));

    if (partyLoaded && window.party) {
      const confettiElement = document.getElementById("root");
      window.party.confetti(confettiElement);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="pt-5">
        <TimerBar
          stopTimer={stopTimer}
          onFinish={handleFinish}
          onTimeElapsed={handleTimeElapsed}
        />
      </div>

      <div className="mb-10">
        <Stepper activeStep={activeStep} alternativeLabel>
          {Array.from({ length: exerciseCount }, (_, index) => (
            <Step key={index + 1}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="flex justify-center">
        {activeStep === exerciseCount || stopTimer ? (
          <div className="mx-auto text-center">
            <p className="uppercase text-xl p-3 tracking-wide">
              ¡Felicitaciones!
            </p>
            <p>Terminaste la rutina</p>

            <div className="flex justify-center mt-5">
              <BasicButtons
                title="Listo"
                variant="contained"
                onClick={handleOpenModal}
              />
              <div>
                <ModalRoutine open={openModal} handleClose={handleCloseModal} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Contenido del paso */}
            <div>
              {/* Contenido específico de cada paso */}
              {selectedRoutine && (
                <div>
                  <div className="mb-1">
                    <CardTraining
                      name={selectedRoutine.exercises[activeStep].name}
                      primaryMuscles={
                        selectedRoutine.exercises[activeStep].primaryMuscles
                      }
                      equipment={
                        selectedRoutine.exercises[activeStep].equipment
                      }
                      images={selectedRoutine.exercises[activeStep].images}
                      exerciseNumber={activeStep + 1}
                    />
                  </div>

                  <div>
                    <AccordionBar
                      instructions={
                        selectedRoutine.exercises[activeStep].instructions
                      }
                    />
                  </div>

                  <div>
                    <div className="mt-5 space-y-4">
                      {cardChecksStatus.map((checked, index) => (
                        <div
                          key={index}
                          onClick={() => handleCardCheckClick(index)}
                        >
                          <CardCheck
                            set={index + 1}
                            rep={
                              selectedRoutine.exercises[activeStep]
                                .numberRepetitions
                            }
                            lib={
                              selectedRoutine.exercises[activeStep].weightLoad
                            }
                            isChecked={checked}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-5">
              <BasicButtons
                title={
                  activeStep === exerciseCount - 1 ? "Finalizar" : "Ok Set"
                }
                variant="contained"
                onClick={() => {
                  if (activeStep === exerciseCount - 1) {
                    handleFinish();
                  } else {
                    handleNext();
                  }
                }}
                icon={<i className="bx bx-check" />}
              />
            </div>
          </div>
        )}
      </div>
      <SnackBarCustom
        open={snackbarOpen} // Pass open state as prop
        onClose={handleCloseSnackbar} // Pass close function as prop
        severity="warning"
        message="¡Completa todos los ejercicios, marca cada set!"
      />
    </div>
  );
};

export default StepperTraining;
