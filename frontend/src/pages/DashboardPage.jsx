import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";



import StatCard
from "../components/StatCard";

import ProposalTable
from "../components/ProposalTable";

import CreateProposalForm
from "../components/CreateProposalForm";

const DashboardPage = () => {

  const [cycles, setCycles] =
    useState([]);

  const [proposals, setProposals] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const cyclesResponse =
        await api.get(
          "compensation/cycles/"
        );

      const proposalsResponse =
        await api.get(
          "compensation/proposals/"
        );

      setCycles(
        cyclesResponse.data
      );

      setProposals(
        proposalsResponse.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const totalBudget =
    cycles.reduce(
      (sum, cycle) =>
        sum +
        parseFloat(
          cycle.total_budget
        ),
      0
    );

  const approvedTotal =
    proposals
      .filter(
        (proposal) =>
          proposal.status ===
          "APPROVED"
      )
      .reduce(
        (sum, proposal) =>
          sum +
          parseFloat(
            proposal.cost_of_change
          ),
        0
      );

  const pendingCount =
    proposals.filter(
      (proposal) =>
        proposal.status ===
        "PROPOSED"
    ).length;

  return (

    <div className="
      min-h-screen
      bg-gray-100
    ">


      <div className="
        p-8
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          Admin Dashboard
        </h1>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-10
        ">

          <StatCard
            title="Total Budget"
            value={`₹${totalBudget}`}
          />

          <StatCard
            title="Approved Raises"
            value={`₹${approvedTotal}`}
          />

          <StatCard
            title="Pending Proposals"
            value={pendingCount}
          />

        </div>

        <div className="
          bg-white
          rounded-xl
          shadow-md
          p-6
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">
            Review Cycles
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

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
        <CreateProposalForm
        refreshData={fetchData}
        />
        <ProposalTable
        proposals={proposals}
        refreshData={fetchData}
        />
      </div>

    </div>
  );
};

export default DashboardPage;