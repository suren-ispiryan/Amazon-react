import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/helpers/NavigationBar';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Verify from './components/Verify';
import Register from './components/Register';
import UserProfile from './components/user/UserProfile';
import MyStore from './components/user/MyStore';
import MyCart from './components/user/MyCart';
import SavedForLater from './components/user/SavedForLater';
import Chat from './components/user/myChat/Chat';
import BuyDetails from './components/user/BuyDetails';
import GuestCart from './components/guest/GuestCart';
import Orders from './components/user/Orders';
import LoginAdmin from './components/LoginAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminSetCategories from './components/admin/AdminSetCategories';
import AdminOrderedProducts from './components/admin/AdminOrderedProducts';
import GuestSavedForLater from './components/guest/GuestSavedForLater';
import './App.css';

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="login" element={<Login />} />
                <Route path="verify/:token" element={<Verify />} />
                <Route path="register" element={<Register />} />
                <Route path="guest-cart" element={<GuestCart />} />
                <Route path="guest-saved-for-later" element={<GuestSavedForLater />} />
                <Route path="my-store" element={<MyStore />} />
                <Route path="saved-for-later" element={<SavedForLater />} />
                <Route path="my-cart" element={<MyCart />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="chat" element={<Chat />} />
                <Route path="chat/:id" element={<Chat />} />
                <Route path="product-details/:id" element={<ProductDetails />} />
                <Route path="buy-details" element={<BuyDetails />} />
                <Route path="orders" element={<Orders />} />
                <Route path="login-admin" element={<LoginAdmin />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                <Route path="admin-users" element={<AdminUsers />} />
                <Route path="admin-product-categories" element={<AdminSetCategories />} />
                <Route path="admin-product-ordered" element={<AdminOrderedProducts />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
