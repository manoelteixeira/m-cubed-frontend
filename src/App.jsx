import './App.css'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
function App() {

  return (
    <>
    <LenderDashboard/>
    <NavBar/>
    <Header/>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
