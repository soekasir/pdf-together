import React, { useState,useContext} from "react";
import { Layer } from "../Layer/Layer";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import * as Models from "../../../Models/Main/MainModel";
import { ReplyForm } from "../Comment/Reply";


interface PropAnnotation{
  className:string,
  color:string,
  point:Type.PointCanvas,
  displayDefault:Type.LayerDisplay,
  layer?:LayerContract.LayerAnnotation
}



export const AnnotationMain:React.FC<PropAnnotation>=(prop)=>{



  /** PRE-RENDER */
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





export const Annotation=()=>{

  const pdfTogether=useContext(PdfTogetherContext);

  if(pdfTogether.prop.mode!=='Annotation') return null;

  return (
    <>
    <LoadAnnotation/>
    <AddAnnotation/>
    </>
  )
  
}