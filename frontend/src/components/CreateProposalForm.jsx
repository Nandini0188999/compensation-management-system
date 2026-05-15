import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

const CreateProposalForm = ({
  refreshData
}) => {

  const [employees, setEmployees] =
    useState([]);

  const [cycles, setCycles] =
    useState([]);

  const [employee, setEmployee] =
    useState("");

  const [reviewCycle, setReviewCycle] =
    useState("");

  const [
    proposedSalary,
    setProposedSalary
  ] = useState("");

  const [
    justification,
    setJustification
  ] = useState("");

  const [
    changeType,
    setChangeType
  ] = useState(
    "SALARY_INCREASE"
  );

  useEffect(() => {

    fetchInitialData();

  }, []);

  const fetchInitialData =
    async () => {

    try {

      const employeesResponse =
        await api.get(
          "employees/"
        );

      const cyclesResponse =
        await api.get(
          "compensation/cycles/"
        );

      setEmployees(
        employeesResponse.data
      );

      setCycles(
        cyclesResponse.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "compensation/proposals/",
        {
          employee,

          review_cycle:
            reviewCycle,

          change_type:
            changeType,

          proposed_new_salary:
            proposedSalary,

          justification
        }
      );

      setEmployee("");

      setReviewCycle("");

      setProposedSalary("");

      setJustification("");

      refreshData();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      mt-10
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        Create Proposal
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >

        <select
          value={employee}
          onChange={(e) =>
            setEmployee(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-lg
          "
        >

          <option value="">
            Select Employee
          </option>

          {employees.map(
            (employee) => (

            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.email}
            </option>
          ))}

        </select>

        <select
          value={reviewCycle}
          onChange={(e) =>
            setReviewCycle(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-lg
          "
        >

          <option value="">
            Select Cycle
          </option>

          {cycles.map(
            (cycle) => (

            <option
              key={cycle.id}
              value={cycle.id}
            >
              {cycle.title}
            </option>
          ))}

        </select>

        <select
          value={changeType}
          onChange={(e) =>
            setChangeType(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-lg
          "
        >

          <option value="
            SALARY_INCREASE
          ">
            Salary Increase
          </option>

          <option value="
            PROMOTION
          ">
            Promotion
          </option>

          <option value="
            MARKET_ADJUSTMENT
          ">
            Market Adjustment
          </option>

        </select>

        <input
          type="number"
          placeholder="
            Proposed Salary
          "
          value={proposedSalary}
          onChange={(e) =>
            setProposedSalary(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-lg
          "
        />

        <textarea
          placeholder="
            Justification
          "
          value={justification}
          onChange={(e) =>
            setJustification(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-lg
            md:col-span-2
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            py-3
            rounded-lg
            md:col-span-2
          "
        >
          Create Proposal
        </button>

      </form>

    </div>
  );
};

export default CreateProposalForm;