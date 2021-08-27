



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




  export type RectPoint={
    x1:number,
    y1:number,
    x2:number,
    y2:number
  }




  export type RectPointPdf=RectPoint;




  export type RectPointCanvas=RectPoint;

  /*_______________________________________________________
  * Enums
  *_____________________________________________________*/
  export enum Mode{
    Null='Null',
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


}