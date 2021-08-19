import { PdfContext} from "./Context";
import React, { useState,useEffect } from "react";
import { FetchLayer } from "../../Models/Fetch/Fetch";
import { Layers } from "../../Models/Layers/Layers";





/**
 * @const pdf pdf file from local
 * @const urlLayer layer Api to get data from server
 * @const url url to file pdf
 */
export const PdfContextProvider=({children}:{children:React.ReactChild})=>{

  const [pdf,setPdf]=useState<File>();
  const [url,setUrl]=useState<string>();

  const [urlLayer,setUrlLayer]=useState<string>();
  const [layer,setLayer]=useState<Layers>(new Layers());

  useEffect(()=>{

    FetchLayer(urlLayer).then((layer)=>{

      setLayer(layer);

    });

  },[url,pdf]);

  const value={
    pdf:pdf,
    setPdf:setPdf,
    url:pdf?URL.createObjectURL(pdf):url,
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