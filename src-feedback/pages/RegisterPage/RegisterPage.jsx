import { Images } from "../../images/Images/Images";
import TabsBar from "../../components/TabsBar/TabsBar";
import { TabsProvider } from "../../hooks/useTabsContext";

const RegisterPage = () => {
  return (
    <>
      <header className="mt-14">
        <div className="inset-0 items-center justify-center mb-10">
          <img
            className="sm:w-36 md:w-48 xl:w-52 sm:mx-auto"
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
