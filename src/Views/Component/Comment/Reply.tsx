import { useContext, useState } from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { hasKey } from "../../../Models/Costum/Check";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import * as Models from "../../../Models/Main/MainModel";

export const ReplyForm=({to,setTogleClose}:{to:number,setTogleClose:any})=>{
  const pdfTogether=useContext(PdfTogetherContext);
  const [form,setForm]=useState({message:''});

  if(!to) return null;

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    let newForm={...form,to:to};
    let chat=new Models.Chat(newForm);
    pdfTogether.addChat(chat);

  }

  const handleInput=(e:React.FormEvent<HTMLTextAreaElement>)=>{
    let newForm={...form};

    if(hasKey(newForm,e.currentTarget.name)){
      newForm[e.currentTarget.name]=e.currentTarget.value;
    }

    setForm(newForm);

  };

  return (
    <><a onClick={()=>setTogleClose()} className="btn">x</a>
    <form onSubmit={handleSubmit}>
      <textarea name="message" cols={35} rows={4} onChange={handleInput}/>
      <input type='submit' value='reply'/>
    </form>
    </>
  )
}