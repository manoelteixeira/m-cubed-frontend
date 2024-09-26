import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AvailableLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriterion, setSortCriterion] = useState('');
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch(`${API}/loans`);
                const data = await response.json();
                if (response.ok) {
                    setLoans(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('An error occurred while fetching loans.');
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const sortLoans = (loans, criterion) => {
        switch (criterion) {
            case 'amount':
                return [...loans].sort((a, b) => b.value - a.value);
            case 'name':
                return [...loans].sort((a, b) => a.title.localeCompare(b.title));
            default:
                return loans;
        }
    };

    const handleAddNewLoan = () => {
        navigate(`/loans/new`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const sortedLoans = sortLoans(loans, sortCriterion);

    return (
        <div className="available-loans">
            <div className="sort-buttons">
                <button onClick={() => setSortCriterion('amount')}>Sort by Amount</button>
                <button onClick={() => setSortCriterion('name')}>Sort by Name</button>
                <button onClick={handleAddNewLoan}>Add New Loan</button>
            </div>
            {sortedLoans.length > 0 ? (
                <ul>
                    {sortedLoans.map((loan) => (
                        <li key={loan.id}>
                            <Link to={`/loans/${loan.id}`}>
                                <p><strong>{loan.title}</strong></p>
                                <p>Amount: ${loan.value.toLocaleString()}</p>
                                <p>Status: {loan.funded_at ? 'Funded' : 'Pending'}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No loans available at the moment.</p>
            )}
        </div>
    );
};

export default AvailableLoans;
