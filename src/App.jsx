import './App.css'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header'
import Home from './Pages/Home'
import LenderDashboard from './components/LenderDashboard'
function App() {

  return (
    <>
    <LenderDashboard/>
    <NavBar/>
    <Header/>
    <Header/> {/* Call to Action Header for Services */}
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<SignUp/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/lenders/:id/lenderdashboard' element={<LenderDashboard/>}/>
      <Route path='/borrowers/:id/borrowersdashboard' element={<></>}/>
      <Route path='/lenders/:id/edit' element={<></>}/>
      <Route path='/borrowers/:id/edit' element={<></>}/>
      <Route path='lenders/:id/proposals' element={<></>}/>
      <Route path='borrowers/:id/requests' element={<></>}/>
      <Route path='/disclaimer' element={<></>}/> {/* FF: Info page for Borrowers/Lenders to know about additional services */}
    </Routes>
    </>
  )
}

export default App
