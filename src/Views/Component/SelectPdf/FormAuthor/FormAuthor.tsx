import { Button, FormControl, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { useContext, useState } from "react"
import { AuthorContext } from "../../../../Controller/Context/Context"
import { AccesAdmin, AccesManager, AccessMember } from "../../../../Models/Interfaces/Access";
import { Author } from "../../../../Models/Main/MainModel";

function getRandomId(max:number) {
  return Math.random() * (max - 1) + 1;
}

export const FormAuthor=()=>{

  const context=useContext(AuthorContext);

  const [form,setForm]=useState({name:'',id_user:'1',access:AccesAdmin});

  const handleSelectAcces=(event: React.ChangeEvent<{value: unknown;}>)=>{
    let newForm={...form};
    if(event.currentTarget.value==='Admin'){
      newForm.access=AccesAdmin;
    }
    if(event.currentTarget.value==='Manager'){
      newForm.access=AccesManager;
    }
    if(event.currentTarget.value==='Member'){
      newForm.access=AccessMember
    }
    newForm.id_user=getRandomId(1000)+'';
    setForm(newForm);
  }

  const handleName=(event: React.ChangeEvent<{value: unknown;}>)=>{
    let newForm={...form};
    if(typeof event.currentTarget.value==='string') {
      newForm.name=event.currentTarget.value;
      setForm(newForm);
    }
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    context.setAuthor(new Author(form));
  }

  return(
    <form onSubmit={(e)=>handleSubmit(e)}>
      <FormControl>
        Select User Acces
        <TextField id="standard-basic" label="Username" onChange={handleName}/>

        <Select
          labelId="demo-simple-select-error-label"
          value={'Admin'}
          onChange={handleSelectAcces}
          renderValue={(value) => `${value}`}
          style={{marginTop:16}}
        >
          <MenuItem value={'Admin'}>Admin</MenuItem>
          <MenuItem value={'Manager'}>Manager</MenuItem>
          <MenuItem value={'Member'}>Member</MenuItem>
        </Select>
        <Button type='submit' size='small' variant="outlined" style={{marginTop:16}}>Accept</Button>
      </FormControl>
    </form>
  );
}