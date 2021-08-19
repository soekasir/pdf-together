import {useContext} from "react";
import { useHistory } from "react-router-dom";
import { PdfContext } from "../../../Controller/Context/Context";
import SelectPreview from "./SelectPreview";





export const SelectPdf=()=>{
  
  const context=useContext(PdfContext);
  const history=useHistory();

  const setPdfFiles=(e:React.FormEvent<HTMLInputElement>)=>{
    if(e.currentTarget.files){
      context.setPdf(e.currentTarget.files[0]);
    }
  }

  const openPdf=()=>{
    history.push('/pdf-together');
  }

  return(
    <>
      <input className="form-control" type="file" accept=".pdf" name="content" onChange={setPdfFiles} />
      {context.pdf?<button onClick={openPdf}>open</button>:null}
      {context.url?<SelectPreview url={context.url} scale={.5}/>:null}
    </>
  )
};