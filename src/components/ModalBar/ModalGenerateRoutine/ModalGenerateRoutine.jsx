/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ParameterList from "../../../pages/ParametersExercisesPage/ParameterList";

import SelectBar from "../../Buttons/SelectBar/SelectBar";
import BasicButtons from "../../Buttons/BasicButtons/BasicButtons";
import { useRoutineContext } from "../../../hooks/useRoutineContext";
import exercisesData from "../../../__mocks__/exercisesData.json";

const ModalGenerateRoutine = ({ open, handleClose, onClick }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedDays, setSelectedDays] = useState(null);
  const [generatedRoutines, setGeneratedRoutines] = useState([]);
  const { addGenerateoutines } = useRoutineContext();
  const navigate = useNavigate(); // Accediendo a las funcionalidades de navegación usando el hook

  const dayWeek = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  const methods = useForm(); // Inicializando métodos de formulario usando el hook useForm
  const optionList = ParameterList();

  const handleSelectChange = (selectedValue) => {
    setSelectedLevel(selectedValue);
  };

  const handleDaysChange = (selectedValue) => {
    setSelectedDays(selectedValue);
  };

  const generateRandomRoutines = (selectedValue) => {
    if (!selectedLevel || !exercisesData || !exercisesData.length) return; // Agregar verificación
    setSelectedLevel(selectedValue);

    const exercisesMatchingLevel = exercisesData.filter(
      (exercise) => exercise.level === selectedLevel
    );

    const routines = [];
    const idRoutine = uuidv4();

    for (let i = 0; i < selectedDays; i++) {
      const selectedExercises = [];

      // Elegir aleatoriamente 6 ejercicios para la rutina
      while (selectedExercises.length < 6) {
        const randomIndex = Math.floor(
          Math.random() * exercisesMatchingLevel.length
        );
        const selectedExercise = exercisesMatchingLevel[randomIndex];

        // Evitar duplicados en la misma rutina
        if (
          !selectedExercises.some(
            (exercise) => exercise.id === selectedExercise.id
          )
        ) {
          selectedExercises.push(selectedExercise);
        }
      }

      // Construir la estructura de la rutina
      const routineName = `Training - ${dayWeek[i % dayWeek.length]}`;

      const routine = {
        routineName,
        exercises: selectedExercises.map((exercise) => ({
          ...exercise,
          selectedSeries: 4,
          numberRepetitions: 15,
          averageDuration: 8,
          weightLoad: 20,
        })),
        idRoutine,
      };

      routines.push(routine);
    }

    setGeneratedRoutines(routines);
    addGenerateoutines(routines);

    methods.reset();
    navigate("/trainingPlanPage");
  };

  const onSubmit = () => {
    generateRandomRoutines(selectedLevel);
    onClick();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-background-paper bg-black shadow-xl p-4 w-80  rounded">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex-col flex justify-center mt-5 ml-5">
              <SelectBar
                id="selectedLevels"
                name="selectedLevels"
                option={optionList.levels}
                title="Selecciona tu nivel"
                icon={FormatListBulletedIcon}
                onSelectChange={handleSelectChange}
              />
              <SelectBar
                id="selectedDays"
                name="selectedDays"
                option={optionList.days}
                title="Selecciona cuantos dias"
                icon={CalendarMonthIcon}
                onSelectChange={handleDaysChange}
              />
            </div>
            <div className="flex justify-center mt-10">
              <BasicButtons
                title="Cerrar"
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
