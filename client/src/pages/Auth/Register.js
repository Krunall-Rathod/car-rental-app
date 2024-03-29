import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Slice/userSlice';

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phone.length < 10) return toast.warn('Phone numbe must be atleast 10 digit')

        try {
            const { data } = await axios.post('/api/users/register', { email, username, phone, password })
            localStorage.setItem("token", JSON.stringify(data.token))
            dispatch(setToken(data.token))
            toast.success(`Account created successfully as ${data.username}`)
            navigate('/')
        } catch (error) {
            toast.warn(error.response.data);
        }
    };


    return (
        <div className='mainLogin'>
            <div className='registerContainer'>
                <div className='mt-5'>
                    <h1 className='text-center bg-info p-2'>Register</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button className='w-100' variant="primary" type="submit">
                            Create Account
                        </Button>
                        <hr className='registerHr' />
                    </Form>
                    <div className='registerLinkDiv'>
                        <Link className='registerLink' to='/login'>Already Have An Account ?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
