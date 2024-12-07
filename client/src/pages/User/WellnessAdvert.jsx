import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const WellnessAdvert = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    const fetchWellness = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_W}`);
        const data = await response.json();
        setCardDetails(data);
      } catch (error) {
        console.error("Error fetching wellness centers:", error);
      }
    };

    fetchWellness();
  }, []);

  const filteredCards = cardDetails.filter((card) => {
    const matchesSearchTerm = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-4">
        Wellness Centers Around You
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

      {/* Carousel Grid */}
      <section className="mt-8 px-4 max-w-7xl mx-auto">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {filteredCards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="border rounded-lg shadow-md overflow-hidden bg-white">
                {/* Image with Border Radius */}
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
                              <div class="absolute bg-indigo-500 text-white text-sm px-2.5 py-1.5 rounded-md top-2.5 left-2.5">
   {card.discountPer} % off
</div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
                  

                  {/* Truncated Description */}
                  <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                    {card.details || card.features || card.services}
                  </p>

                  <Link to={`/wellness/${card._id}`}>
                    <button className="mt-4 bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default WellnessAdvert;
