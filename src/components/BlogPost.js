import React from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';


const blogPosts = [
    {
        id: 1,
        title: "10 Essential Cooking Tips for Beginners",
        content: `Here are some essential cooking tips that will help beginners improve their skills. 
        1. Start with the basics: Learn how to properly use a knife.
        2. Read recipes thoroughly before you start.
        3. Invest in good-quality kitchen tools.
        4. Practice mise en place: Prepare and measure ingredients before you start cooking.
        5. Taste as you cook to adjust seasoning.
        6. Learn how to manage your time in the kitchen.
        7. Don't be afraid to experiment with flavors and ingredients.
        8. Understand the importance of heat control.
        9. Clean as you go to keep your workspace organized.
        10. Enjoy the process and have fun with cooking.`,
        date: "2024-08-01"
    },
    {
        id: 2,
        title: "The Ultimate Guide to Spices and Herbs",
        content: `Using spices and herbs effectively can transform your dishes. Here's a guide to help you understand 
        how to use them:
        1. Spices add heat and depth to your dishes. Common spices include cumin, paprika, and cinnamon.
        2. Herbs provide freshness and can be used fresh or dried. Basil, thyme, and rosemary are popular choices.
        3. Toast spices to enhance their flavor before adding them to your dish.
        4. Store spices and herbs in airtight containers away from light and heat to preserve their potency.
        5. Experiment with spice blends to create unique flavors.`,
        date: "2024-08-15"
    },
    {
        id: 3,
        title: "Healthy Meal Prep Ideas for Busy Professionals",
        content: `Meal prepping can save time and ensure that you have healthy meals ready to go. Here are some ideas:
        1. Plan your meals for the week and create a shopping list.
        2. Prepare and cook ingredients in bulk, such as grains, proteins, and vegetables.
        3. Use airtight containers to store prepped ingredients or complete meals.
        4. Choose recipes that store well and can be easily reheated.
        5. Incorporate a variety of flavors and textures to keep your meals interesting.`,
        date: "2024-08-22"
    }
];

const BlogPost = () => {
    const { id } = useParams();
    const blogPost = blogPosts.find(post => post.id === parseInt(id));

    if (!blogPost) {
        return <div>Blog post not found.</div>;
    }

    return (
        <div className="blog-post-container">
            <header className="blog-post-header">
                <h1>{blogPost.title}</h1>
                <p><em>{blogPost.date}</em></p>
            </header>
            <div className="blog-post-content">
                <p>{blogPost.content}</p>
            </div>
        </div>
    );
};

export default BlogPost;
