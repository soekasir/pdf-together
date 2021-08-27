import { useEffect, useRef } from "react";
import { setupDraw } from "../../../../Models/Draw/Draw";

export const AnnotDraw=() => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    setupDraw(canvas);
  },[canvas]);

  return (
    <div style={{ width: '201px', height: '201px',
      border:"5px solid #22DD66",top:300,left:400,
      zIndex: 2,position: 'absolute',}}>
      <canvas
        ref={canvas}
        width={200}
        height={200}
      />
    </div>
  );
};