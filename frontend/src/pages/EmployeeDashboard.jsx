import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const EmployeeDashboard = () => {

  const [salary, setSalary] =
    useState(null);

  useEffect(() => {

    fetchSalary();

  }, []);

  const fetchSalary =
    async () => {

    try {

      const response =
        await api.get(
          "employees/me/"
        );

      setSalary(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div>

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Employee Dashboard
      </h1>

      {salary && (

        <div className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          max-w-xl
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">
            My Salary
          </h2>

          <p className="
            text-lg
            mb-2
          ">
            Current Salary:
            ₹
            {salary.current_salary}
          </p>

          <p className="
            text-lg
          ">
            Effective Date:
            {salary.effective_date}
          </p>

        </div>
      )}

    </div>
  );
};

export default EmployeeDashboard;