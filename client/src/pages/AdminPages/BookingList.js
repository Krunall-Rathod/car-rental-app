import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BookingListTable from '../../components/Admin/BookingListTable'
import Error from '../../components/User/Error'
import ShowSpinner from '../../components/User/Spinner'
import { selectToken } from '../../Slice/userSlice'


const BookingList = () => {

    const token = useSelector(selectToken)
    const [data, setData] = useState()
    const [error, setError] = useState('')

    const get = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await axios.get(`/api/booking/getallbookings`, config)
            setData(data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    useEffect(() => {
        get()
    }, [data])

    return (
        <div className='history'>
            <h1 className='text-center text-warning'>Booking List</h1>
            {data ? <BookingListTable data={data} /> : error ? <Error error={error} /> : <ShowSpinner />}
        </div>
    )
}

export default BookingList
