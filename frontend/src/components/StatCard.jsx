const StatCard = ({
  title,
  value
}) => {

  return (

    <div className="
      bg-white
      p-6
      rounded-xl
      shadow-md
    ">

      <h2 className="
        text-gray-500
        mb-2
      ">
        {title}
      </h2>

      <p className="
        text-3xl
        font-bold
      ">
        {value}
      </p>

    </div>
  );
};

export default StatCard;