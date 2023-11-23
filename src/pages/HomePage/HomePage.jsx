import { Link } from "react-router-dom";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import { Images } from "../../images/Images/Images";

const HomePage = () => {
  return (
    <header className="relative">
      <div className="w-full h-screen relative">
        {/* Imagen fondo */}
        <img
          className="w-full h-full object-cover"
          src={Images.bg_home}
          alt="fondo gimnasio"
        />
        {/* Logo */}
        <div className="absolute inset-0 items-center justify-center mt-48">
          <img
            className="sm:w-36 md:w-48 xl:w-64 sm:mx-auto"
            src={Images.logo}
            alt="logo training"
          />
        </div>
        {/* Botones */}
        <div className="absolute inset-0 items-center flex justify-center mt-64">
          <Link to="/registerPage">
            <BasicButtons title="Comenzar" variant="outlined" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomePage;
