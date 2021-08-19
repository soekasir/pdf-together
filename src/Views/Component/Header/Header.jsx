import {useContext} from "react";
import { PdfContext, PdfTogetherContext } from "../../../Controller/Context/Context";

export const Header=()=>{
  const pdfTogether=useContext(PdfTogetherContext);
  const {pdf}=useContext(PdfContext);

  return (
    <>
      <div id="navbar-top">
        <div className="filename">
          <i>{pdf.name}</i>
        </div>
        <div className="control">
          <button onClick={pdfTogether.prevPage}>Prev</button>
          <select onChange={(e)=>{pdfTogether.setScale((e.target.value/100));}}>
            <option value={50}>50%</option>
            <option value={100} selected>100%</option>
            <option value={125}>125%</option>
            <option value={150}>150%</option>
            <option value={200}>200%</option>
          </select>
          <button onClick={pdfTogether.nextPage}>Next</button>
        </div>
        <div className="right-top">
          <span>
            <a className="btn" onClick={pdfTogether.togglePanel}><i class="bi bi-chat-left-dots"></i> comment</a>
            <a className="btn" onClick={pdfTogether.download}><i class="bi bi-download"></i> unduh</a>
          </span>
          <span>
          <a className="btn"><i class="bi bi-folder2-open"></i></a>
            <a className="btn"><i class="bi bi-trash"></i></a>
            <a className="btn"><i class="bi bi-share"></i></a>
            <a className="btn"><i class="bi bi-cloud-arrow-up"></i></a>
            <a className="btn"><i class="bi bi-x-circle"></i></a>
          </span>
        </div>
      </div>
    </>
  );
}