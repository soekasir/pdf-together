import { useRef, useContext, useEffect, useState} from "react";
import { AuthorContext, PdfContext } from "../../../Controller/Context/Context";
import { PdfTogetherContextProvider } from "../../../Controller/Context/PdfTogetherContextProvider";
import { Annotation,AnnotationImg,Header,PanelTab,Tool } from '../../../Controller/Env/Component';
import { usePdfCanvas } from "../../../Controller/Hooks/PdfCanvas/usePdfCanvas";
import { canvasDrawer, Draw } from "../../../Models/Draw/Draw";
import './../../../Resources/css/PdfTogether.css';

const PdfTogether=()=>{
  const canvasRef = useRef();
  const context=useContext(PdfContext);
  const author=useContext(AuthorContext);
  const [pdfRef,renderPage,pdfFactory]=usePdfCanvas({url:context.url,canvasRef:canvasRef});
  const [draw,setDraw]=useState(undefined);

  useEffect(()=>{
    setDraw(canvasDrawer(canvasRef));
  },[canvasRef]);

  if(!context.pdf || !context.url){
    return <>Tidak ada file yang dipilih</>
  }

  return (
    <PdfTogetherContextProvider
      canvasRef={canvasRef} pdfRef={pdfRef}
      renderPage={renderPage} pdfFactory={pdfFactory}
      draw={draw} layer={context.layer} author={author}>

      <Header/>

      <div id="content">
          {/* <AnnotationImg/> */}
          <canvas ref={canvasRef}></canvas>
          <Annotation/>
      </div>

      <Tool/>

      <PanelTab/>

    </PdfTogetherContextProvider>
  );

};

export default PdfTogether;