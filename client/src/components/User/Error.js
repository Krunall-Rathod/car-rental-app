import React from 'react'
import {Alert, Container} from 'react-bootstrap'

const Error = ({error}) => {
    return (
        <Container className='p-5'>
            <Alert  variant='danger' className='text-center'>
                {error}
            </Alert>
        </Container>
    )
}

export default Error
