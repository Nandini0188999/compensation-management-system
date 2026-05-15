import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api from "../api/axios";

const Sidebar = () => {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser =
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

  return (

    <div className="
      w-64
      bg-white
      shadow-lg
      min-h-screen
      p-6
    ">

      <h1 className="
        text-2xl
        font-bold
        text-blue-600
        mb-10
      ">
        CMS
      </h1>

      <nav className="
        flex
        flex-col
        gap-4
      ">

        {user?.role ===
          "ADMIN" && (

          <>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/cycles">
              Review Cycles
            </Link>

            <Link to="/proposals">
              Proposals
            </Link>

            <Link to="/employees">
              Employees
            </Link>

            <Link to="/analytics">
              Analytics
            </Link>

          </>
        )}

        {user?.role ===
          "EMPLOYEE" && (

          <>

            <Link
  to="/employee-dashboard"
>
  My Salary
</Link>

<Link
  to="/salary-history"
>
  Salary History
</Link>

          </>
        )}

      </nav>

    </div>
  );
};

export default Sidebar;