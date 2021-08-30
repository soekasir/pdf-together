import { LayerContract } from "../Interfaces/LayerContract";
import { Validation } from "../Interfaces/Type";
import { Layers } from "../Layers/Layers";


export class LayerValue implements LayerContract.LayerValue{
  type;
  author;
  point;
  date;
  onPage;
  content;



  constructor({ type,author,point,onPage,content }
      :{ type:Validation.Mode,author:Author,point:Validation.Point,onPage:number,content:Content }){

    this.author=author; this.type=type;
    this.point=point; this.onPage=onPage;
    this.date=new Date().getTime();
    this.content=content;

  }

}




export class Author implements LayerContract.Author{
  name:string;
  id_user:LayerContract.id_user;

  constructor({name,id_user}:LayerContract.Author){
    this.name=name;
    this.id_user=id_user
  }

}



export abstract class Content implements LayerContract.Content{


  constructor(){

  }

  abstract getType():Validation.Mode;

}


export class Annotation extends Content implements LayerContract.Annotation{
  annot;
  isSolved=false;
  id_annot?:number;

  constructor({annot,isSolved=false}:{annot:string,isSolved:boolean}){
    super();
    this.annot=annot;
    this.isSolved=isSolved;
  }

  setIdAnnot(layer:Layers){
    if(!this.id_annot){
      this.id_annot=(layer.filterType(Validation.Mode.Annotation).reduce((layer1,layer2)=>{
        if(layer1.value.content.id_annot>layer2.value.content.id_annot){
          return layer1;
        }else{
          return layer2;
        }
      }).value.content.id_annot)+1;
    }
  }

  getType(){
    return Validation.Mode.Annotation;
  }

}




export class Draw  extends Content implements LayerContract.Draw{
  url;
  rectPoint;

  constructor(url:string,rectPoint:Validation.RectPoint){
    super();
    this.url=url;
    this.rectPoint=rectPoint;
  }

  getType(){
    return Validation.Mode.Draw;
  }

}


export class Img  extends Content implements LayerContract.Img{
  file?:File;
  url:string;
  rectPoint:Validation.RectPoint;

  constructor({file_or_url,rectPoint}:{file_or_url:File,rectPoint:Validation.RectPoint}){
    super();

    if(file_or_url instanceof File){

      this.url=URL.createObjectURL(File);
      this.file=file_or_url;

    }else{
      this.url=file_or_url;
    }

    this.rectPoint=rectPoint;

  }

  getType(){
    return Validation.Mode.Img;
  }

}





export class Chat extends Content implements LayerContract.Chat{
  message;
  to=0;

  constructor({message,to}:LayerContract.Chat){
    super();
    this.message=message;
    this.to=to;
  }

  getType(){
    return Validation.Mode.Chat;
  }

}