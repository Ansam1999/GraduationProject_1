import React,{useState} from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography,TextField,MenuItem ,Select, Button,Box} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import {AppString} from './Const';


const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width:'40vw',
        
      
    },
    dialogTitle: {
        marginLeft:'350px'
    },
    
    dialog:{
        flexDirection:'column'
    },
    Button:{
        width:'12vw',
        backgroundColor:'#7840A7',
  
        height:'6vh',
        marginTop:'3vh',
        marginLeft:'11vw'
       
    },
    ButtonRed:{
        width:'12vw',
        backgroundColor:'#b31919',
  
        height:'6vh',
        marginTop:'3vh',
       
    },
        input:{
        width: '30vw',
        margin: theme.spacing(1), 
        textAlign : 'right',
     marginLeft:'2vw',
        direction : 'rtl',
      
    },
    text:{
      textAlign:'right',
      marginLeft:'4vw',
      height:'6vh',
      fontSize:'1.3vw',
      width:'28vw',paddingRight:'1vw',
      paddingTop:'1vh',fontWeight:'bold',
     backgroundColor:'#e5e5e5',
     borderRadius:7
    },
    text1:{
        textAlign:'right',
        marginLeft:'4vw',
        height:'6vh',
        fontSize:'1.3vw',
        width:'28vw',paddingRight:'1vw',
        paddingTop:'1vh',fontWeight:'bold',
       backgroundColor:'#e5e5e5',
       borderRadius:7,
       display:'flex',
       flexDirection:'row',justifyContent:'space-around'
      },
    all:{
        width:'70%',
        marginLeft:'200px'
    },
    dialogTitle:{
     fontSize:'1.4vw' ,
     textAlign:'right',
  paddingRight:'5vw',
     backgroundColor:'#84d4a4',
     width:'100%',
     height:'100%'
    }
}))

export default function ActPopup(props) {

    const { title, children, openPopup, setOpenPopup,item ,accept , setAccept,history} = props;
    const handleButtonClick = pageURL => {
        history.push(pageURL);
      };
    const classes = useStyles();
    const [Name,setName] = useState("");
const insertName =(e)=>{
    setName(e.target.value);
}
const[Place,setPlace] = useState("");
const insertPlace =(e)=>{
    setPlace(e.target.value);
}
const[Date,setDate] = useState("");
const insertDate =(e)=>{
    setDate(e.target.value);
}
const[Time,setTime] = useState("");
const insertTime =(e)=>{
    setTime(e.target.value);
}
const[Duration,setDuration] = useState("");
const insertDuration =(e)=>{
    setDuration(e.target.value);
}
const[Note,setNote] = useState("");
const insertNote =(e)=>{
    setNote(e.target.value);
}
    async function InsertActivity(i){
     console.log(AppString.KinderEmail);    
         const Axios =  axios.create({
          baseURL: 'http://localhost/php-login-registration-api/Activity.php',
      });
      const getA = await  Axios.post(Axios.baseURL,{
       KinderEmail :AppString.KinderEmail,
       Name:Name,
       Date:Date,
       Time:Time,
       Duration:Duration,
       Place:Place,
       Note:Note   
     
      });
      console.log(getA);
           if(getA){
        }
       
      }


    return (
        <Dialog open={openPopup} maxWidth='40%' classes={{ paper: classes.dialogWrapper }} className={classes.all}>
            <DialogTitle className={classes.dialogTitle}>
             <div style={{fontSize:'1.6vw',fontWeight:'bold',color:'black'}}>إضافة نشـاط جديد</div> 
            </DialogTitle>
            <Button style={{position:'absolute',top:'4vh',left:'1.5vw',width:'1.5vw'}} onClick={()=>{setOpenPopup(false);}}>
            <CancelIcon style={{width:'2vw',height:'5vh'}} />
            </Button>
            <DialogContent dividers >
              <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'2vh'}}>اسم النشـاط</div>
         <TextField style={{width:'30vw',marginLeft:'2vw',textAlign:'right',marginTop:-'1vh'}} dir="rtl" onChange={insertName}/>
      
         <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'3vh'}} >مكان النشـاط</div>
         <TextField style={{width:'30vw',marginLeft:'2vw',textAlign:'right',marginTop:-'1vh'}} dir="rtl" onChange={insertPlace}/>
       
         <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'3vh'}}>تاريخ النشـاط</div>
      {/*   <TextField style={{width:'30vw',marginLeft:'2vw',textAlign:'right',marginTop:-'1vh'}} dir="rtl"  onChange={insertDate}/>*/} 
         <TextField
    id="date"
    label=""
    type="date"
    dir="rtl"
    style={{marginLeft:'20vw'}}
    onChange={insertDate}
    defaultValue="2017-05-24"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
  {console.log(Date)}
         <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'3vh'}} >وقت بداية النشـاط</div>
        {/*<TextField style={{width:'30vw',marginLeft:'2vw',textAlign:'right',marginTop:-'1vh'}} dir="rtl" onChange={insertTime}/> */} 
         <TextField
    id="date"
    label=""
    type="time"
    dir="rtl"
    style={{marginLeft:'20vw',width:'10.5vw'}}
    onChange={insertTime}
   
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
         <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'3vh'}} >وقت إنتهاء النشـاط</div>
         
         <TextField
    id="date"
    label=""
    type="time"
    dir="rtl"
    style={{marginLeft:'20vw',width:'10.5vw'}}
    onChange={insertDuration}
   
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
         <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'3vh'}} >ملاحظة<span style={{fontSize:18,color:'#a7a6a6',marginRight:'1vw'}}>*اختياري</span></div>
         <TextField style={{width:'30vw',marginLeft:'2vw',textAlign:'right',marginTop:-'1vh'}} dir="rtl"onChange={insertNote} />
       
         <Button className={classes.Button} onClick={InsertActivity}><span style={{fontSize:'1.3vw',fontWeight:'bold',color:'white'}}>حفــظ النشـاط</span></Button>

            </DialogContent>
        </Dialog>
    )
}