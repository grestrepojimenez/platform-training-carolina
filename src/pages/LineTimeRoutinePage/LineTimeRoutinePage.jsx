import { Chrono } from "react-chrono";
import { Link } from "react-router-dom";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";
import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";
import NavBar from "../../layout/NavBar/NavBar";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";

const LineTimeRoutinePage = () => {
  // Obtener datos del localStorage
  const storedData =
    JSON.parse(localStorage.getItem("dataRoutineFinished")) || [];

  const chronoItems = storedData.map((data) => ({
    title: data.currentDate,
    cardTitle: data.routineName,
    cardSubtitle: `${data.elapsedTime.hours}h ${data.elapsedTime.minutes}m ${data.elapsedTime.seconds}s`,
  }));

  return (
    <>
      <BannerNavBar />
      <div className="mt-10">
        <h2 className=" text-red text-center  tracking-wider text-xl lg:text-2xl  uppercase mb-10">
          Historial Rutina
        </h2>

        {storedData.length === 0 ? (
          <>
            <div className="flex justify-center items-center w-screen">
              <div className="text-center">
                <p className="p-6">No hay datos disponibles</p>
                <Link to="/trainingPlanPage">
                  <BasicButtons title="Ver Rutinas" variant="contained" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center mx-auto w-96 tracking-wider font-light">
            <Chrono
              items={chronoItems}
              mode="VERTICAL_ALTERNATING"
              itemWidth={150}
              fontSizes={{
                cardSubtitle: "15px",
                cardTitle: "15px",
                title: "10px",
              }}
              theme={{
                cardBgColor: "#2B2C31",
                titleColor: "#b0abab",
                titleColorActive: "#2B2C31",
                iconBackgroundColor: "#b0abab",
                detailsColor: "#b0abab",
                cardTitleColor: "#FD3C3D",
                cardSubtitleColor: "#b0abab",
                primary: "#FD3C3D",
                secondary: "#b0abab",
              }}
              cardHeight={80}
            />
          </div>
        )}
      </div>
      <ScrollButton />
      <div className="pb-24">
        <NavBar />
      </div>
    </>
  );
};

export default LineTimeRoutinePage;
