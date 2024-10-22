import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProposalsByRequestId, acceptOffer } from '../services/serviceRequest';

const LoanOffersPage = () => {
  const { requestId } = useParams();
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const fetchedOffers = await getProposalsByRequestId(requestId);
        console.log('Fetched Offers:', fetchedOffers);  
        setOffers(Array.isArray(fetchedOffers) ? fetchedOffers : []);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('Error fetching offers.');
      }
    };
  
    fetchOffers();
  }, [requestId]);
  

  const handleAcceptOffer = async (offerId) => {
    try {
      await acceptOffer(requestId, offerId);
      alert('Offer accepted successfully.');
      
      // Refetch updated offers
      const updatedProposals = await getProposalsByRequestId(requestId);
      const proposals = updatedProposals.proposals || [];
      setOffers(Array.isArray(proposals) ? proposals : []);
    } catch (error) {
      console.error('Error accepting offer:', error);
      setError('Error accepting offer.');
    }
  };

  const handleUpdateRequest = () => {
    navigate(`/borrowers/${requestId}/edit-request`);
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Loan Offers for Request {requestId}</h1>
      {offers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Lender</th>
              <th>Loan Amount</th>
              <th>Terms (months)</th>
              <th>Interest Rate (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td>{offer.lender_id}</td>
                <td>${offer.loan_amount}</td>
                <td>{offer.repayment_term}</td>
                <td>{offer.interest_rate}</td>
                <td>
                  <button onClick={() => handleAcceptOffer(offer.id)}>Accept</button>
                  <button onClick={() => handleDeclineOffer(offer.id)}>Decline</button>
                  <button onClick={handleUpdateRequest}>Update Request</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No offers available for this loan request.</p>
      )}
    </div>
  );
};

export default LoanOffersPage;
