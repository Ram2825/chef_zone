import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [servings, setServings] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [imageFile, setImageFile] = useState(null); // State for file input
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            setError('Image file is required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author_id', localStorage.getItem('user_id'));
        formData.append('category', category);
        formData.append('tags', tags);
        formData.append('ingredients', ingredients);
        formData.append('preparation_time', preparationTime);
        formData.append('cooking_time', cookingTime);
        formData.append('servings', servings);
        formData.append('difficulty', difficulty);
        formData.append('image', imageFile); // Append the file

        try {
            await axios.post('http://localhost:8200/food_blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for file upload
                }
            });
            navigate('/food_blog'); // Redirect after successful creation
        } catch (err) {
            console.error('Error creating blog post:', err);
            setError('Failed to create blog post.');
        }
    };

    return (
        <div className="create-blog-container">
            <h1>Create New Blog Post</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <label>
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                <label>
                    Tags:
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </label>
                <label>
                    Ingredients:
                    <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                </label>
                <label>
                    Preparation Time (minutes):
                    <input type="number" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} />
                </label>
                <label>
                    Cooking Time (minutes):
                    <input type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
                </label>
                <label>
                    Servings:
                    <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} />
                </label>
                <label>
                    Difficulty:
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} required />
                </label>
                <button type="submit">Create Blog Post</button>
            </form>
        </div>
    );
};

export default CreateBlog;
