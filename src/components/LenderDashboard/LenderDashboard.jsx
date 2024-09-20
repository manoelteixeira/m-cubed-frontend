import "./LenderDashboard.scss";

export default function LenderDashboard() {
  const { id } = useParams();
  const [userloanData, setUserLoanData] = useState([]);

  useEffect(() => {
    fetch(`${API}/lenders/${id}}`)
      .then((res) => res.json())
      .then((data) => setUserLoanData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="lender-dashboard">
      <header className="dashboard-header">
        <img src="" alt="Logo" className="logo" />
        <h1>Hi, User{/* map information */}</h1>
        <p>Here are the loans you have in flight.</p>
        <div className="total-loan-volume">
          <h2>
            Total Loan Volume:{" "}
            <span>
              {/* helper function to add the sum of total Loan volumes here  */}
            </span>
          </h2>
          <h2>
            Total Loan Volume:{" "}
            <span>
              {/* helper function to add the sum of total Loan volumes here  */}
            </span>
          </h2>
          <button className="new-loan-file-btn">+ New Loan File</button>
        </div>
      </header>

      <div className="filters">
        <div className="search-bar">
          <input type="text" placeholder="Search by loan # or name" />
        </div>
        <div className="loan-status">
          <select>
            <option value="11">Loans Selected</option>
            {/* Organize loan selection here*/}
          </select>
        </div>
        <button className="reset-filters">Reset Filters</button>
      </div>

      <table className="loans-table">
        <thead>
          <tr>
            <th>Borrower(s)</th>
            <th>Email</th>
            <th>Tasks</th>
            <th>Docs to Review</th>
            <th>Created Date</th>
            <th>Team Members</th>
            <th>Last Logged In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userloanData.map((loan, index) => (
            <tr key={index}>
              <td>{loan.borrowers}</td>
              <td>{loan.email}</td>
              <td>
                {loan.tasks.incomplete} Incomplete / {loan.tasks.complete}{" "}
                Complete
              </td>
              <td>{loan.docsToReview ? `${loan.docsToReview} Doc` : "—"}</td>
              <td>{loan.createdDate}</td>
              <td>{loan.teamMembers}</td>
              <td>{loan.lastLoggedIn}</td>
              <td>
                {loan.status === "invite" ? (
                  <button className="resend-invite-btn">Resend Invite</button>
                ) : (
                  <button className="start-btn">Start</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
