/** Handle Fetch */
import { Layers } from "../Layers/Layers";


interface GetFetch{
  url:string,
  token?:string,
}






interface PostFetch{
  url:string,
  data:any,
  content_type:string,
  token?:string
}




export const Fetch={

  /**
   * @param {{ url:string, token:?string }} Object
   * @return promise , dont forget use async await
   */

  Get:({url,token}:GetFetch)=>{

    let header={};

    if(token){
      header={
        'Authorization': 'Bearer '+token,
      };
    }

    let req=new Promise((resolve,reject)=>{
      fetch(url,{
        method:'GET',
        headers:header,
      }).then((response)=>response.json())
      .then((response)=>{
        resolve(response);
      },(err)=>{
        reject(err);
      })
    });

    return req;
  },


  /**
   * @var url, to rest api
   * @var data, not need withour JSON.stringify
   * @var content_type json (default) | from-data
   * @var token, token login
   * @return Promise, dont forget use async await
   */

  Post:({url,data,content_type='json',token}:PostFetch)=>{

    //Set Header
    let header={};

    if(content_type==='json'){

      data=JSON.stringify(data);

      header={
        'Content-Type': 'application/json'
      };

      if(token){
        header={
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        };
      }

    }
    
    if(content_type==='form-data'){

      if(token){
        header={
          'Content-Type': 'application/form-data',
          'Authorization': 'Bearer '+token,
        };
      }

    }

    let req=new Promise((resolve,reject)=>{
      fetch(url, {
        method: 'POST',
        headers: header,
        body: data
      }).then((response)=>response.json())
      .then((response)=>{
        resolve(response);
      },(err)=>{
        reject(err);
      })
    });

    return req;
  }
}





export const FetchLayer=(urlLayer:string)=>{

  return Fetch.Get({url:urlLayer}).then((data: any)=>{
    let layer;

    try{
      layer=Layers.loadLayer(data);
    }catch (e){
      console.log(e);
    }

    return layer?layer:new Layers();

  },(reason)=>{

    console.log(reason);

    return new Layers();
    
  });

}