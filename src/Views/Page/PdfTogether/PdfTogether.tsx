import { useRef, useContext, useEffect, useState, RefObject, MutableRefObject, LegacyRef} from "react";
import { AuthorContext, PdfContext, PdfTogetherContext } from "../../../Controller/Context/Context";
import { Annotation,Header,PanelTab,Tool } from '../../../Controller/Env/Component';
import { pdfjsLib,AnnotationFactory } from "../../../Controller/Env/Facades";
import { usePdfTogether } from "../../../Controller/Hooks/PdfTogether/usePdfTogether";
import { canvasDrawer} from "../../../Models/Draw/Draw";
// import './../../../Resources/css/PdfTogether.css';


/**
 * Stylesheet
 */
import './../../../Resources/style/style.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';






export interface OptionPanel{

    isActive:boolean,

    activeMode:string, //comment, file, trash, share, upload

    commentTab:{

      isLoadAll:boolean,

    },

    fileTab:{

      //option here

    },
    trashTab:{

      //option here

    },

    shareTab:{

      //option here

    },

    uploadTab:{

      //option here

    }

}




const PdfTogether=()=>{




  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context=useContext(PdfContext);
  const author=useContext(AuthorContext);
  const [pdfRef,setPdfRef] = useState<any>();
  const [currentPage,setCurrentPage] = useState(0);
  const [pdfFactory,setPdfFactory]=useState<AnnotationFactory>();




  useEffect(()=>{
    if(context.url){
      const loadingTask = pdfjsLib.getDocument(context.url);

      loadingTask.promise.then((loadedPdf:any) => {

        setPdfRef(loadedPdf);
        setCurrentPage(1);

        loadedPdf.getData().then( (data:Uint8Array) => {
          let pdfFactory = new AnnotationFactory(data);
          setPdfFactory(pdfFactory);
        });
      }, function (reason:any) {
        console.error(reason);
      });
    }
  },[context]);


  useEffect(()=> {
  
    if(pdfRef) pdfRef.getPage(currentPage).then(function(page:any) {
      let viewport = page.getViewport({scale: 1});
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

  



  
  const [panel,setPanel]=useState<OptionPanel>({
    isActive:false,
    activeMode:'comment', //comment, file, trash, share, upload
    commentTab:{
      isLoadAll:true,
    },
    fileTab:{
      //option here
    },
    trashTab:{
      //option here
    },
    shareTab:{
      //option here
    },
    uploadTab:{
      //option here
    }
  });






  const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);




  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);




  const draw=canvasDrawer(canvasRef);




  const value=usePdfTogether(canvasRef,pdfRef,pdfFactory,draw!,context.layer,author,currentPage);




  if(!context.pdf || !context.url){
    return <>Tidak ada file yang dipilih</>
  }







  return (
    <PdfTogetherContext.Provider value={value}>
          <Header nextPage={nextPage} prevPage={prevPage} setPanel={setPanel} panel={panel}/>

          <div id="content">
              {/* <AnnotationImg/> */}
              <canvas ref={canvasRef}></canvas>
              <Annotation/>
          </div>

          <Tool/>

          <PanelTab panel={panel}/>
    </PdfTogetherContext.Provider>
  );

};

export default PdfTogether;