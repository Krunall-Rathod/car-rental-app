import React from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'

const CarDetails = ({ car }) => {
    return (
        <>
            <h2>DETAILS</h2>
            <Container className='p-5'>
                <Stack gap={3}>
                    <div className='d-flex justify-content-between'>
                        <h4><i className="fa-solid fa-car"></i> Mode</h4>
                        <h4>{car.name}</h4>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h4><i className="fa-solid fa-indian-rupee-sign"></i> Rent</h4>
                        <h4>{car.rentPerHour}</h4>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h4><i className="fa-solid fa-gas-pump"></i> fuelType</h4>
                        <h4>{car.fuelType}</h4>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h4><i className="fa-solid fa-people-group"></i> capacity</h4>
                        <h4>{car.capacity}</h4>
                    </div>
                </Stack>
            </Container>
        </>
    )
}

export default CarDetails
