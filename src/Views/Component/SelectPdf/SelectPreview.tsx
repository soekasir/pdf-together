import {useState, useEffect, useRef, useLayoutEffect, useCallback} from "react";
import { pdfjsLib,AnnotationFactory } from "../../../Controller/Env/Facades";







const SelectPreview=({url,scale=1}:{url:string,scale:number})=>{

  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [pdfRef, setPdfRef] = useState<any>();
  // const [pdfFactory,setPdfFactory]=useState<AnnotationFactory>();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if(url){
      const loadingTask = pdfjsLib.getDocument(url);

      loadingTask.promise.then((loadedPdf:any) => {

        setPdfRef(loadedPdf);
        setCurrentPage(1);

        // loadedPdf.getData().then( (data:Uint8Array) => {
        //   let pdfFactory = new AnnotationFactory(data);
        //   setPdfFactory(pdfFactory);
        // });
      }, function (reason:any) {
        console.error(reason);
      });
    }

  }, [url]);
  




  useEffect(()=> {
    pdfRef && pdfRef.getPage(currentPage).then(function(page:any) {
      let viewport = page.getViewport({scale: scale});
      let canvas = canvasRef.current;
      if(canvas){
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        
        page.render(renderContext);
      }

    });
  }, [currentPage]);



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

}

export default SelectPreview;