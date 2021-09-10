import { useRef, useContext, useEffect, useState } from "react";
import {  PdfContext, PdfTogetherContext} from "../../../Controller/Context/Context";
import { pdfjsLib } from "../../../Controller/Env/Facades";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { CurrentPage } from "../../../Models/Main/MainPdfTogether";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import { PageViewport } from "pdfjs-dist/types/display/display_utils";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
/** Stylesheet */
import './../../../Resources/style/style.css';
import { ButtonCurrentPage, theme, useStyles } from './../../../Resources/style/style';
import { Container, Paper, CssBaseline, List, ListItem, Grid, Typography, Button,} from "@material-ui/core";
import { PdfIcon} from "../../../Resources/svg/icon";
import {Tool,CostumForm,CanvasPoint,LoadComment,AnnotDraw,Annotation} from "./../../Component/PdfTogether";

const CursorClassName=(mode:Type.Mode|null)=>mode===Type.Mode.Annotation?"cursor crosshair":mode===Type.Mode.Draw?"cursor crosshair":"cursor";

const PdfTogether:React.FC=()=>{

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const store=useRef({lastRenderPage:0,pages:new Map<number,{proxy:PDFPageProxy,viewport:PageViewport}>(),isStillRendering:false});

  const context=useContext(PdfContext);

  const style=useStyles();

  const [pdfRef,setPdfRef] = useState<any>();

  const [currentPage,setCurrentPage] = useState<CurrentPage>({pageNum:0,actualSize:{width:0,height:0}});

  // const [pdfFactory,setPdfFactory]=useState<AnnotationFactory>(); //belum dibutuhkan tp jgn dihapus

  const [mode,setMode]=useState<Type.Mode>(Type.Mode.Null);

  const [point,setPoint]=useState<Type.Point>({x:0,y:0});

  const [layer,setLayer]=useState<LayerContract.ArrayLayer[]>(context.layerManager.getAll());

  context.layerManager.setPoint(point);

  const setCurrentPageInit=()=>setCurrentPage( curr => ({...curr,pageNum:1}) );

  const setCurrentPageNum=(pageNum:number)=>{
    if(pageNum<=pdfRef.numPages) setCurrentPage( curr => ({...curr,pageNum:pageNum}) );
  };

  const setCurrentPageActuallSize=(size:Type.size)=>setCurrentPage(curr=>({...curr,actualSize:size}));

  const setModeHandle=(typemode:Type.Mode)=>typemode===mode?setMode(Type.Mode.Null):setMode(typemode);

  useEffect(()=>{ context.layerManager.setModeDispatch(setMode); context.layerManager.setLayerDispatch(setLayer); },[]);

  useEffect(()=>{ context.layerManager.setCurrentPage(currentPage); },[currentPage]);

  useEffect(()=>{ context.layerManager.setCanvasref(canvasRef); },[canvasRef]);

  useEffect(()=>{ //Mengambil file Pdf
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

  // Merender current page
  useEffect(()=> {

    //Check if pagenum isnt 0, and last rendered page isnt same with new currentPage, and canvas isnt rendering process
    if(pdfRef && currentPage.pageNum>0 && store.current.lastRenderPage!==currentPage.pageNum && !store.current.isStillRendering){
      
      //check is canvas context defined/loaded, and check is store having new currentPage,
      //if true then render page after take it from store
      let page=store.current.pages.get(currentPage.pageNum);
      let canvasContext=canvasRef.current?.getContext("2d");
      if(page && canvasContext){

        store.current.isStillRendering=true;
        let rend=page.proxy.render({viewport:page.viewport,canvasContext:canvasContext});
        rend.promise.then(()=>{
          store.current.isStillRendering=false;
          store.current.lastRenderPage=currentPage.pageNum;
        });

      }else{ //store didnt have new currentPage. Process to get pdf page from pdfjsLib

        pdfRef.getPage(currentPage.pageNum).then(function(page:PDFPageProxy) {

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

              //check is still rendering another page
              //if not, then save pdfPage in store, then render it.
              if(!store.current.isStillRendering){
                store.current.isStillRendering=true;
                store.current.pages.set(currentPage.pageNum,{proxy:page,viewport:viewport});
                let rend=page.render(renderContext);
                rend.promise.then(()=>{
                  store.current.isStillRendering=false;
                  store.current.lastRenderPage=currentPage.pageNum;
                });
              }
            }
          }

        });
      }
    }
  }, [currentPage.pageNum]);

  const nextPage = () => pdfRef && currentPage.pageNum < pdfRef.numPages && setCurrentPageNum(currentPage.pageNum + 1);

  const prevPage = () => currentPage.pageNum > 1 && setCurrentPageNum(currentPage.pageNum - 1);


  if( !context.url ){
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

        <Grid container style={{minWidth:"100%"}} justifyContent="space-evenly">

          {/** Tab */}
          <Grid item className={style.leftTab} xs={12}>

              {/**Files Tab*/}
              <Paper variant="elevation" style={{width:'100%',minWidth:"255px",height:"237px",marginTop:"36px",boxShadow:"none",paddingBottom:"30px",borderRadius:"8px"}}>
                <div style={{paddingTop:"24px",marginLeft:"14px"}}>
                  <Typography variant="h3">Files on Cards</Typography>
                </div>
                <List style={{marginLeft:"2px",marginTop:"4px",overflow:"auto",maxHeight:"170px"}} className="costum-scroll">
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
          <Grid item className={style.contentTab} xs={12}>

            {/* Hader Content */}
            <div className={style.headerContent}>
              <div style={{flexGrow:0}} className={style.headerContentButton}>
                <Button style={{
                      height:42,
                      width:85,
                      color: '#fff',
                      lineHeight:'17px',
                      backgroundColor: theme.palette.success.main,
                      margin:'8px'
                }}>Approve</Button>
                <Button variant="contained" size='small' style={{
                  height:42,
                  width:85,
                  color: '#fff',
                  lineHeight:'17px',
                  backgroundColor: theme.palette.secondary.main,
                  margin:'8px'
                }}>Reject</Button>
              </div>
              <div className={style.controlPage} style={{flexGrow:3,display:"flex",justifyContent:"center"}}>
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
              <div style={{flexGrow:1}}></div>
            </div>
            {/**Content Canvas */}
            <Paper variant="elevation" style={{boxShadow:"none",display:'flex',justifyContent:'center',
              marginTop:"13px",width:'100%',padding:"10px",}}>
              <div className={getCursor} style={{width:"100%"}}>
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