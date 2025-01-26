import React, { useEffect, useState } from 'react';
import { fetchSales } from '../../helper/sales';

const Sales = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await fetchSales();
                setSales(data);
            } catch (error) {
                console.error(error);
                alert('Error fetching sales');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Sales</h2>
            {sales.map((sale) => (
                <div key={sale._id}>
                    <h4>Buyer: {sale.buyerName}</h4>
                    <p>Product: {sale.productName}</p>
                    <p>Quantity: {sale.quantity}</p>
                    <p>Total Price: {sale.totalPrice}</p>
                </div>
            ))}
        </div>
    );
};

export default Sales;
