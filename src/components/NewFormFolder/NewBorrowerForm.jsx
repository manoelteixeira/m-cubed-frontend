import React, {useEffect,useState}from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import BorrowerForm from '../Library/BorrowerForm';
import { TextField, Button, Box, Typography } from "@mui/material";


const API = import.meta.env.VITE_BASE_URL;

export default function NewBorrowerForm() {
  return (
    <div>
        <BorrowerForm/>
        </div>
  )
}
