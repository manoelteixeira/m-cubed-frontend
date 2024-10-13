// src/Pages/Lenderpage.jsx
import PropTypes from "prop-types";
import LenderDashboard from "../components/LenderDashboard/LenderDashboard";

export default function Lenderpage({ user, token }) {
  return (
    <div>
      <LenderDashboard user={user} token={token} />
    </div>
  );
}

Lenderpage.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
