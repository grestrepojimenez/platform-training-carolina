import { BrowserRouter, Route, Routes } from "react-router-dom";

import { InputProvider } from "../hooks/useInputContext";
import { AvatarProvider } from "../hooks/useAvatarContext";
import { RoutineProvider } from "../hooks/useRoutineContext";

import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CreateTrainingPage from "../pages/CreateTrainingPage/CreateTrainingPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import ParametersExercisesPage from "../pages/ParametersExercisesPage/ParametersExercisesPage";

const Router = () => {
  return (
    <BrowserRouter>
      <RoutineProvider>
        <InputProvider>
          <AvatarProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/registerPage" element={<RegisterPage />} />
              <Route
                path="/createTrainingPage"
                element={<CreateTrainingPage />}
              />
              <Route path="/exercisesPage" element={<ExercisesPage />} />
              <Route
                path="/parametersExercisesPage"
                element={<ParametersExercisesPage />}
              />
            </Routes>
          </AvatarProvider>
        </InputProvider>
      </RoutineProvider>
    </BrowserRouter>
  );
};

export default Router;
