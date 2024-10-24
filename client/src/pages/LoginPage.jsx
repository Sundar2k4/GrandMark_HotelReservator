import Header from "../Header";
import {Link} from "react-router-dom"

export default function LoginPage()
{
    return (
       <div className="mt-4 grow flex items-center justify-center">
        <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">LOGIN</h1>
       <form className="max-w-lg mx-auto">
        <input type="email" placeholder="Your@email.com" />
        <input type="password" placeholder="password" />
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