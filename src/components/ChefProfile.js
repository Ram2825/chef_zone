import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ChefProfile.css';

const ChefProfile = () => {
    const { id } = useParams();
    const [chef, setChef] = useState(null);

    useEffect(() => {
        axios.get(`/api/chefs/${id}`)
            .then(response => {
                setChef(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the chef profile!', error);
            });
    }, [id]);

    if (!chef) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chef-profile">
            <h1>{chef.name}</h1>
            <p>Cuisine: {chef.cuisine}</p>
            <p>Rating: {chef.rating}</p>
            <p>{chef.description}</p>
            <Link to="/book" className="cta-button">Book Chef</Link>
        </div>
    );
};

export default ChefProfile;
