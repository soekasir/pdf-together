import { RefObject } from "react";
import { Validation as Type } from "../Interfaces/Type";

abstract class Point{

  flag:boolean= false;
  prevX :number=0; currX :number=0;
  prevY :number=0; currY :number=0;

  w:number=0; //width
  h:number=0; //height

  callback:any;

  element:HTMLElement;

  constructor (
    element:HTMLElement,
    ){
    this.element=element;
    this.w = this.element.clientWidth;
    this.h = this.element.clientHeight;
    // console.log(`width,height: ${this.w},${this.h}`);
  }

  findxy(res:string, e:MouseEvent):void {

    //mouse di klik
    if (res === "down") {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.offsetX;
      this.currY = e.offsetY;
      this.flag = true;
    }
 

    //mouse didrag
    if (res === "move") {
      if(this.flag){
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.offsetX;
        this.currY = e.offsetY;
      }
    }

    //mouse selesai diklik
    if (res === "up" || res === "out") {
      this.flag = false;
    }

    this.run(res,e);

  }

  abstract run(res:string, e:MouseEvent):void;

}

abstract class CanvasPoint extends Point{

  ctx:CanvasRenderingContext2D;
  element:HTMLCanvasElement;
  
  constructor (element_canvas:HTMLCanvasElement,canvas_context:CanvasRenderingContext2D){

    super(element_canvas);
    this.element=element_canvas;
    this.ctx = canvas_context;
    this.w = this.element.clientWidth;
    this.h = this.element.clientHeight;

  }

}

abstract class Draw extends CanvasPoint{
  color:string='black';
  pointer_size:number= 2;
  mode:string=Type.Mode.Null;

  setMode(mode:Type.Mode){
    this.mode=mode;
  }

  setColor(color:string){
    this.color=color;
  }

  getColor(){
    return this.color;
  }

  setPointerSize(size:number){
    this.pointer_size=size;
  }

  draw=()=>{
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

  addImg(src:any,size:Type.size,point?:Type.Point){
    let img=new Image();
    img.src=src;
    img.onload=()=>{
      this.ctx.drawImage(img,point?point.x:this.currX,point?point.y:this.currY,size.width,size.height);
    };
  }

  addImgFromCanvas(src:any,size:Type.size){
    this.addImg(src,size,{x:0,y:0});
  }

  erase(point:Type.Point,size:Type.size) {
    this.ctx.clearRect(point.x, point.y, size.width, size.height);
  }

}

interface Callback{

  setPoint:({x,y}:Type.Point)=>void,

};

export class ReactPoint extends Point{

  callback:Callback={
    setPoint:function({x,y}:Type.Point){}
  };

  setPointCallback(callback:React.Dispatch<React.SetStateAction<Type.Point>>){
    this.callback.setPoint=callback;
  }

  setPoint():void{
    this.callback.setPoint({
      x:this.currX,
      y:this.currY
    });
  }


  run(res:string, e:MouseEvent):void {

    if (res === "down") {
      this.setPoint();
    }

    //mouse didrag
    if (res === "move") {
      if(!this.flag){
        this.setPoint();
      }
    }

  }

}

export class ReactDraw extends Draw{
  #blob?:Blob;

  run(res:string, e:MouseEvent):void {

    //mouse didrag
    if (res === "move") {
      if(this.flag && this.mode===Type.Mode.Draw){
        this.draw();
      }
    }

    if (res === "up" || res === "out") {
      this.#setBlob();
    }

  }

  getBase64=()=>{
    return this.element.toDataURL();
  }

  #setBlob=()=>{
    this.element.toBlob((blob)=>{
      if(blob) this.#blob=blob;
    });
  }

  #toFile=(blob:Blob)=>{
    return this.#blobToFile(blob);
  }

  #blobToFile = (theBlob: Blob): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = "images-"+b.lastModifiedDate.getTime()+".png";
    return theBlob as File;
  }

  getFile(){
    let file;

    if(this.#blob){
      file=this.#toFile(this.#blob);
    }

    return file;
  }

  getSvg(){
    
  }

}

const setupEventListener=(html_element:HTMLElement,class_point:Point)=>{

  html_element.addEventListener("mousedown", function (e:MouseEvent) {
    class_point.findxy('down', e);
  }, false);

  html_element.addEventListener("mousemove", function (e:MouseEvent) {
    class_point.findxy('move', e);
  }, false);

  html_element.addEventListener("mouseup", function (e:MouseEvent) {
    class_point.findxy('up', e);
  }, false);
  
  html_element.addEventListener("mouseout", function (e:MouseEvent) {
    class_point.findxy('out', e);
  }, false);

}

export const setupPoint=(
    canvasRef:RefObject<HTMLCanvasElement>,
    setPoint: React.Dispatch<React.SetStateAction<Type.Point>>
  )=>{

  let element_canvas=canvasRef.current;
  if(!element_canvas) { return; }

  const react_canvas_point=new ReactPoint(element_canvas);

  setupEventListener(element_canvas,react_canvas_point);

  react_canvas_point.setPointCallback(setPoint);

  return react_canvas_point;
}

export const setupCanvas=(
    canvasRef:RefObject<HTMLCanvasElement>,
    setPoint: React.Dispatch<React.SetStateAction<Type.Point>>
  )=>{

  return setupPoint(canvasRef,setPoint);
}

export const setupDraw=(canvasRef:RefObject<HTMLCanvasElement>)=>{

  if(!canvasRef) { return; }
  let element_canvas=canvasRef.current;
  if(!element_canvas) { return; }
  let renderingContext=element_canvas.getContext('2d');
  if(!renderingContext) { return; }

  const react_draw=new ReactDraw(element_canvas,renderingContext);

  setupEventListener(element_canvas,react_draw);

  react_draw.setMode(Type.Mode.Draw);

  return react_draw;
}