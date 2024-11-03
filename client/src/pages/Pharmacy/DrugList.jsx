
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Adjust to your backend URL

const DrugList = () => {
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        socket.on('inventoryUpdate', (updatedDrug) => {
            setDrugs((prevDrugs) =>
                prevDrugs.map(drug =>
                    drug._id === updatedDrug._id ? updatedDrug : drug
                )
            );
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>{/* Render your drug list here */}</div>
    );
};
export default DrugList;
