import { dotStream } from "ldrs";
import { Images } from "../../images/Images/Images";

const Loader = () => {
  dotStream.register();
  return (
    <div>
      <div className="w-full h-screen relative bg-black">
        {/* Logo */}
        <div className="absolute inset-0 items-center justify-center mt-48">
          <img
            className="sm:w-36 md:w-48 xl:w-64 sm:mx-auto"
            src={Images.logo}
            alt="logo training"
          />
          <div className="flex justify-center mt-16">
            <l-dot-stream size="60" speed="2.5" color="#FD3C3D"></l-dot-stream>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
