import React from "react";
import PropTypes from "prop-types";
import Login from "../components/Login/Login";

export default function LoginPage({ setUser, setToken }) {
  return (
    <>
      <Login setUser={setUser} setToken={setToken} />
    </>
  );
}

LoginPage.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};
