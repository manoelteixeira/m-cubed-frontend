import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditBorrowerForm from '../components/EditUserFolder/EditBorrowerForm'
export default function EditBorrowerPage() {
const { id } = useParams()
const navigate = useNavigate()
  return (
    <div><EditBorrowerForm/></div>
  )
}
