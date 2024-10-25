import {Link} from "react-router-dom"
import {useState} from "react"
import axios, { Axios } from "axios"

export default function RegisterPage()
{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function registerUser(ev){ //ev is used to store the data name email and password and send it to the function
       ev.preventDefault();//to prevent reloading the page
       try
       {
       await axios.post('/register',{
         name,
         email,
         password,
       });

       alert("Registration Successfull");
       
      }catch(e)
      {
         alert("registration failed please try again later");
      }
    }
    return (
       <div className="mt-4 grow flex items-center justify-center">
        <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">REGISTER</h1>
       <form className="max-w-lg mx-auto" onSubmit={registerUser}>
        <input type="text" placeholder="Name" value={name} onChange = {ev => setName(ev.target.value)}/> 
        <input type="email" placeholder="Your@email.com" value={email} onChange = {ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="password" value={password} onChange = {ev => setPassword(ev.target.value)} />
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