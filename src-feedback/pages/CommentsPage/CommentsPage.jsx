import { Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { Images } from "../../images/Images/Images";
import RatingBar from "../../components/RatingBar/RatingBar";
import NavBar from "../../layout/NavBar/NavBar";
import ScrollButton from "../../components/Buttons/ScrollButton/ScrollButton";
import BannerNavBar from "../../layout/BannerNavBar/BannerNavBar";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";

const CommentsPage = () => {
  // Obtener datos del localStorage
  const storedData = JSON.parse(localStorage.getItem("commentData")) || [];

  return (
    <>
      <BannerNavBar />
      <div className="flex items-center justify-center text-red mb-2 mt-10 space-x-4 tracking-wider">
        <h2 className="text-red tracking-wider text-xl lg:text-2xl font-medium uppercase mb-2">
          Comentarios
        </h2>
        <i className="bx bx-message-rounded-dots bx-tada text-2xl" />
      </div>

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
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:px-14 lg:mx-auto lg:max-w-7xl">
          {storedData.map((comment, index) => {
            const randomAvatarNumber = Math.floor(Math.random() * 4) + 1;
            const avatarKey = `avatar_${randomAvatarNumber}`;

            return (
              <Card
                key={index}
                className="bg-grey tracking-wider mx-5 md:mx-3 lg:mx-5 md:w-80 lg:w-96"
              >
                <CardContent>
                  <div className="space-x-4">
                    <div className="w-14 flex">
                      <img
                        src={Images[avatarKey]}
                        alt={`Avatar ${randomAvatarNumber}`}
                      />
                      <div className="ml-8 text-white">
                        <h2 className="text-lg">{comment.name}</h2>
                        <RatingBar defaultValue={comment.rating} />
                      </div>
                    </div>

                    <div className="text-white">
                      <p className="text-xs mt-8">{comment.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ScrollButton />
      <div className="pb-24">
        <NavBar />
      </div>
    </>
  );
};

export default CommentsPage;
