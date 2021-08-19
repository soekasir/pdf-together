import {useState, useEffect,useRef} from "react";
import { usePdfCanvas } from "../../../Controller/Hooks/PdfCanvas/usePdfCanvas";

const SelectPreview=({url,scale=1,page=1})=>{
  const canvasRef = useRef();
  const [pdfRef,renderPage]=usePdfCanvas({url:url,canvasRef:canvasRef});
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    renderPage({pageNum:currentPage,scale:scale,pdf:pdfRef});
  }, [pdfRef,currentPage]);

  const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <>
      <div >
        <canvas ref={canvasRef}></canvas>
      </div>
      <div>
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </>
  );
};

export default SelectPreview;