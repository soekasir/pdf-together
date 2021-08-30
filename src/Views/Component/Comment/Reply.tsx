import { ChangeEvent, useContext, useState } from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import * as Models from "../../../Models/Main/MainModel";
import { ReplyTextField } from "../../../Resources/style/annotation";





export const ReplyForm=({to}:{to:number})=>{
  const {addChat}=useContext(PdfTogetherContext);
  const [form,setForm]=useState({message:''});


  //Ketika user klik enter
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(event);
    }

  }


  const handleSubmit=(e:any)=>{
    if(to){
      e.preventDefault();
      let newForm={...form,to:to};
      addChat(newForm);
    }
  }



  const handleInput=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{

    let newForm={...form};
    newForm.message=e.currentTarget.value;
    setForm(newForm);

  };

  return <ReplyTextField multiline id="standard-basic"
    label="Reply" name="message"
    onKeyDown={onKeyDown}
    onChange={handleInput}/>
}

export const FormCostum=(
    {handleSubmit,handleChange,label,style}:
    {handleSubmit:any,handleChange:any,label?:string,style?:any}
  )=>{

  //Ketika user klik enter
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(event);
    }

  }

  return <ReplyTextField multiline id="standard-basic"
    label={label?label:"Text here..."}
    onKeyDown={onKeyDown}
    onChange={handleChange}
    style={style}
    />
}