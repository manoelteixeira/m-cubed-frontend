import PropTypes from "prop-types";
import NewBorrowerForm from "../components/NewFormFolder/NewBorrowerForm";
export default function NewBorrower({ setUser, setToken }) {
  return (
    <div>
      <NewBorrowerForm setUser={setUser} setToken={setToken} />
    </div>
  );
}
NewBorrower.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
