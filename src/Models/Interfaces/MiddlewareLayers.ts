import { LayerContract } from "./LayerContract";

export abstract class MiddlewareLayers{
  /**
   * Method ini digunakan untuk mengubah response dr server ke array LayerContract.ArrayLayer[]
   * @param res Hasil fetch
   */
  abstract resToLayer(res:unknown):LayerContract.ArrayLayer[]|undefined;

  /**
   * Method ini digunakan untuk mengubah ArrayLayer ke permintaan backend
   * @param res Hasil fetch
   */
  abstract layerToReq(req:LayerContract.ArrayLayer[]):any;
}