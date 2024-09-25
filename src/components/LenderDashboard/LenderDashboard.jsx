import "./LenderDashboard.scss";

export default function LenderDashboard({userlenderData}) {
  
  return (
    <div className="lender-dashboard">
      <header className="dashboard-header">
        <img src="" alt="Logo" className="logo" />
        {/* <h1>Hi,{userlenderData.business_name} </h1> */}
        <p>Current Loan Capacity</p>
        <div className="total-loan-volume">
          <h2>
            Total Loan Volume:{" "}
            <span>
              {/* helper function to add the sum of total Loan volumes here  */}
            </span>
          </h2>
          <button className="new-loan-file-btn">Add New Loan </button>
        </div>
      </header>

      <div className="filters">
        <div className="search-bar">
          <input type="text" placeholder="Search by loan # or name" />
        </div>
        <div className="loan-status">
          <select>
            <option value="11">Loans Selected</option>
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
            <th>Last Logged In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}
