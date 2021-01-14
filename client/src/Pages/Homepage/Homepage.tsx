import React from 'react';
import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <>
            <h1>Homepage</h1>
            <Link to={'/register'}>Register</Link>
        </>
    )
}

export default Homepage;