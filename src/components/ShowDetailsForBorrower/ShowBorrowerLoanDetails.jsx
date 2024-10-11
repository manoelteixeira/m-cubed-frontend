import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLoanRequest } from "../services/serviceRequest";

const API = import.meta.env.VITE_BASE_URL;
export default function ShowBorrowerLoanDetails() {
  const [request, setRequests] = useState(null);
  const { borrower_id, id } = useParams();

  useEffect(() => {
    fetch(`${API}/borrowers/${borrower_id}/requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => console.log(err));
  }, [borrower_id, id]);
  if (!request) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      // Consider using a table to display the details or as a pop up instead of a separate page display
      <div>
        {request.title} <br />
        {request.description}
        <br />
        {request.value}
        <br />
        {request.created_at}
        <br />
      </div>
    );
  }
}
