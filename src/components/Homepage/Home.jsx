import React from 'react'
import '/Users/eliwills/Desktop/Pursuit/MMM/m-cubed-frontend/src/components/Homepage/Home.scss'
import LenderPhoto from '/Users/eliwills/Desktop/Pursuit/MMM/m-cubed-frontend/src/assets/LenderPhoto.jpeg'
import BorrowerPhoto from '/Users/eliwills/Desktop/Pursuit/MMM/m-cubed-frontend/src/assets/BorrowerPhoto.jpeg'

export default function Home() {
  return (
    <main className='home-container'>
      <section className='home-container__landing-intro'>
        <h1>Title for Banking</h1>
        <img src="" alt="possible-img" id='' />
      </section>
      <section className='home-container__badge-names'>
        <h2>Sample 1</h2> {/* Horizontal display */}
        <h2>Sample 2</h2>
        <h2>Sample 3</h2>
        <h2>Sample 4</h2>
        <h2>Sample 5</h2>
      </section>
      {/*Hopscotch Patch work display */}
      <section className='home-container__lender-CTA'>
        <p className='lender-details'>Diversify your Portfolio by Partnering with M-cubed for endless Possibilites</p>
        <img src={ LenderPhoto } alt="borrower copilot pic" id='lender-photo' />
      </section>
      <section className='home-container__borrower-CTA'>
        <img src={ BorrowerPhoto } alt="borrwer copilot pic" id='borrower-photo'/>
        <p>Lender Information</p>
      </section>
      <section className='home-container__container-5'>

      </section>
    </main>
  )
}
