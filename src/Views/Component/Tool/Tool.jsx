import {useContext} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";

export const Tool=()=>{
  const pdfTogether=useContext(PdfTogetherContext);
  
  return (
    <>
      <div id="tool">
        <a onClick={()=>{pdfTogether.selectMode(null)}} className="btn"><i class="bi bi-x-square"></i></a>
        {' || '}
        <a onClick={()=>{pdfTogether.selectMode('Draw')}} className="btn"><i class="bi bi-pencil"></i></a>
        <a onClick={()=>{pdfTogether.selectMode('Img')}} className="btn"><i class="bi bi-images"></i></a>
        {' || '}
        <a onClick={()=>{pdfTogether.selectMode('Annotation')}} className="btn"><i class="bi bi-flag"></i></a>
      </div>
    </>
  )
}