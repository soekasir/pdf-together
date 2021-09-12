import {AuthorContext, PdfContext} from "./Context";
import React, { useState,useEffect, useContext} from "react";
import {layerManager, noFetch} from "../Env/LayerManager.env";

export const PdfContextProvider=({children}:{children:React.ReactChild})=>{
  const {author}=useContext(AuthorContext);
  const [pdf,setPdf]=useState<File>();
  const [url,setUrl]=useState<string>();
  // const [urlLayer,setUrlLayer]=useState<string>();

  useEffect(()=>{
    if (author) layerManager.setAuthor(author);
  },[author])

  useEffect(()=>{
    noFetch.loadLayer((arrayLayer)=>{
      layerManager.refreshLayer(arrayLayer);
    })
  },[url,pdf]);

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