const API = import.meta.env.VITE_BASE_URL;

// Handle adding a new request
export const addRequest = async (id, newRequest) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error adding request:', err);
      return null
    }
  };
  
  // Handle updating a request
  export const updateRequest = async (id, requestId, updatedRequest) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRequest),
      });
      const data = await response.json();
      return data
    } catch (err) {
      console.error('Error updating request:', err);
      return null
    }
  };
  
  // Handle deleting a request
  export const deleteRequest = async (id, requestId) => {
    try {
      await fetch(`${API}/borrowers/${id}/requests/${requestId}`, {
        method: 'DELETE',
      });
      return requestId;
    } catch (err) {
      console.error('Error deleting request:', err);
      return null
    }
  };


// handle get borrower
export const getBorrower = async (id) => {
  try {
    const response = await fetch(`${API}/borrowers/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching borrower:", err);
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


  //handle get a single request
  export const getLoanRequest = async (id, requestId) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}/requests/${requestId}`, {
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

  //handle get loan offers
  export const getProposalsByRequestId = async ( borrowerId,requestId) => {
    try {
      const response = await fetch(`${API}/borrowers/${borrowerId}/requests/${requestId}/proposals`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }const data = await response.json();
      console.log(data)
      
      return data;
    } catch (err) {
      console.error('Error fetching loan requests:', err);
      return null;
    }
  };