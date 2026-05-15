import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const SalaryHistoryPage = () => {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
    async () => {

    try {

      const response =
        await api.get(
          "compensation/history/me/"
        );

      setHistory(
        response.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <p className="
        text-lg
      ">
        Loading...
      </p>
    );
  }

  return (

    <div>

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Salary History
      </h1>

      <div className="
        bg-white
        rounded-xl
        shadow-md
        p-6
      ">

        {history.length === 0 ? (

          <p className="
            text-gray-500
          ">
            No salary history available.
          </p>

        ) : (

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
                  Change Type
                </th>

                <th className="
                  text-left
                ">
                  Previous Salary
                </th>

                <th className="
                  text-left
                ">
                  New Salary
                </th>

                <th className="
                  text-left
                ">
                  Effective Date
                </th>

                <th className="
                  text-left
                ">
                  Applied At
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map(
                (item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                  "
                >

                  <td className="
                    py-4
                  ">
                    {item.change_type}
                  </td>

                  <td>
                    ₹
                    {item.previous_salary}
                  </td>

                  <td>
                    ₹
                    {item.new_salary}
                  </td>

                  <td>
                    {item.effective_date}
                  </td>

                  <td>
                    {item.applied_at}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default SalaryHistoryPage;