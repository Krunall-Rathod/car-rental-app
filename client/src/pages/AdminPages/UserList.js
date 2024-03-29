import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Error from '../../components/User/Error';
import ShowSpinner from '../../components/User/Spinner';
import UserTable from '../../components/Admin/UserTable';
import { selectToken } from '../../Slice/userSlice';

const UserList = () => {

    const [users, setUser] = useState()
    const [error, setError] = useState()

    const token = useSelector(selectToken)

    const getUseList = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get('api/users/userlist', config)
            setUser(data)
        } catch (error) {
            setError(error.response.data);
        }
    }

    useEffect(() => {
        getUseList()
    }, [])

    return (
        <div className='mainUserList'>
            <h1 className='text-center text-warning'>User List</h1>
            {users ?
                <UserTable users={users} />
                : error ? <Error error={error} /> : <ShowSpinner />
            }
        </div>
    )
}

export default UserList
