import { ChangeEvent, useContext, useRef, useState } from "react";
import { PdfContext } from "../../../Controller/Context/Context";
import { ReplyTextField } from "../../../Resources/style/annotation";





export const ReplyForm=({to}:{to:number})=>{
  const {addChat}=useContext(PdfContext).layerManager;
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