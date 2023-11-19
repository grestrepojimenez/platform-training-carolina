import NavBar from "../../layout/NavBar/NavBar";
import { useInputContext } from "../../hooks/useInputContext";
import MenuBar from "../../components/Buttons/MenuBar/MenuBar";

const ExercisesPage = () => {
  const { inputData } = useInputContext(); // Acceder al contexto

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="mx-auto text-center">
          <h2 className="capitalize tracking-wider font-medium text-2xl text-center text-red mt-20">
            caro{inputData.name}
          </h2>
          <p>Selecciona los ejercicios del entrenamiento</p>
        </div>

        <div className="flex justify-center m-10 md:space-x-4 space-x-1">
          <MenuBar title="selecciona musculo" />
          <MenuBar title="selecciona equipo" />
        </div>
        
      </main>
    </>
  );
};

export default ExercisesPage;
