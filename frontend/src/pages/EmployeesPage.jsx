import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const EmployeesPage = () => {

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees =
    async () => {

    try {

      const response =
        await api.get(
          "employees/"
        );

      setEmployees(
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
        Employees
      </h1>

      <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
      ">

        <table className="
          w-full
        ">

          <thead>

            <tr className="
              border-b
            ">

              <th className="
                text-left
                py-3
              ">
                Email
              </th>

              <th className="
                text-left
              ">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.map(
              (employee) => (

              <tr
                key={employee.id}
                className="
                  border-b
                "
              >

                <td className="
                  py-4
                ">
                  {employee.email}
                </td>

                <td>
                  {employee.role}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default EmployeesPage;