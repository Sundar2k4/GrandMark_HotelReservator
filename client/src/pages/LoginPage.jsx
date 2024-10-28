import {Link} from "react-router-dom"
import {useContext,useState } from "react";
import axios from "axios";
import {Navigate} from "react-router-dom"; 
import { UserContext } from "../UserContext.jsx";
export default function LoginPage()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev)  
    {
       ev.preventDefault();
       try{
           const {data} = await axios.post('/login',{email,password});
           setUser(data);
           setRedirect(true);
           alert('User Login Successfull');
        }catch(e)
        {
            console.error(e)
            alert('User Login Failed')
        }
       
    }

    if(redirect)
    {
       return <Navigate to = {'/'}/>
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