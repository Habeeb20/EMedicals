import React, { useState } from 'react';
import { addProduct } from '../../helper/product';

const ProductForm = ({ setProducts }) => {
    const [form, setForm] = useState({
        name: '',
        costPrice: '',
        sellingPrice: '',
        quantity: '',
        description: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addProduct(form);
            setProducts((prev) => [...prev, data]);
            setForm({ name: '', costPrice: '', sellingPrice: '', quantity: '', description: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">Add a New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Cost Price</label>
                    <input
                        type="number"
                        name="costPrice"
                        value={form.costPrice}
                        onChange={handleChange}
                        placeholder="Cost Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Selling Price</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={form.sellingPrice}
                        onChange={handleChange}
                        placeholder="Selling Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Product Description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
