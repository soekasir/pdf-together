import React, { useState,useContext, ChangeEvent} from "react";
import { Layer } from "../Layer/Layer";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import { Validation as Type} from "../../../Models/Interfaces/Type";
import { FormCostum, ReplyForm } from "../Comment/Reply";
import { AddSharp } from "@material-ui/icons";
import { Grid, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import {useStylesAnnotation } from "../../../Resources/style/annotation";
import { IconPeople, IconSendEmail,  IconThreeDot, IconUrl, IconVerified} from "../../../Resources/svg/icon";
import { theme } from "../../../Resources/style/style";
import { understandableDate } from "../../../Models/Costum/Fn";


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
  const pdfTogether=useContext(PdfTogetherContext);
  const formDefault=prop.layer?prop.layer.content:{annot:'',isSolved:false,};
  const [form,setForm]=useState<LayerContract.Annotation>(formDefault);


  const [option,setOption]=useState({
    display:prop.displayDefault,
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
      pdfTogether.deleteLayerContent(prop.layer.id);
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






  const handleIsSolved=()=>{
    let newForm={...form};

    newForm.isSolved=!form.isSolved;

    if(prop.layer && prop.layer.id){
      setForm(newForm);
      pdfTogether.updateLayerContent(prop.layer.id,newForm);
    }
  }





  const handleAdd=(e:any)=>{
    e.preventDefault();
    pdfTogether.addAnnotation(form);
    setDisplay(Type.LayerDisplay.add);
  }

  const handleUpdate=(e:any)=>{
    e.preventDefault();
    if(prop.layer && prop.layer.id){
      pdfTogether.updateLayerContent(prop.layer.id,form);
      setDisplay(Type.LayerDisplay.show);
    }

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
              <Typography variant="body1" color="textPrimary" style={{wordBreak:"break-word"}}>{prop.layer.content.annot}</Typography>
            </div>

            {showReply()}

            <div style={{marginTop:'5px'}}>
              <ReplyForm to={prop.layer.id?prop.layer.id:0}/>
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
            <OptionAnnotation handleOption={handleOption}/>
          </Grid>
        </Grid>
      </Paper>
      </>
    )

    return <></>
  }

  const annotationForm=({handleSubmit}:{handleSubmit:(e:any)=>void})=>{
    return (
      <Paper variant="elevation" className={styleAnnot.paperAnnotation} style={{marginTop:"12px"}}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid sm={11}>
            <div style={{borderBottom:'0.5px solid #DEDEDE',paddingBottom:'10px',}}>
              <Typography variant="body2" color="textSecondary">{pdfTogether.prop.author.name}</Typography>
              <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
                {understandableDate(new Date())}
              </Typography>
            </div>
            <div style={{marginTop:theme.spacing(2)}}>
              <FormCostum handleChange={handleAnnot} handleSubmit={handleSubmit} label="Write your comment"
              style={{width:"90%"}} defaultValue={form.annot}/>
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
            <OptionAnnotation handleOption={handleOption}/>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  const insertForm=()=>{
    return (
      <>
      {icon(Type.LayerDisplay.add)}
      {annotationForm({handleSubmit:handleAdd})}
      </>
    )
  }

  const updateForm=()=>{
    return (
      <>
      {icon(Type.LayerDisplay.pin)}
      {annotationForm({handleSubmit:handleUpdate})}
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
      <div>
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

  const {getCanvasPoint}=useContext(PdfTogetherContext);

  return (
    <>
        <AnnotationMain
        point={getCanvasPoint()}
        displayDefault={Type.LayerDisplay.add}
        />
    </>
  );

}





export const LoadAnnotation=()=>{
  const {prop,pdfPointToCanvasPoint}=useContext(PdfTogetherContext);

  return (
    <>
    {
      prop.layer.filterType(Type.Mode.Annotation).filter((layer)=>{
        return layer.value.onPage===prop.currentPage;
      }).map((layer:LayerContract.ArrayLayer)=>{
          return <AnnotationMain key={layer.id}
          point={pdfPointToCanvasPoint(layer.value.point)}
          displayDefault={Type.LayerDisplay.show}
          layer={layer.value}
          />
      })
    }
    </>
  );
}

export const Annotation=()=>{

  const {mode}=useContext(PdfTogetherContext).prop;

  return (
    <>
    {/* <MainAnnonations/> */}
    <LoadAnnotation/>
    {mode===Type.Mode.Annotation?<AddAnnotation/>:null} 
    </>
  )
  
}