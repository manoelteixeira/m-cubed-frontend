import React,{useState,useEffect} from 'react'
const API = import.meta.env.VITE_BASE_URL;
export default function ListOfLenders() {
    const [lenderList, setListOfLenders] = useState([])
    
    useEffect(() => {
        fetch(`${API}/lenders`) 
          .then(res => res.json())
          .then(data => setListOfLenders(data))
          .catch(err => console.error(err));
      }, []);
  return (<>
  <div>{lenderList.map(lender => {
       return  <p key = {lender.id}>{lender.business_name}</p>
})}</div>
    <h1>WE GOT DATA!!!!</h1>
      </>
  )
}
 