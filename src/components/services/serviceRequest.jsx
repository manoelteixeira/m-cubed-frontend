const API = import.meta.env.VITE_BASE_URL;


// Handle adding a new request
export const addRequest = async (newborrower) => {
  try {
    const response = await fetch(`${API}/borrowers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newborrower),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to create borrower: ${errorDetails.error}`);
    }

    const results = await response.json();
    const id = results.borrower?.id;

    console.log(`Borrower created with ID: ${id}`);
    navigate(`/borrowers/${id}/borrowerdashboard`);
  } catch (error) {
    console.error("Error creating borrower:", error);
  }
};

  
  // Handle updating a request
  export const updateRequest = async (requestId, updatedRequest) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequest),
      });
      const data = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) => (request.id === requestId ? data : request))
      );
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };
  
  // Handle deleting a request
  export const deleteRequest = async (requestId) => {
    try {
      await fetch(`${API}/borrowers/${id}/requests/${requestId}`, {
        method: 'DELETE',
      });
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

// handle get borrower
export const getBorrower = async (borrowerId) => {
  try {
    const response = await fetch(`${API}/borrowers/${borrowerId}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
   
    return data; 
  } catch (err) {
    console.error('Error fetching borrower:', err);
    return null;
  }
};

  // handle get * loan request
  export const getAllLoanRequests = async (id) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}/requests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (err) {
      console.error('Error fetching loan requests:', err);
      return null;
    }
  };