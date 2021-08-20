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
import { useStyles } from './../../../Resources/style/style';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Paper, Typography, Grid, GridSpacing, CssBaseline } from "@material-ui/core";





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
  const style=useStyles();
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
      <CssBaseline/>
      <nav className={style.navbartop}>
        <Header nextPage={nextPage} prevPage={prevPage} setPanel={setPanel} panel={panel}/>
      </nav>
      <Container maxWidth='xl' className={style.container}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper variant="outlined" className={style.fileTab}>
              ini File Tab {/* <PanelTab panel={panel}/> */}
            </Paper>
            <Paper variant="outlined" className={style.commentTab}>
              ini Comment Tab
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={style.headerContent}>
            Ini header content  
            </Paper> {/** ini header content */}
            <Paper className={style.content}>
              <canvas ref={canvasRef} className={style.canvas}></canvas>
              <Annotation/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </PdfTogetherContext.Provider>
  );

};

export default PdfTogether;