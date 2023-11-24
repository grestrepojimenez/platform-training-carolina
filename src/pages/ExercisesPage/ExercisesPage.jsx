import { useState } from "react";
import { Fab, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import NavBar from "../../layout/NavBar/NavBar";
import { useInputContext } from "../../hooks/useInputContext";
import MenuBar from "../../components/Buttons/MenuBar/MenuBar";
import exercisesData from "../../__mocks__/exercisesData.json";
import CardExercises from "../../components/Cards/CardExercises/CardExercises";

const ExercisesPage = () => {
  const { inputData } = useInputContext(); // Acceder al contexto
  const [showButton, setShowButton] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [filteredExercises, setFilteredExercises] = useState(exercisesData);

  // Obtener datos únicos de "equipment" y "primaryMuscles" del JSON
  const musclesData = [
    ...new Set(exercisesData.flatMap((exercise) => exercise.primaryMuscles)),
  ];
  const equipmentData = [
    ...new Set(exercisesData.flatMap((exercise) => exercise.equipment)),
  ];

  // Función para desplazar al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
  };

  // Función para mostrar el botón cuando se hace scroll
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrollCount((prevCount) => prevCount + 1);
      if (scrollCount > 1) {
        setShowButton(true);
      }
    } else {
      setShowButton(false);
    }
  };

  // Agregar el listener al evento scroll para mostrar u ocultar el botón
  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="justify-center relative">
        
        <div className="mx-auto text-center">
          <p className="uppercase mb-5 text-red text-xl font-medium mt-20">
            Rutina {inputData.routineName}
          </p>
          <p className="capitalize tracking-wider text-center text-red mb-5">
            ¡ Hola ! {inputData.name}
          </p>
          <p>Selecciona los ejercicios para la rutina</p>
        </div>

        <div className="flex justify-center mt-10 md:m-10 md:space-x-4 space-x-2">
          <MenuBar
            title="selecciona musculo"
            list={musclesData}
            exercisesData={exercisesData}
            setFilteredExercises={setFilteredExercises}
          />
          <MenuBar
            title="selecciona equipo"
            list={equipmentData}
            exercisesData={exercisesData}
            setFilteredExercises={setFilteredExercises}
          />
        </div>

        <div className="flex mt-8 md:mt-0">
          <div className="max-w-screen-lg mx-auto flex flex-wrap justify-center">
            {/* Mapeo de los datos de exercisesData a las tarjetas CardExercises */}
            {filteredExercises.map((exercise) => (
              <CardExercises
                key={exercise.id}
                exercise={exercise}
                icon={<AddCircleIcon />}
              />
            ))}
          </div>
        </div>

        {showButton ? (
          <div className="fixed bottom-4 right-4">
            <Tooltip title="Scroll to top" placement="top-start">
              <Fab
                size="small"
                className="bg-redOpacity hover:bg-redOpacity"
                onClick={scrollToTop}
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </Tooltip>
          </div>
        ) : null}
      </main>
    </>
  );
};

export default ExercisesPage;
