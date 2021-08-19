import { AuthorContext} from "./Context";
import { ReactChildren} from "react";
import { Author } from "../../Models/Main/MainModel";

interface PropAuthorContextProvider{
  children:ReactChildren,
}

/**
 * Set value for PdfContextProvider
 */
export const AuthorContextProvider=({children}:PropAuthorContextProvider)=>{

  let author=new Author({
    name:'saya',
    id_user:'1',
  });

  return (
    <AuthorContext.Provider value={author}>
      {children}
    </AuthorContext.Provider>
  );
}