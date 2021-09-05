import { AuthorContext} from "./Context";
import { Author } from "../../Models/Main/MainModel";
import { useState } from "react";


interface PropAuthorContextProvider{
  children:React.ReactChild,
}




/**
 * Set value for PdfContextProvider
 */
export const AuthorContextProvider=({children}:PropAuthorContextProvider)=>{

  const [author,setAuthor]=useState<Author>(new Author({
    name:'Saya',
    id_user:'1',
  }));

  return (
    <AuthorContext.Provider value={author}>
      {children}
    </AuthorContext.Provider>
  );
}