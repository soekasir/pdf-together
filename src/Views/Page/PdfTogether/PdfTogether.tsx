import { useRef, useContext, useEffect, useState, } from "react";
import {  PdfContext, PdfTogetherContext} from "../../../Controller/Context/Context";
import { Annotation,LoadComment,Tool,AnnotDraw } from '../../../Controller/Env/Component';
import { pdfjsLib} from "../../../Controller/Env/Facades";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { CurrentPage } from "../../../Models/Main/MainPdfTogether";
import { Validation as Type } from "../../../Models/Interfaces/Type";
/**
 * Stylesheet
 */
import './../../../Resources/style/style.css';
import { ApproveButton, ButtonCurrentPage, RejectButton, useStyles } from './../../../Resources/style/style';
import { Container, Paper, CssBaseline, List, ListItem, Grid, Typography,} from "@material-ui/core";
import { PdfIcon} from "../../../Resources/svg/icon";
import { CanvasPoint } from "../../Component/Canvas/Canvas";
import { CostumForm } from "../../Component/Costum/Form";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";

const CursorClassName=(mode:Type.Mode|null)=>{
  if(mode===Type.Mode.Annotation){
    return "cursor crosshair";
  }

  if(mode===Type.Mode.Draw){
    return "cursor crosshair";
  }

  return "cursor";

}



const PdfTogether=()=>{

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const context=useContext(PdfContext);

  const style=useStyles();

  const [pdfRef,setPdfRef] = useState<any>();
  const [currentPage,setCurrentPage] = useState<CurrentPage>({pageNum:0,actualSize:{width:0,height:0}});
  // const [pdfFactory,setPdfFactory]=useState<AnnotationFactory>(); //belum dibutuhkan tp jgn dihapus
  const [mode,setMode]=useState<Type.Mode>(Type.Mode.Null);
  const [point,setPoint]=useState<Type.Point>({x:0,y:0});
  const [layer,setLayer]=useState<LayerContract.ArrayLayer[]>(context.layerManager.getAll());

  context.layerManager.setPoint(point);  //supaya tiap page dirender point dilayer manager jg berubah

  const setCurrentPageInit=()=>{
      let newCurrentPage={...currentPage};
      newCurrentPage.pageNum=1;
      setCurrentPage(newCurrentPage);
  }

  const setCurrentPageNum=(pageNum:number)=>{
    if(pageNum<=pdfRef.numPages){
      let newCurrentPage={...currentPage};
      newCurrentPage.pageNum=pageNum;
      setCurrentPage(newCurrentPage);
    }
  }

  const setCurrentPageActuallSize=(size:Type.size)=>{
    let newCurrentPage={...currentPage};
    newCurrentPage.actualSize=size;
    setCurrentPage(newCurrentPage);
  }

  const setModeHandle=(typemode:Type.Mode)=>{

    if(typemode!==mode){ 
      setMode(typemode);
    }else{
      setMode(Type.Mode.Null);
    }

  }

  useEffect(()=>{
    context.layerManager.setModeDispatch(setMode);
    context.layerManager.setLayerDispatch(setLayer);
  },[]);

  useEffect(()=>{
    context.layerManager.setCurrentPage(currentPage);
  },[currentPage]);

  useEffect(()=>{
    context.layerManager.setCanvasref(canvasRef);
  },[canvasRef]);

  //Mengambil file Pdf
  useEffect(()=>{
    if(context.url){

      const loadingTask = pdfjsLib.getDocument(context.url);

      loadingTask.promise.then((loadedPdf) => {

        setPdfRef(loadedPdf);
        setCurrentPageInit();

        /**Belum dibutuhkan, tapi jangan dihapus */
        // loadedPdf.getData().then((data) => {
        //     let pdfFactory = new AnnotationFactory(data);
        //     setPdfFactory(pdfFactory);
        // });

      },function (reason:any) {

        console.error(reason);

      });

    }

  },[context.url]);

  // Mengisi Fetch dr abstract FetchLayer
  // context.layerManager.setFetch(disini );


  // Merender current page
  useEffect(()=> {
  
    if(pdfRef) pdfRef.getPage(currentPage.pageNum<=0?1:currentPage.pageNum).then(function(page:PDFPageProxy) {

      let viewport = page.getViewport({scale: 2});
      let canvas = canvasRef.current;
      
      let actualSize=page.getViewport({scale: 1});
      setCurrentPageActuallSize({height:actualSize.height,width:actualSize.width});

      if(canvas){
        let renderingContext=canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if(renderingContext){
          let renderContext = {

            canvasContext: renderingContext,

            viewport: viewport

          };
          
          page.render(renderContext);
        }
      }

    });

  }, [currentPage.pageNum]);

  const nextPage = () => pdfRef && currentPage.pageNum < pdfRef.numPages && setCurrentPageNum(currentPage.pageNum + 1);

  const prevPage = () => currentPage.pageNum > 1 && setCurrentPageNum(currentPage.pageNum - 1);


  if(!context.pdf || !context.url ){
    return <>Tidak ada file yang dipilih</>
  }

  const getCursor=CursorClassName(mode);

  const value={
    layers:layer,
    currentPage:currentPage,
  }


  return (
    <>
    <PdfTogetherContext.Provider value={value}>
      <CssBaseline/>
      <nav className={style.navbartop}>
        {/* Disini Header */}
      </nav>

      {/* Wrapper */}
      <Container maxWidth='xl' className={style.container}>

        <Grid container style={{minWidth:"100%"}}
        justifyContent="space-evenly">

          {/** Tab */}
          <Grid item className={style.leftTab} xs={12}>

              {/**Files Tab*/}
              <Paper variant="elevation"
              style={{width:'100%',
              minWidth:"255px",
              height:"237px",
              marginTop:"36px",
              boxShadow:"none",}}>
                <div style={{paddingTop:"24px",marginLeft:"14px"}}>
                  <Typography variant="h3">Files on Cards</Typography>
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
          <Grid item xl={9} lg={9} md={8} sm={6} xs={12}>

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
                <div className={style.segitigaKiri} onClick={prevPage}></div>
                <div><ButtonCurrentPage>
                  <CostumForm

                    handleChange={(e)=>{
                      const num=Number(e.currentTarget.value);
                      setCurrentPageNum(num);
                    }}

                    value={currentPage.pageNum}
                    InputProps={{style:{color:"#fff"}}}
                    style={{width:"20px"}}
                    />
                  {"/ "+(pdfRef?pdfRef.numPages:null)}

                  </ButtonCurrentPage>
                </div>
                <div className={style.segitigaKanan} onClick={nextPage}></div>
 
              </div>
              <div></div>
            </div>
            {/**Content Canvas */}
            <Paper variant="elevation" style={{boxShadow:"none",display:'flex',justifyContent:'center',
              marginTop:"13px",width:'100%',padding:"10px",}}>
              <div className={getCursor}>
                <CanvasPoint canvasRef={canvasRef} className={style.canvas} setPoint={setPoint}/>
              </div>
              <Annotation mode={mode} pageNum={currentPage.pageNum}/>
              <AnnotDraw mode={mode}/>
            </Paper>
          </Grid> {/**End Of Content */}
        </Grid>
      </Container> {/**End of Wrapper */}
      <Tool setModeHandle={setModeHandle}/>
      </PdfTogetherContext.Provider>
    </>
  );

};

export default PdfTogether;