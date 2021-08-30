import { useRef, useContext, useEffect, useState,} from "react";
import { AuthorContext, PdfContext, PdfTogetherContext } from "../../../Controller/Context/Context";
import { Annotation,LoadComment,Tool,AnnotDraw } from '../../../Controller/Env/Component';
import { pdfjsLib,AnnotationFactory } from "../../../Controller/Env/Facades";
import { usePdfTogether } from "../../../Controller/Hooks/PdfTogether/usePdfTogether";

/**
 * Stylesheet
 */
import './../../../Resources/style/style.css';
import { ApproveButton, ButtonCurrentPage, RejectButton, useStyles } from './../../../Resources/style/style';
import { Container, Paper, CssBaseline, List, ListItem, Grid, Typography,} from "@material-ui/core";
import { PdfIcon} from "../../../Resources/svg/icon";



const PdfTogether=()=>{

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context=useContext(PdfContext);
  const author=useContext(AuthorContext);
  const style=useStyles();
  const [pdfRef,setPdfRef] = useState<any>();
  const [currentPage,setCurrentPage] = useState(0);
  const [pdfFactory,setPdfFactory]=useState<AnnotationFactory>();


  //Mengambil file Pdf
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

      },function (reason:any) {

        console.error(reason);

      });

    }

  },[context]);





  //Merender current page
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


  const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const value=usePdfTogether(canvasRef,pdfRef,pdfFactory,context.layer,author,currentPage);



  if(!context.pdf || !context.url){   
    return <>Tidak ada file yang dipilih</>
  }


  return (
    <PdfTogetherContext.Provider value={value}>
      <CssBaseline/>
      <nav className={style.navbartop}>
        {/* Disini Header */}
      </nav>

      {/* Wrapper */}
      <Container maxWidth='xl' className={style.container} style={{marginRight:"10px"}}>

        <Grid container spacing={5}>

          {/** Tab */}
          <Grid item className={style.leftTab}>

              {/**Files Tab*/}
              <Paper variant="elevation" className={style.fileTab}>
                <div style={{paddingTop:"24px",marginLeft:"14px"}}>
                  <h3>Files on Card</h3>
                </div>
                <List style={{marginLeft:"2px",paddingTop:"4px"}}>
                  <ListItem style={{padding:"12px"}}>
                    <PdfIcon style={{color:'#E15D5D'}}/>
                    <Typography variant="subtitle2" color="textPrimary">Nama file 1.pdf</Typography>
                  </ListItem>
                  <ListItem style={{padding:"12px"}}>
                    <PdfIcon style={{color:'#E15D5D'}}/>
                    <Typography variant="subtitle2" color="textPrimary">Nama file 1.pdf</Typography>
                  </ListItem>
                  <ListItem style={{padding:"12px"}}>
                    <PdfIcon style={{color:'#E15D5D'}}/>
                    <Typography variant="subtitle2" color="textPrimary">Nama filenya panjang sekali sehingga tidak muat.pdf</Typography>
                  </ListItem>
                </List>
              </Paper>

              {/** Comment Tab */}
              <LoadComment/>

          </Grid> {/**End of Tab */}



          {/**Header dan Content */}
          <Grid item className={style.contentTab}>

            {/* Hader Content */}
            <div className={style.headerContent}>
              <div>
                <ApproveButton variant="contained" size='small' className={style.button}>
                  Approve
                </ApproveButton>
                <RejectButton variant="contained" size='small' className={style.button}>
                  Reject
                </RejectButton>
              </div>
              <div className={style.controlPage}>
                <div className={style.segitigaKiri}></div>
                <div><ButtonCurrentPage>1/4</ButtonCurrentPage></div>
                <div className={style.segitigaKanan}></div>
              </div>
              <div></div>
            </div>
            {/**Content Canvas */}
            <Paper variant="elevation" className={style.content}>
              <canvas ref={canvasRef} className={style.canvas}></canvas>
              <Annotation/>
              <AnnotDraw/>
            </Paper>
          </Grid> {/**End Of Content */}

        </Grid>
      </Container> {/**End of Wrapper */}
      <Tool className={style.tool}/>
    </PdfTogetherContext.Provider>
  );

};

export default PdfTogether;