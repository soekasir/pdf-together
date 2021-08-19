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
  renderPage:(prop:any)=>void,
  pdfFactory: AnnotationFactory | undefined,
  draw:Draw,
  layer:Layers,
  author:Author
  )=>{

  const [annotation,setAnnotation]=useState<Annotation[][]>();

  const [layerValue,setLayerValue]=useState<LayerContract.ArrayLayer[]>();

  const [currentPage, setCurrentPage] = useState(1);

  const [option,setOption]=useState({scale:1});

  const [mode,setMode]=useState<Type.Mode|null>(null);

  const [point,setPoint]=useState<Type.Point>({x:0,y:0});

  const [panel,setPanel]=useState({
    isActive:false,
    activeMode:'comment', //comment, file, trash, share, upload
    commentTab:{
      isLoadAll:true,
    },
    fileTab:{
      //option here
    },
    trashTab:{
      //option here
    },
    shareTab:{
      //option here
    },
    uploadTab:{
      //option here
    }
  });

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

  //Use Effect
  useEffect(() => {
    renderPage({pageNum:currentPage,scale:option.scale});
  }, [option,pdfRef,currentPage]);

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
    pdfFactory:pdfFactory,
    currentPage:currentPage,
    point:point,
    option:option,
    mode:mode,
    draw:draw,
    layer:layer,
    layerValue:layerValue,
    panel:panel,
    author:author
  },{
      setAnnotation: setAnnotation,
      setCurrentPage: setCurrentPage,
      setOption: setOption,
      setMode: setMode,
      setPanel: setPanel,
      setLayerValue:setLayerValue,
  });
};