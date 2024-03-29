import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { DatePicker, Checkbox } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from 'react-redux';
import CarDetails from '../../components/User/CarDetails';
import { selectToken } from '../../Slice/userSlice';
import ShowSpinner from '../../components/User/Spinner';
import { toast } from 'react-toastify';
import Error from '../../components/User/Error';
import jwt_decode from "jwt-decode";
const { RangePicker } = DatePicker;

const Booking = () => {

  const stripePK = localStorage.getItem("pk_test_51OofeQSBOQYIS9Bto45MaL051udgfkjU8uV1YtIOEKIeWgCeSdTgkcpEaXZ8SMemfRx9ZAR7uPHyBa0C00vv30pC00aTprHqmp")
  const token = useSelector(selectToken)
  const decode = jwt_decode(token)
  const user = decode.user
  const navigate = useNavigate()


  const { id } = useParams()
  const [car, setCar] = useState()

  const [error, setError] = useState();

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalmins] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getCarDetails = async () => {
    try {
      const { data } = await axios.get(`/api/cars/cardetails/${id}`, config)
      setCar(data);
    } catch (error) {
      setError(error.response.data);
    }
  }

  useEffect(() => {
    getCarDetails()
  }, [car])

  useEffect(() => {
    if (car) {
      setTotalAmount(totalMins * Math.ceil(car.rentPerHour / 60));
      if (driver) {
        setTotalAmount(totalAmount + 5 * totalMins);
      }
    }
  }, [driver, totalMins]);

  const selectTimeSlots = (values) => {
    if (values) {
      const newFrom = moment(from).set({
        'year': values[0].year(),
        'month': values[0].month(),
        'date': values[0].date()
      });
      const newTo = moment(to).set({
        'year': values[1].year(),
        'month': values[1].month(),
        'date': values[1].date()
      });
      setFrom(newFrom.format('YYYY-MM-DD HH:mm:ss'));
      setTo(newTo.format('YYYY-MM-DD HH:mm:ss'));
      setTotalmins(newTo.diff(newFrom, 'minutes'));
    } else {
      setTotalmins(0);
    }
  };

  const onToken = async (token) => {
    if (totalAmount == 0) return toast.warn('Pls selectt date')
    const reqObj = {
      token,
      user: user._id,
      car: id,
      totalMins,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    try {
      const { data } = await axios.post('/api/booking/bookcar', reqObj, config)
      toast.success(data);
      navigate('/booking/history')
    } catch (error) {
      toast.error(error.reponse.data);
    }
  }

  return (
    <div className='bookingContainer p-3'>
      {car ? <Container>
        <Row>
          <Col sm={6} className='d-flex justify-content-center p-5'>
            <img className='carImg' src={car.image} alt={car.name} />
          </Col>
          <Col sm={6} className='text-center mt-5'>
            <CarDetails car={car} />
          </Col>
        </Row>
        <div className='text-center'>
          <h4 className='text-white'>Please Select time slot</h4>
          <RangePicker
            onChange={selectTimeSlots}
            showTime={{ format: 'HH:mm' }}
            defaultValue={[from, to]}
            format="YYYY-MM-DD HH:mm" />
        </div>
        <div className='text-center'>
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                setdriver(true);
              } else {
                setdriver(false);
              }
            }}
          >
            <span style={{ color: "white" }}> Driver Required</span>
          </Checkbox>
        </div>
        <div className='text-center mt-2'>
          {totalAmount > 0 && <h2>Total Amounts : {totalAmount}</h2>}
          {totalAmount > 0 ? <StripeCheckout
            token={onToken}
            shippingAddress
            billingAddress={true}
            currency="INR"
            amount={totalAmount * 100}
            stripeKey={stripePK}
          >
            <Button variant="light" disabled={totalAmount < 1}>Book Now</Button>
          </StripeCheckout>
            : <h1 className='text-white bg-danger'>Please select date for atlease 24 hours</h1>
          }
        </div>
      </Container>
        : error ? <Error error={error} /> : <ShowSpinner />}
    </div>
  )
}

export default Booking
