import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ShowSpinner from './Spinner'
import { selectToken } from '../../Slice/userSlice'
import '../style.css'
import Error from './Error'

const CarList = () => {

    const navigate = useNavigate()
    const token = useSelector(selectToken)

    const [cars, setCars] = useState([])
    const [error, setError] = useState('')

    const getAllCars = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get("/api/cars/getallcars", config)
            setCars(data)
        } catch (error) {
            setError(error.response.data);
        }
    }

    useEffect(() => {
        getAllCars()
    }, [getAllCars])  //cars  old

    const handleClick = (id) => {
        navigate(`/booking/${id}`)
    }

    return (
        <div className='carlist p-3'>
            {cars.length > 0 ? <Container>
                <h1 className='text-center'>All Available Cars</h1>
                <Row className='d-flex justify-content-center'>
                    {cars.map(cars => (<Card key={cars._id} className='mt-2 mx-2 carcard' style={{ width: '18rem' }}>
                        <Card.Img className='carCardImg' variant="top" src={cars.image} />
                        <Card.Body>
                            <Card.Title>{cars.name}</Card.Title>
                            <Card.Text>
                                ₹{cars.rentPerHour} Per Hour /-
                            </Card.Text>
                            <Button variant="outline-dark" onClick={() => handleClick(cars._id)}>Book Now</Button>
                        </Card.Body>
                    </Card>))}
                </Row>
            </Container>
                : !error ? <ShowSpinner /> : <Error error={error} />}
        </div>
    )
}

export default CarList
