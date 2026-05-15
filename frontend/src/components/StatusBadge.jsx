const StatusBadge = ({
  status
}) => {

  let color = "";

  if (status === "APPROVED") {
    color =
      "bg-green-100 text-green-700";
  }

  else if (
    status === "REJECTED"
  ) {
    color =
      "bg-red-100 text-red-700";
  }

  else {
    color =
      "bg-yellow-100 text-yellow-700";
  }

  return (

    <span className={`
      px-3
      py-1
      rounded-full
      text-sm
      font-semibold
      ${color}
    `}>

      {status}

    </span>
  );
};

export default StatusBadge;