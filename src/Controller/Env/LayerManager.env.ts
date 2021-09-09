import { Layers } from "../../Models/Layers/Layers";
import { NoFetch } from "../../Models/Interfaces/FetchLayer";
import {PdfTogether} from "./../../Models/Main/MainPdfTogether"


const layerDefault=new Layers();
const layerManager=new PdfTogether(layerDefault);
const noFetch=new NoFetch(layerDefault);
layerManager.setFetch(noFetch);

export {layerManager,noFetch};