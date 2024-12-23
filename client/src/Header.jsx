import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { UserContext } from './UserContext';

export default function Header()
{
  const {user} = useContext(UserContext);
    return (
 
        <div>
            <header className='p-4 flex justify-between'>
      <a href="/" className="flex text-[30px] font-serif items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90 size-[50px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
      <span className='italic hover:not-italic'>GrandMark</span>
      </a>
      <div className='flex p-4 gap-3 border border-grey-500 rounded-full'>
        <div>Anywhere</div>
        <div className='border border-l border-gray-300 rounded-full text-gray-300'></div>
        <div>Any week</div>
        <div className='border border-l border-gray-300 rounded-full text-gray-300'></div>
        <div className='text-grey-300'>Add guests</div>
        <button className='bg-primary text-white border border-5 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </button>
      </div>
      <Link to = {user?'/account':'/login'} className="flex p-4 gap-3 border border-grey-500 rounded-full">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <div className='border border-l border-gray-300 rounded-full text-gray-300'></div>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      </div>
      {!!user && (
        <div>

          {user.name} {/*this is to print the user name after logging in*/}

        </div>

      )}
      </Link>
    </header>
        </div>

    );
}