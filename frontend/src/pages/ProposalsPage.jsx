import {
  useEffect,
  useMemo,
  useState
} from "react";

import api from "../api/axios";

import ProposalTable
from "../components/ProposalTable";

const ProposalsPage = () => {

  const [proposals, setProposals] =
    useState([]);

  const [statusFilter,
    setStatusFilter] =
    useState("ALL");

  const [sortOrder,
    setSortOrder] =
    useState("DESC");

  const [currentPage,
    setCurrentPage] =
    useState(1);

  const proposalsPerPage = 5;

  useEffect(() => {

    fetchProposals();

  }, []);

  const fetchProposals =
    async () => {

    try {

      const response =
        await api.get(
          "compensation/proposals/"
        );

      setProposals(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const filteredProposals =
    useMemo(() => {

      let filtered = [
        ...proposals
      ];

      if (
        statusFilter !== "ALL"
      ) {

        filtered =
          filtered.filter(
            (proposal) =>
              proposal.status
              === statusFilter
          );
      }

      filtered.sort(
        (a, b) => {

          if (
            sortOrder === "ASC"
          ) {

            return (
              parseFloat(
                a.proposed_new_salary
              ) -

              parseFloat(
                b.proposed_new_salary
              )
            );
          }

          return (
            parseFloat(
              b.proposed_new_salary
            ) -

            parseFloat(
              a.proposed_new_salary
            )
          );
        }
      );

      return filtered;

    }, [
      proposals,
      statusFilter,
      sortOrder
    ]);

  const totalPages =
    Math.ceil(
      filteredProposals.length /
      proposalsPerPage
    );

  const paginatedProposals =
    filteredProposals.slice(

      (
        currentPage - 1
      ) * proposalsPerPage,

      currentPage *
      proposalsPerPage
    );

  return (

    <div>

      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">

        <h1 className="
          text-4xl
          font-bold
        ">
          Proposals
        </h1>

        <div className="
          flex
          gap-4
        ">

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
          >

            <option value="ALL">
              All Status
            </option>

            <option value="
              PROPOSED
            ">
              Proposed
            </option>

            <option value="
              APPROVED
            ">
              Approved
            </option>

            <option value="
              REJECTED
            ">
              Rejected
            </option>

          </select>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
            className="
              border
              p-2
              rounded-lg
            "
          >

            <option value="DESC">
              Salary High-Low
            </option>

            <option value="ASC">
              Salary Low-High
            </option>

          </select>

        </div>

      </div>

      <ProposalTable

        proposals={
          paginatedProposals
        }

        refreshData={
          fetchProposals
        }

      />

      <div className="
        flex
        justify-center
        gap-4
        mt-8
      ">

        <button
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
          className="
            bg-gray-200
            px-4
            py-2
            rounded-lg
          "
        >
          Previous
        </button>

        <p className="
          text-lg
          font-semibold
        ">
          Page {currentPage}
          {" "}of{" "}
          {totalPages}
        </p>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
          className="
            bg-gray-200
            px-4
            py-2
            rounded-lg
          "
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default ProposalsPage;