import React from 'react'
import '/Users/eliwills/Desktop/Pursuit/MMM/m-cubed-frontend/src/components/Homepage/Home.scss'

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
        <p>Lender Information</p>
        <img src="" alt="borrower copilot pic" />
      </section>
      <section className='home-container__borrower-CTA'>
        <p>Lender Information</p>
        <img src="" alt="Lender copilot pic" />
      </section>
      <section className='home-container__container-5'>

      </section>
    </main>
  )
}
