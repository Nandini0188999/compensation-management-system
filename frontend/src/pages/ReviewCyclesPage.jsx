import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const ReviewCyclesPage = () => {

  const [cycles, setCycles] =
    useState([]);

  useEffect(() => {

    fetchCycles();

  }, []);

  const fetchCycles =
    async () => {

    try {

      const response =
        await api.get(
          "compensation/cycles/"
        );

      setCycles(
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
        Review Cycles
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
                Title
              </th>

              <th className="
                text-left
              ">
                Budget
              </th>

              <th className="
                text-left
              ">
                Status
              </th>

              <th className="
                text-left
              ">
                Effective Date
              </th>

            </tr>

          </thead>

          <tbody>

            {cycles.map(
              (cycle) => (

              <tr
                key={cycle.id}
                className="
                  border-b
                "
              >

                <td className="
                  py-4
                ">
                  {cycle.title}
                </td>

                <td>
                  ₹
                  {cycle.total_budget}
                </td>

                <td>
                  {cycle.status}
                </td>

                <td>
                  {
                    cycle.effective_date
                  }
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ReviewCyclesPage;