import React from 'react';

const RegisterPage = () => {
    return (
        <form action="/register" method="POST">
            <label htmlFor="name">Email</label>
            <input type="text" id="email" name="email"></input>
            <label htmlFor="name">Password</label>
            <input type="password" id="password" name="password"></input>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterPage;