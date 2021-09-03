import { PdfTogether } from "../../../Models/Main/MainPdfTogether";
import { Layers } from "../../../Models/Layers/Layers";

export const usePdfTogether=(layer:Layers,)=>{
  return new PdfTogether(layer);
};