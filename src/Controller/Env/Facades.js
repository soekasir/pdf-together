/**to Manage Other Library*/

/**
 * PdfJs from Mozilla
 * https://github.com/mozilla/pdfjs-dist/
*/
import * as pdfjs from 'pdfjs-dist/webpack';

import {pdfjsWorker} from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const pdfjsLib=pdfjs;

/**
 * Pdf Factor from annotpdf
 * https://github.com/highkite/pdfAnnotate
*/
export {AnnotationFactory} from 'annotpdf';