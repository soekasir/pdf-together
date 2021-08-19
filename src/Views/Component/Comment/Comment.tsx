import {useContext, useState} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import { ReplyForm } from "./Reply";

export const LoadComment=()=>{
  const pdfTogether=useContext(PdfTogetherContext);

  const [selected,setSelected]=useState<null|number>(null);
  const [option,setOption]=useState({
    filter:Type.FilterAnnotation.All,
  });

  const handleFilter=(e:any)=>{
    let newOption={...option};
    if(e.currentTarget)
    newOption.filter=e.currentTarget.value;
    setOption(newOption);
  }

  const filter={
    all:()=>pdfTogether.prop.layer.filterType(Type.Mode.Annotation),
  
    solved:()=>filter.all().filter((layer)=>{
      return layer.value.content.isSolved;
    }),

    unsolved:()=>filter.all().filter((layer)=>{
      return !layer.value.content.isSolved;
    }),

    currentpage:()=>filter.all().filter((layer)=>{
      return layer.value.onPage===pdfTogether.prop.currentPage;
    }),

    mycomment:()=>filter.all().filter((layer)=>{
      return layer.value.author.id_user===pdfTogether.prop.author.id_user;
    }),
  
    notmycomment:()=>filter.all().filter((layer)=>{
      return layer.value.author.id_user!==pdfTogether.prop.author.id_user;
    }),

    latest:()=>filter.all().sort((a,b)=>{
      if(a.value.date>b.value.date) return -1;
      if(a.value.date<b.value.date) return 1;
      return 0;
    }),
  }

  const chat=()=>pdfTogether.prop.layer.filterType(Type.Mode.Chat);

  const reply=(id:LayerContract.LayerId)=>{
    return <>
    {
      chat().filter((layer)=>layer.value.content.to===id).map((layer)=>{
        return <div style={{backgroundColor:'whitesmoke'}}>
          from:{layer.value.author.name} <br/>
          reply:{layer.value.content.message}<br/>
          date:{layer.value.date}
        </div>
      })
    }
    </>
  }

  const formFilter=()=>{
    return (
      <>
      <select onChange={handleFilter}>
        <option value={Type.FilterAnnotation.All}>No Filter</option>
        <option value={Type.FilterAnnotation.Latest}>Latest</option>
        <option value={Type.FilterAnnotation.CurrentPage}>Only Current Page</option>
        <option value={Type.FilterAnnotation.MyComment}>My comment</option>
        <option value={Type.FilterAnnotation.NotMyComment}>Except My Comment</option>
        <option value={Type.FilterAnnotation.Solved}>Solved Comment</option>
        <option value={Type.FilterAnnotation.Unsolved}>Unsolved Comment</option>
      </select>
      </>
    )
  }

  return (
    <>
      <div className="panel-comment">
        {formFilter()}
        {
          filter[option.filter]().map((layer:LayerContract.ArrayLayer)=>{
              return (
                <div>
                  from: {layer.value.author.name} <br/>
                  comment: {layer.value.content.annot} <br/>
                  date: {new Date(layer.value.date).toLocaleString('id')} <br/>
                  to:{layer.value.content.to}<br/>

                  {layer.value.type===Type.Mode.Annotation?
                    <a className="btn" onClick={()=>setSelected(layer.id)}><i className="bi bi-reply"></i></a>
                  :null}

                  {reply(layer.id)}
                </div>
              );
          })
        }
      </div>
      {selected?<ReplyForm to={selected} setTogleClose={()=>setSelected(null)}/>:null}
    </>
  );
}