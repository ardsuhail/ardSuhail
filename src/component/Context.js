"use client"
import React,{useContext,createContext,useState} from "react";

const AppContext=createContext();

export const AppProvider=({children})=>{
   
    const [sidebarOpen,setSidebarOpen]=useState(false);
    const [adminSidebarOpen,setAdminSidebarOpen]=useState(false);

    
    return(
        <AppContext.Provider value={{
            sidebarOpen,
            setSidebarOpen,
            adminSidebarOpen,
            setAdminSidebarOpen
        }}>
            {children}
        </AppContext.Provider>
    );
}   
export const useAppContext=()=>{
    return useContext(AppContext);
}