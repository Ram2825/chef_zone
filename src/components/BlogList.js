import React from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';

const blogs = [
    {
        id: 1,
        title: "10 Essential Cooking Tips for Beginners",
        description: "Learn the basics of cooking with these essential tips that every beginner should know.",
        date: "2024-08-01"
    },
    {
        id: 2,
        title: "The Ultimate Guide to Spices and Herbs",
        description: "Discover how to use spices and herbs to elevate your cooking and enhance flavors.",
        date: "2024-08-15"
    },
    {
        id: 3,
        title: "Healthy Meal Prep Ideas for Busy Professionals",
        description: "Explore meal prep ideas that save time and ensure you eat healthy throughout the week.",
        date: "2024-08-22"
    }
];

const BlogList = () => {
    return (
        <div className="blog-list-container">
            <header className="blog-header">
                <h1>Cooking Tips & Blogs</h1>
            </header>
            <div className="blog-list">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        <p><em>{blog.date}</em></p>
                        <Link to={`/blog/${blog.id}`} className="read-more">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
