import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectToken } from '../../Slice/userSlice'

const AddCar = () => {

    const token = useSelector(selectToken)
    const navigate = useNavigate()
    const { id } = useParams()

    const [car, setCar] = useState()

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [capacity, setCapacity] = useState('')
    const [fuelType, setFuelType] = useState('Petrol')
    const [rentPerHour, setRentPerHour] = useState('')



    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!id) {
            try {
                await axios.post('/api/cars/addcar',
                    { name, image, capacity, fuelType, rentPerHour }, config)
                toast.success('Car Added successfully');
                navigate('/carlist')
            } catch (error) {
                toast.error(error.response.data);
            }
        }
        else {
            try {
                await axios.put(`/api/cars/editcar/${id}`,
                    { name, image, capacity, fuelType, rentPerHour }, config)
                toast.success('Car Updated successfully');
                navigate('/carlist')
            } catch (error) {
                toast.error(error.response.data);
            }
        }
    }

    const getCarDetails = async () => {
        try {
            const { data } = await axios.get(`/api/cars/cardetails/${id}`, config)
            setCar(data);
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    const setCarValues = () => {
        setName(car.name);
        setImage(car.image);
        setCapacity(car.capacity);
        setFuelType(car.fuelType);
        setRentPerHour(car.rentPerHour);
    }

    useEffect(() => {
        if (id) {
            getCarDetails()
        }
    }, [])

    useEffect(() => {
        if (car) {
            setCarValues();
        }
    }, [car]);

    return (
        <div className='mainLogin'>
            <div className='loginContainer'>
                <div className='mt-5'>
                    <h1 className='text-center bg-info p-2'>{id ? 'Edit Car' : 'Add Car'}</h1>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Model Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Image Url" value={image} onChange={(e) => setImage(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Enter Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="number" placeholder="Enter RentPerHour" value={rentPerHour} onChange={(e) => setRentPerHour(e.target.value)} required />
                        </Form.Group>

                        <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="fuelType"
                            className='mb-3'
                        >
                            <Form.Select aria-label="Floating label select example" onChange={(e) => setFuelType(e.target.value)}>
                                <option value='Petrol' >Petrol</option>
                                <option value='diesel' >diesel</option>
                            </Form.Select>
                        </FloatingLabel>

                        <Button className='w-100' variant="primary" type="submit">
                            {id ? 'Update Car' : 'Add Car'}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AddCar
