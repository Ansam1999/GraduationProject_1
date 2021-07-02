import { Paper,makeStyles,Grid, TextField,Typography,InputAdornment,Select,MenuItem ,Button } from '@material-ui/core';
import React, { useState,useContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {MyContext} from "./Context";
import firebase, {auth,firestore,storage,performance, db} from './firebase';
import { AppString } from './Const';

const theme = createMuiTheme({
    palette: {
      primary: {
        
        main:'#7840A7',//pirple
      },
      secondary: {
        
        main: '#84d4a4',//green
      },
    },
  });


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    centerAdornment: {
        marginLeft: "1%" // or your relevant measure
      },
    root: {
         
            width: '80%',
            height:'90%',
            margin: theme.spacing(1),       
},
input:{
    width: '80%',
    margin: theme.spacing(1), 
    textAlign : 'right',
    marginLeft:'130%',
    direction : 'rtl'
}
,
typographyStyles :{
    fontSize : 24 ,
    fontWeight :"bold",
    textAlign : 'right',
    paddingRight : '15%',
    
    
}}))

function CreateK(props) { 
    const {toggleNav,loginUser,isLoggedIn,rootState} = useContext(MyContext);

    const {theUser} = rootState;
    const classes = useStyles();
const {history}=props;
  const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
  
    const handleChange2 = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              setUrl(url);
              AppString.coverfile=url;
          
            }); 
          //  localStorage.setItem('loginToken');
            // isLoggedIn();
        history.push('/Information');
        }
      );
    };



 
   



    return (
        <ThemeProvider theme={theme}>
        <Paper className={classes.pageContent}>
            <Typography color="primary" className={classes.typographyStyles}>
إضافة صورة خاصة بالروضة
        </Typography>
         <form className={classes.root}>

             <Grid container>
                 <Grid item xs={6}>
                    
                       <TextField
                        id="outlined-full-width"
                        label="تحميل صورة الغلاف"
                        className={classes.input}
                        name="coverfile"
                        type="file"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            style: {
                                color: '#7840A7',
                                alignContent : 'center',
                              }
                        }}
                        variant="outlined"
                        onChange={handleChange2}
                    />

                  
                 
                    <Button color="secondary" variant="contained" className={classes.input} onClick = {handleUpload}>إنشـــاء</Button>


                 </Grid>
                 <Grid item xs={6}>
                     <img src = {require('../Photos/s.jpg').default} alt="c image" style ={{width : '37vw' , height : 400,marginLeft:'-95%'}}/>
                 </Grid>

             </Grid>

         </form>
        </Paper>
        </ThemeProvider>
    );
}

export default CreateK;