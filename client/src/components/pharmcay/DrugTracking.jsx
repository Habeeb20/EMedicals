import { useEffect, useState } from 'react';

const OrderTracking = ({ orderId }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await fetch(`/api/orders/${orderId}`);
            const data = await res.json();
            setStatus(data.status);
        };
        fetchOrder();
    }, [orderId]);

    return <div>Order Status: {status}</div>;
};
export default OrderTracking;
