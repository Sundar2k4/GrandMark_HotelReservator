import axios from "axios";
import {createContext, useEffect, useState} from "react";
export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    const [ready,setReady] =  useState(false);
    useEffect(()=>
    {
        if(!user)
        {
            axios.get('/profile').then(({data})=>
                {
                    setUser(data); //fetches the email
                    setReady(true);
                });

        }
        
       
    },[]);
    return(
        <UserContext.Provider value={{user,setUser,ready}}>
           {children}
        </UserContext.Provider>
        
    );
}
