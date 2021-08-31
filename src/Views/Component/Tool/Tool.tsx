import { Grid, Paper, Typography } from "@material-ui/core";
import { NoteAdd, NoteAddOutlined } from "@material-ui/icons";
import {useContext} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import { theme } from "../../../Resources/style/style";
import { IconDownload, IconDraw } from "../../../Resources/svg/icon";






export const Tool=({className}:{className:any})=>{
  const pdfTogether=useContext(PdfTogetherContext);
  
  return (
    <Paper className={className} style={{display:"flex",flexDirection:"row",alignItems:"self-end",alignContent:"self-end"}}>

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
        <span onClick={()=>{pdfTogether.selectMode(Type.Mode.Null)}} style={{marginLeft:"10px"}}>
          <IconDownload fill="#fff"/>
        </span>
        <span onClick={()=>{pdfTogether.selectMode(Type.Mode.Annotation)}} style={{marginLeft:"0px"}}>
          <NoteAddOutlined style={{fontSize:"16px"}} />
        </span>
        <span onClick={()=>{pdfTogether.selectMode(Type.Mode.Draw)}} style={{marginLeft:"10px"}}>
          <IconDraw fill="#fff"/>
        </span>

    </Paper>
  )
}