import { Card, CardContent } from "@mui/material";
import { Images } from "../../images/Images/Images";
import RatingBar from "../../components/RatingBar/RatingBar";
import NavBar from "../../layout/NavBar/NavBar";

const CommentsPage = () => {
  // Obtener datos del localStorage
  const storedData = JSON.parse(localStorage.getItem("commentData")) || [];

  return (
    <>
      <div className="flex items-center justify-center text-red mb-2 mt-10 space-x-4 tracking-wider">
        <h2 className="text-2xl">Comentarios</h2>
        <i className="bx bx-message-rounded-dots bx-tada text-2xl" />
      </div>

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
                <div className="flex space-x-4">
                  <div className="w-16">
                    <img
                      src={Images[avatarKey]}
                      alt={`Avatar ${randomAvatarNumber}`}
                    />
                  </div>

                  <div className="text-white">
                    <h2 className="text-lg">{comment.name}</h2>
                    <RatingBar />
                    <p className="text-xs mt-3">{comment.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="pb-24">
        <NavBar />
      </div>
    </>
  );
};

export default CommentsPage;
