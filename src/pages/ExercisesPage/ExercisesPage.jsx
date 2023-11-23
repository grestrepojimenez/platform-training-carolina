import NavBar from "../../layout/NavBar/NavBar";
import { useInputContext } from "../../hooks/useInputContext";
import MenuBar from "../../components/Buttons/MenuBar/MenuBar";

const ExercisesPage = () => {
  const { inputData } = useInputContext(); // Acceder al contexto

  const musclesData = [
    "Ejercicio musculo 1",
    "Ejercicio musculo 2",
    "Ejercicio musculo 3",
  ];
  const equipmentData = [
    "Ejercicio equipo 1",
    "Ejercicio equipo 2",
    "Ejercicio equipo 3",
  ];

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="mx-auto text-center">
          <p className="uppercase mb-5 text-red text-xl font-medium mt-20">
            Rutina {inputData.routineName}
          </p>
          <p className="capitalize tracking-wider text-center text-lg font-thin text-red mb-5">
            ¡ Hola ! {inputData.name}
          </p>
          <p>Selecciona los ejercicios para la rutina</p>
        </div>

        <div className="flex justify-center mt-10 md:m-10 md:space-x-4 space-x-2">
          <MenuBar title="selecciona musculo" list={musclesData} />
          <MenuBar title="selecciona equipo" list={equipmentData} />
        </div>

      </main>
    </>
  );
};

export default ExercisesPage;
