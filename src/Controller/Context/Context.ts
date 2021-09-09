import React, { createContext} from "react";
import { LayerContract } from "../../Models/Interfaces/LayerContract";
import { Author } from "../../Models/Main/MainModel";
import { CurrentPage, PdfTogether } from "../../Models/Main/MainPdfTogether";

/**
 * Context for Pdf
 */
interface PdfContextValue{
  setPdf:React.Dispatch<React.SetStateAction<File | undefined>>
  url:string|undefined,
  setUrl:React.Dispatch<React.SetStateAction<string | undefined>>,
  layerManager:PdfTogether
};

interface PdfTogetherContext{
  layers:LayerContract.ArrayLayer[],
  currentPage:CurrentPage
}

interface AuthorContextValue{
  author:Author|undefined,
  setAuthor:React.Dispatch<React.SetStateAction<Author | undefined>>,
}

/**
 * Context for Document
 */
export const PdfContext=createContext({} as PdfContextValue);

/**
 * Context for Pdf Together
 */
export const PdfTogetherContext=createContext({} as PdfTogetherContext);

/**
 * Context for global Api
 */
// export const ApiContext=createContext(undefined);

/**
 * Context for Author
 */
 export const AuthorContext=createContext({} as AuthorContextValue);