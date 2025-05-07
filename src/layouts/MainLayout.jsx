import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header/>
      <div className='flex-grow bg-gray-200'>
        <div className='mt-[80px]'></div>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout
