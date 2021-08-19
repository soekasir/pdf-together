import { Annotation } from "annotpdf/lib/parser";
import { useState, useEffect} from "react";
import { Draw } from "../../../Models/Draw/Draw";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import { PdfTogether } from "../../../Models/Main/MainPdfTogether";
import { AnnotationFactory } from "annotpdf";
import { Layers } from "../../../Models/Layers/Layers";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import { Author } from "../../../Models/Main/MainModel";





export const usePdfTogether=(
  canvasRef:React.RefObject<HTMLCanvasElement>,
  pdfRef:any,
  pdfFactory: AnnotationFactory | undefined,
  draw:Draw,
  layer:Layers,
  author:Author,
  currentPage:number
  )=>{

  const [annotation,setAnnotation]=useState<Annotation[][]>();

  const [layerValue,setLayerValue]=useState<LayerContract.ArrayLayer[]>();

  const [mode,setMode]=useState<Type.Mode|null>(null);

  const [point,setPoint]=useState<Type.Point>({x:0,y:0});


  useEffect(()=>{
    if(layer){
      setLayerValue(layer.toArray());
    }
  },[layer]);

  useEffect(()=>{
    if(draw){
      draw.setPointCallback(setPoint);
    }
  },[draw]);

  useEffect(()=>{
    if(pdfFactory){
      pdfFactory.getAnnotations().then((annot)=>{
        setAnnotation(annot);
      });
    }
  },[pdfFactory]);

  return new PdfTogether({
    canvasRef:canvasRef,
    annotation:annotation,
    pdfRef:pdfRef,
    point:point,
    pdfFactory:pdfFactory,
    currentPage:currentPage,
    layer:layer,
    mode:mode,
    draw:draw,
    layerValue:layerValue,
    author:author
  },{
      setAnnotation: setAnnotation,
      setMode: setMode,
      setLayerValue:setLayerValue,
  });
};