import { LayerContract } from "../Interfaces/LayerContract";
import { Validation } from "../Interfaces/Type";


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










export class Content implements LayerContract.Content{


  constructor(){
    
  }

}







export class Annotation extends Content implements LayerContract.Annotation{
  annot;
  isSolved;

  constructor({annot,isSolved}:{annot:string,isSolved:boolean}){
    super();
    this.annot=annot;
    this.isSolved=isSolved;
  }

}









export class Draw  extends Content implements LayerContract.Draw{

  constructor(public canvasRef:HTMLElement){
    super();
  }

}








export class Img  extends Content implements LayerContract.Img{
  file?:File;
  url:string;
  size:number;

  constructor({file_or_url,size}:{file_or_url:File,size:number}){
    super();

    if(file_or_url instanceof File){

      this.url=URL.createObjectURL(File);
      this.file=file_or_url;

    }else{
      this.url=file_or_url;
    }

    this.size=size;

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

}