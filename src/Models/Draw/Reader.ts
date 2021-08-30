import { RefObject } from "react";
import { ReactDraw, setupDraw } from "./Draw";

export class Reader{

  reader:FileReader;

  constructor(public blob:Blob){
    this.reader = new FileReader();
  }

  loadBlob() {
    this.reader.readAsText(this.blob);
  }

  // this function executes when the contents of the file have been fetched
  toImages() {
    var data;

    if(typeof this.reader.result==="string"){
      data = JSON.parse(this.reader.result);
    }

    var image = new Image();
    image.src = data.image; // data.image contains the data URL

    return image;
  };

  toUrl(){
    return URL.createObjectURL(this.toImages);
  }

  static loadToReactDraw(blob:Blob,canvasRef:RefObject<HTMLCanvasElement>){
    let reader=new Reader(blob);
    let img=reader.toImages();
    let draw=setupDraw(canvasRef);
    draw?.addImg(img);
  }

}