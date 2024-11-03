
import React, { useEffect, useState } from 'react';
import { fetchDrugs } from '../../components/pharmcay/ApiService';
import DrugCard from '../../components/pharmcay/DrugCard';


const HomePage = () => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const loadDrugs = async () => {
      const response = await fetchDrugs();
      setDrugs(response.data);
    };
    loadDrugs();
  }, []);

  return (
    <div className="home-page">
      <h1>Available Drugs</h1>
      <div className="drug-list">
        {drugs.map(drug => (
          <DrugCard key={drug._id} drug={drug} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
