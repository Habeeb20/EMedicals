
import React from 'react';
import { Link } from 'react-router-dom';

const DrugCard = ({ drug }) => (
  <div className="drug-card">
    <img src={drug.imageUrl} alt={drug.name} />
    <h3>{drug.name}</h3>
    <p>{drug.description}</p>
    <p>Price: ${drug.price}</p>
    <Link to={`/product/${drug._id}`} className="btn">View Details</Link>
  </div>
);

export default DrugCard;
