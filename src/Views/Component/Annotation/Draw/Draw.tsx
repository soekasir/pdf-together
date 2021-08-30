import { Resizable } from "re-resizable";
import { useContext, useEffect, useRef, useState } from "react";
import { PdfTogetherContext } from "../../../../Controller/Context/Context";
import { ReactDraw, setupDraw } from "../../../../Models/Draw/Draw";

export const AnnotDraw=({}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [draw,setDraw]=useState<ReactDraw>();
  const [size,setSize]=useState({
    width:200,
    height:200
  });

  const {prop}=useContext(PdfTogetherContext);

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

  const handleTest=()=>{

  }

  const handleDownload=()=>{
    if(draw){
      const file=draw.getFile();
      if(file){
        download(file,file.name);
      }
    }
  }

  const download = function(file:any,filename:any){
    const link = document.createElement('a');
    link.download = filename;
    link.href = file?URL.createObjectURL(file):"";
    link.click();
  }

  return (
    <>
    <Resizable defaultSize={size} onResizeStop={onResize} style={{border:"5px solid #22DD66",top:prop.point.y,left:prop.point.x,zIndex: 2,position: 'absolute'}}>
      <canvas ref={canvas} width={size.width} height={size.height}/></Resizable>
    </>
  );
};