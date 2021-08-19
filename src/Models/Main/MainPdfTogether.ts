import { AnnotationFactory } from "annotpdf";
import { Annotation } from "annotpdf/lib/parser";
import { Validation as Type } from "../Interfaces/Type";
import { Draw } from "../Draw/Draw";
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


  option:{
    scale:number
  };


  mode:Type.Mode|null


  draw:Draw|undefined


  panel:{

    isActive:boolean,

    activeMode:string, //comment, file, trash, share, upload

    commentTab:{

      isLoadAll:boolean,

    },

    fileTab:{

      //option here

    },
    trashTab:{

      //option here

    },

    shareTab:{

      //option here

    },

    uploadTab:{

      //option here

    }

  };


  author:Models.Author


}









interface MethodPdfTogether{


  setAnnotation: React.Dispatch<React.SetStateAction<Annotation[][] | undefined>>



  setCurrentPage: React.Dispatch<React.SetStateAction<number>>



  setOption: React.Dispatch<React.SetStateAction<{scale: number;}>>



  setMode: React.Dispatch<React.SetStateAction<Type.Mode | null>>



  setPanel: React.Dispatch<React.SetStateAction<{
        isActive: boolean;
        activeMode: string;
        commentTab: {
            isLoadAll: boolean;
        };
        fileTab: {};
        trashTab: {};
        shareTab: {};
        uploadTab: {};
  }>>,



  setLayerValue:React.Dispatch<React.SetStateAction<LayerContract.ArrayLayer[] | undefined>>

}









class Together{




  constructor(public prop:PropertyPdfTogether,public meth:MethodPdfTogether){}





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
   * convert pdf rectangle to canvas point
   */
  pdfPointToCanvasPoint=(point:Type.PointPdf):Type.PointCanvas=>{
    let top=()=>this.prop.draw&&this.prop.canvasRef.current?(this.prop.canvasRef.current.height/this.prop.option.scale)-point.y+this.prop.canvasRef.current.offsetTop:0;
    let left=()=>this.prop.draw&&this.prop.canvasRef.current?point.x+this.prop.canvasRef.current.offsetLeft:0;

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
      y:this.prop.canvasRef.current?this.prop.canvasRef.current.height-point.y:0
    };
  }








  /** to add layer in current layer */
  #addToLayer=(form:{
      content:Models.Content,
      type:Type.Mode
    })=>{

    let value=new Models.LayerValue({
      type:form.type,
      author:this.prop.author,
      point:this.canvasPointToPdfPoint(this.prop.point),
      onPage:this.prop.currentPage,
      content:form.content
    });

    //add to layer
    this.prop.layer.add(value);

    this.meth.setLayerValue(this.prop.layer.toArray());

    console.log(JSON.stringify(this.prop.layer.toArray()));

  }





  /**
   * to add annotation in current layers.
   * @param content use new Models.Annotation();
   */
  addAnnotation=(content:Models.Annotation)=>{
    let type=Type.Mode.Annotation;

    this.#addToLayer({content:content,type:type});
  }






  /**
   * to add chat in current layers.
   * @param content use new Models.Chat()
   */
  addChat=(content:Models.Chat)=>{
    let type=Type.Mode.Chat;
    this.#addToLayer({content:content,type:type});
  }







  /**
   * to add img in current layers.
   * @param content use new Models.Img()
   */
  addImg=(content:Models.Img)=>{
    let type=Type.Mode.Img;
    this.#addToLayer({content:content,type:type});
  }







  /**
   * to add a draw in current layers.
   * @param content use new Models.Draw()
   */
  addDraw=(content:Models.Draw)=>{
    let type=Type.Mode.Draw;
    this.#addToLayer({content:content,type:type});
  }






  /**
   * to update content of a layers
   * @param id id layer
   * @param content layer content, not layer value | child of LayerContract.Content
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




  nextPage = () => this.prop.pdfRef && this.prop.currentPage < this.prop.pdfRef.numPages && this.meth.setCurrentPage(this.prop.currentPage + 1);
  



  prevPage = () => this.prop.currentPage > 1 && this.meth.setCurrentPage(this.prop.currentPage - 1);




  setScale=(scale:number)=>{
    let newOption={...this.prop.option};
    newOption.scale=scale;
    this.meth.setOption(newOption);
  }





  selectMode=(mode:Type.Mode)=>{

    this.prop.mode===mode?this.meth.setMode(null):this.meth.setMode(mode);

    if((mode===Type.Mode.Annotation || mode===Type.Mode.Draw) && this.prop.draw){
      this.prop.draw.mode===mode?this.prop.draw.setMode(null):this.prop.draw.setMode(mode);
    }

  }



  /**
   * set panel to active and nonactive
   */
  togglePanel=()=>{
    this.meth.setPanel({...this.prop.panel,isActive:!this.prop.panel.isActive});
  }


}











/**
 * Final class! sure, dont extends this class
 */
export class PdfTogether extends PdfTogetherUi{
  



  addAnnotationInPdfDoc=(form:{content:{annot:string},author:LayerContract.Author})=>{

    let pdfCoord=[
      this.prop.draw&&this.prop.canvasRef.current?this.prop.point.x:0,
      this.prop.draw&&this.prop.canvasRef.current?this.prop.canvasRef.current.height-this.prop.point.y:0
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