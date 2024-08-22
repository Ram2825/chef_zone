import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChefList from './components/ChefList';
import ChefProfile from './components/ChefProfile';
import UserProfile from './components/UserProfile';
import Reviews from './components/Reviews';
import Blogs from './components/Blogs';
import BlogPost from './components/BlogPost';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChefBooking from './components/ChefBooking';
import UserBooking from './components/UserBooking';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chefs" element={<ChefList />} />
            <Route path="/chefs/:id" element={<ChefProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/bookings" element={<UserBooking/>} />
            <Route path="/manage-bookings" element={<ChefBooking/>} />
        </Routes>
    );
};

export default AppRoutes;
