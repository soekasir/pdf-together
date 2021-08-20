import { ReactChildren, ReactElement } from "react";
import { Validation as Type } from "../../../Models/Interfaces/Type";
// import { navbarTop } from "../../../Resources/style/style";

interface layerProp{
  point:Type.PointCanvas,
  children:ReactChildren|ReactElement
}

export const Layer:React.FC<layerProp>=({children,point})=>{
  return (
    <div style={{
    zIndex: 2,position: 'absolute',
    top:point.y,left:point.x,
    backgroundColor:'whitesmoke'
    }}>
      {children}
    </div>
  );
}