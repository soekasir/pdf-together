import { AuthorContext} from "./Context";
import { Author } from "../../Models/Main/MainModel";


interface PropAuthorContextProvider{
  children:React.ReactChild,
}




/**
 * Set value for PdfContextProvider
 */
export const AuthorContextProvider=({children}:PropAuthorContextProvider)=>{

  let author=new Author({
    name:'Saya',
    id_user:'1',
  });

  return (
    <AuthorContext.Provider value={author}>
      {children}
    </AuthorContext.Provider>
  );
}