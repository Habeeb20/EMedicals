import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import toast from 'react-hot-toast';
import { getSellerIdFromToken } from './getSellerIdFromToken';
import 'chart.js/auto'; 
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Dashboard = () => {

    const [userData, setUserData] = useState([])
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [failTransaction, setFailTransaction] = useState('')
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Inventory Growth',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Type A', 'Type B', 'Type C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_MP1}/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(data);
        setUserId(data._id);
        setUser(data);
        console.log(data)
        toast.success("you welcome");
      } catch (error) {
        console.log(error);
        toast.error("failed to fetch user data");
        setError("failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 useEffect(() => {
  const fetchFailedTransaction = async (e) => {
 
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_MP3}`, {buyerName, products}, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

    
      console.log(data)
    } catch (error) {
   

      if (typeof error === "string") {
        console.log("Error Length:", error.length);
      } else if (Array.isArray(error)) {
        console.log("Error Array Length:", error.length);
      } else if (typeof error === "object" && error !== null) {
        console.log("Error Object Property Count:", Object.keys(error).length);
        setFailTransaction( Object.keys(error).length)
      } else {
        console.log("Unknown error type");
      }
    }
  }
  fetchFailedTransaction()

 }, [])
  //side bar


  return (
    <div className="p-5">
      <h1 className="text-3xl text-blue-500 font-bold mb-6">Point of Sales for {userData.name} </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div
            className="bg-green-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
          Successful transaction
          </div>
          <div
            className="bg-red-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
            failed transaction
            <h4>{failTransaction}</h4>
         
          </div>
          <div
            className="bg-yellow-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
            Pending transaction
          </div>
          <div
            className="bg-blue-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
            Item in Stock
          </div>
    
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Inventory Growth</h2>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Inventory Type Distribution</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

const Analytics = () => <div className="p-5">Analytics Page</div>;
const Settings = () => <div className="p-5">Settings Page</div>;
const AddProduct = () =>{ 
    const [productData, setProductData] = useState({
        name: '',
        costPrice: '',
        sellingPrice: '',
        description: '',
        quantity: '',
        picture: null,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


  const handleFileChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const sellerId = localStorage.getItem('token');
    if(!sellerId){
        console.error('seller Id not found')
        return;
    }
    const formData = new FormData();
    formData.append('sellerId', sellerId);
    formData.append('name', productData.name);
    formData.append('costPrice', productData.costPrice);
    formData.append('sellingPrice', productData.sellingPrice);
    formData.append('description', productData.description);
    formData.append('quantity', productData.quantity);
    if (productData.picture) {
      formData.append('picture', productData.picture);
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_MP2}/`, formData, {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(response.data)
        toast.success("successfully added")
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  }

  return (
<form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
>
  <h1 className="text-2xl font-semibold mb-2 text-center">Add your goods</h1>
  <p className="text-sm text-gray-500 mb-6 text-center">
   Please enter the details.
  </p>

  <div className="mb-4">
    <input
      type="text"
      name="name"
      value={productData.name}
      onChange={handleChange}
      placeholder="Product Name"
      required
      className="w-full px-4 py-2 border  border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div className="mb-4">
    <input
      type="text"
      name="costPrice"
      value={productData.costPrice}
      onChange={handleChange}
      placeholder="Cost Price"
      required
      className="w-full px-4 py-2 border  text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div className="mb-4">
    <input
      type="text"
      name="sellingPrice"
      value={productData.sellingPrice}
      onChange={handleChange}
      placeholder="Selling Price"
      required
      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div className="mb-4">
    <textarea
      name="description"
      value={productData.description}
      onChange={handleChange}
      placeholder="Description"
      required
      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div className="mb-4">
    <input
      type="number"
      name="quantity"
      value={productData.quantity}
      onChange={handleChange}
      placeholder="Quantity"
      required
      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>

  <div className="mb-6">
    <input
      type="file"
      name="picture"
      onChange={handleFileChange}
      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
    />
  </div>

  <button
    type="submit"
    className="w-full py-2 px-4 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
  >
    Create Product
  </button>



</form>

  )
}






const SellProduct = () => {
  const [buyerName, setBuyerName] = useState("");
  const [products, setProducts] = useState([{ productId: "", quantity: 1 }]);
  const [sellProduct, setSellProduct] = useState(null);
  const [error, setError] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProductField = () => {
    setProducts([...products, { productId: "", quantity: 1 }]);
  };

  const removeProductField = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };



  //fetch seller's product 

  useEffect(() => {
    const fetchProducts = async() =>  {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_MP2}/myproducts`, {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
          setAvailableProducts(data.products)
          console.log(data.products)
      } catch (error) {
   
        console.log('error fetching Products:', error)
      }
    }
    fetchProducts()
  }, [])




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")
      const {data} = await axios.post(`${import.meta.env.VITE_API_MP3}`, {buyerName, products}, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setSellProduct(data)
      setError(null)
      setProducts([{ productId: "", quantity: 1 }]); // Reset product fields
      setBuyerName("");
      console.log(setSellProduct)
    } catch (error) {
      console.log(error)
      toast.error("failed to make a sale")
      setError(error.response?.data?.message || "the operation failed")
      setSellProduct(null)

    }
  }

  return(
    <>
    <h2 className='text-black text-center text-2xl'>Sell Products</h2>

    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white text-black shadow-md rounded-lg">

    <div style={{ marginBottom: "10px" }}>
          <label>Buyer Name: </label>
          <input
            type="text"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            required
           className="w-full px-4 py-2 border  border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
     
        {products.map((product, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <label>Product:</label>
            <select
              value={product.productId}
              onChange={(e) =>
                handleInputChange(index, "productId", e.target.value)
              }
              required
               className="w-full px-4 py-2 border  text-black border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Product</option>
              {Array.isArray(availableProducts) &&
                availableProducts.map((availableProduct) => (
                <option key={availableProduct._id} value={availableProduct._id}>
                  {availableProduct.name} (Stock: {availableProduct.quantity})
                </option>
              ))}
            </select>
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) =>
                handleInputChange(index, "quantity", e.target.value)
              }
              required
              style={{ padding: "5px", marginLeft: "10px", marginRight: "10px" }}
            />
            {products.length > 1 && (
              <button
                type="button"
                onClick={() => removeProductField(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius:"15px",
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addProductField}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            marginBottom: "10px",
            borderRadius:"15px"
          }}
        >
          Add Product
        </button>

        <div>
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
              borderRadius:"15px"
            }}
          >
            Submit Sale
          </button>
        </div>
      </form>

      {sellProduct && (
        <div style={{ padding: "10px", border: "1px solid green", color: "green" }}>
          <h3>Sale Successful</h3>
          <p>Total Amount: {sellProduct.totalAmount}</p>
          <p>Buyer: {sellProduct.buyerName}</p>
          <ul>
            {response.items.map((item, index) => (
              <li key={index}>
                Product: {item.product}, Quantity: {item.quantity}, Total: {item.total}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div style={{ padding: "10px", border: "1px solid red", color: "red" }}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}


    

    </>
  
)};
const ViewProduct = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMyProduct = async() => {
      const token = localStorage.getItem('token')
        try {
          
      const response = await axios.get(`${import.meta.env.VITE_API_MP2}/myproducts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("successfully fetched")
      setProduct(response.data.products)
     
      console.log(response.data)
        } catch (error) {
          console.log(error)
          setError(error.response?.data?.message)
          toast.error("error occurred")
        }
    }
    fetchMyProduct()
  }, [])
  return (
    <>
      <table className='text-black'>
      {error && <p className='text-red-400'>{error}</p>}
        <thead>
          <tr>
            <th className="border px-4 py-2">Name of product</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Cost Price</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Selling Price</th>

          </tr>
        </thead>
        <tbody>
          {Array.isArray(product) &&
            product.map((products, index) => (
            <tr key={index} >
              <td className='border px-4 py'>{products.name} </td>
              <td className='border px-4 py'>{products.quantity} </td>
              <td className='border px-4 py'>{products.costPrice} </td>
              <td className='border px-4 py'>{products.description} </td>
              <td className='border px-4 py'>{products.sellingPrice} </td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  )
};


const SoldProducts = () => <div className='p-5'> sold Products

</div>
const SidebarLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const  toggleSidebar = ()  => {
    setSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
    <Navbar />
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-800 text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <aside
        className={`fixed top-0 left-0 h-full bg-purple-800 text-white w-64 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:relative md:w-1/6`}
      >


        <h2 className="text-2xl font-bold mb-6 pl-9">Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'dashboard' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'analytics' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('analytics')}
            >
              Analytics
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'addProduct' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('addProduct')}
            >
              Add products
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'sellProduct' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('sellProduct')}
            >
              sell products
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'viewProduct' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('viewProduct')}
            >
              View all products
            </button>
          </li>

          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'soldProducts' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('soldProducts')}
            >
               products Sold
            </button>
          </li>
          <li>
            <button
              className={`block w-full text-left p-3 rounded ${activePage === 'settings' ? 'bg-purple-300' : 'hover:bg-purple-400'}`}
              onClick={() => setActivePage('settings')}
            >
              Settings
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="bg-gray-100 flex-1 p-5">
        <Routes>
          <Route path="*" element={activePage === 'dashboard' ? <Dashboard /> 
          : activePage === 'analytics' ? <Analytics /> 
          : activePage === 'addProduct' ? <AddProduct /> 
          : activePage === 'sellProduct' ? <SellProduct /> 
          : activePage === 'viewProduct' ? <ViewProduct /> 
          : activePage === 'soldProducts' ? <SoldProducts /> 
          : <Settings />} />
        </Routes>
      </main>
    </div>

    </>
 
  );
};

export default SidebarLayout;
