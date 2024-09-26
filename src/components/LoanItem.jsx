import React from 'react';

const LoanItem = ({ loan }) => {
    return (
        <div className="loan-item">
            <h3>{loan.title}</h3>
            <p><strong>Amount:</strong> ${loan.amount}</p>
            <p><strong>Interest Rate:</strong> {loan.rate}%</p>
            <p><strong>Duration:</strong> {loan.duration} years</p>
        </div>
    );
};

export default LoanItem;
