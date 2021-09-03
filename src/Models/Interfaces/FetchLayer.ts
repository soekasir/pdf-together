// import { Fetch } from "../Fetch/Fetch";
import { Layers, CrudLayers as OfflineLayers } from "../Layers/Layers";
import { LayerContract } from "./LayerContract";

export interface Doc{
  url:any;
}

type callback=(value:LayerContract.ArrayLayer[])=>void;

export abstract class FetchLayers{
  /**
   * Method ini digunakan untuk mengubah response dr server ke array LayerContract.ArrayLayer[]
   * @param res Hasil fetch
   */
  abstract resToLayer(res:unknown):LayerContract.ArrayLayer[]|undefined;
  /**
   * Method ini meminta data dr server kemudian gunakan resToLayer untuk mendapatkan kelas Layers
   * Kemudian panggil callbacknya
   */
  abstract loadLayer(callback:callback):void;
  /**
   * Method ini meminta server untuk menambahkan data layer kemudian gunakan resToLayer untuk mendapatkan kelas Layers
   * Kemudian panggil callbacknya
   */
  abstract addLayer(layerValue:LayerContract.LayerValue,callback:callback):void;
  /**
   * Method ini meminta server untuk melakukan update kemudian gunakan resToLayer untuk mendapatkan kelas Layers
   * Kemudian panggil callbacknya
   */
  abstract updateLayer(id_layer:any,layerValue:LayerContract.LayerValue,callback:callback):void;
  /**
   * Method ini meminta server untuk menghapus layer kemudian gunakan resToLayer untuk mendapatkan kelas Layers
   * Kemudian panggil callbacknya
   */
  abstract deleteLayer(id_layer:any,callback:callback):void;
}


/**
 * Ini digunakan untuk default/offline
 */
export class NoFetch extends FetchLayers{
  layer:OfflineLayers;

  constructor(layer:Layers, public doc?:Doc){
    super();
    this.layer=new OfflineLayers(layer.getAll());
  }

  resToLayer(res:unknown){

    if(Array.isArray(res)){

      const arr=res.map((v:any)=>{
        return {id:v.id,value:v.value}
      });

      return arr;

    }

  }

  loadLayer=(callback:callback)=>{

    //Fetch here

    
    callback(this.layer.getAll());

  }

  addLayer=(data:any,callback:callback)=>{
    //do fetch here


    this.layer.add(data);
    callback(this.layer.getAll());
  }

  updateLayer=(id_layer:any,data:any,callback:callback)=>{
    //do fetch here


    this.layer.update(id_layer,data);
    callback(this.layer.getAll());
  }

  deleteLayer=(id_layer:any,callback:callback)=>{
    //do fetch here


    this.layer.delete(id_layer);
    callback(this.layer.getAll());
  }

}

class NotFinished extends FetchLayers{

  resToLayer(res:unknown){

    if(Array.isArray(res)){

      const arr=res.map((v:any)=>{
        return {id:v.id,value:v.value}
      });

      return arr;

    }

  }

  loadLayer=(callback:callback)=>{
    //do fetch here

    
    
  }

  addLayer=(data:any,callback:callback)=>{
    //do fetch here



  }

  updateLayer=(id_layer:any,data:any,callback:callback)=>{
    //do fetch here



  }

  deleteLayer=(id_layer:any,callback:callback)=>{
    //do fetch here



  }
}