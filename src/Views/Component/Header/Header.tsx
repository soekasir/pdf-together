import {useContext} from "react";
import { PdfContext, PdfTogetherContext } from "../../../Controller/Context/Context";


export const Header=({nextPage,prevPage,setPanel,panel}:any)=>{
  const pdfTogether=useContext(PdfTogetherContext);
  const {pdf}=useContext(PdfContext);

  const togglePanel=(activeMode:string)=>{
    setPanel({...panel,isActive:!panel.isActive,activeMode:activeMode});
  }

  return (
    <>
        <div className="filename">
          <i>{pdf?.name}</i>
        </div>
        <div className="control">
          <span><button onClick={prevPage}>Prev</button></span>
          <span><button onClick={nextPage}>Next</button></span>
        </div>
        <div className="right-top">
          <span>
            <a className="btn" onClick={()=>togglePanel('comment')}><i className="bi bi-chat-left-dots"></i> comment</a>
            <a className="btn" onClick={pdfTogether.download}><i className="bi bi-download"></i> unduh</a>
          </span>
          <span>
          <a className="btn"><i className="bi bi-folder2-open"></i></a>
            <a className="btn"><i className="bi bi-trash"></i></a>
            <a className="btn"><i className="bi bi-share"></i></a>
            <a className="btn"><i className="bi bi-cloud-arrow-up"></i></a>
            <a className="btn"><i className="bi bi-x-circle"></i></a>
          </span>
        </div>
    </>
  );
}