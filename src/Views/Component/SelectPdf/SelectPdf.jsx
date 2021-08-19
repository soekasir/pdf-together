import {useContext} from "react";
import { useHistory } from "react-router-dom";
import { PdfContext } from "../../../Controller/Context/Context";
import SelectPreview from "./SelectPreview";


const Preview=({url})=>{

    if(typeof url==='string'){
      return (<SelectPreview url={url} scale={.5}/>);
    }else{
      return (<p>File pdf belum diatur.</p>);
    }
};

export const SelectPdf=()=>{
  const context=useContext(PdfContext);
  const history=useHistory();

  const setPdfFiles=(e)=>{
    context.setPdf(e.target.files[0]);
  }

  const openPdf=()=>{
    history.push('/pdf-together');
  }

  return(
    <>
      <input className="form-control" type="file" accept=".pdf" name="content" onChange={setPdfFiles} />
      {context.pdf?<button onClick={openPdf}>open</button>:null}
      <Preview url={context.url}/>
    </>
  )
};