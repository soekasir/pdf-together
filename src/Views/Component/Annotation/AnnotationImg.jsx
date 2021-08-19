import {useState,useContext} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";

const AnnotationImgHandle=({
    className,point,color,handleSubmit,displayDefault='pin'
  })=>{

  const [display,setDisplay]=useState(displayDefault); //pin, show,form, hidden, add
  const [option,setOption]=useState({size:200})
  const [form,setForm]=useState({
    author:null,
    url:null,
    date:new Date().toLocaleString(),
    file:null
  });

  const handleChange=(e)=>{
    let newForm={...form};
    newForm[e.target.name]=e.target.value;
    setForm(newForm);
  }

  const handleFile=(e)=>{
    let newForm={...form};
    newForm.file=e.target.files[0];
    setForm(newForm);
  }

  const viewForm=()=>{
    return (
      <form onSubmit={(e)=>{
        e.preventDefault(); setDisplay('show');
        }}>
        <a onClick={()=>setDisplay('add')} className="btn">
          <i className="bi bi-image" style={{color:color}}></i>
        </a>
        <br/>
        author:
        <input type="text" name="author" onChange={handleChange}/><br/>
        comment:
        <input type="file" name="content" onChange={handleFile}/><br/>
        <input type="submit" value="comment"/>
      </form>
    );
  }

  const viewTool=()=>{
    return (
      <>
        <a onClick={()=>setDisplay('pin')} className="btn">
          <i className="bi bi-image" style={{color:color}}></i>
        </a>
        <br/>
      </>
    );
  }

  const viewPinned=()=>{
    return (
      <>
        <a className="btn" onClick={()=>setDisplay('show')}>
          <i className="bi bi-image" style={{color:color}}></i>{form.author}
        </a>
      </>
    )
  }

  const viewAdd=()=>{
    return (
      <>
        <a className="btn" onClick={()=>setDisplay('form')}>
          <i className="bi bi-image" style={{color:color}}></i>
        </a>
      </>
    )
  }

  const viewShow=()=>{
    return (
      <>
      {viewTool()}
      from: {form.author} <br/>
      date: {form.date} <br/>
      <img src={URL.createObjectURL(form.file)} width={option.size}/>
      </>
    )
  }

  const viewHidden=()=>{
    return (
      <></>
    )
  }

  const getDisplay=()=>{
    if(display==='form') return viewForm();
    if(display==='pin') return viewPinned();
    if(display==='show') return viewShow();
    if(display==='add') return viewAdd();
    if(display==='hidden') return viewHidden();
  }

  return (
    <div style={{zIndex: 2,position: 'absolute',top:point.y,left:point.x}}>
      {getDisplay()}
    </div>
  );
}

export const AnnotationImg=()=>{
  const pdfTogether=useContext(PdfTogetherContext);
  if(pdfTogether.prop.mode!=='img'){
    return null;
  }

  return (
    <>
        <AnnotationImgHandle className="annotation"
        point={pdfTogether.getCanvasPoint()}
        displayDefault='add'
        color='red'
        />
    </>
  );
}