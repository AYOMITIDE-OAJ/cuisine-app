const LoadMoreButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
