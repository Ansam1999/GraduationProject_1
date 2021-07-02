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
        backgroundColor:'#266b43',
  
        height:'6vh',
        marginTop:'3vh',
       
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

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup,item ,accept , setAccept,history} = props;
    const handleButtonClick = pageURL => {
        history.push(pageURL);
      };
    const classes = useStyles();
    const [City,setCity] = useState("");
    const [Address,setAddress] = useState("");
    const [isReg , setIsReg] = useState("");
    async function setAccepted(i){
     console.log(AppString.KinderEmail);    
         const Axios =  axios.create({
          baseURL: 'http://localhost/php-login-registration-api/Accept.php',
      });
      const getA = await  Axios.post(Axios.baseURL,{
       KinderEmail :AppString.KinderEmail,
       state : i,
       Name:item.Name
     
      });
      console.log(getA);
           if(getA){
        }
       
      }

    const handleChangeSelect = (event) => {
        setCity(event.target.value);
      };
    return (
        <Dialog open={openPopup} maxWidth='40%' classes={{ paper: classes.dialogWrapper }} className={classes.all}>
            <DialogTitle className={classes.dialogTitle}>
             <div style={{fontSize:'1.6vw',fontWeight:'bold',color:'black'}}>معلومات الطالب</div> 
            </DialogTitle>
            <Button style={{position:'absolute',top:'4vh',left:'1.5vw',width:'1.5vw'}} onClick={()=>{setOpenPopup(false);}}>
            <CancelIcon style={{width:'2vw',height:'5vh'}} />
            </Button>
            <DialogContent dividers >
              <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7'}}>اسم الطفل</div>
              <div className={classes.text}> {item.Name}</div>

              <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'2vh'}}>الجنـس</div>
                <div className={classes.text}>{item.gender}</div>

                <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'2vh'}}>المرحلة الدراسية</div>
                <div className={classes.text}>{item.stage}</div>

                <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'2vh'}}>المدينة</div>
                <div className={classes.text}>{item.city}</div>
                     {item.bus==='1'?
                     <div>
                <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'2vh'}}>العنوان</div>
                <div className={classes.text}>{item.address} </div>
                </div>
                    :null}

                <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.3vw',color:'#7840A7',marginTop:'2vh'}}>الخدمات المطلوبة</div>     
                                  <div className={classes.text1} >{item.bus==='1' ?
                                  <div>
                        <span style={{fontSize:'1.3vw',fontWeight:'bold'}}>باص المدرسة</span>
                      <CheckIcon color="#000" style={{marginBottom:'-0.8vh',marginRight:'-1vw'}}/>
                      </div>
                       :null}
                        {item.food==='1' ?
                        <div>
                       <span style={{fontSize:'1.3vw',fontWeight:'bold'}}>وجبة الفطور</span>
                      <CheckIcon color="#000" style={{marginBottom:'-0.8vh',marginRight:'-1vw'}}/> 
                      </div>
                      :null} 
                </div>

                <div style={{textAlign:'right',fontSize:'1.3vw',fontWeight:'bold',marginRight:'3.7vw',color:'#7840A7',marginTop:'2vh'}}>رقم هاتف ولي الأمر</div>
                <div className={classes.text}>{item.parentPhone}</div>
            
          {item.state ? null :
              <div style={{display:'flex',flexDirection:'row-reverse',width:'28vw',justifyContent:'space-around',marginLeft:'4vw'}}>
             <Button onClick={()=>{setAccepted('true')}} className={classes.Button}><span style={{fontSize:'1.3vw',fontWeight:'bold',color:'white'}}>قبـول</span></Button>
             <Button onClick={()=>{setAccepted('false')}} className={classes.ButtonRed}><span style={{fontSize:'1.3vw',fontWeight:'bold',color:'white'}}>رفـض</span></Button>

           </div>}
            </DialogContent>
        </Dialog>
    )
}