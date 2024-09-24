import React from 'react'
import { useParams } from 'react-router';
import { useState,useEffect } from 'react';
import LenderDashboard from '../components/LenderDashboard/LenderDashboard';
const API = import.meta.env.VITE_BASE_URL;

export default function Lenderpage() {

  const { id } = useParams()
  const [userlenderData, setUserLenderData] = useState([]);

  useEffect(() => {
    fetch(`${API}/lenders`) 
      .then(res => res.json())
      .then(data => setUserLenderData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <LenderDashboard userlenderData = {userlenderData}/>
      </div>
  )
}
