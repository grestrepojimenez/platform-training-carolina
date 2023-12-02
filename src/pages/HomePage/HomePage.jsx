import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BasicButtons from "../../components/Buttons/BasicButtons/BasicButtons";
import { Images } from "../../images/Images/Images";
import Loader from "../../layout/Loader/Loader";

const HomePage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowHomePage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      {showHomePage && (
        <header className="relative">
          <div className="w-full h-screen relative flex flex-col justify-center items-center">
            {/* Imagen fondo */}
            <img
              className="w-full h-full object-cover"
              src={Images.bg_home}
              alt="fondo gimnasio"
            />
            {/* Logo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div>
                <img
                  className="w-64 md:w-48 sm:w-36"
                  src={Images.logo}
                  alt="logo training"
                />
              </div>
              {/* Botones */}
              <div className="mt-20">
                <Link to="/registerPage">
                  <BasicButtons
                    title="Entrenemos"
                    variant="contained"
                    icon={<i className="bx bx-chevron-right"/>}
                  />
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default HomePage;
