import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ChefList.css';

const ChefList = () => {
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        axios.get('/api/chefs')
            .then(response => {
                setChefs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the chefs!', error);
            });
    }, []);

    return (
        <div className="chef-list">
            <h1>Available Chefs</h1>
            <ul>
                {chefs.map(chef => (
                    <li key={chef.id} className="chef-item">
                        <Link to={`/chefs/${chef.id}`}>{chef.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChefList;
