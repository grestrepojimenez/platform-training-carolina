import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CreateTrainingPage from "../pages/CreateTrainingPage/CreateTrainingPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import ParametersExercisesPage from "../pages/ParametersExercisesPage/ParametersExercisesPage";
import TrainingPlanPage from "../pages/TrainingPlanPage/TrainingPlanPage";
import TrainingStartPage from "../pages/TrainingStartPage/TrainingStartPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/createTrainingPage" element={<CreateTrainingPage />} />
        <Route path="/exercisesPage" element={<ExercisesPage />} />
        <Route
          path="/parametersExercisesPage"
          element={<ParametersExercisesPage />}
        />
        <Route path="/trainingPlanPage" element={<TrainingPlanPage />} />
        <Route path="/trainingStartPage/:routineName" element={<TrainingStartPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
