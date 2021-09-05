// import { useEffect} from "react";
// import { setupCanvas } from "../../../Models/Draw/Draw";
import { Validation as Type } from "../../../../Models/Interfaces/Type";

export const CanvasPoint=({canvasRef,setPoint,className}:{canvasRef:React.RefObject<HTMLCanvasElement>,
  setPoint:React.Dispatch<React.SetStateAction<Type.Point>>,className:any
})=>{

  // useEffect(()=>{
  //   if(canvasRef){
  //     setupCanvas(canvasRef,setPoint);
  //   }
  // },[canvasRef]);

  return <canvas onMouseUp={(e)=>{
    setPoint({
      x:e.nativeEvent.offsetX,
      y:e.nativeEvent.offsetY
    })
  }} ref={canvasRef} className={className}></canvas>
}