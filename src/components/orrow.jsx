import React from 'react';

const SignUpFormBorrow = () => {

    const handleSignUp = (event) => {
        event.preventDefault();
        console.log('Sign up submitted');
    };

    return (
        <div>
            <h2>Sign Up </h2>
            <form onSubmit={handleSignUp}>
                <label>
                    Email: <br />
                    <input type="email" name="email" placeholder='email' required />
                </label>
                <br />
                <label>
                    Password: <br />
                    <input type="password" name="password" placeholder='password' required />
                </label>
                <br />
                <label>
                    Confirm Password: <br />
                    <input type="password" name="confirmPassword" placeholder='confirm password' required />
                </label>
                <br />
                <label>
                    City: <br />
                    <input type="text" name="city" placeholder='city' required />
                </label>
                <br />
                <label>
                    Street: <br />
                    <input type="text" name="street" placeholder='street' required />
                </label>
                <br />
                <label>
                    State: <br />
                    <input type="text" name="state" placeholder='state' required />
                </label>
                <br />
                <label>
                    Zip Code: <br />
                    <input type="text" name="zip_code" placeholder='zip code' required />
                </label>
                <br />
                <label>
                    Phone: <br />
                    <input type="text" name="phone" placeholder='phone' required />
                </label>
                <br />
                <label>
                    Business Name: <br />
                    <input type="text" name="business_name" placeholder='business name' required />
                </label>
                <br />
                <label>
                    Credit Score: <br />
                    <input type="number" name="credit_score" placeholder='credit score' required />
                </label>
                <br />
                <label>
                    Start Date: <br />
                    <input type="date" name="start_date" required />
                </label>
                <br />
                <label>
                    Industry: <br />
                    <input type="text" name="industry" placeholder='industry' required />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpFormBorrow;
