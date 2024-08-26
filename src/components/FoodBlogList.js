import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FoodBlogList.css';

const FoodBlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const baseURL = 'http://localhost:8200';

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8200/food_blog');
                setBlogs(response.data.results);
            } catch (error) {
                console.error('Error fetching food blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const handleCreateBlog = () => {
        navigate('/createblog');
    };

    return (
        <div className="food-blog-container">
            <h1>Food Blog List</h1>
            {role === 'chef' && (
                <button className="create-blog-button" onClick={handleCreateBlog}>
                    Create Blog
                </button>
            )}
            <div className="blogs-grid">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog.post_id} className="blog-post-card">
                            {blog.image_url && (
                                <img src={`${baseURL}${blog.image_url}`} alt={blog.title} />
                            )}
                            <h2>{blog.title}</h2>
                            <div className="author-date">
                                <span>By {blog.author_name}</span> | <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                            </div>
                            <p>{blog.content.substring(0, 200)}...</p>
                            <a href={`/food_blog/${blog.post_id}`} className="read-more">Read More</a>
                        </div>
                    ))
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
        </div>
    );
};

export default FoodBlogList;
