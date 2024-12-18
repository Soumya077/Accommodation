import { useContext, useState,useEffect,useCallback } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import debounce from "lodash.debounce";

export default function Header() {
    const {user} = useContext(UserContext);
    const [input, setInput] = useState('');
    const [places,setPlaces] = useState([]);
    const [clicked,setClick] = useState(false);
    const [filteredPlace , setFilteredPlace] = useState([]);
 
    useEffect(() => {
        axios.get('/places').then(({data}) =>{
            setPlaces(data);
        });
    } , []);

    function searchPlace() {
      setClick(prevState => !prevState );
    }

    const debouncedFilter = useCallback(
      debounce((query) => {
        if (query) {
          const filtered = places.filter(place =>
            place.title.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredPlace(filtered);
        } else {
          setFilteredPlace([]);
        }
      }, 300),
      [places]
    );
  
    const handleInput = (ev) => {
      const query = ev.target.value;
      setInput(query); // Update input immediately
      debouncedFilter(query); // Debounce filtering
    };

    return(
        <header className='flex justify-between'>
        <NavLink to={'/'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>

          <span className="font-bold text-xl">Homefeel</span>
        </NavLink>
        <div >
          {!clicked && (
            <div className='flex items-center gap-2 border border-gray-400 rounded-full py-2 px-4 shadow-md shadow-gray-200' >
              <div >Anywhere</div>
              <div className="border-l border-gray-200"></div>
              <div >Any week</div>
              <div className="border-l border-gray-200"></div>
              <div >Add guests</div>
              <button className="rounded-full" onClick={searchPlace}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          )}
          { clicked && (
            <div className='relative flex items-center gap-2 border border-gray-400 rounded-full py-2 px-4 shadow-md shadow-gray-200'>
              <input type="text" className="border-none outline-none flex-grow py-2 px-4" 
                     value={input}
                     placeholder="Search places..." 
                     onChange={handleInput}/>
              <button className="rounded-full" onClick={searchPlace}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              {filteredPlace.length > 0 && (
                <ul className="absolute top-full left-0 w-full mt-1 border border-gray-300 rounded-lg bg-white shadow-md z-10 max-h-40 overflow-y-auto">
                  {filteredPlace.map(place => (
                    <NavLink to={'/account/places/' + place._id}>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {place.title}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div> 

        <NavLink to={user? '/account':'/login'} className='flex items-center gap-2 border border-gray-400 rounded-full py-2 px-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        {!!user && (
          <div>
            {user.name}
          </div>
        )}
        </NavLink>
      </header>
    );
}