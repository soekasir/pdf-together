import { PdfContext} from "./Context";
import { useState,useEffect } from "react";
import { FetchLayer } from "../../Models/Fetch/Fetch";
import { Layers } from "../../Models/Layers/Layers";


/**
 * @const pdf pdf file from local
 * @const urlLayer layer Api to get data from server
 * @const url url to file pdf
 */
export const PdfContextProvider=({children})=>{

  const [pdf,setPdf]=useState();
  const [url,setUrl]=useState();

  const [urlLayer,setUrlLayer]=useState('http://localhost:3004/data');
  const [layer,setLayer]=useState(new Layers());

  useEffect(()=>{

    FetchLayer(urlLayer).then((layer)=>{

      setLayer(layer);

    });

  },[url,pdf]);

  const value={
    pdf:pdf,
    setPdf:setPdf,
    url:pdf instanceof File? URL.createObjectURL(pdf):url,
    setUrl:setUrl,
    layer:layer,
    setUrlLayer:setUrlLayer
  };

  return (
    <PdfContext.Provider value={value}>
      {children}
    </PdfContext.Provider>
  );
}