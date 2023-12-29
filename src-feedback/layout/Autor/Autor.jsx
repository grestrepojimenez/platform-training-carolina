import { Link } from "react-router-dom";

const FooterBar = () => {
  return (
    <div className="absolute z-50 w-full p-1">
      <Link to="https://github.com/caro1017">
        <p className="text-white font-light text-xs lg:text-sm text-center">
          Copyright © 2023 by Carolina Uribe Botero
        </p>
      </Link>
    </div>
  );
};

export default FooterBar;
