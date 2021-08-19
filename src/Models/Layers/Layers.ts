import {LayerContract as Contract} from '../Interfaces/LayerContract';
import { Validation } from '../Interfaces/Type';

/** use to manage layer. */
export class Layers implements Contract.LayersInterfaces{



  /** to store layers */
  #layers:Map<Contract.LayerId,Contract.LayerValue>=new Map();



  /** to manage unique layer id */
  #id:Contract.LayerId=0;




  constructor(arrayLayer?:Contract.ArrayLayer[]){

    //get highest id number and fill #layers
    if(arrayLayer && Array.isArray(arrayLayer)){
      this.#layers=new Map(
        arrayLayer.map((layer:Contract.ArrayLayer)=>{
          this.#id=this.#id<layer.id?layer.id:this.#id;
          return [layer.id,layer.value];
        })
      );
    }

  }






  /** private method to create unique Id */
  _idGenerator():Contract.LayerId{
    this.#id++;
    return this.#id;
  }





  /** private method to create unique Id */
  _createId():Contract.LayerId{
    return this._idGenerator();
  }







  add(value:Contract.LayerValue){

    value.id=this._createId();
    this.#layers.set(value.id,value);
    return this;

  }



  get(id:Contract.LayerId):Contract.LayerValue|undefined{
    return this.#layers.get(id);
  }

  getAll():Contract.ArrayLayer[]{
    return this.toArray();
  }



  delete(id:Contract.LayerId){

    if(this.#layers.has(id)){
      this.#layers.delete(id);
    }

    return this;

  }






  update(id:Contract.LayerId,value:Contract.LayerValue){

    if(this.#layers.has(id)){
      this.#layers.set(id,value);
    }else{
      throw new Error('Layers tidak memiliki id: '+id)
    }
    return this;

  }





  clearAll(){

    this.#layers=new Map();
    return this;

  }




  clearPage(pageNum:number){

    this.#layers.forEach((layerValue,layerId)=>{
      if(layerValue.onPage===pageNum){
        this.delete(layerId);
      }
    });
    return this;

  }





  toArray():Contract.ArrayLayer[]{

    return Array.from(this.#layers,([id,value])=>({id,value}));

  }







  /**
   * to filter layers
   */
  filter(fnPredicate:(arg:Contract.LayerValue)=>boolean):Contract.ArrayLayer[]{

    return this.toArray().filter((layer)=>fnPredicate(layer.value));

  }







  /**
   * to filter layers by type
   */
  filterType(type:Contract.LayerType):Contract.ArrayLayer[]{

    return this.filter((layer)=>layer.type===type);

  }




  


  // getAnnotationByPage(numPages:number){
  //   return this.filter((layer)=>layer.type===Validation.Mode.Annotation && layer.onPage===numPages);
  // }
  static loadLayer(data:Contract.ArrayLayer[]):Layers{

    return new Layers(data);

  }

}