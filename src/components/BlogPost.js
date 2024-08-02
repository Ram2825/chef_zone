import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`/api/blogs/${id}`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blog post!', error);
            });
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-post">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default BlogPost;
