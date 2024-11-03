
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrugDetails, addToCart } from '../../components/pharmcay/ApiService';
import { useNavigate } from 'react-router-dom';

const ProductDetailsPage = () => {
  const navigate= useNavigate()
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadDrug = async () => {
      const response = await fetchDrugDetails(id);
      setDrug(response.data);
    };
    loadDrug();
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(id, quantity);
    alert('Added to cart!');
  };

  return (
    drug ? (
      <div className="product-details">
        <h2>{drug.name}</h2>
        <img src={drug.imageUrl} alt={drug.name} />
        <p>{drug.description}</p>
        <p>Price: ${drug.price}</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    ) : <p>Loading...</p>
  );
};

export default ProductDetailsPage;
