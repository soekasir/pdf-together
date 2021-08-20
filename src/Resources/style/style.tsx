import { makeStyles,createStyles,Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    navbartop:{
      position:'fixed',
      minWidth:'100%',
      height:'72px',
      backgroundColor:'#2C2B2B',
      color:'#fff',
      top:'0px'
    },

    container:{
      marginTop:'73px',
    },

    fileTab:{
      minWidth:'100%',
      backgroundColor:'#999',
      height:theme.spacing(10),

    },

    commentTab:{
      minWidth:'100%',
      backgroundColor:'#999',
      height:theme.spacing(10),

    },
    headerContent:{
      minWidth:'100%',
      height:theme.spacing(5),
      backgroundColor:'#999',
      color:'#fff'
    },

    content:{
      minWidth:'100%',
      minHeight:'100%',
    },

    canvas:{
      minWidth:'100%',
      minHeight:'100%',
    }
  }),
);