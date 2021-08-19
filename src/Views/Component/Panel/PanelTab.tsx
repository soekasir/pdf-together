import { OptionPanel } from "../../Page/PdfTogether/PdfTogether";
import { LoadComment } from "../Comment/Comment";


export const PanelTab=({panel}:{panel:OptionPanel})=>{
  
  if(panel.isActive!==true) return null;

  if(panel.activeMode==='comment') return (
      <div id="panel">
        <div className="option">
          option
        </div>
        <LoadComment/>
      </div>
  );

  return null;

}