import { Button, TextField } from "@material-ui/core";
import { makeStyles,createStyles,Theme, createTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

export const theme = createTheme({
  typography: {
    fontFamily:'Nunito',
    h3:{
      fontSize:'16px',
      lineHeight:'22px',
      fontWeight:700,
    },
    button:{
      textTransform: 'none',
      fontSize:12,
      fontWeight:600,
      color:'#fff'
    },
    subtitle1:{
      fontSize:16,
      fontWeight:600,
      lineHeight:'19.1px'
    },
    subtitle2:{
      fontSize:14,
      fontWeight:400,
      lineHeight:'19.1px'
    },
    body1:{
      fontSize:12,
      fontWeight:600,
      lineHeight:'16.37px'
    },
    body2:{
      fontSize:12,
      fontWeight:400,
      lineHeight:'16.37px'
    },
    caption:{

    },
    overline:{
      fontSize:16,
      fontWeight:600,
      lineHeight:'21.82px'
    }
  },
  palette:{
    text:{
      primary:'#434343',
      secondary:'#6A6A6A',
      disabled:'#BFBFBF'
    },
    background:{
      default:'#E5E5E5',
      paper:'#FFFFFF'
    },
    secondary:{
      main:'#242424',
    },
    info:{
      main:'#5BB0FF',
    },
    success:{
      main:'#20C795',
    },
    tonalOffset:0.2,
  },
});


export const useStyles =makeStyles((theme: Theme)=>{

  return createStyles({
    navbartop:{
      position:'fixed',
      minWidth:'100%',
      height:'72px',
      
      top:'0px',
      zIndex:3,

      backgroundColor:'#2C2B2B',
      color:'#fff',
    },

    tool:{
      position:'fixed',
      // display:'flex',
      padding:`10px 10px 0px 10px`,
      // minWidth:'400px',
      bottom:'10px',
      left:'22vw',
      zIndex:3,

      backgroundColor:'#242424',
      color:'#fff',
    },

    container:{
      marginTop:'72px',
    },

    leftTab:{
      width:"100%",
      [theme.breakpoints.up(600)]: {
        maxWidth: "256px",
        marginRight:"20px",
      },
    },

    contentTab:{

    },

    headerContent:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',

      marginTop:"36px",
      backgroundColor:'#ffffff00',
    },

    button:{
      margin:theme.spacing(1),
    },

    controlPage:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
    },

    segitigaKanan:{
      marginLeft: '15px',
      height:'0px',
      width:'0px',

      borderLeft:'solid 20px #242424',
      borderTop:'solid 15px transparent',
      borderBottom:'solid 10px transparent',

    },

    segitigaKiri:{
      marginRight: '15px',
      height:'0px',
      width:'0px', 

      borderRight:'solid 20px #242424',
      borderTop:'solid 15px transparent',
      borderBottom:'solid 10px transparent',
    },

    canvas:{
      maxWidth:"100%",
    },

    titleTab:{
      fontWeight:'bold',
      lineHeight:'22px',
      fontSize:'16px'
    },

    inputSearch:{
      height:"32px",
      width:'100%',
    }

  });

},{index:1});

export const ApproveButton = withStyles({
  root: {
    height:39,
    color: '#fff',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
})(Button);



export const RejectButton = withStyles((theme: Theme) => ({
  root: {
    height:39,
    color: '#fff',
    backgroundColor: '#242424',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
}))(Button);

export const createButton =(root:any)=> withStyles((theme: Theme) => ({
  root: root,
}))(Button);

export const ButtonCurrentPage = withStyles((theme: Theme) => ({
  root: {
    height:39,
    color: '#fff',
    backgroundColor: '#242424',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
}))(Button);

export const SearchTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.text.disabled
    },
    "& label": {
      color: theme.palette.text.disabled,
      fontSize:12,
      fontWeight:400,
      lineHeight:'16.37px'
    },
    "& .MuiInput-underline:after": {
      borderColor: "#EAEAEA",
      borderWidth: "1px"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#EAEAEA",
        borderWidth: "1px"
      },
      "&:hover fieldset": {
        borderColor: "#EAEAEA",
        borderWidth: "1px"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#EAEAEA",
        borderWidth: "1px"
      }
    }
  }
})(TextField);