import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
    const [email , setEmail] = React.useState("");
    const [password , setPassword] = React.useState(""); 
    const [redirect , setRedirect] = React.useState(false);

    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login' , {email,password} );
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        }catch(e){
            alert('Login failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">  
                <h1 className="text-4xl text-center mb-4" >Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password" 
                        placeholder="your password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-3 text-gray-500">
                        Don't an account yet?
                        <NavLink to={"/register"} className="underline text-black"> Register Now</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage ;