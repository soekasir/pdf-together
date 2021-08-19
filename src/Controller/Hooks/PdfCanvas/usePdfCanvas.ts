import { useState, useEffect, useCallback, RefObject } from "react";
import {AnnotationFactory,pdfjsLib} from '../../Env/Facades';

interface PdfCanvas{
  url:string,
  canvasRef:RefObject<HTMLCanvasElement>
}

export const usePdfCanvas=({url,canvasRef}:PdfCanvas):[any,any,AnnotationFactory|undefined]=>{
  
  const [pdfRef, setPdfRef] = useState();
  const [pdfFactory,setPdfFactory]=useState<AnnotationFactory>();

  const renderPage = useCallback(({pdf=pdfRef,pageNum=1,scale=1})=> {
    pdf && pdf.getPage(pageNum).then(function(page:any) {
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
  }, [pdfRef]);

  useEffect(() => {
    if(url){
      const loadingTask = pdfjsLib.getDocument(url);

      loadingTask.promise.then((loadedPdf:any) => {

        setPdfRef(loadedPdf);

        loadedPdf.getData().then( (data:Uint8Array) => {
          let pdfFactory = new AnnotationFactory(data);
          setPdfFactory(pdfFactory);
        });

      }, function (reason:any) {
        console.error(reason);
      });
    }

  }, [url]);

  return [pdfRef,renderPage,pdfFactory];

}