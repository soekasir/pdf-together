import React, { createContext} from "react";
import { Layers } from "../../Models/Layers/Layers";
import { Author } from "../../Models/Main/MainModel";
import { PdfTogether } from "../../Models/Main/MainPdfTogether";

/**
 * Context for Pdf
 */

interface PdfContextValue{
  pdf:File|undefined,
  setPdf:React.Dispatch<React.SetStateAction<File | undefined>>
  url:string|undefined,
  setUrl:React.Dispatch<React.SetStateAction<string | undefined>>,
  layer:Layers,
  setUrlLayer:React.Dispatch<React.SetStateAction<string | undefined>>
};







export const PdfContext=createContext({}as PdfContextValue);






/**
 * Context for Pdf Together
 */
export const PdfTogetherContext=createContext({} as PdfTogether);






/**
 * Context for global Api
 */
export const ApiContext=createContext(undefined);






/**
 * Context for Author
 */
 export const AuthorContext=createContext({} as Author);