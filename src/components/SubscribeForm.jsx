import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const API = import.meta.env.VITE_BASE_URL;
  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/mail-list`, {  // Updated endpoint
        method: "POST",
        body: JSON.stringify({
          email,
          role: 'other'
        }),
        headers: { "Content-Type": "application/json" },
      });

      // Check for a successful response before parsing
      if (!response.ok) {
        throw new Error('Network response was not ok'); // This will handle 404 and other errors
      }

      const data = await response.json(); // This will now be safe to call

      console.log(data); // Log the response from the server

      toast.success("Successfully subscribed!");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubscribe}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscribeForm;
