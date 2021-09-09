import { AuthorContext} from "./Context";
import { Author } from "../../Models/Main/MainModel";
import { useState } from "react";
import { AccesAdmin } from "../../Models/Interfaces/Access";


interface PropAuthorContextProvider{
  children:React.ReactChild,
}

/**
 * Set value for PdfContextProvider
 */
export const AuthorContextProvider=({children}:PropAuthorContextProvider)=>{

  const [author,setAuthor]=useState<Author|undefined>(new Author({
    name:"saya",
    id_user:'1',
    access:AccesAdmin
  }));

  const value={
    author:author,
    setAuthor:setAuthor
  }

  return (
    <AuthorContext.Provider value={value}>
      {children}
    </AuthorContext.Provider>
  );
}