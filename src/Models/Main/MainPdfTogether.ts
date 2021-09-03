import { AnnotationFactory } from "annotpdf";
import { Validation as Type } from "../Interfaces/Type";
import { ReactDraw} from "../Draw/Draw";
import { Layers} from "../Layers/Layers";
import * as Models from './MainModel';
import { LayerContract } from "../Interfaces/LayerContract";
import { FetchLayers, NoFetch } from "../Interfaces/FetchLayer";


export interface CurrentPage{
  pageNum:number,
  actualSize:Type.size
}

abstract class LayerManager{
  protected layer;
  constructor(layer:Layers){
    this.layer=layer;
  }

}

class DocLayerManager extends LayerManager{

  protected fetch:FetchLayers;

  point:Type.Point={
    x:0,y:0
  };

  protected canvasRef?:React.RefObject<HTMLCanvasElement>;

  currentPage?:CurrentPage;

  author?:Models.Author;

  setMode?:React.Dispatch<React.SetStateAction<Type.Mode>>;


  constructor(layer:Layers){
    super(layer)
    this.fetch=new NoFetch(layer);
  }

  getAll(){
    return this.layer.getAll();
  }

  get(id:number){
    return this.layer.get(id);
  }

  setPoint(point:Type.Point){
    this.point=point;
  }

  setAuthor(author:Models.Author){
    this.author=author;
  }

  setCanvasref(canvasRef:React.RefObject<HTMLCanvasElement>){
    this.canvasRef=canvasRef;
  }

  setCurrentPage(currentPage:CurrentPage){
    this.currentPage=currentPage;
  }

  setModeDispatch(setMode:React.Dispatch<React.SetStateAction<Type.Mode>>){
    this.setMode=setMode;
  }

  /**
   * @param fetchlayers to set Fetcher so this App can connect to server
   */
  setFetch(fetchlayers:FetchLayers){
    this.fetch=fetchlayers;
  }

  /**
   * to filter layers by type
   */
  filterType=(type:Type.Mode)=>{
    return this.layer.filter((layer)=>layer.type===type);
  }

  /**
   * convert draw point to canvas point
   * @return canvas point | current point if parameter not defined
   */
  toCanvasPoint=(point?:Type.Point):Type.PointCanvas=>{
    if(this.canvasRef?.current){
      return {
        x:this.canvasRef.current.offsetLeft+(point?point.x:this.point.x),
        y:this.canvasRef.current.offsetTop+(point?point.y:this.point.y)
      }
    }else{
      return {
        x:0,y:0
      };
    }
  }

  /**
   * convert pdf point to canvas point
   */
  pdfPointToCanvasPoint=(point:Type.PointPdf):Type.PointCanvas=>{
    const scale=this.getScale();
    const cCS=this.getCurrentCanvasSize();

    let result={
      x:0,y:0
    };

    if(scale && cCS){
      const newPoint={
        y:cCS.height-(point.y/scale.height),
        x:point.x/scale.width,
      }
      result=this.toCanvasPoint(newPoint);
    }

    return result;
  }

  getCurrentPageActuallSize=()=>{
    if(this.currentPage) return {height:this.currentPage.actualSize.height,width:this.currentPage.actualSize.width}
  }

  getCurrentCanvasSize=()=>{
    if(this.canvasRef?.current){
      return {height:this.canvasRef.current.clientHeight,width:this.canvasRef.current.clientWidth}
    }
    return;
  }

  getScale=()=>{
    const cCS=this.getCurrentCanvasSize();
    const cPAS=this.getCurrentPageActuallSize();
    let size_scale:Type.size|undefined;

    if(cCS && cPAS){
      size_scale={
        height:cPAS.height/cCS.height,
        width:cPAS.width/cCS.width,
      }
    }

    return size_scale;
  }

  /**
   * convert canvas point  to pdf point
   */
  canvasPointToPdfPoint=(point:Type.PointCanvas):Type.PointPdf=>{
    const cCS=this.getCurrentCanvasSize();
    const scale=this.getScale();

    const result={
      y:0,
      x:0
    }

    if(scale && cCS){
      result.x=Math.round(point.x*scale.width);
      result.y=Math.round((cCS.height-point.y)*scale.height);
    }

    return result;

  }

  refreshLayer=(layers:LayerContract.ArrayLayer[])=>{
    console.log(JSON.stringify(layers));
    this.layer.reFill(layers);
    if(this.setMode){
      this.setMode(Type.Mode.Null);
    }
  }

  /** to add layer in current layer */
  #addToLayer=(form:{content:Models.Content})=>{

    if(this.currentPage && this.author){

      const layerValue=new Models.LayerValue({
        type:form.content.getType(),
        author:this.author,
        point:this.canvasPointToPdfPoint(this.point),
        onPage:this.currentPage.pageNum===0?1:this.currentPage.pageNum,
        content:form.content
      });
      

      this.fetch.addLayer(layerValue,(value:LayerContract.ArrayLayer[])=>{

        this.refreshLayer(value);

      });
    }

  }

  /**
   * to update content of a layers
   * @param id id layer
   * @param content
   */
  updateLayerContent=(id_layer:LayerContract.LayerId,content:LayerContract.Content)=>{

    //fetch to json first, if succes then edit layer
    const layer=this.layer.get(id_layer);
    if(layer){
      let newLayer={...layer};
      newLayer.content=content;

      this.fetch.updateLayer(id_layer,newLayer,(value:LayerContract.ArrayLayer[])=>{

        this.refreshLayer(value);
  
      });

    }

  }
  
  /**
   * to update content of a layers
   * @param id id layer
   * @param content
   */
  deleteLayerContent=(id_layer:LayerContract.LayerId)=>{

    this.fetch.deleteLayer(id_layer,(value:LayerContract.ArrayLayer[])=>{

      this.refreshLayer(value);

    });

  }

  /**
   * to add annotation in current layers.
   */
  addAnnotation=(form:LayerContract.Annotation)=>{
    let content=new Models.Annotation(form);
    content.setIdAnnot(this.layer);
    this.#addToLayer({content:content});
  }

  /**
   * to add chat in current layers.
   */
  addChat=(form:LayerContract.Chat)=>{
    let content=new Models.Chat(form);
    this.#addToLayer({content:content});
  }

  /**
   * to add img in current layers.
   */
  addImg=(form:any)=>{
    let content=new Models.Img(form);
    this.#addToLayer({content:content});
  }

  /**
   * to add a draw in current layers.
   * @param content use new Models.Draw()
   */
  addDraw=(reactDraw:ReactDraw,size:Type.size)=>{
    let file=reactDraw.getBase64();
    if(file){
      let content=new Models.Draw(file,size);
      this.#addToLayer({content:content});
    }
  }

}

/**
 * Final class! sure, dont extends this class
 */
export class PdfTogether extends DocLayerManager{

}

export const addAnnotationInPdfDoc=(layerAnnot:LayerContract.LayerAnnotation,pdfFactory:AnnotationFactory)=>{

    pdfFactory.createTextAnnotation({

      page: layerAnnot.onPage-1,

      rect: [layerAnnot.point.x, layerAnnot.point.y, layerAnnot.point.x+10, layerAnnot.point.y+10],

      contents: layerAnnot.content,

      author: layerAnnot.author,

      color:{r:100,g:100,b:50},

    });

}