import { useEffect, useState } from "react";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploader";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from 'axios'

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title , setTitle] = useState('');
    const [address , setAddress] = useState('');
    const [addedPhotos , setAddedPhotos] = useState([]);
    const [description , setDescription] = useState('');
    const [perks , setPerks] = useState('');
    const [extraInfo , setExtraInfo] = useState('');
    const [checkIn , setCheckIn] = useState('');
    const [checkOut , setCheckOut] = useState('');
    const [maxGuests , setMaxGuests] = useState('');
    const [price,setPrice] = useState(100);
    const [redirect , setRedirect] = useState(false);

    useEffect(() => {

        if(!id) return ;

        axios.get('/places/'+id).then(response => {
            const {data} = response ;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    },[id])

    async function savePlace(ev) {
        const placeData = {
            title, address,addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price,
        };
        ev.preventDefault();
        if(id){
            try {  
                await axios.put('/places', {
                    id, ...placeData
                });
                setRedirect(true);
            } catch (error) {
                console.error(error.message);
            }
        } else{
            try {  
                await axios.post('/places', placeData);
                setRedirect(true);
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    if(redirect){
        // console.log("Redirecting...");
        return <Navigate to={'/account/places'} />
    }

    return(
        <div>
        <AccountNav/>
        <form onSubmit={savePlace} >
            <h2 className="text-xl mt-4">Title</h2>
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="for example : My Lovely apartment" />

            <h2 className="text-xl mt-4">Address</h2>
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

            <h2 className="text-xl mt-4">Photos</h2>
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

            <h2 className="text-xl mt-4">Description</h2>
            <textarea value={description} onChange={ev => setDescription(ev.target.value)}></textarea>

            <h2 className="text-xl mt-4">Perks</h2>
            <Perks selected={perks} onChange={setPerks}/>

            <h2 className="text-xl mt-4">Extra Information</h2>
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>

            <h2 className="text-xl mt-4 mb-3 ">Check-in and check-out time</h2>
            <div className="grid gap-2 sm:grid-cols-2 mx-2">
                <div>
                    <h3 className="mt-2 -mb-1">Check-in time</h3>
                    <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00" />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check-out time</h3>
                    <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}placeholder="19:00" />
                </div>

            </div>

            <h2 className="text-xl mt-4 mb-3 ">Max guests & Price </h2>
            <div className="grid gap-2 sm:grid-cols-2 mx-2">
                <div>
                    <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
                    <input type="text" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}placeholder=""/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Price per night</h3>
                    <input type="text" value={price} onChange={ev => setPrice(ev.target.value)}placeholder=""/>
                </div>
            </div>

            <button className="primary my-4 ">Save</button>
        </form>
    </div>
    )
}