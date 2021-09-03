import {AuthorContext, PdfContext} from "./Context";
import React, { useState,useEffect, useContext} from "react";
import { FetchLayer } from "../../Models/Fetch/Fetch";
import { Layers } from "../../Models/Layers/Layers";
import { usePdfTogether } from "../Hooks/PdfTogether/usePdfTogether";




export const PdfContextProvider=({children}:{children:React.ReactChild})=>{
  const author=useContext(AuthorContext);
  const [pdf,setPdf]=useState<File>();
  const [url,setUrl]=useState<string>();
  const [urlLayer,setUrlLayer]=useState<string>();
  const [layer,setLayer]=useState<Layers>(new Layers());
  const layerManager=usePdfTogether(layer);
  layerManager.setAuthor(author);
  

  useEffect(()=>{
    if(urlLayer){
      FetchLayer(urlLayer).then((layer)=>{
        setLayer(layer);
      });
    }
  },[url,pdf]);

  console.log('pdf context berubah');

  const value={
    pdf:pdf,
    setPdf:setPdf,
    url:pdf?URL.createObjectURL(pdf):url,
    setUrl:setUrl,
    // layer:layer,
    setUrlLayer:setUrlLayer,
    layerManager:layerManager
  };

  return (
    <PdfContext.Provider value={value}>
      {children}
    </PdfContext.Provider>
  );
}