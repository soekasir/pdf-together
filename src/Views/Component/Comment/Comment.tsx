import { Box, Button, Grid, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import React, {useContext, useState} from "react";
import { PdfTogetherContext } from "../../../Controller/Context/Context";
import { toReadableDate, understandableDate } from "../../../Models/Costum/Fn";
import { LayerContract } from "../../../Models/Interfaces/LayerContract";
import { Validation as Type } from "../../../Models/Interfaces/Type";
import { SearchTextField, theme, useStyles } from "../../../Resources/style/style";
import { FilterIcon } from "../../../Resources/svg/icon";


const FilterComment=({handleFilter}:{handleFilter:(value:Type.FilterAnnotation)=>void})=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect=(value:Type.FilterAnnotation)=>{
    handleFilter(value);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <Typography variant="subtitle2" onClick={handleClick}>filter</Typography>
        <span onClick={handleClick} style={{textAlign:"right",marginLeft:"8px"}}>
          <FilterIcon width={16} height={16} viewBox="0 0 16px 16px" style={{color:'#434343'}}/>
        </span>
      </div>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.All)}>No Filter</MenuItem>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.Latest)}>Latest</MenuItem>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.CurrentPage)}>Only Current Page</MenuItem>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.MyComment)}>My comment</MenuItem>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.NotMyComment)}>Except My Comment</MenuItem>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.Solved)}>Solved Comment</MenuItem>
          <MenuItem onClick={()=>handleSelect(Type.FilterAnnotation.Unsolved)}>Unsolved Comment</MenuItem>
      </Menu>
    </>
  );
}


export const LoadComment=()=>{
  const pdfTogether=useContext(PdfTogetherContext);
  const style=useStyles();

  // const [selected,setSelected]=useState<null|number>(null);
  const [option,setOption]=useState({
    filter:Type.FilterAnnotation.All,
  });

  const handleFilter=(value:Type.FilterAnnotation)=>{
    let newOption={...option};
    newOption.filter=value;
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
      return layer.value.onPage===pdfTogether.prop.currentPage.pageNum;
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

    

    const filteredChat=()=>chat().filter((layer)=>layer.value.content.to===id);

    if(!filteredChat().length) return <></>;

    return (
    <Grid container direction="column"
      style={{borderLeft:"solid 1px #DEDEDE",margin:"10px 0px 0px 10px",padding:"9px"}}>

      {filteredChat().map((layer)=>{
    
        return (
          <Grid item>
            <Typography variant="body2" color="textSecondary">
            {layer.value.author.name}
            </Typography>
            <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
              {understandableDate(new Date(layer.value.date))}
            </Typography>
            <div style={{marginTop:"10px"}}>
              <Typography variant="body1" style={{display:"block",color:theme.palette.text.primary,
                wordBreak:"break-word"}}>
                {layer.value.content.message}
              </Typography>
            </div>
          </Grid>
        );

      })}

    </Grid>
    );

  }


  const comment=(layerValue:LayerContract.LayerAnnotation)=>{

    const isGenap=(n:number)=>n%2===0;

    return (
      <>
          <Grid container style={{padding:"20px 15px 17px 18px", backgroundColor:isGenap(layerValue.id?layerValue.id:1)?"#FFFFFF":"#F8F8F8"}}>
            <Grid container  item direction="row">
              <Grid item style={{color:"#fff",backgroundColor:theme.palette.info.main,width:'32px',height:'32px',borderRadius:'50%',paddingTop:"9px"}}>
                <Typography align="center" variant="subtitle2">{layerValue.id}</Typography>
              </Grid>
              <Grid item style={{marginLeft:"8px"}}>
                <Typography variant="body2" color="textSecondary">
                  {layerValue.author.name}
                </Typography>
                <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
                  {understandableDate(new Date(layerValue.date))}
                </Typography>
              </Grid>
            </Grid>
            <div style={{marginTop:"10px"}}>
              <Typography variant="body1" style={{color:theme.palette.text.primary,wordBreak:"break-word"}}>
                {layerValue.content.annot}
              </Typography>
            </div>

            {/* Load Reply */}
            {layerValue.id?reply(layerValue.id):null}

          </Grid>
      </>
    );
  }


  return (
    <>
      <Paper variant="elevation" style={{width:'100%',minWidth:"256px",
      marginTop:"40px",paddingTop:"20px",boxShadow:"none"}}>

        {/**  Header Comment Tab, Filter, dan Search*/}
        <Grid direction="column" style={{marginLeft:"14px",marginRight:"10px"}}>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" style={{height:"16px"}}>
            <div><Typography variant="h3">Comments</Typography></div>
            <FilterComment handleFilter={handleFilter}/>
          </Grid>
        </Grid>
        <Grid style={{marginRight:"19px",marginTop:"16px",marginLeft:"14px"}}>
          <SearchTextField size="small" type="search" label="search" variant="outlined" className={style.inputSearch}/><br/> 
        </Grid>

        {/*Load Comment */}
        <div style={{overflow:"auto",height:"400px",marginTop:"16px"}} className="costum-scroll">
          {
            filter[option.filter]().map((layer:LayerContract.ArrayLayer)=>{

              return (
                comment(layer.value)
              );

            })
          }
        </div>
      </Paper>
    </>
  );

  
}