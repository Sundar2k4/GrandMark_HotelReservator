import {createContext, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user,SetUser] = useState(null);

    return(
        <UserContext.Provider value={{user,SetUser}}>
           {children}
        </UserContext.Provider>
        
    );
}
