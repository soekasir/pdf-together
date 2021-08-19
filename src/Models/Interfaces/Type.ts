
export namespace Validation{

  /*_______________________________________________________
  * Type
  *_____________________________________________________*/
  export type Point={
    x:number,
    y:number
  }

  export type PointPdf=Point;

  export type PointCanvas=Point;


  /*_______________________________________________________
  * Enums
  *_____________________________________________________*/
  export enum Mode{
    Img='Img',
    Chat='Chat',
    Annotation='Annotation',
    Draw='Draw',
  }

  export enum LayerDisplay{
    pin='pin',
    form='form',
    show='show',
    add='add',
    hidden='hidden'
  }

  export enum FilterAnnotation{
    All='all',
    Latest='latest', 
    MyComment='mycomment',
    NotMyComment='notmycomment',
    Solved='solved',
    Unsolved='unsolved',
    CurrentPage='currentpage',

  }

  type annotation={
    annot:string,
    isSolved:boolean,
    setValue:void,

  }

  type chat={
    num:number
  }

  interface content{
    content:annotation|chat;
  }

  class Content implements content{
    content:annotation|chat;

    constructor(content:annotation){
      this.content=content;
    }
  }

}