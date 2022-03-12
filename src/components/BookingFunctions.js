import {useEffect, useState} from "react";
import axios from "../api/axios";


//axios call to get the bookings
export const useGetBookings = (idCustomer) => {
    const [bookings, setBooking] = useState([]);

    const getBookings = async () => {


        const response = await axios.get('/booking', {
            params: {idCustomer}
        });
        setBooking(response.data);
    }

    useEffect(() => {
        getBookings()
    }, [])


    return {bookings, setBooking}
}
//axios call put to backend for updating bookings
export const updateBookingDates = (id, booking) => {

    let bookingParse = []
    let bookingNew  = [];

    for (let i = 0; i < booking.length; i++) {

        bookingParse[i] = new Date(booking[i])
        bookingNew[i] = new Date(bookingParse[i].setTime(bookingParse[i].getTime() - bookingParse[i].getTimezoneOffset()*60*1000)).toISOString()
    }


    axios.put('/booking', {
        withCredentials: true,
        bookingNew,
        id

    });
}
