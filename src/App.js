import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import MyStore from './components/MyStore';
import MyCart from './components/MyCart';
import BuyDetails from './components/BuyDetails';
import GuestCart from './components/GuestCart';
import Orders from './components/Orders';
import LoginAdmin from './components/LoginAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import axios from 'axios';
import './App.css';
import { UserProvider } from './UserContext';

const App = () => {
    const client = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

  return (
    <div className="App">
        <BrowserRouter>
            <NavigationBar client={client} />
            <UserProvider>
                <Routes>
                    <Route path="/" element={<AllProducts client={client} />} />
                    <Route path="login" element={<Login client={client} />} />
                    <Route path="register" element={<Register client={client} />} />
                    <Route path="my-store" element={<MyStore client={client} />} />
                    <Route path="my-cart" element={<MyCart client={client} />} />
                    <Route path="guest-cart" element={<GuestCart client={client} />} />
                    <Route path="user-profile" element={<UserProfile client={client} />} />
                    <Route path="product-details/:id" element={<ProductDetails client={client} />} />
                    <Route path="buy-details" element={<BuyDetails client={client} />} />
                    <Route path="orders" element={<Orders client={client} />} />
                    <Route path="login-admin" element={<LoginAdmin client={client} />} />
                    <Route path="admin-dashboard" element={<AdminDashboard client={client} />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
