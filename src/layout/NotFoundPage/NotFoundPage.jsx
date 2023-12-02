import { Link } from "react-router-dom";
import { Images } from "../../images/Images/Images";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen relative flex flex-col justify-center items-center">
      {/* Imagen fondo */}
      <img
        className="w-72 lg:w-80"
        src={Images.error_404}
        alt="fondo gimnasio"
      />
      <p className="text-red tracking-wider text-xl lg:text-2xl font-medium uppercase mb-2 mt-9">
        Pagina no encontrada
      </p>
      <div className="mt-14">
        <Link to="/createTrainingPage">
          <BasicButtons title="ir a home" variant="outlined" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
