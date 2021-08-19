import { createContext} from "react";
import { Author } from "../../Models/Main/MainModel";
import { PdfTogether } from "../../Models/Main/MainPdfTogether";

/**
 * Context for Pdf
 */
 export const PdfContext=createContext(undefined);

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