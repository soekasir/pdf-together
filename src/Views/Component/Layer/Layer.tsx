import { ReactChildren, ReactElement, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Validation as Type } from "../../../Models/Interfaces/Type";

interface layerProp{
  point:Type.PointCanvas,
  children:ReactElement
}

export const Layer:React.FC<layerProp>=({children,point})=>{
  return (
    <div style={{zIndex: 2,position:'absolute',top:point.y,left:point.x}}>
      {children}
    </div>
  );
}