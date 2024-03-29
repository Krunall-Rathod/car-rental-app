import axios from 'axios'
import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectToken } from '../../Slice/userSlice'
import '../style.css'

const CarListTable = ({ data }) => {

    const token = useSelector(selectToken)
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.delete(`/api/cars/deletecar/${id}`, config)
            toast.success(data)
        } catch (error) {
            toast.warn(error)
        }
    }

    const handleEdit = async (id) => {
        navigate(`/editcar/${id}`)
    }


    return (
        <Container className='p-3 TableList'>
            <Table bordered className='text-white'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Model</th>
                        <th>RentPerHr</th>
                        <th>fuelType</th>
                        <th>capacity</th>
                        <th>image</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((data, key) => (
                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.rentPerHour}</td>
                            <td>{data.fuelType}</td>
                            <td>{data.capacity}</td>
                            <td>{data.image}</td>
                            <td onClick={() => handleDelete(data._id)}><i className="fa-solid fa-trash"></i></td>
                            <td onClick={() => handleEdit(data._id)}><i className="fa-solid fa-pen-to-square"></i></td>
                        </tr>))}
                </tbody>
            </Table>
        </Container>
    )
}

export default CarListTable
