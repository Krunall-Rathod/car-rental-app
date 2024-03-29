import React from 'react'
import { Spinner } from 'react-bootstrap'

const ShowSpinner = () => {
    return (
        <div className='text-center p-5'>
            <Spinner animation="border" variant="danger" />
        </div>
    )
}

export default ShowSpinner
