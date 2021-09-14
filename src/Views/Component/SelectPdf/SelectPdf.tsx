import { Button, Container, CssBaseline, Grid, Paper } from "@material-ui/core";
import {useContext} from "react";
import { useHistory } from "react-router-dom";
import { PdfContext } from "../../../Controller/Context/Context";
import { FormAuthor } from "./FormAuthor/FormAuthor";
import SelectPreview from "./SelectPreview";




export const SelectPdf=()=>{
  
  const context=useContext(PdfContext);
  const history=useHistory();

  const setPdfFiles=(e:React.FormEvent<HTMLInputElement>)=>{
    if(e.currentTarget.files){
      context.setPdf(e.currentTarget.files[0]);
    }
  }

  const openPdf=()=>{
    history.push('/pdf-together');
  }

  return(
    <><CssBaseline/>
    <Container maxWidth='xl' style={{backgroundColor:'#E5E5E5',width:'100%',height:'100vh'}}>
      <Grid container>
        
          <Grid container direction='row' spacing={4} style={{marginTop:50}}>
            <Grid item style={{}}>
              <Paper variant="elevation" style={{padding:'16px'}}>
                <div style={{marginBottom:16}}>
                  Select Pdf File
                </div>
                <input className="form-control" type="file" accept=".pdf" name="content" onChange={setPdfFiles}/>
                {context.url?<Button size={'small'} variant='outlined' onClick={openPdf}>open</Button>:null}
                <div style={{margin:10}}>
                  {context.url?<SelectPreview url={context.url} scale={.5}/>:null}
                </div>
                
              </Paper>
            </Grid>
            <Grid item style={{}}>
              
              <Paper variant="elevation" style={{padding:'16px'}}>
                <FormAuthor/>
              </Paper>
            </Grid>
          </Grid>
        
      </Grid>
    </Container>
    </>
  )
};