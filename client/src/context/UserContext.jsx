import { useState, createContext } from 'react'

// making a empty context 
export const UserContext = createContext(null);

// making the context provider
export const UserContextProvider = ({children}) => {
    
    const [user, setUser] = useState({})

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
