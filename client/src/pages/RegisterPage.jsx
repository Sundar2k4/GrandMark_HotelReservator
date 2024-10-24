import {Link} from "react-router-dom"
import {useState} from "react"
import axios from "axios"

export default function RegisterPage()
{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function registerUser(ev){
       ev.preventDefault();//to prevent reloading the page
       axios.get('https://localhost:4000/test');
    }
    return (
       <div className="mt-4 grow flex items-center justify-center">
        <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">REGISTER</h1>
       <form className="max-w-lg mx-auto" onSubmit={registerUser}>
        <input type="text" 
        placeholder="Name" 
        value={name} 
        onChange = {ev => setName(ev.target.value)}/>
        <input type="email" 
        placeholder="Your@email.com" 
        value={password} 
        onChange = {ev => setPassword(ev.target.value)} />
        <input type="password" 
        placeholder="password" 
        value={email} 
        onChange = {ev => setEmail(ev.target.value)} />
        <button className="primary rounded-full w-full bg-primary text-white h-10">Register</button>
        <div className="py-2 text-center text-gray-500">
         Already a member?
         <Link className="underline text font-bold" to = {'/Login'}> Login </Link>
        </div>
        </form>
       </div>
       
       </div>
    
    );
}