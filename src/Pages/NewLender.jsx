// src/Pages/NewLender.jsx
import PropTypes from "prop-types";
import NewLenderForm from "../components/NewFormFolder/NewLenderForm";

export default function NewLender({ setUser, setToken }) {
  return (
    <div>
      <NewLenderForm setUser={setUser} setToken={setToken} />
    </div>
  );
}

NewLender.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};
