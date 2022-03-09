import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext()

const ContextApi = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const auth = getAuth()

    useEffect(()=>{

        onAuthStateChanged(auth,(user)=>{
            setUser(user)
            setLoading(false)
        })

    },[])
    
    if(loading){
        return "Loading"
    }


    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextApi;