import React from 'react'
import { useParams } from 'react-router';
import LenderDashboard from '../components/LenderDashboard/LenderDashboard';

export default function Lenderpage() {

  const { id } = useParams()
  

  return (
    <div>
      <LenderDashboard/>
      </div>
  )
}
