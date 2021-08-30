import { AnnotationFactory } from "annotpdf";
import { Annotation } from "annotpdf/lib/parser";
import { Validation as Type } from "../Interfaces/Type";
import { ReactDraw, ReactPoint } from "../Draw/Draw";
import { Layers} from "../Layers/Layers";
import * as Models from './MainModel';
import { LayerContract } from "../Interfaces/LayerContract";


interface PropertyPdfTogether{




  canvasRef:React.RefObject<HTMLCanvasElement>;




  annotation:Annotation[][]|undefined;




  pdfRef:any;




  point:Type.PointCanvas;




  pdfFactory:AnnotationFactory|undefined;




  currentPage:number;




  layer:Layers;




  layerValue:LayerContract.ArrayLayer[]|undefined;




  mode:Type.Mode|null;




  canvasPoint:ReactPoint|undefined;




  author:Models.Author


}






interface MethodPdfTogether{




  setAnnotation: React.Dispatch<React.SetStateAction<Annotation[][] | undefined>>




  setMode: React.Dispatch<React.SetStateAction<Type.Mode>>




  setLayerValue:React.Dispatch<React.SetStateAction<LayerContract.ArrayLayer[] | undefined>>

}







class Together{




  constructor(public prop:PropertyPdfTogether,public meth:MethodPdfTogether){

  }





  /**
   * convert draw point to canvas point
   * @return canvas point | current point if parameter not defined
   */
  getCanvasPoint=(point?:Type.Point):Type.PointCanvas=>{
    if(this.prop.canvasRef.current){
      return {
        x:this.prop.canvasRef.current.offsetLeft+(point?point.x:this.prop.point.x),
        y:this.prop.canvasRef.current.offsetTop+(point?point.y:this.prop.point.y)
      }
    }
    return {
      x:0,y:0
    }
  }






  /**
   * convert pdf point to canvas point
   */
  pdfPointToCanvasPoint=(point:Type.PointPdf):Type.PointCanvas=>{
    let top=()=>this.prop.canvasRef.current?this.prop.canvasRef.current.height-point.y+this.prop.canvasRef.current.offsetTop:0;
    let left=()=>this.prop.canvasRef.current?point.x+this.prop.canvasRef.current.offsetLeft:0;

    return {
      y:top(),
      x:left(),
    }
  }








  /**
   * convert canvas point  to pdf point
   */
  canvasPointToPdfPoint=(point:Type.PointCanvas):Type.PointPdf=>{
    return {
      x:point.x,
      y:this.prop.canvasRef.current?this.prop.canvasRef.current.height-point.y:0,
    };
  }








  /** to add layer in current layer */
  #addToLayer=(form:{content:Models.Content})=>{

    let value=new Models.LayerValue({
      type:form.content.getType(),
      author:this.prop.author,
      point:this.canvasPointToPdfPoint(this.prop.point),
      onPage:this.prop.currentPage,
      content:form.content
    });

    //Do Fetch.Post to server first
    //if server return succes, then we add it to client layer

    /**
     * //Example Post to Server
     * if(Fetch.PostWithAuth("url_post",data:{value:value})){
     */

      this.prop.layer.add(value);

      this.meth.setLayerValue(this.prop.layer.toArray());

      // console.log(JSON.stringify(this.prop.layer.toArray()));

    /**
     * }
     */

  }





  /**
   * to add annotation in current layers.
   */
  addAnnotation=(form:LayerContract.Annotation)=>{
    let content=new Models.Annotation(form);
    content.setIdAnnot(this.prop.layer);
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
  addDraw=(reactDraw:ReactDraw)=>{

    // let content=new Models.Draw(form);
    // this.#addToLayer({content:content});
  }

  /**
   * to update content of a layers
   * @param id id layer
   * @param content
   */
  updateLayerContent=(id_layer:LayerContract.LayerId,content:LayerContract.Content)=>{

    let layer=this.prop.layer.get(id_layer);
    if(layer){
      layer.content=content;

      console.log(this.prop.layer.update(id_layer,layer));
      this.meth.setLayerValue(this.prop.layer.toArray());
    }

  }




}









class PdfTogetherUi extends Together{

  selectMode(mode:Type.Mode){

    if(this.prop.mode!==mode){ 
      this.meth.setMode(mode);
    }else{
      this.meth.setMode(Type.Mode.Null);
    }

  }


}








/**
 * Final class! sure, dont extends this class
 */
export class PdfTogether extends PdfTogetherUi{
  



  addAnnotationInPdfDoc=(form:{content:{annot:string},author:LayerContract.Author})=>{

    let pdfCoord=[
      this.prop.canvasRef.current?this.prop.point.x:0,
      this.prop.canvasRef.current?this.prop.canvasRef.current.height-this.prop.point.y:0
    ];

    if(this.prop.pdfFactory){

      this.prop.pdfFactory.createTextAnnotation({

        page: this.prop.currentPage-1,

        rect: [pdfCoord[0], pdfCoord[1], pdfCoord[0]+10, pdfCoord[1]+10],

        contents: form.content,

        author: form.author,

        color:{r:100,g:100,b:50},

      });

      this.prop.pdfFactory.getAnnotations().then((annot)=>{

        this.meth.setAnnotation(annot);

      });

    }

  }





  /**
   * to delete an annotation in pdf document, not in layer
   */
  deleteAnnotationFromPdf=(id_annotation:any)=>{
    if(this.prop.pdfFactory) this.prop.pdfFactory.deleteAnnotation(id_annotation);
  }




  /**
   * to Download Pdf with Annotation
   */
  downloadPdfWithNewAnnotation=()=>{
    if(this.prop.pdfFactory) this.prop.pdfFactory.download();
  }




  /**
   * to Download?
   */
  download=()=>{

  }

  
}