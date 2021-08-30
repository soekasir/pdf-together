import { ChangeEvent, useContext, useRef, useState } from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import * as Models from "../../../Models/Main/MainModel";
import { ReplyTextField } from "../../../Resources/style/annotation";





export const ReplyForm=({to}:{to:number})=>{
  const {addChat}=useContext(PdfTogetherContext);
  const [form,setForm]=useState({message:''});
  const inputRef=useRef<HTMLDivElement>(null);


  //Ketika user klik enter
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit();
    }

  }


  const handleSubmit=()=>{
    if(to){
      let newForm={...form,to:to};
      addChat(newForm);
    }
    setForm({message:''});
  }



  const handleInput=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{

    let newForm={...form};
    newForm.message=e.currentTarget.value;
    setForm(newForm);

  };

  return <ReplyTextField ref={inputRef} multiline id="standard-basic"
    label="Reply" name="message"
    onKeyDown={onKeyDown}
    onChange={handleInput} value={form.message}/>
}

export const FormCostum=(
    {handleSubmit,handleChange,label,style,defaultValue}:
    {handleSubmit:any,handleChange:any,label?:string,style?:any,defaultValue:string}
  )=>{
  
  const [form,setForm]=useState({value:''});


  //Ketika user klik enter
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(event);
      let newForm={...form};
      newForm.value="";
      setForm(newForm);
    }

  }

  const onChange=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    handleChange(e);
    let newForm={...form};
    newForm.value=e.currentTarget.value;
    setForm(newForm);
  }

  return <ReplyTextField multiline id="standard-basic"
    label={label?label:"Text here..."}
    onKeyDown={onKeyDown}
    onChange={onChange}
    style={style}
    value={form.value?form.value:defaultValue}
    />
}