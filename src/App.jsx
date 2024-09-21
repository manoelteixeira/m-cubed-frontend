import './App.css'
import LenderDashboard from './components/LenderDashboard/LenderDashboard'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
function App() {

  return (
    <>
    <LenderDashboard/>
    <NavBar/>
    </>
  )
}

export default App
