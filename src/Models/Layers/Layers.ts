import {LayerContract as Contract} from '../Interfaces/LayerContract';

/** use to manage layer. */
export class Layers{

  /** to store layers */
  protected layers:Map<Contract.LayerId,Contract.LayerValue>=new Map();

  /** to manage unique layer id */
  #id:Contract.LayerId=0;

  constructor(arrayLayer?: Contract.ArrayLayer[]) {
    //get highest id number and fill layers
    if (arrayLayer && Array.isArray(arrayLayer)) {
      this.#_init(arrayLayer);
    }
  }

  /**
   * to get highest Id and convert arrayLayer to Map
   * @returns Object { last_id: the highest id, map: instance of Map }
   */
  #_init=(arrayLayer: Contract.ArrayLayer[])=>{
    let last_id = 0;

    const init: Iterable<readonly [number, Contract.LayerValue]>=arrayLayer.map((layer: Contract.ArrayLayer) => {
      last_id = last_id < layer.id ? layer.id : last_id;
      return [layer.id, layer.value];
    });

    this.layers = new Map(init);
    this.#id = last_id;
  }

  /** private method to create unique Id */
  _idGenerator():Contract.LayerId{
    this.#id++;
    return this.#id;
  }

  get(id:Contract.LayerId):Contract.LayerValue|undefined{
    return this.layers.get(id);
  }

  getAll():Contract.ArrayLayer[]{
    return this.toArray();
  }

  toArray():Contract.ArrayLayer[]{

    return Array.from(this.layers,([id,value])=>({id,value}));

  }

  /**
   * to filter layers
   */
  filter(fnPredicate:(arg:Contract.LayerValue)=>boolean):Contract.ArrayLayer[]{

    return this.toArray().filter((layer)=>fnPredicate(layer.value));

  }

  /**
   * this method for performance, use this method only after fetch from server
   * @param arrayLayer
   */
  reFill(arrayLayer: Contract.ArrayLayer[]) {
    if (Array.isArray(arrayLayer)) {
      this.#_init(arrayLayer);
    }else{
      console.error("Argument ArrayLayer isnt Array");
    }
  }

}












export class CrudLayers extends Layers implements Contract.LayersInterfaces{

  /** private method to create unique Id */
  _createId():Contract.LayerId{
    return this._idGenerator();
  }

  add(value:Contract.LayerValue){
    const newValue={...value};

    newValue.id=this._createId();
    this.layers.set(newValue.id,newValue);
    return this;

  }

  delete(id:Contract.LayerId){

    if(this.layers.has(id)){
      this.layers.delete(id);
    }

    return this;

  }

  update(id:Contract.LayerId,value:Contract.LayerValue){

    if(this.layers.has(id)){
      this.layers.set(id,value);
    }
    return this;

  }

}