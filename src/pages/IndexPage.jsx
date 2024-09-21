import { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import 'dotenv/config'

function IndexPage(){
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  },[]);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 && places.map(place => (
        <NavLink to={'/place/'+place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={process.env.VITE_API_URL +'/uploads/'+place.photos[0]} alt="" />
            )}
          </div>
      
          <h2 className="font-bold ">{place.address}</h2>
          <h3 className="text-sm truncate text-gray-600">{place.title}</h3> 
          <div className="mt-1">
            <span className="font-bold ">₹{place.price}</span> per night
          </div>

        </NavLink>
      ))}

    </div>
  )
}

export default IndexPage ;