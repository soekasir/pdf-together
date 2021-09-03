import {Validation as Type} from './Type';


export namespace LayerContract{

  export type LayerId=number;
  
  export type LayerType=Type.Mode;

  export type id_user=string;

  export type ArrayLayer={
    id:LayerId,
    value:LayerValue
  }

  export interface Author{
    name:string,
    id_user:id_user,
  }

  export interface Content{
  
  }

  export interface Annotation extends Content{
    annot:string,
    isSolved:boolean,
    id_annot?:number,
  }

  export interface Img extends Content{
    file?:File|string,
    url:string,
    size:Type.size;
  }

  export interface Chat extends Content{
    message:string,
    to:LayerId, //id
  };

  export interface Draw extends Content{
    file?:string|File,
    url?:string,
    size:Type.size;
  }

  export interface LayerValue{
    id?:LayerId,
    type:LayerType,
    author:Author,
    point:Type.PointPdf,
    date:number,
    onPage:number,
    content:any
  }

  export interface LayerAnnotation extends LayerValue{
    content:Annotation,
  }

  export interface LayerImg extends LayerValue{
    content:Img,
  }

  export interface LayerDraw extends LayerValue{
    content:Draw,
  }

  export interface LayerChat extends LayerValue{
    content:Chat,
  }

  export interface LayersInterfaces{

    /**
     * To add a layer
     * @returns this
     */
    add(value:LayerValue):this;

    /**
     * to get a layer value
     */
    get(id:LayerId):LayerValue|undefined;

    /**
     * to get all layers
     */
    getAll():ArrayLayer[];


    /**
     * to delete a layer
     * @returns {Layer} this
     */
    delete(id:LayerId):this;

    /**
     * to update a layer
     * @returns {Layer} this
     */
    update(id:LayerId,value:LayerValue):this;

  }

}