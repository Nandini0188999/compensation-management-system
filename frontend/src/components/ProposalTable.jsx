import {
  useState
} from "react";

import api from "../api/axios";

import StatusBadge
from "./StatusBadge";

import EditProposalModal
from "./EditProposalModal";

const ProposalTable = ({
  proposals,
  refreshData
}) => {

  const [
    selectedProposal,
    setSelectedProposal
  ] = useState(null);

  const approveProposal =
    async (id) => {

    try {

      await api.post(
        `compensation/proposals/${id}/approve/`,
        {
          decision_note:
            "Approved from dashboard"
        }
      );

      refreshData();

    } catch (error) {

      console.log(error);

      alert(
        "Approval failed"
      );
    }
  };

  const rejectProposal =
    async (id) => {

    try {

      await api.post(
        `compensation/proposals/${id}/reject/`,
        {
          decision_note:
            "Rejected from dashboard"
        }
      );

      refreshData();

    } catch (error) {

      console.log(error);

      alert(
        "Rejection failed"
      );
    }
  };

  const deleteProposal =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this proposal?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(
        `compensation/proposals/${id}/`
      );

      refreshData();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to delete proposal"
      );
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
        Salary Proposals
      </h2>

      <div className="
        overflow-x-auto
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
                Employee
              </th>

              <th className="
                text-left
              ">
                New Salary
              </th>

              <th className="
                text-left
              ">
                Cost
              </th>

              <th className="
                text-left
              ">
                Status
              </th>

              <th className="
                text-left
              ">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {proposals.map(
              (proposal) => (

              <tr
                key={proposal.id}
                className="
                  border-b
                "
              >

                <td className="
                  py-4
                ">
                  {
                    proposal.employee_email
                  }
                </td>

                <td>
                  ₹
                  {
                    proposal.proposed_new_salary
                  }
                </td>

                <td>
                  ₹
                  {
                    proposal.cost_of_change
                  }
                </td>

                <td>

                  <StatusBadge
                    status={
                      proposal.status
                    }
                  />

                </td>

                <td className="
                  space-x-2
                ">

                  {proposal.status ===
                    "PROPOSED" && (

                    <>

                      <button
                        onClick={() =>
                          approveProposal(
                            proposal.id
                          )
                        }
                        className="
                          bg-green-500
                          text-white
                          px-3
                          py-1
                          rounded-lg
                        "
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectProposal(
                            proposal.id
                          )
                        }
                        className="
                          bg-red-500
                          text-white
                          px-3
                          py-1
                          rounded-lg
                        "
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          setSelectedProposal(
                            proposal
                          )
                        }
                        className="
                          bg-yellow-500
                          text-white
                          px-3
                          py-1
                          rounded-lg
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProposal(
                            proposal.id
                          )
                        }
                        className="
                          bg-gray-700
                          text-white
                          px-3
                          py-1
                          rounded-lg
                        "
                      >
                        Delete
                      </button>

                    </>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {selectedProposal && (

        <EditProposalModal

          proposal={selectedProposal}

          closeModal={() =>
            setSelectedProposal(
              null
            )
          }

          refreshData={refreshData}

        />
      )}

    </div>
  );
};

export default ProposalTable;