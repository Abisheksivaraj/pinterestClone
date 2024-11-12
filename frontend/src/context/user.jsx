import { Children, createContext,useContext } from "react";

const userContext = createContext()

export const UserProvider = ({Children})=>{
  return (
    <userContext.Provider value={{user:"xyz"}}>
      {Children}
    </userContext.Provider>
  )
};

export const userData = ()=> useContext(userContext)