import React, { useState,useContext} from "react";
import { Layer } from "../Layer/Layer";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import * as Models from "../../../Models/Main/MainModel";
import { ReplyForm } from "../Comment/Reply";
import { Layers } from "@material-ui/icons";
import { BottomNavigation, BottomNavigationAction, Chip, Grid, InputBase, InputLabel, Paper, TextField, Typography } from "@material-ui/core";
import { useStylesAnnotation } from "../../../Resources/style/annotation";
import { IconPeople, IconSendEmail,  IconThreeDot, IconUrl, IconVerified, PdfIcon } from "../../../Resources/svg/icon";
import { ReplyTextField} from "../../../Resources/style/annotation";
import { theme } from "../../../Resources/style/style";


interface PropAnnotation{
  className:string,
  color:string,
  point:Type.PointCanvas,
  displayDefault:Type.LayerDisplay,
  layer?:LayerContract.LayerAnnotation
}



export const AnnotationMain:React.FC<PropAnnotation>=(prop)=>{




  const pdfTogether=useContext(PdfTogetherContext);
  const formDefault=prop.layer?prop.layer.content:{annot:'',isSolved:false};
  const [form,setForm]=useState<LayerContract.Annotation>(formDefault);







  const [option,setOption]=useState({
    isShowReply:true,
    display:prop.displayDefault,
    isShowFormReply:false
  });





  const setDisplay=(display_to:Type.LayerDisplay)=>{
    let newOption={...option};
    newOption.display=display_to;
    setOption(newOption);
  }





  const togleShowReply=()=>{
    let newOption={...option};
    newOption.isShowReply=!option.isShowReply;
    setOption(newOption);
  }





  const togleShowFormReply=()=>{
    let newOption={...option};
    newOption.isShowFormReply=!option.isShowFormReply;
    setOption(newOption);
  }





  const handleAnnot=(e:React.FormEvent<HTMLInputElement>)=>{
    let newForm={...form};

    newForm.annot=e.currentTarget.value;

    setForm(newForm);

  };







  const handleIsSolved=()=>{
    let newForm={...form};

    newForm.isSolved=!form.isSolved;

    if(prop.layer && prop.layer.id){
      setForm(newForm);
      pdfTogether.updateLayerContent(prop.layer.id,newForm);
    }
  }





  const handleSubmit=(e:any)=>{
    e.preventDefault();
    let annot=new Models.Annotation(form);
    pdfTogether.addAnnotation(annot);
  }




  /** COMPONENT BEGIN */
  const annotationForm=()=>{
    return (
      <form onSubmit={handleSubmit}>
          {icon(Type.LayerDisplay.add)}
        <br/>
        catatan:
        <input type="text" onChange={handleAnnot}/><br/>
        <input type="submit" value="add"/>
      </form>
    );
  }




  const icon=(display_to:Type.LayerDisplay)=>{
    return(
      <a onClick={()=>setDisplay(display_to)} className="btn">
        <i className="bi bi-flag-fill" style={{color:prop.color}}></i>
      </a>
    );
  };








  const annotationPinned=()=>{
    return (
      <>
      {icon(Type.LayerDisplay.show)}
      </>
    )
  }



  const annotationAdd=()=>{
    return (
      <>
      {icon(Type.LayerDisplay.form)}
      </>
    )
  }



  const annotationTool=()=>{
    return (
      <div style={{display:'flex',justifyItems:'right'}}>
        {icon(Type.LayerDisplay.pin)}
        <a className="btn" onClick={togleShowFormReply}><i className="bi bi-reply"></i></a>
        <a className="btn" onClick={togleShowReply}><i className="bi bi-chat-left-dots"></i></a>
        <i className="bi bi-check-circle btn" onClick={handleIsSolved} style={{color:form.isSolved?'green':'#555555'}}></i>
        <br/>
      </div>
    );
  }




  const reply=(layer:LayerContract.LayerValue)=>{
    return <div style={{backgroundColor:'#999999'}}>
      from:{layer.author.name} <br/>
      reply:{layer.content.message} <br/>
      date:{layer.date} <br/>
    </div>
  }



  const showReply=()=>{
    return(
      <div style={{maxHeight:500,overflow:"auto"}}>
        {
          pdfTogether.prop.layer.filter((layer)=>{
            if(layer.type===Type.Mode.Chat && layer.content.to===prop.layer?.id) return true;
            return false;
          }).map((layer)=>{
            return reply(layer.value);
          })
        }
      </div>
    )
  }

  const annotationShow=()=>{
    if(prop.layer) return (
      <>
      {annotationTool()}
      from: {prop.layer.author.name} <br/>
      catatan: {prop.layer.content.annot} <br/>
      date: {prop.layer.date} <br/>
      {option.isShowReply?showReply():null}
      {option.isShowFormReply?<ReplyForm to={prop.layer.id?prop.layer.id:0} setTogleClose={togleShowFormReply}/>:null}
      </>
    )

    return <></>
  }

  const annotationHidden=()=>{
    return (
      <></>
    )
  }





  const getDisplay=()=>{

    if(option.display===Type.LayerDisplay.form) return annotationForm();
    if(option.display===Type.LayerDisplay.pin) return annotationPinned();
    if(option.display===Type.LayerDisplay.show) return annotationShow();
    if(option.display===Type.LayerDisplay.add) return annotationAdd();
    if(option.display===Type.LayerDisplay.hidden) return annotationHidden();

    return <></>;

  }

  return (
    <>
    <Layer point={{x:prop.point.x,y:prop.point.y}}>
      {getDisplay()}
    </Layer>
    </>
  );
}





export const AddAnnotation=()=>{

  const pdfTogether=useContext(PdfTogetherContext);
  return (
    <>
        <AnnotationMain className="annotation"
        point={pdfTogether.getCanvasPoint()}
        displayDefault={Type.LayerDisplay.add}
        color='red'
        />
    </>

  );

}





export const LoadAnnotation=()=>{
  const pdfTogether=useContext(PdfTogetherContext);

  return (
    <>
    {
      pdfTogether.prop.layer.filterType(Type.Mode.Annotation).filter((layer)=>{
        return layer.value.onPage===pdfTogether.prop.currentPage;
      }).map((layer:LayerContract.ArrayLayer)=>{
          return <AnnotationMain key={layer.id} className="annotation"
          point={pdfTogether.pdfPointToCanvasPoint(layer.value.point)}
          displayDefault={Type.LayerDisplay.show}
          color='red'
          layer={layer.value}
          />
      })
    }
    </>
  );
}



const MainAnnonations=()=>{
  const styleAnnot=useStylesAnnotation();

  return (
  <><Layer point={{x:500,y:350}}><>
      <Grid item style={{backgroundColor:theme.palette.info.main,
        width:'25px',height:'25px',
        borderRadius:'50%',color:"#fff",paddingTop:"4px",paddingLeft:"7px"}}>2
      </Grid>
      <Paper variant="elevation" className={styleAnnot.paperAnnotation} style={{marginTop:"12px"}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid sm={11}>
            <span>
              <Typography variant="body2" color="textSecondary"> Adi</Typography>
              <Typography variant="body2" style={{color:theme.palette.text.disabled}}>19 January 2021 - 17:30</Typography>
            </span>
            <div style={{marginTop:theme.spacing(2),borderBottom:'0.5px solid #DEDEDE',paddingBottom:'10px',}}>
              <Typography variant="body1" color="textPrimary">Please update this part</Typography>
            </div>
            <div style={{marginTop:'5px'}}>
              <ReplyTextField multiline id="standard-basic" label="Reply"/>
            </div>
            <Grid justifyContent="flex-start" alignItems="flex-start" style={{marginTop:"25px"}} spacing={2}>
              <span className={styleAnnot.navIcon}>
                <IconVerified style={{color:'#6A6A6A'}}/>
              </span>
              <span className={styleAnnot.navIcon}>
                <IconSendEmail style={{color:'#6A6A6A'}}/>
              </span>
              <span className={styleAnnot.navIcon}>
                <IconUrl style={{color:'#6A6A6A'}}/>
              </span>
              <span className={styleAnnot.navIcon}>
                <IconPeople style={{color:'#6A6A6A'}}/>
              </span>
            </Grid>
          </Grid>
          <Grid sm={1}>
            <div style={{marginLeft:15}}>
              <IconThreeDot color={'#242424'}/>
            </div>
          </Grid>
        </Grid>
      </Paper>
  </></Layer></>
  );
}


const AddAnnotations=()=>{


  return (
    <>

    </>
  );
}

const LoadAnnotations=()=>{




  return (
    <>

    </>
  )
}





export const Annotation=()=>{

  //const pdfTogether=useContext(PdfTogetherContext);

  //if(pdfTogether.prop.mode!=='Annotation') return null;

  return (
    <>
    <MainAnnonations/>
    {/* <LoadAnnotations/>
    <AddAnnotation/> */}
    </>
  )
  
}