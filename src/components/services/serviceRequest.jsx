const API = import.meta.env.VITE_BASE_URL;


// Handle adding a new request
export const addRequest = async (newRequest) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });
      const data = await response.json();
      setRequests((prevRequests) => [...prevRequests, data]);
    } catch (err) {
      console.error('Error adding request:', err);
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
  export const getAllLoanRequests = async (borrowerId) => {
    try {
      const response = await fetch(`${API}/borrowers/${borrowerId}/requests`, {
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