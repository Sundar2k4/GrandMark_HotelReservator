import Header from "../Header";
import {Link} from "react-router-dom"
import { useState } from "react";
import axios from "axios";
export default function LoginPage()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function handleLoginSubmit(ev)  
    {
       ev.preventDefault();
       try{
           await axios.post('/Login',{email,password});
           alert('User Login Successfull');
        }catch(e)
        {
            alert('User Login Failed')
        }
       
    }
    return (
       
       <div className="mt-4 grow flex items-center justify-center">
        <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">LOGIN</h1>
       <form className="max-w-lg mx-auto" onSubmit={handleLoginSubmit}>
        <input type="email" placeholder="Your@email.com"  value={email} onChange={ev => setEmail(ev.target.value) }/>
        <input type="password" placeholder="password" value={password} onChange = {ev => setPassword(ev.target.value)} />
        <button className="primary rounded-full w-full bg-primary text-white h-10">Login</button>
        <div className="py-2 text-center text-gray-500">
         Dont have an account yet?
         <Link className="underline text font-bold" to = {'/register'}> Register Here </Link>
        </div>
        </form>
       </div>
       
       </div>
    
    );
}