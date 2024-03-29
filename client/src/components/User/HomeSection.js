import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style.css'

const HomeSection = () => {

    const navigate = useNavigate()

    return (
        <div className='homeSectionmain'>
            <div className='homeSection'>
                <div className='textContainer'>
                    <h1 className='mt-5'>Booking Cars Made Easy</h1>
                    <h3 className='mt-5'>Book your favourite car in very low price and enjoy the ride.</h3>
                    <Button
                        onClick={() => navigate('/allcars')}
                        size='lg'
                        className='mt-5'
                        variant='info'
                    >Get Started <i className="fa-solid fa-arrow-right"></i> </Button>
                </div>
            </div>
        </div>
    )
}

export default HomeSection
