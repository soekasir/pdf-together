import {useContext} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { LoadComment } from "../Comment/Comment";

export const PanelTab=()=>{
  const pdfTogether=useContext(PdfTogetherContext);

  
  if(pdfTogether.prop.panel.isActive!==true) return null;

  if(pdfTogether.prop.panel.activeMode==='comment') return (
      <div id="panel">
        <div className="option">
          option
        </div>
        <LoadComment/>
      </div>
  );

}