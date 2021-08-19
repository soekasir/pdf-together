import { RefObject } from "react";
import { Validation as Type } from "../Interfaces/Type";

interface Callback{

  setPoint:({x,y}:Type.Point)=>void,

};

export class Draw{

  flag:boolean= false; dot_flag:boolean = false;
  prevX :number=0; currX :number=0;
  prevY :number=0; currY :number=0;

  w:number=0; //width
  h:number=0; //height

  color:string='black';
  pointer_size:number= 2;

  mode:string|null=null; // draw,annotation,img

  callback:Callback={
    setPoint:function({x,y}:Type.Point){}
  };

  ctx:any;
  canvas:any;

  constructor (
    element_canvas:HTMLElement,
    canvas_context:RenderingContext
    ){
    this.canvas=element_canvas;
    this.ctx = canvas_context;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  setMode(mode:Type.Mode|null){
    this.mode=mode;
  }

  setColor(color:string){
    this.color=color;
  }

  setPointCallback(callback:React.Dispatch<React.SetStateAction<Type.Point>>){
    console.log('setPointCallback');
    this.callback.setPoint=callback;
  }

  runMode(e:any){
    if(this.mode==='Annotation' || this.mode==='Img'){
      this.runSetPoint();
    }
  }

  getPoint(){
    return {
      x:this.currX,
      y:this.currY
    }
  }

  runSetPoint():void{
    this.callback.setPoint({
      x:this.currX,
      y:this.currY
    });
  }

  findxy(res:string, e:any):void {

    //mouse di klik
    if (res === 'down') {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft+window.scrollX;
        this.currY = e.clientY - this.canvas.offsetTop+window.scrollY;
        this.flag = true;

        if(this.mode==='Draw'){
          this.dot_flag = true;
          if (this.dot_flag) {
              this.ctx.beginPath();
              this.ctx.fillStyle = this.color;
              this.ctx.fillRect(this.currX, this.currY, 2, 2);
              this.ctx.closePath();
              this.dot_flag = false;
          }
        }else{
          this.runMode(e);
        }        
    }


    //mouse didrag
    if (res === 'move') {
      if (this.flag && this.mode==='Draw') {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
        this.draw();
      }
    }

    //mouse selesai diklik
    if (res === 'up' || res === "out") {
      this.flag = false;
    }

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.pointer_size;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  addText({text,font= "30px Arial"}:any):void{
    this.ctx.font=font ;
    this.ctx.fillText(text, this.currX,this.currY);
  }

  addTextCostum({text,x,y,font= "20px Arial"}:any):void{
    this.ctx.font=font ;
    this.ctx.fillText(text, x,y);
  }

  addImg({src}:any){
    let img=new Image();
    img.src=URL.createObjectURL(src);
    img.onload=()=>{
      this.ctx.drawImage(img,this.currX,this.currY);
    };
  }

  erase() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  save() {
    return this.canvas['toDataURL']();
  }

}

export const canvasDrawer=(canvasRef:RefObject<HTMLCanvasElement>)=>{

  if(!canvasRef) { return; }
  let element_canvas=canvasRef.current;
  if(!element_canvas) { return; }
  let renderingContext=element_canvas.getContext('2d');
  if(!renderingContext) { return; }

  const myDraw=new Draw(
    element_canvas,
    renderingContext
  );

  element_canvas.addEventListener("mousemove", function (e:any) {
    myDraw.findxy('move', e);
  }, false);

  element_canvas.addEventListener("mousedown", function (e:any) {
    myDraw.findxy('down', e);
  }, false);

  element_canvas.addEventListener("mouseup", function (e:any) {
    myDraw.findxy('up', e);
  }, false);
  
  element_canvas.addEventListener("mouseout", function (e:any) {
    myDraw.findxy('out', e);
  }, false);

  return myDraw;
}