import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Images } from "../../images/Images/Images";
import TabsBar from "../../components/TabsBar/TabsBar";
import { TabsProvider } from "../../hooks/useTabsContext";

const RegisterPage = () => {
  return (
    <>
      <header>
        <div className="m-5">
          <Link to="/">
            <IconButton color="error">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>
        <div className="inset-0 items-center justify-center">
          <img
            className="sm:w-28 md:w-40 lg:w-32 xl:w-48 sm:mx-auto"
            src={Images.logo}
            alt="logo training"
          />
        </div>
      </header>
      <main>
        <div className="inset-0 flex items-center justify-center mt-3">
          <TabsProvider>
            <TabsBar />
          </TabsProvider>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
