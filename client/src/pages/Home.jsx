import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Descriprion from '../components/Descriprion'
import Testimonials from '../components/Testimonials'
import GenerateButton from '../components/GenerateButton'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Descriprion/>
      <Testimonials/>
      <GenerateButton/>
    </div>
  )
}

export default Home
