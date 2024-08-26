import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodBlogDetails.css';
import { useParams } from 'react-router-dom';

const FoodBlogDetails = () => {
    const { post_id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = 'http://localhost:8200';

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${baseURL}/food_blog/${post_id}`);
                setBlog(response.data.result);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError('Failed to fetch blog post.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [post_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!blog) return <p>No blog post found.</p>;

    return (
        <div className="food-blog-details">
            <h1>{blog.title}</h1>
            {blog.image_url && (
                <img src={`${baseURL}${blog.image_url}`} alt={blog.title} />
            )}
            <div className="info">
                <p><span>Category:</span> {blog.category}</p>
                <p><span>Tags:</span> {blog.tags}</p>
                <p><span>Ingredients:</span> {blog.ingredients}</p>
                <p><span>Preparation Time:</span> {blog.preparation_time} minutes</p>
                <p><span>Cooking Time:</span> {blog.cooking_time} minutes</p>
                <p><span>Servings:</span> {blog.servings}</p>
                <p><span>Difficulty:</span> {blog.difficulty}</p>
            </div>
            <p>{blog.content}</p>
            <div className="info">
                <p><span>Posted By:</span> {blog.author_name}</p>
                <p><span>Created At:</span> {new Date(blog.created_at).toLocaleDateString()}</p>
                {/* <p><span>Updated At:</span> {new Date(blog.updated_at).toLocaleDateString()}</p> */}
            </div>
        </div>
    );
};

export default FoodBlogDetails;
