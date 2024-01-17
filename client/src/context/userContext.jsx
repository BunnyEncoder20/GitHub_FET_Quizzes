import { useState, createContext } from 'react'

// making a empty context 
export const userContext = createContext(null);

// making the context provider
export const userContextProvider = ({children}) => {
    
    const [user, setUser] = useState({})

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}
