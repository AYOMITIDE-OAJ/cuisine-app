const LoadMoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-5 mx-auto block py-2 bg-black text-white rounded-lg cursor-pointer"
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
