import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CreateTrainingPage from "../pages/CreateTrainingPage/CreateTrainingPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import ParametersExercisesPage from "../pages/ParametersExercisesPage/ParametersExercisesPage";
import TrainingPlanPage from "../pages/TrainingPlanPage/TrainingPlanPage";
import TrainingStartPage from "../pages/TrainingStartPage/TrainingStartPage";
import RoutinePage from "../pages/RoutinePage/RoutinePage";
import LineTimeRoutinePage from "../pages/LineTimeRoutinePage/LineTimeRoutinePage";
import CommentsPage from "../pages/CommentsPage/CommentsPage";
import NotFoundPage from "../layout/NotFoundPage/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/createTrainingPage" element={<CreateTrainingPage />} />
        <Route path="/exercisesPage" element={<ExercisesPage />} />
        <Route path="/exercisesPage/:routineName" element={<ExercisesPage />} />
        <Route
          path="/parametersExercisesPage"
          element={<ParametersExercisesPage />}
        />
        <Route
          path="/parametersExercisesPage/:routineName/:ExcercisesName"
          element={<ParametersExercisesPage />}
        />
        <Route path="/trainingPlanPage" element={<TrainingPlanPage />} />
        <Route path="/trainingStartPage/:routineName" element={<TrainingStartPage/>} />
        <Route path="/routinePage/:routineName" element={<RoutinePage/>} />
        <Route path="/lineTimeRoutinePage" element={<LineTimeRoutinePage />} />
        <Route path="/commentsPage" element={<CommentsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
