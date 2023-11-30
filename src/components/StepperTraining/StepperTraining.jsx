/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FormProvider, useForm } from "react-hook-form";

import BasicButtons from "../Buttons/BasicButtons/BasicButtons";
import CardTraining from "../Cards/CardTraining/CardTraining";
import AccordionBar from "../AccordionBar/AccordionBar";
import CardCheck from "../Cards/CardCheckbox/CardCheck";
import SnackBarCustom from "../SnackBarCustom/SnackBarCustom";
import TimerBar from "../TimerBar/TimerBar";
import InputsBar from "../InputsBar/InputsBar";
import ModalRoutine from "../ModalBar/ModalRoutine/ModalRoutine";
import RatingBar from "../RatingBar/RatingBar";

import "./StepperTraining.css";

const StepperTraining = ({ exerciseCount, selectedRoutine }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [cardChecksStatus, setCardChecksStatus] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [partyLoaded, setPartyLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const methods = useForm();
  const [ratingValue, setRatingValue] = useState(null); // Nuevo estado para el valor del Rating
  const [isFormValid, setIsFormValid] = useState(false); // Estado para rastrear la validez del formulario

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

  // Función para manejar el cambio de valor en el RatingBar
  const handleRatingChange = (newValue) => {
    setRatingValue(newValue); // Actualiza el estado con el valor del Rating
    // Verifica si todos los campos están completos y actualiza el estado de la validez del formulario
    setIsFormValid(
      newValue !== null &&
        newValue !== 0 &&
        methods.formState.isDirty &&
        methods.formState.isValid
    );
  };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => {
    // Obtener comentarios almacenados en el localStorage (si existen)
    let storedComment = JSON.parse(localStorage.getItem("commentData")) || [];

    // Verifica si storedComment no es un array, si no lo es, inicialízalo como un array vacío
    if (!Array.isArray(storedComment)) {
      storedComment = [];
    }

    // Crear un nuevo objeto de comentarios con los datos del formulario y el valor del Rating
    const newComment = {
      name: data.name,
      message: data.message,
      rating: ratingValue, // Agrega el valor del Rating al objeto newComment
    };

    // Agregar el nuevo comentario al arreglo de comentarios almacenados
    storedComment.push(newComment);

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem("commentData", JSON.stringify(storedComment));

    methods.reset();
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    const confettiElement = document.getElementById("root");
    window.party.confetti(confettiElement);
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

            <div className="flex text-red justify-center space-x-4 my-5">
              <p className=" text-red text-lg tracking-wide text-center ">
                Dejanos un comentario
              </p>
              <i className="bx bx-message-rounded-dots text-2xl" />
            </div>

            {/* Formulario de comentario */}
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="mt-5 w-60">
                  <InputsBar
                    id="name"
                    label="Nombre"
                    type="name"
                    name="name"
                    icon={<i className="bx bx-user" />}
                    className="mb-4"
                  />
                  <InputsBar
                    id="message"
                    label="Comentario"
                    type="text"
                    name="message"
                    icon={<i className="bx bx-file" />}
                    className="mb-4 overflow-hidden w-60"
                    maxRows={50}
                    isMultiline={true}
                  />
                  <div className="absolute flex text-sm space-x-4 p-4 md:-ml-5 -ml-8 tracking-wider">
                    <p className="mt-1"> Califica la rutina</p>
                    <RatingBar onRatingChange={handleRatingChange} />
                  </div>
                </div>
                <div className="xl:mt-16 mt-20 flex justify-center">
                  <BasicButtons
                    title="Listo"
                    type="submit"
                    variant="contained"
                  />
                </div>
              </form>
            </FormProvider>

            <div>
              <ModalRoutine open={openModal} handleClose={handleCloseModal} />
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
