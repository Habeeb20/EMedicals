import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import toast from 'react-hot-toast';
import { getSellerIdFromToken } from './getSellerIdFromToken';
import 'chart.js/auto'; 
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Chart, registerables } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
Chart.register(...registerables);


const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
    const [userData, setUserData] = useState([])
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState([])
    const [name, setName] = useState([])
    const [quantity, setQuantity] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [uniqueProductCount, setUniqueProductCount] = useState(0)
    const [failTransaction, setFailTransaction] = useState('')
    const [totalQuantity, setTotalQuantity] = useState([])
    const [sales, setSales] = useState([])

    //mydata
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
  //fetch My Product

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
     
      //get the unique product count
     const productNames = response.data.products.map((prod) => prod.name)
     const uniqueNames = new Set(productNames);
     setUniqueProductCount(uniqueNames.size)
     setProduct(response.data.products)
      console.log(response.data.products)

      //get total quantity
      const totalQuantity = response.data.products.reduce(
        (sum, prod) => sum + Number(prod.quantity || 0), 0
      )
      setTotalQuantity(totalQuantity)
     const backgroundColors = [
      "#4F46E5", // Purple
      "#F59E0B", // Amber
      "#10B981", // Green
      "#EF4444", // Red
      "#3B82F6", // Blue
      "#8B5CF6", // Violet
    ];
    setChartData({
      labels: name,
      datasets:[
        {
          label: "quantity of product",
          data:quantity,
          backgroundColor: name?.map(
              (_, idx) => backgroundColors[idx % backgroundColors.length] // Cycle through colors
            ),
            borderWidth: 1,
        }
      ]
    })

     } catch (error) {
          console.log(error)
          setError(error.response?.data?.message)
          toast.error("error occurred")
        }
    }
    fetchMyProduct()
  }, [])

  const calculateCounts = (field) => {
    const counts = {}
    product.forEach((prod) => {
        counts[prod[field]] = (counts[prod[field]] || 0) + 1
    })
    return counts
  }

const nameCount = calculateCounts("name")
const quantityCount = calculateCounts("quantity")

const pieData = (counts, title) => ({
  labels: Object.keys(counts),
  datasets: [
    {
      label: title,
      data: Object.values(counts),
      backgroundColor: [
        "#FF6384", // Red
        "#36A2EB", // Blue
        "#FFCE56", // Yellow
        "#4CAF50", // Green
        "#FF9F40", // Orange
        "#9966FF", // Purple
      ],
      borderWidth: 1,
    },
  ],
  
 
}
);


useEffect(() => {
  const fetchMyData = async () => {


    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_API_MP3}/getmedicalsales`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSales(response.data)
      console.log(response.data)
      toast.success("your sold goods is here")

      setChartData(
        
      )
    } catch (error) {
      console.log(error)
      toast.error("an error occurred here ")
      setError(error.response?.data?.message)
    }

  }
  fetchMyData()
}, [])

  return (
    <div className="p-5">
      <h1 className="text-3xl text-blue-500 font-bold mb-6">Point of Sales for {userData.name} </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div
            className="bg-green-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
        Number of Stocks
        <h4>{product.length}</h4>
          </div>
          <div
            className="bg-red-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
            sales made
            <h4>{sales.length}</h4>
         
          </div>
          <div
            className="bg-yellow-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
            Unique products
           <h4> {uniqueProductCount}</h4>
          </div>
          <div
            className="bg-blue-300 p-5 rounded shadow text-center text-xl font-bold text-gray-700"
          >
            quantity of Goods in stock
            <h4>{totalQuantity}</h4>
          </div>
    
      </div>

      {/* Charts */}
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" shadow-lg rounded-lg p-4">
              <h2 className="text-lg text-black font-semibold text-center mb-4">
                Name of products
              </h2>
              {Object.keys(nameCount || {}).length > 0 ? (
  <Pie data={pieData(nameCount, "name of product")} />
) : (
  <p className="text-center text-gray-500">No data available</p>
)}
            </div>

            <div className=" shadow-lg   rounded-lg p-4">
              <h2 className="text-lg text-black font-semibold text-center mb-4">
                Quantity of products 
              </h2>
              <Pie data={pieData(quantityCount, "quantity of product")} />
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
    {error && <p className="text-red-500">{error}</p>}
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
            {sellProduct.items.map((item, index) => (
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


  //get my product
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
            <th className="border px-4 py-2">Date</th>
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
              <td className='border px-4 py'>{new Date(products.date).toLocaleDateString()} </td>
            </tr>
          ))}
        </tbody>
      </table>


    </>
  )
};


const SoldProducts = () => {
    const [sales, setSales] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    //get all sales being made
    useEffect(() => {
      const fetchMyData = async () => {
  

        try {
          const token = localStorage.getItem("token")
          const response = await axios.get(`${import.meta.env.VITE_API_MP3}/getmedicalsales`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setSales(response.data)
          console.log(response.data)
          toast.success("your sold goods is here")
        } catch (error) {
          console.log(error)
          toast.error("an error occurred here ")
          setError(error.response?.data?.message)
        }

      }
      fetchMyData()
    }, [])


    //get all products
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


    const getProductName = (productId) => {
      const products = product.find((p) => p._id === productId);
      return products ? products.name : "Unknown Product";
    };
  return (
    <div className='p-5'> 
        <table className='text-black'>
      {error && <p className='text-red-400'>{error}</p>}
        <thead>
          <tr>
            <th className="border px-4 py-2">Name of product sold</th>
            <th className="border px-4 py-2">Buyers Name</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">quantity</th>
            
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(sales) &&
    sales.map((sale, index) => (
      sale.items.map((item, idx) => ( 
        <tr key={`${index}-${idx}`}>
          <td className='border px-4 py'>{getProductName(item.product)}</td> 
          <td className='border px-4 py'>{sale.buyerName}</td>
          <td className='border px-4 py'>{item.sellingPrice}</td>
          <td className='border px-4 py'>{item.quantity}</td>
          <td className='border px-4 py'>{item.total}</td>
          <td className='border px-4 py'>{new Date(sale.date).toLocaleDateString()}</td>
        </tr>
      ))
    ))
  }
</tbody>

      </table>


</div>
  )

}
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
