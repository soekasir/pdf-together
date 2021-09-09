import { ArrayAcces, Access } from "../Interfaces/Access";
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
  access?:ArrayAcces;


  constructor({name,id_user}:LayerContract.Author,access?:ArrayAcces){
    this.name=name;
    this.id_user=id_user
    if(access) this.access=access;

  }

  setAcces(access:ArrayAcces){
    this.access=access;
  }

  hasAcces(access_to:Access){
    return this.access?.includes(access_to)
  }

}


export abstract class Content implements LayerContract.Content{


  constructor(){

  }

  abstract getType():Validation.Mode;

}


export class Annotation extends Content implements LayerContract.Annotation{
  annot;
  isSolved:boolean|number=false;
  id_annot?:number;

  constructor({annot,isSolved=false}:{annot:string,isSolved:boolean|number}){
    super();
    this.annot=annot;
    this.isSolved=isSolved;
  }

  setIdAnnot(layer:Layers){
    if(!this.id_annot){
      
      let filtered=layer.filter((layer)=>layer.type===Validation.Mode.Annotation);

      if(filtered.length>0){
          this.id_annot=(filtered.reduce((layer1,layer2)=>{
          if(layer1.value.content.id_annot>layer2.value.content.id_annot){
            return layer1;
          }else{
            return layer2;
          }
        }).value.content.id_annot)+1;
      }
    }
  }

  getType(){
    return Validation.Mode.Annotation;
  }

}




export class Draw  extends Content implements LayerContract.Draw{
  file?:File|string;
  url?:string;
  size;

  constructor(file_or_url:string|File,size:Validation.size){
    super();
    if(file_or_url instanceof File){

      this.url=URL.createObjectURL(file_or_url);
      this.file=file_or_url;

    }else{
      this.file=file_or_url;
    }
    
    this.size=size;
  }

  getType(){
    return Validation.Mode.Draw;
  }

}


export class Img  extends Content implements LayerContract.Img{
  file?:File|string;
  url:string;
  size;

  constructor({file_or_url,size}:{file_or_url:File,size:Validation.size}){
    super();

    if(file_or_url instanceof File){

      this.url=URL.createObjectURL(file_or_url);
      this.file=file_or_url;

    }else{
      this.file=file_or_url;
      this.url=file_or_url;
    }

    this.size=size;

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