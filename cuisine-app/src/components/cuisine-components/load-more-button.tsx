const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 px-5 mx-auto block py-2 rounded-lg ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-black text-white cursor-pointer"
      }`}
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
