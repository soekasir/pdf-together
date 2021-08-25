/**
 * to Manage Other Library
 * in some future, maybe we need to change library that we use.
*/




/**
 * PdfJs from Mozilla
 * https://github.com/mozilla/pdfjs-dist/
*/
import * as pdfjs from 'pdfjs-dist/webpack';

// import {pdfjsWorker} from "pdfjs-dist";
import {PDFWorker} from "pdfjs-dist";


pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/lib/pdf.worker";




export const pdfjsLib=pdfjs;



/**
 * Pdf Factor from annotpdf
 * https://github.com/highkite/pdfAnnotate
*/
export {AnnotationFactory} from 'annotpdf';