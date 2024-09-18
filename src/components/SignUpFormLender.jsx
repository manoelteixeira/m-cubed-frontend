import React from 'react';


const SignUpFormLender = () => {


    const handleLogin = (event) => {
        event.preventDefault();

        console.log('sign in submitted');
    };

    return (
        <div className="sign-in-page">
            <h2>sign in</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Business name:
                    <input type="text" name="business name" placeholder='business name' required />
                </label>
                <label>
                    Email: <br />
                    <input type="email" name="email" placeholder='email' required />
                </label>
                <br />

                <label>
                    Password:
                    <br />
                    <input type="password" name="password" placeholder='password' required />
                </label>
                <label>
                    Confirm Password: <br />
                    <input type="password" name="confirmPassword" placeholder='confirm password' required />
                </label>
                <br />
                <button type="submit">sign up</button>

            </form>
        </div>
    );
};

export default SignUpFormLender;
