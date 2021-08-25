import { useRef, useContext, useEffect, useState, RefObject, MutableRefObject, LegacyRef} from "react";
import { AuthorContext, PdfContext, PdfTogetherContext } from "../../../Controller/Context/Context";
import { Annotation,Header,PanelTab,Tool } from '../../../Controller/Env/Component';
import { pdfjsLib,AnnotationFactory } from "../../../Controller/Env/Facades";
import { usePdfTogether } from "../../../Controller/Hooks/PdfTogether/usePdfTogether";
import { canvasDrawer} from "../../../Models/Draw/Draw";
/**
 * Stylesheet
 */
import './../../../Resources/style/style.css';
import { SearchTextField,ApproveButton, ButtonCurrentPage, RejectButton,  theme,  useStyles } from './../../../Resources/style/style';
import { Container, Paper, CssBaseline, List, ListItem, Grid, TextField, Typography} from "@material-ui/core";
import { FilterIcon, PdfIcon} from "../../../Resources/svg/icon";






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

  

  //Panel
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
        {/* Disini Header */}
        {/* <Header nextPage={nextPage} prevPage={prevPage} setPanel={setPanel} panel={panel}/> */}
      </nav>

      {/* Wrapper */}
      <Container maxWidth='xl' className={style.container} style={{marginRight:"10px"}}>

        <Grid container spacing={5}>

          {/** Tab */}
          <Grid item className={style.leftTab}>

              {/**Files Tab*/}
              <Paper variant="elevation" className={style.fileTab}>
                <div className={style.fileContent} style={{paddingTop:"19px"}}>
                  <h3>Files on Card</h3>
                </div>
                <div style={{marginTop:"10px"}}>
                  <List>
                    <ListItem>
                      <PdfIcon style={{color:'#E15D5D'}}/>
                      <span className={style.listText}>Nama file 1.pdf</span>
                    </ListItem>
                    <ListItem>
                      <PdfIcon style={{color:'#E15D5D'}}/>
                      <span className={style.listText}>Nama file 2.pdf</span>
                    </ListItem>
                    <ListItem>
                      <PdfIcon style={{color:'#E15D5D'}}/>
                      <span className={style.listText}>Nama filenya panjang sekali sehingga hampir saja tidak muat.pdf</span>
                    </ListItem>
                  </List>
                </div>
              </Paper>


              {/** Comment Tab */}
              <Paper variant="elevation" className={style.commentTab} style={{paddingTop:"20px"}}>

                {/**  Header Comment Tab, Filter, dan Search*/}
                <Grid direction="column" className={style.fileContent}  style={{marginRight:"10px"}}>
                  <Grid container direction="row" justifyContent="space-between" alignItems="flex-start"
                  style={{marginBottom:"12px",height:"16px"}}>
                    <div>
                      <h3>Comments</h3>
                    </div>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                      <span>filter</span><span style={{textAlign:"right",marginLeft:"8px"}}><FilterIcon width={14} height={14} viewBox="0 0 14px 14px" style={{color:'#434343'}}/></span>
                    </div>
                  </Grid>
                </Grid>
                <Grid style={{marginRight:"19px",marginBottom:"14px"}} className={style.fileContent}>
                  <SearchTextField size="small" type="search" label="search" variant="outlined" className={style.inputSearch}/><br/> 
                </Grid>

                  {/** Annotation dan Chat */}
                  <Grid container style={{padding:"20px 15px 17px 18px",backgroundColor:"#F8F8F8"}}>
                    <Grid container  item direction="row">
                      <Grid item style={{color:"#fff",backgroundColor:theme.palette.info.main,
                          width:'32px',height:'32px',borderRadius:'50%',paddingTop:"9px"}}>
                        <Typography align="center" variant="subtitle2">12</Typography>
                      </Grid>
                      <Grid item style={{marginLeft:"10px"}}>
                        <Typography variant="body2" color="textSecondary"> Adi</Typography>
                        <Typography variant="body2" style={{color:theme.palette.text.disabled}}>19 January 2021 - 17:30</Typography>
                      </Grid>
                    </Grid>
                    <div style={{marginTop:"10px"}}>
                      <Typography variant="body1" style={{color:theme.palette.text.primary}}>
                        Hallo apa kabar hari ini? apakah semua baik-baik saja?
                      </Typography>
                    </div>
                  </Grid>{/* End of Annotation and Chat */}

                  {/** Annotation dan Chat */}
                  <Grid container style={{padding:"20px 15px 17px 18px",backgroundColor:"#FFF"}}>
                    <Grid container  item direction="row">
                      <Grid item style={{color:"#fff",backgroundColor:theme.palette.info.main,
                          width:'32px',height:'32px',borderRadius:'50%',paddingTop:"9px"}}>
                        <Typography align="center" variant="subtitle2">12</Typography>
                      </Grid>
                      <Grid item style={{marginLeft:"10px"}}>
                        <Typography variant="body2" color="textSecondary"> Adi</Typography>
                        <Typography variant="body2" style={{color:theme.palette.text.disabled}}>19 January 2021 - 17:30</Typography>
                      </Grid>
                    </Grid>
                    <div style={{marginTop:"10px"}}>
                      <Typography variant="body1" style={{color:theme.palette.text.primary}}>
                        Hallo apa kabar hari ini? apakah semua baik-baik saja?
                      </Typography>
                    </div>
                  </Grid>{/* End of Annotation and Chat */}

              </Paper>
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
            </Paper>
          </Grid> {/**End Of Content */}

        </Grid>
      </Container> {/**End of Wrapper */}
      <Tool className={style.tool}/>
    </PdfTogetherContext.Provider>
  );

};




export default PdfTogether;