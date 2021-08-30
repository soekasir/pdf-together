import { Resizable } from "re-resizable";
import { useContext, useEffect, useRef, useState } from "react";
import { PdfTogetherContext } from "../../../../Controller/Context/Context";
import { ReactDraw, setupDraw } from "../../../../Models/Draw/Draw";
import { Validation as Type } from "../../../../Models/Interfaces/Type";

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

  const handleSave=()=>{

  }

  // const handleDownload=()=>{
  //   if(draw){
  //     const file=draw.getFile();
  //     if(file){
  //       download(file,file.name);
  //     }
  //   }
  // }

  const download = function(file:any,filename:any){
    const link = document.createElement('a');
    link.download = filename;
    link.href = file?URL.createObjectURL(file):"";
    link.click();
  }

  return (
    <>
    <Resizable defaultSize={size} onResizeStop={onResize} style={{border:"5px solid #22DD66",top:point.y,left:point.x,zIndex: 2,position: 'absolute'}}>
      <canvas ref={canvas} width={size.width} height={size.height}/></Resizable>
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