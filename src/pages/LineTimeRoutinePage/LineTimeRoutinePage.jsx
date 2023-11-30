import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NavBar from "../../layout/NavBar/NavBar";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";

const LineTimeRoutinePage = () => {
  // Obtener datos del localStorage
  const storedData =
    JSON.parse(localStorage.getItem("dataRoutineFinished")) || [];

  return (
    <div>
      <div>
        <p className="uppercase mb-10 text-red mt-14 md:mt-14 text-center text-xl">
          historial rutinas
        </p>
      </div>

      <div>
        <VerticalTimeline>
           {storedData.map((routine, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work w-90"
              contentStyle={{ background: "#F5F7F914" }}
              contentArrowStyle={{ borderRight: "7px solid  #F5F7F914" }}
              date={routine.currentDate} // Use la fecha de la rutina finalizada
              iconStyle={{ background: "#191A1F", color: "#FD3C3D" }}
              icon={<FitnessCenterIcon />}
            >
              <h3 className="vertical-timeline-element-title text-red tracking-wider">
                {routine.routineName}
              </h3>
              <div className="vertical-timeline-element-subtitle mt-2 ">
                <div className="flex text-white space-x-4">
                  <i className="bx bx-timer bx-tada text-2xl" />
                  <h5 className="text-xl">
                    {`${routine.elapsedTime.hours}h:${routine.elapsedTime.minutes}m:${routine.elapsedTime.seconds}s`}
                  </h5>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      <div className="pb-24">
        <NavBar />
      </div>
      <ScrollButton />
    </div>
  );
};

export default LineTimeRoutinePage;
