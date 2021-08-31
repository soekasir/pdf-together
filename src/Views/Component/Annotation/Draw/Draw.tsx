import { Resizable } from "re-resizable";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PdfTogetherContext } from "../../../../Controller/Context/Context";
import { ReactDraw, setupDraw } from "../../../../Models/Draw/Draw";
import { Validation as Type } from "../../../../Models/Interfaces/Type";
import PaletteIcon from '@material-ui/icons/Palette';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {  Button,  Grid,  Menu, MenuItem,  Slider,  Typography } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import { LayerContract } from "../../../../Models/Interfaces/LayerContract";
import { theme } from "../../../../Resources/style/style";
import { AddSharp } from "@material-ui/icons";
import { Layer } from "../../Layer/Layer";

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
          <MenuItem onClick={()=>handleSelect("black")}><PaletteIcon style={{color:"black"}}/></MenuItem>
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


export const AnnotDrawMain=({point,layer}:{point:Type.Point,layer?:LayerContract.LayerDraw}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [draw,setDraw]=useState<ReactDraw|undefined>();
  
  const [option,setOption]=useState({
    display:layer?Type.LayerDisplay.show:Type.LayerDisplay.insert,
  });

  const pdfTogether=useContext(PdfTogetherContext);

  const [size,setSize]=useState(layer?layer.content.size:{
    width:200,
    height:200
  });

  const setDisplay=(display_to:Type.LayerDisplay)=>{
    let newOption={...option};
    newOption.display=display_to;
    setOption(newOption);
  }

  useEffect(()=>{
    if(canvas){
      setDraw(setupDraw(canvas));
    }
  },[canvas]);

  useEffect(()=>{

    if(draw && layer){
      draw.addImgFromCanvas(layer.content.url,layer.content.size);
    }

  },[draw]);

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

  const handleAdd=()=>{
    if(draw){
      pdfTogether.addDraw(draw,size);
      let newSize={...size};
      draw.erase({x:0,y:0},newSize);
    }
  }

  const icon=(display_to:Type.LayerDisplay)=>{
    return(
      <>
      <Grid container alignContent="center" justifyContent="center" item
        onClick={()=>setDisplay(display_to)} style={{backgroundColor:theme.palette.success.main,
        width:'25px',height:'25px',borderRadius:'50%',color:"#fff",paddingTop:"4px"}}>
        <span>{layer&&layer.id?layer.id:<AddSharp/>}</span>
      </Grid>
      </>
    );
  };

  const toolNewDraw=()=>{
    return (
      <div style={{backgroundColor:'#242424',color:'#fff',marginTop:"10px",width:"150px",
        borderRadius:"20px",padding:"7px",height:"40px"}}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <SelectColor handle={selectColor} color={draw?draw.getColor():"#434343"}/>
          </Grid>
          <Grid item>
            <SliderPointerSize handle={(size)=>{ draw?.setPointerSize(size);} }/>
          </Grid>
          <Grid item>
            <span onClick={handleAdd}><PublishIcon/></span>
          </Grid>
        </Grid>
      </div>
    );
  }

  const displayNew=(visibility:boolean=true)=>{
    return (
      <>
      {icon(visibility?Type.LayerDisplay.add:Type.LayerDisplay.insert)}
      <div style={visibility?{}:{display:"none"}}>
        <Resizable defaultSize={size} onResizeStop={onResize}
          style={{border:"3px solid #22DD66",zIndex:3}}>
          <canvas ref={canvas} width={size.width} height={size.height}/>
        </Resizable>
        {toolNewDraw()}
      </div>
      </>
    );
  }

  const displayShow=(visibility:boolean=true)=>{
    return (
      <>
        {icon(visibility?Type.LayerDisplay.pin:Type.LayerDisplay.show)}
        <div style={visibility?{}:{display:"none"}}>
          <canvas ref={canvas} width={size.width} height={size.height}/>
        </div>
      </>
    );
  }

  const getDisplay=()=>{

    if(option.display===Type.LayerDisplay.insert) return displayNew(true);
    if(option.display===Type.LayerDisplay.add) return displayNew(false);
    
    if(option.display===Type.LayerDisplay.pin) return displayShow(false);
    if(option.display===Type.LayerDisplay.show) return displayShow(true);
    return <></>;
  }

  return (
      <Layer point={{y:point.y,
        x:point.x}}>
        {getDisplay()}
      </Layer>
  );
};

export const LoadAnnotDraw=()=>{

  const {prop,pdfPointToCanvasPoint}=useContext(PdfTogetherContext);

  return (
    <>
    {
      prop.layer.filterType(Type.Mode.Draw).filter((layer)=>{
        return layer.value.onPage===prop.currentPage.pageNum;
      }).map((layer:LayerContract.ArrayLayer)=>{
          return <AnnotDrawMain key={layer.id}
          layer={layer.value}
          point={pdfPointToCanvasPoint(layer.value.point)}
          />
      })
    }
    </>
  );

}

export const AddAnnotDraw=()=>{

  const pdftogether=useContext(PdfTogetherContext);

  if(pdftogether.prop.mode===Type.Mode.Draw) return (
    <>
      <AnnotDrawMain point={pdftogether.toCanvasPoint()}/> 
    </>
  );

  return null;

}

export const AnnotDraw=()=>{

  return (
  <>
    <LoadAnnotDraw/>
    <AddAnnotDraw/>
  </>
  )
}