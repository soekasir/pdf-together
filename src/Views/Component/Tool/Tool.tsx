import { Grid, Paper, Typography } from "@material-ui/core";
import {useContext} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import { theme } from "../../../Resources/style/style";
import { IconDownload, IconDraw } from "../../../Resources/svg/icon";






export const Tool=({className}:{className:any})=>{
  const pdfTogether=useContext(PdfTogetherContext);
  
  return (
    <Paper className={className} style={{display:"flex",flexDirection:"row",alignItems:"self-end",alignContent:"self-end"}}>
      {/* <div > */}
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
        <span style={{marginLeft:"10px"}}>
          <IconDownload fill="#fff"/>
        </span>
        <span style={{marginLeft:"10px"}}>
          <IconDraw fill="#fff"/>
        </span>
        {/* <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Null)}} className="btn"><i className="bi bi-x-square"></i></a>
        {' || '}
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Draw)}} className="btn"><i className="bi bi-pencil"></i></a>
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Img)}} className="btn"><i className="bi bi-images"></i></a>
        {' || '}
        <a onClick={()=>{pdfTogether.selectMode(Type.Mode.Annotation)}} className="btn"><i className="bi bi-flag"></i></a> */}
      {/* </div> */}
    </Paper>
  )
}