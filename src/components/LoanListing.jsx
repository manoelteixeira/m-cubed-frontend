import React from 'react';
import LoanItem from './LoanItem';

const LoanListing = ({ loans }) => {
    return (
        <div className="loan-listing">
            <h2>Available Loans</h2>
            <div className="loan-list">
                {loans.length > 0 ? (
                    loans.map((loan) => <LoanItem key={loan.id} loan={loan} />)
                ) : (
                    <p>No loans available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default LoanListing;
