const SetMenuCard = ({ menu, guestNumber }) => {
  const pricePerPerson = parseFloat(menu?.price_per_person || "0");
  const totalPrice = pricePerPerson * guestNumber;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={menu?.image}
        alt={menu?.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <span className="text-sm bg-gray-600 rounded text-white px-2 py-1">
          {menu?.cuisines[0].name}
        </span>
        <h3 className="text-lg font-semibold mt-2">{menu?.name}</h3>
        <p className="text-gray-600">{menu?.description}</p>
        <p className="text-lg font-bold mt-4">£{totalPrice}</p>
      </div>
    </div>
  );
};

export default SetMenuCard;
