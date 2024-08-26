import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChefList from './components/ChefList';
import ChefProfile from './components/ChefProfile';
import UserProfile from './components/UserProfile';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChefBooking from './components/ChefBooking';
import UserBooking from './components/UserBooking';
import Dashboard from './components/Dashboard';
import FoodBlogList from './components/FoodBlogList';
import FoodBlogDetails from './components/FoodBlogDetails';
import CreateBlog from './components/CreateBlog';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chefs" element={<ChefList />} />
            <Route path="/chefs/:id" element={<ChefProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chef-profile" element={<ChefProfile />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/bookings" element={<UserBooking/>} />
            <Route path="/manage-bookings" element={<ChefBooking/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/foodblogs" element={<FoodBlogList/>} />
            <Route path="/food_blog/:post_id" element={<FoodBlogDetails/>} />
            <Route path="/createblog" element={<CreateBlog/>} />
        </Routes>
    );
};

export default AppRoutes;
