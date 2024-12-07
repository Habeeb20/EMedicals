import React, { useState, useEffect } from "react";
import p1 from "../../assets/EMedicals/p1.jpg";
import p2 from "../../assets/EMedicals/p2.jpg";
import p3 from "../../assets/EMedicals/p3.jpg";
import p4 from "../../assets/EMedicals/p4.jpg";

const ImageCarousel = () => {
  const images = [p1, p2, p3, p4]; // Ensure these paths are correct

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative overflow-hidden w-full h-80 bg-gray-200">
      {/* Image Container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Add an img for debugging */}
            <img
              src={image}
              alt={`Slide ${index}`}
              className="hidden" // Hide it, but use it to test if the image loads
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
