import {useContext} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { Validation as Type } from "../../../Models/Interfaces/Type";






export const Tool=()=>{
  const pdfTogether=useContext(PdfTogetherContext);
  
  return (
    <>
      <div id="tool">
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Null)}} className="btn"><i className="bi bi-x-square"></i></a>
        {' || '}
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Draw)}} className="btn"><i className="bi bi-pencil"></i></a>
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Img)}} className="btn"><i className="bi bi-images"></i></a>
        {' || '}
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Annotation)}} className="btn"><i className="bi bi-flag"></i></a>
      </div>
    </>
  )
}