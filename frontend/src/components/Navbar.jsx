import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

const Navbar = () => {

  const { logout } =
    useContext(AuthContext);

  return (

    <div className="
      bg-white
      shadow-md
      px-8
      py-4
      flex
      justify-between
      items-center
    ">

      <h1 className="
        text-2xl
        font-bold
        text-blue-600
      ">
        Compensation System
      </h1>

      <button
        onClick={logout}
        className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;