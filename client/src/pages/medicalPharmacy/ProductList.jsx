import React, { useState } from 'react';
import SaleForm from './SaleForm';

const ProductList = ({ products, setProducts }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSaleRecorded = (updatedProduct) => {
        setProducts((prev) =>
            prev.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );
        setSelectedProduct(null);
    };

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 transition-transform hover:scale-105"
                    >
                        <h4 className="text-lg font-bold text-gray-800">
                            {product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Selling Price:</span> ${product.sellingPrice}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Quantity:</span> {product.quantity}
                        </p>
                        <button
                            onClick={() => setSelectedProduct(product)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
                        >
                            Sell
                        </button>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-lg">
                        <SaleForm
                            product={selectedProduct}
                            onSaleRecorded={handleSaleRecorded}
                        />
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
