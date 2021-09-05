import {AuthorContext, PdfContext} from "./Context";
import React, { useState,useEffect, useContext} from "react";
import { Layers } from "../../Models/Layers/Layers";
import { NoFetch } from "../../Models/Interfaces/FetchLayer";
import {PdfTogether} from "./../../Models/Main/MainPdfTogether"


const layerDefault=new Layers();
const layerManager=new PdfTogether(layerDefault);
const noFetch=new NoFetch(layerDefault);
layerManager.setFetch(noFetch);

export const PdfContextProvider=({children}:{children:React.ReactChild})=>{
  const author=useContext(AuthorContext);
  const [pdf,setPdf]=useState<File>();
  const [url,setUrl]=useState<string>();
  const [urlLayer,setUrlLayer]=useState<string>();

  useEffect(()=>{
    layerManager.setAuthor(author);
  },[author])

  useEffect(()=>{
    noFetch.loadLayer((arrayLayer)=>{
      layerManager.refreshLayer(arrayLayer);
    })
  },[url,pdf]);

  console.log('pdf context berubah');

  const value={
    setPdf:setPdf,
    url:pdf?URL.createObjectURL(pdf):url,
    setUrl:setUrl,
    layerManager:layerManager
  };

  return (
    <PdfContext.Provider value={value}>
      {children}
    </PdfContext.Provider>
  );
}