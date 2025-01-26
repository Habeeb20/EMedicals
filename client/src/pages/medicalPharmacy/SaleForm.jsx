import React, { useState } from 'react';
import { recordSale } from '../../helper/sales';


const SaleForm = ({ product, onSaleRecorded }) => {
    const [form, setForm] = useState({ buyerName: '', quantity: 0 });
    const [totalPrice, setTotalPrice] = useState(0);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'quantity') {
            setTotalPrice(e.target.value * product.sellingPrice);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const saleData = {
                buyerName: form.buyerName,
                productId: product?._id,
                quantity: form.quantity,
                totalPrice,
            };
            const { data } = await recordSale(saleData);
            onSaleRecorded(data);
            alert('Sale recorded successfully!');
        } catch (error) {
            console.error(error);
            alert('Error recording sale');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sell Product: {product?.name}</h3>
            <input
                name="buyerName"
                placeholder="Buyer Name"
                onChange={handleChange}
                required
            />
            <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                min="1"
                max={product?.quantity}
                onChange={handleChange}
                required
            />
            <p>Total Price: {totalPrice.toFixed(2)}</p>
            <button type="submit">Record Sale</button>
        </form>
    );
};

export default SaleForm;
