import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CarListTable from '../../components/Admin/CarListTable'
import Error from '../../components/User/Error'
import ShowSpinner from '../../components/User/Spinner'
import { selectToken } from '../../Slice/userSlice'
import '../style.css'

const CarListAdmin = () => {

    const token = useSelector(selectToken)

    const [cars, setCars] = useState()
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
    }, [cars])

    return (
        <div className='carListAdminMain'>
            <h1 className='text-center text-warning'>All Booking List</h1>
            {cars ?
                <CarListTable data={cars} />
                : error ? <Error error={error} /> : <ShowSpinner />
            }
        </div>
    )
}

export default CarListAdmin
