import React, { useState,useContext, ChangeEvent} from "react";
import { Layer } from "../Layer/Layer";
import { PdfContext, PdfTogetherContext} from "../../../../Controller/Context/Context";
import { LayerContract } from "../../../../Models/Interfaces/LayerContract";
import { Validation as Type} from "../../../../Models/Interfaces/Type";
import { ReplyForm } from "../Comment/Reply";
import { AddSharp } from "@material-ui/icons";
import { Grid, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import {useStylesAnnotation } from "../../../../Resources/style/annotation";
import { IconPeople, IconSendEmail,  IconThreeDot, IconUrl, IconVerified} from "../../../../Resources/svg/icon";
import { SearchTextField, theme } from "../../../../Resources/style/style";
import { understandableDate } from "../../../../Models/Costum/Fn";
import { CostumForm } from "../Costum/Form";


interface PropAnnotation{
  point:Type.PointCanvas,
  displayDefault:Type.LayerDisplay,
  layer?:LayerContract.LayerAnnotation
}


const OptionAnnotation=({handleOption}:{handleOption:(value:any)=>void})=>{

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClick=(value:any)=>{
    handleOption(value);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{marginLeft:15}}>
        <span onClick={handleClick}><IconThreeDot color={'#242424'}/></span>
      </div>
      <Menu
        anchorOrigin={{vertical:'bottom',horizontal: 'left'}}
        transformOrigin={{vertical:'top',horizontal: 'right'}}
        anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}
        style={{boxShadow:"none"}}>
        <MenuItem onClick={()=>onClick("delete")}>Delete</MenuItem>
        <MenuItem onClick={()=>onClick("edit")}>Edit</MenuItem>
      </Menu>
    </>
  );
}


export const AnnotationMain:React.FC<PropAnnotation>=(prop)=>{

  const styleAnnot=useStylesAnnotation();
  const pdfContext=useContext(PdfContext);
  const pdfTogether=useContext(PdfTogetherContext);
  const formDefault=prop.layer?prop.layer.content:{annot:'',isSolved:false};
  const [form,setForm]=useState<LayerContract.Annotation>(formDefault);


  const [option,setOption]=useState({
    display:prop.displayDefault,
    isToolEmailActive:false
  });

  const handleOption=(selected_option:string)=>{

    if(selected_option==="edit"){
      setDisplay(Type.LayerDisplay.update);
    }

    if(selected_option==="delete"){
      handleDelete();
    }

  }

  const handleDelete=()=>{
    if(prop.layer && prop.layer.id){
      pdfContext.layerManager.deleteLayerContent(prop.layer.id);
    }
  }


  const setDisplay=(display_to:Type.LayerDisplay)=>{
    let newOption={...option};
    newOption.display=display_to;
    setOption(newOption);
  }





  const handleAnnot=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    let newForm={...form};

    newForm.annot=e.currentTarget.value;

    setForm(newForm);

  };






  const handleToggleIsSolved=()=>{
    let newForm={...form};

    newForm.isSolved=form.isSolved?false:new Date().getTime();
    setForm(newForm);
    if(prop.layer && prop.layer.id){
      pdfContext.layerManager.updateLayerContent(prop.layer.id,newForm);
    }
  }

  const handleToolEmail=()=>{
    setOption(({...option,isToolEmailActive:!option.isToolEmailActive}));
  }





  const handleAdd=(value:any)=>{
    pdfContext.layerManager.addAnnotation(form);
    setDisplay(Type.LayerDisplay.add);
  }

  const handleUpdate=(value:any)=>{
    if(prop.layer && prop.layer.id){
      pdfContext.layerManager.updateLayerContent(prop.layer.id,form);
      setDisplay(Type.LayerDisplay.show);
    }
  }

  const annotTool=()=>{
    return <>
    <Grid container justifyContent="flex-start" direction='row' alignItems="flex-start"
    style={{width:'280px',marginTop:'10px'}}>
      <Grid item className={styleAnnot.navIcon}
        style={{color:form.isSolved?"#20C795":'#6A6A6A',...theme.typography.body1,
        display:'flex',alignItems:'flex-start'}}
        onClick={handleToggleIsSolved}>
          <span><IconVerified/></span>
          <span>
            {form.isSolved&&typeof form.isSolved==='number'?understandableDate(new Date(form.isSolved)):null}
          </span>
      </Grid>
      <Grid item className={styleAnnot.navIcon} onClick={handleToolEmail}>
        <IconSendEmail style={{color:'#6A6A6A'}}/>
      </Grid>
      <Grid item className={styleAnnot.navIcon}>
        <IconUrl style={{color:'#6A6A6A'}}/>
      </Grid>
      <Grid item className={styleAnnot.navIcon}>
        <IconPeople style={{color:'#6A6A6A'}}/>
      </Grid>
    </Grid>
    {option.isToolEmailActive?<div>
      <SearchTextField size="small" label="email adress" variant="outlined" style={{height:"32px",width:'100%',fontSize:'14px'}}/>
    </div>:null}
    </>
  }




  /** COMPONENT BEGIN */
  const annotationShow=()=>{
    if(prop.layer) return (
      <>
      {icon(Type.LayerDisplay.pin)}
      <Paper variant="elevation"
      style={{marginTop:"12px",width:"285px",padding:"16px",
      borderRadius:'16px',boxShadow:"0px 2px 20px rgba(0, 0, 0, 0.25)",}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid sm={11}>
            <div>
              <Typography variant="body2" color="textSecondary">{prop.layer.author.name}</Typography>
              <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
                {understandableDate(new Date(prop.layer.date))}
              </Typography>
            </div>
            <div style={{marginTop:"12px",borderBottom:'0.5px solid #DEDEDE',paddingBottom:'10px',}}>
              <Typography variant="subtitle2" color="textPrimary" style={{wordBreak:"break-word"}}>
                {prop.layer.content.annot}
              </Typography>
            </div>

            {showReply()}

            <div style={{marginTop:'5px'}}>
              <ReplyForm to={prop.layer.id?prop.layer.id:0}/>
            </div>
            
          </Grid>
          <Grid sm={1}>
            <OptionAnnotation handleOption={handleOption}/>
          </Grid>
        </Grid>
        {annotTool()}
      </Paper>
      </>
    )

    return <></>
  }

  const annotationForm=({handleSubmit,defaultValue}:{handleSubmit:(e:any)=>void,defaultValue:string})=>{
    return (
      <Paper variant="elevation" className={styleAnnot.paperAnnotation} style={{marginTop:"12px"}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid sm={11}>
            <div style={{borderBottom:'0.5px solid #DEDEDE',paddingBottom:'10px',}}>
              <Typography variant="body2" color="textSecondary">{pdfContext.layerManager.author?.name}</Typography>
              <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
                {understandableDate(new Date())}
              </Typography>
            </div>
            <div style={{marginTop:theme.spacing(2)}}>
              <CostumForm multiline handleChange={handleAnnot} handleSubmit={handleSubmit}
              label="Write your comment" style={{width:"90%"}} defaultValue={defaultValue}/>
            </div>
          </Grid>
          <Grid sm={1}>
            <OptionAnnotation handleOption={handleOption}/>
          </Grid>
        </Grid>
        {annotTool()}
      </Paper>
    )
  }

  const insertForm=()=>{
    return (
      <>
      {icon(Type.LayerDisplay.add)}
      {annotationForm({handleSubmit:handleAdd,defaultValue:""})}
      </>
    )
  }

  const updateForm=()=>{
    return (
      <>
      {icon(Type.LayerDisplay.pin)}
      {annotationForm({handleSubmit:handleUpdate,defaultValue:form.annot})}
      </>
    )
  }




  const icon=(display_to:Type.LayerDisplay)=>{
    return(
      <>
      <Grid container alignContent="center" justifyContent="center" item
        onClick={()=>setDisplay(display_to)} style={{backgroundColor:theme.palette.info.main,
        width:'25px',height:'25px',borderRadius:'50%',color:"#fff",paddingTop:"4px"}}>
        <span>{prop.layer && prop.layer.id?prop.layer.id:<AddSharp/>}</span>
      </Grid>
      </>
    );
  };



  const annotationPinned=()=>{
    return icon(Type.LayerDisplay.show);
  }



  const annotationAdd=()=>{
    return icon(Type.LayerDisplay.insert);
  }



  const reply=(layer:LayerContract.LayerValue)=>{
    return (
      <>
        <div style={{marginTop:"13px"}}>
          <Typography variant="body2" color="textSecondary">{layer.author.name}</Typography>
          <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
            {understandableDate(new Date(layer.date))}
          </Typography>
        </div>
        <div style={{marginTop:"11px",marginBottom:"10px"}}>
          <Typography variant="body1" color="textPrimary" style={{wordBreak:"break-word"}}>{layer.content.message}</Typography>
        </div>
      </>
      )
  }

  const showReply=()=>{
    return(
      <div style={{overflow:"auto",maxHeight:"300px"}} className="costum-scroll">
        {
          pdfTogether.layers.filter((layer)=>{
            if(layer.value.type===Type.Mode.Chat && layer.value.content.to===prop.layer?.id) return true;
            return false;
          }).map((layer)=>{
            return reply(layer.value);
          })
        }
      </div>
    )
  }

  const annotationHidden=()=>{
    return (
      <></>
    )
  }





  const getDisplay=()=>{

    if(option.display===Type.LayerDisplay.insert) return insertForm();
    if(option.display===Type.LayerDisplay.pin) return annotationPinned();
    if(option.display===Type.LayerDisplay.show) return annotationShow();
    if(option.display===Type.LayerDisplay.add) return annotationAdd();
    if(option.display===Type.LayerDisplay.hidden) return annotationHidden();
    if(option.display===Type.LayerDisplay.update) return updateForm();

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

  const {toCanvasPoint}=useContext(PdfContext).layerManager;

  return <AnnotationMain point={toCanvasPoint()} displayDefault={Type.LayerDisplay.insert}/>;

};





export const LoadAnnotation=({pageNum}:{pageNum:number})=>{

  const {pdfPointToCanvasPoint}=useContext(PdfContext).layerManager;
  const {layers}=useContext(PdfTogetherContext);

  return <>
    {
      layers.filter((layer)=>layer.value.onPage===pageNum && Type.Mode.Annotation===layer.value.type).map((layer)=>{
        return <AnnotationMain key={layer.id} point={pdfPointToCanvasPoint(layer.value.point)} displayDefault={Type.LayerDisplay.show} layer={layer.value}/>
      })
    }
  </>;

};

export const Annotation=({mode,pageNum}:{mode:Type.Mode,pageNum:number})=><>

  <LoadAnnotation pageNum={pageNum}/>

  {mode===Type.Mode.Annotation?<AddAnnotation/>:null}

</>;