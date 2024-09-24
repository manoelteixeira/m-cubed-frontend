import React, { useState } from 'react';

const ForgotCredentials = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //  API call logic here to handle password reset process
   
    if (email || username) {
      setMessage("Instructions have been sent to your email.");
    } else {
      setMessage("Please provide your email.");
    }
  };

  return (
    <div className="forgot-credentials">
      <h2>Forgot Username/Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
       
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotCredentials;
