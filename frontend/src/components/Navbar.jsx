import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";

import {
  AuthContext
} from "../context/AuthContext";

const Navbar = () => {

  const navigate =
    useNavigate();

  const { logout } =
    useContext(AuthContext);

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchCurrentUser();

  }, []);

  const fetchCurrentUser =
    async () => {

    try {

      const response =
        await api.get(
          "auth/me/"
        );

      setUser(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const handleLogout = () => {

    logout();

    navigate("/");
  };

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

      <div>

        <h1 className="
          text-2xl
          font-bold
          text-blue-600
        ">
          Compensation System
        </h1>

        {user && (

          <p className="
            text-sm
            text-gray-500
            mt-1
          ">

            Logged in as:

            <span className="
              font-semibold
              ml-1
            ">
              {user.email}
            </span>

            (
            {user.role}
            )

          </p>
        )}

      </div>

      <button
        onClick={handleLogout}
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