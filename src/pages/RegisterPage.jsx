import { NavLink } from "react-router-dom";
import React from "react";
import axios from "axios";


function RegisterPage() {
    const [name , setName] = React.useState("");
    const [email , setEmail] = React.useState("");
    const [password , setPassword] = React.useState("");

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register' , {
                name,
                email,
                password,
            });
            alert('Registration Successful , Now you can login');
        } catch (error) {
            console.error('There was an error with the registration:', error);
            alert('Registration failed, Please try again later');
        }
        
    }
   

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">  
                <h1 className="text-4xl text-center mb-4" >Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser} >
                    <input type="text" 
                        placeholder="your name" 
                        value={name} 
                        onChange={(event) => (setName(event.target.value))} 
                    />
                    <input type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={(event) => (setEmail(event.target.value))} 
                    />
                    <input type="password" 
                        placeholder="your password" 
                        value={password} 
                        onChange={(event) => (setPassword(event.target.value))}
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-3 text-gray-500">
                        Already a member?
                        <NavLink to={"/login"} className="underline text-black"> Login</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage ;