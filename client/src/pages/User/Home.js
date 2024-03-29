import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeSection from '../../components/User/HomeSection'
import { selectToken, setUser } from '../../Slice/userSlice'
import jwt_decode from "jwt-decode";

const Home = () => {

    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const decode = jwt_decode(token)

    const getStripePublicKey = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get("/api/booking/publickey", config)
            localStorage.setItem('stripePK', data.STRIPE_PUBLIC_KEY)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getStripePublicKey()
        dispatch(setUser(decode.user))
    }, [])



    return (
        <>
            <HomeSection />
        </>
    )
}

export default Home