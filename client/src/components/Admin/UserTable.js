import React from 'react'
import { Container, Table } from 'react-bootstrap'
import '../style.css'

const UserTable = ({ users }) => {
    return (
        <Container className='p-3 TableList'>
            <Table bordered hover className='text-white'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((data, key) => (
                        <tr key={data._id}>
                            <td>{key + 1}</td>
                            <td>{data._id}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.admin ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default UserTable
