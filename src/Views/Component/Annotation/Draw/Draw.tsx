import { Resizable } from "re-resizable";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PdfTogetherContext } from "../../../../Controller/Context/Context";
import { ReactDraw, setupDraw } from "../../../../Models/Draw/Draw";
import { Validation as Type } from "../../../../Models/Interfaces/Type";
import PaletteIcon from '@material-ui/icons/Palette';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {  Button,  Grid,  Menu, MenuItem,  Slider,  Typography } from "@material-ui/core";
import { ApproveButton, CostumButton, theme } from "../../../../Resources/style/style";

const SaveButton=CostumButton({
  height:20,
  maxWidth:20,
  color: '#fff',
  backgroundColor: theme.palette.info.main,
  '&:hover': {
    backgroundColor:theme.palette.info.dark,
  },
});

const SelectColor=({handle,color}:{handle:(value:any)=>void,color:string})=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect=(value:any)=>{
    handle(value);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <span onClick={handleClick} color={color}><PaletteIcon></PaletteIcon></span>
      <Menu 
      anchorOrigin={{vertical:'bottom',horizontal: 'left'}}
      transformOrigin={{vertical:'bottom',horizontal: 'left'}}
      anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={()=>handleSelect("red")}><PaletteIcon style={{color:"red"}}/></MenuItem>
          <MenuItem onClick={()=>handleSelect("blue")}><PaletteIcon style={{color:"blue"}}/></MenuItem>
          <MenuItem onClick={()=>handleSelect("yellow")}><PaletteIcon style={{color:"yellow"}}/></MenuItem>
      </Menu>
    </div>
  );
}

const SliderPointerSize=({handle}:{handle:(value:any)=>void})=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [value, setValue] = React.useState<number>(20);

  useEffect(()=>{
    handle(value/10);
  },[value]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <span onClick={handleClick}><BorderColorIcon/></span>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}
      anchorOrigin={{vertical:'bottom',horizontal: 'left'}}
      transformOrigin={{vertical:'bottom',horizontal: 'left'}}
      >
        <Grid container direction="row" style={{width:"120px",margin:"7px"}} alignItems="center" justifyContent="space-around">
          <BorderColorIcon/><Slider value={value} onChange={handleChange} style={{width:"70px",padding:"5px"}}/>
        </Grid>
      </Menu>
    </div>
  );
}

export const AnnotDrawMain=({point}:{point:Type.Point}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [draw,setDraw]=useState<ReactDraw>();
  const [size,setSize]=useState({
    width:200,
    height:200
  });

  useEffect(()=>{
    if(!draw){
      setDraw(setupDraw(canvas))
    }
  },[canvas]);

  const onResize=(e:any, direction:any, ref:any, d:any) => {

    let img=draw?.getFile();

    let newSize={...size};
    newSize.width=size.width + d.width;
    newSize.height=size.height + d.height;
    setSize(newSize);
    draw?.addImgFromCanvas(img,size);

  }

  const selectColor=(color:string)=>{
    draw?.setColor(color);
  }

  const handleSave=()=>{

  }

  return (
    <>
    <Resizable defaultSize={size} onResizeStop={onResize}
      style={{border:"3px solid #22DD66",top:point.y+5,left:point.x+5,zIndex: 2,position: 'absolute'}}>

      <canvas ref={canvas} width={size.width-6} height={size.height-6}/>
      <div>
        
        <Grid container spacing={2}>
          <Grid item>
            <SelectColor handle={selectColor} color={draw?draw.getColor():"#434343"}/>
          </Grid>
          <Grid item>
            <SliderPointerSize handle={(size)=>{ draw?.setPointerSize(size); console.log(size)} }/>
          </Grid>
          <Grid item>
            <SaveButton>save</SaveButton>
          </Grid>
        </Grid>
      </div>
    </Resizable>
    </>
  );
};

export const LoadAnnotDraw=()=>{

  const pdftogether=useContext(PdfTogetherContext);

  //Load Draw from server

  return null;

}

export const AddAnnotDraw=()=>{

  const pdftogether=useContext(PdfTogetherContext);

  if(pdftogether.prop.mode===Type.Mode.Draw) return (
    <>
      <AnnotDrawMain point={pdftogether.getCanvasPoint()}/> 
    </>
  );

  return null;

}

export const AnnotDraw=()=>{

  return (
  <>
    <AddAnnotDraw/>
  </>
  )
}