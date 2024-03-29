import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css'

const NotPageFound = () => {
  return (
    <div className='notFound'>
      <div className='notFound2'>
        <h1>Page Not Found Go To <Link to='/'>Home</Link></h1>
      </div>
    </div>
  )
}

export default NotPageFound
