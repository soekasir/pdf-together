import { Button, TextField } from "@material-ui/core";
import { makeStyles,createStyles,Theme, createTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { theme } from "./style";


export const useStylesAnnotation = makeStyles((theme: Theme) =>
  createStyles({

    paperAnnotation:{
      width:"285px",
      padding:"16px",
      borderRadius:'16px',
      boxShadow:"0px 2px 20px rgba(0, 0, 0, 0.25)",
    },

    bottomNavigation:{

    },

    navIcon:{
      marginRight:'10px',
    },

    inputReply:{

    }

  }),
);

export const ReplyTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.text.disabled
    },
    "& label": {
      color: theme.palette.text.disabled,
      
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none"
    },
    "& .MuiInput-underline:after": {
      borderColor: "#EAEAEA",
      borderWidth: "1px"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "none"
    },
    "& .MuiInput-underline:hover:after": {
      borderBottom: "none"
    },
  }
})(TextField);