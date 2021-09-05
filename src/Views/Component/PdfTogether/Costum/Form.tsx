import { StandardTextFieldProps, TextField, withStyles } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { theme } from "../../../../Resources/style/style";

interface FormProps extends StandardTextFieldProps{
  handleSubmit?:(value:any) => any,
  handleChange?:(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => any,
}

const InputCostum = withStyles({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.text.disabled
    },
    "& label": {
      color: theme.palette.text.disabled,
      fontSize:12,
      fontWeight:400,
      lineHeight:'16.37px'
    },
    "& .MuiInput-underline:after": {
      borderColor: "#EAEAEA",
      borderWidth: "1px"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#EAEAEA",
        borderWidth: "1px"
      },
      "&:hover fieldset": {
        borderColor: "#EAEAEA",
        borderWidth: "1px"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#EAEAEA",
        borderWidth: "1px"
      }
    }
  }
})(TextField);

export const CostumForm:React.FC<FormProps> =({handleSubmit,handleChange,...rest})=>{


  const [form,setForm]=useState({value:rest.defaultValue});


  //Ketika user klik enter
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if(handleSubmit){
        const res=handleSubmit(form.value);
        if(res){
          let newFrom={...form};
          newFrom.value=res;
          setForm(newFrom);
        }else{
          let newFrom={...form};
          newFrom.value=rest.defaultValue;
          setForm(newFrom);
        }

      }
    }

  }

  const onChange=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
    if(handleChange){
      handleChange(e);
    }
    let newForm={...form};
    newForm.value=e.currentTarget.value;
    setForm(newForm);
  }


  return <InputCostum onKeyDown={onKeyDown} onChange={onChange} {...rest}/>;
}