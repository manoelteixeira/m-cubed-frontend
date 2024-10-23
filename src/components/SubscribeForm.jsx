// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const SubscribeForm = () => {
//   const [email, setEmail] = useState("");
//   const API = import.meta.env.VITE_BASE_URL;

//   const handleSubscribe = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API}/mail-list`, {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//           role: 'other'
//         }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.status === 400) {
//         toast.error("Email exists in our database already.");
//         return;
//       }

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log(data);

//       toast.success("Successfully subscribed!");
//     } catch (error) {
//       console.error("Fetch error:", error);
//       toast.error("Failed to subscribe. Please try again later.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubscribe}>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button type="submit">Subscribe</button>
//     </form>
//   );
// };

// export default SubscribeForm;

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const API = import.meta.env.VITE_BASE_URL;

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/mail-list`, {
        method: "POST",
        body: JSON.stringify({
          email,
          role: "other",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 400) {
        toast.error("Email exists in our database already.");
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      toast.success("Successfully subscribed!");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubscribe} style={{ display: "block" }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: "100%", // Full width for input
          padding: "10px",
          marginBottom: "10px", // Margin below input for spacing
          borderRadius: "4px",
          border: "1px solid #00a250", // MMM green border
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#f6f7f8", // MMM white background
          color: "#00a250", // MMM green font color
          padding: "8px 16px", // Smaller padding
          borderRadius: "4px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          textTransform: "uppercase",
          display: "block",
          margin: "0 auto", // Center the button
        }}
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeForm;
