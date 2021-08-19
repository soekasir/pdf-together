import { PdfTogetherContext} from "./Context";
import { usePdfTogether } from "../Hooks/PdfTogether/usePdfTogether";
import { ReactChildren, RefObject } from "react";
import { AnnotationFactory } from "annotpdf";
import { Draw } from "../../Models/Draw/Draw";
import { Layers } from "../../Models/Layers/Layers";
import { Author } from "../../Models/Main/MainModel";

interface PropPdfTogetherContextProvider{
  children:ReactChildren,
  pdfRef:any,
  canvasRef:RefObject<HTMLCanvasElement>,
  renderPage:any,
  pdfFactory:AnnotationFactory | undefined,
  draw:Draw,
  layer:Layers,
  author:Author
}


/**
 * Set value for PdfContextProvider
 */
export const PdfTogetherContextProvider=(
    {children,pdfRef,canvasRef,renderPage,pdfFactory,draw,layer,author}:PropPdfTogetherContextProvider
  )=>{
    
    const value=usePdfTogether(canvasRef,pdfRef,renderPage,pdfFactory,draw,layer,author);

  return (
    <PdfTogetherContext.Provider value={value}>
      {children}
    </PdfTogetherContext.Provider>
  );
}