import React, { useState, useEffect } from "react";

const AllHospital = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardDetails, setCardDetails] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4); // Initially show 4 cards

  useEffect(() => {
    const fetchWellness = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_HO}`);
        const data = await response.json();
        setCardDetails(data);
      } catch (error) {
        console.error("Error fetching wellness centers:", error);
      }
    };

    fetchWellness();
  }, []);

  const filteredCards = cardDetails.filter((card) => {
    return card.fullname?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSeeMore = () => {
    setVisibleCards((prev) => prev + 4); // Show 4 more cards
  };

  const handleSeeLess = () => {
    setVisibleCards(4); // Reset to initial 4 cards
  };

  return (
    <div className="relative w-full overflow-hidden">
      <h1 className="text-center font-bold text-2xl my-4">
        Facilities Near You
      </h1>

      {/* Search Input */}
      <div className="flex justify-center w-full bg-white">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "400px" }}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-green-500"
        />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
          Search
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4">
        {filteredCards.slice(0, visibleCards).map((card, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={
                  card.picture1 ||
                  card.picture2 ||
                  card.picture3 ||
                  card.picture4 ||
                  card.picture5 ||
                  card.picture6 ||
                  card.picture7
                }
                alt={card.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {card.discountPer && (
                <div className="absolute top-2.5 left-2.5 bg-indigo-500 text-white text-sm px-2.5 py-1.5 rounded-md">
                  {card.discountPer}% off
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.fullname}</h3>

              {/* Truncated Description */}
              <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {card.details || card.features || card.services}
              </p>

              <a
                href={`/wellness/${card._id}`}
                className="inline-block mt-4 bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {visibleCards < filteredCards.length && (
          <button
            onClick={handleSeeMore}
            className="bg-indigo-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-indigo-600"
          >
            See More
          </button>
        )}
        {visibleCards > 4 && (
          <button
            onClick={handleSeeLess}
            className="bg-red-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-red-600"
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default AllHospital;
