import { Paper, Typography } from "@material-ui/core";
import { NoteAddOutlined } from "@material-ui/icons";
import { Validation as Type } from "../../../../Models/Interfaces/Type";
import { IconDownload, IconDraw } from "../../../../Resources/svg/icon";


export const Tool=({setModeHandle}:{setModeHandle:any})=>{
  
  return (
    <Paper style={{
      position:'fixed',
      display:"flex",
      flexDirection:"row",
      alignItems:"self-end",
      alignContent:"self-end",
      padding:`10px 10px 0px 10px`,
      // minWidth:'400px',
      bottom:'10px',
      left:'22vw',
      zIndex:3,

      backgroundColor:'#242424',
      color:'#fff',
    }}>

        <span style={{marginLeft:"10px"}}>
          <Typography variant="body1">
          Nama Document.pdf
          </Typography>
        </span>
        <span style={{marginLeft:"10px"}}>
          <Typography variant="body1">
          10 MB 
          </Typography>
        </span>
        <span onClick={()=>{setModeHandle(Type.Mode.Null)}} style={{marginLeft:"10px"}}>
          <IconDownload fill="#fff"/>
        </span>
        <span onClick={()=>{setModeHandle(Type.Mode.Annotation)}} style={{marginLeft:"0px"}}>
          <NoteAddOutlined style={{fontSize:"16px"}} />
        </span>
        <span onClick={()=>{setModeHandle(Type.Mode.Draw)}} style={{marginLeft:"10px"}}>
          <IconDraw fill="#fff"/>
        </span>

    </Paper>
  )
}