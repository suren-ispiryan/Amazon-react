import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AllProducts from './components/AllProducts';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import MyStore from './components/MyStore';
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
                    <Route path="user-profile" element={<UserProfile client={client} />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
