import {
  useState
} from "react";

import api from "../api/axios";

const EditProposalModal = ({
  proposal,
  closeModal,
  refreshData
}) => {

  const [
    proposedSalary,
    setProposedSalary
  ] = useState(
    proposal.proposed_new_salary
  );

  const [
    justification,
    setJustification
  ] = useState(
    proposal.justification
  );

  const [
    changeType,
    setChangeType
  ] = useState(
    proposal.change_type
  );

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      await api.put(

        `compensation/proposals/${proposal.id}/`,

        {
          change_type:
            changeType,

          proposed_new_salary:
            proposedSalary,

          justification
        }
      );

      refreshData();

      closeModal();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update proposal"
      );
    }
  };

  return (

    <div className="
      fixed
      inset-0
      bg-black
      bg-opacity-40
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-white
        p-8
        rounded-xl
        shadow-xl
        w-[500px]
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-6
        ">
          Edit Proposal
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-col
            gap-4
          "
        >

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
            "
          />

          <div className="
            flex
            justify-end
            gap-4
          ">

            <button
              type="button"
              onClick={closeModal}
              className="
                px-4
                py-2
                border
                rounded-lg
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
              "
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProposalModal;