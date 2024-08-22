import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChefList from './components/ChefList';
import ChefProfile from './components/ChefProfile';
import UserProfile from './components/UserProfile';
import BlogPost from './components/BlogPost';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChefBooking from './components/ChefBooking';
import UserBooking from './components/UserBooking';
import BlogList from './components/BlogList';
import Dashboard from './components/Dashboard';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chefs" element={<ChefList />} />
            <Route path="/chefs/:id" element={<ChefProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chef-profile" element={<ChefProfile />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/bookings" element={<UserBooking/>} />
            <Route path="/manage-bookings" element={<ChefBooking/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    );
};

export default AppRoutes;
