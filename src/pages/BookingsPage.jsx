import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { NavLink } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
    const [bookings,setBookings] = useState([]);
    useEffect(() =>{
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    },[]);
    return(
        <div>
            <AccountNav/>
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <NavLink to={`/account/bookings/${booking._id}`} className="mb-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48 ">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <div className="mb-1 border-t border-gray-300 "></div>
                            
                            {/* night and dates */}
                            <BookingDates booking={booking} className="mb-2 text-gray-600 text-sm"/>

                            {/* {price} */}
                            <div className="flex gap-1 items-center font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                ₹{booking.price} total price 
                            </div>
                        
                        </div>

                    </NavLink>
                ))}
            </div>
        </div>
    );
}