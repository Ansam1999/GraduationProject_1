import { Paper,makeStyles,Grid, TextField,Typography,InputAdornment,Select,MenuItem ,Button,TableBody ,TableRow,TableCell,Radio,RadioGroup,FormControlLabel,FormControl} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {MyContext} from './Context'
import Popup from './Popup';
import {AppString} from './Const';

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
        padding: theme.spacing(3),
        marginLeft:'12vw',
        width:'72vw',
        marginBottom:'8vh',
        paddingBottom:'8vh'
      
    },
    centerAdornment: {
        marginLeft: "1%", // or your relevant measure
       
    },
    root: {
          marginBottom:'100px',
            width: '80%',
            margin: theme.spacing(1),       
},
input:{
  width:'450px'
},
radio:{
flexDirection:'row',
justifyContent:'space-between',
alignContent:'center',
alignItems:'center'
},
radiodiv:{
fontSize:16,
marginRight:'-3vw'
},
table:{
textAlign:'right',
direction:'rtl',
width:'60vw',
paddingLeft:'110%',


},
cell:{

width:'4vw',
paddingLeft:'10vw',
textAlign:'right'
},

div:{
    width:'10vw',
    fontSize:16,
    marginBottom:'-70px'
},
textField:{
width:'28vw',
textAlign:'center'

},
button:{
width:'150px',
borderColor:'#84d4a4',
borderWidth:1,
backgroundColor:'#84d4a4',
marginTop:'-80px',
fontWeight:'bold',
fontSize:16
},
button2:{
    width:'150px',
    borderColor:'#84d4a4',
    borderWidth:1,
    backgroundColor:'#84d4a4',
    marginBottom:'-3vh',
    fontWeight:'bold',
    fontSize:16,
    },

icon:{
marginLeft:'15px'
},
typographyStyles :{
    fontSize : 24 ,
    fontWeight :"bold",
    textAlign : 'right',
paddingRight:'10vw',
    color:'#7840A7'
    
    
}}))

function Information(props) {
    const { history } = props;
    const {updateUser,rootState} = useContext(MyContext);
    const {theUser} = rootState;
      const [value, setGender] = React.useState('');
    const handleChange = (event) => {
      setGender(event.target.value);
      console.log(value);
      
    };
    AppString.KinderEmail=theUser.KinderEmail;


    console.log(AppString.KinderEmail);
    const initialState = {
        userInfo:{
            KinderName:theUser.KinderName,
            KinderEmail:theUser.KinderEmail,
            City :theUser.City,
            KinderPhone:theUser.KinderPhone,
            Address :theUser.Address,
           gender:theUser.value,
           coverfile:AppString.coverfile
        },
        errorMsg:'',
        successMsg:'',
        
    }
    const [state,setState] = useState(initialState);
    const classes = useStyles();
  
  

      const handleButtonClick = pageURL => {
        history.push(pageURL);
      };
      const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
        console.log(e.target.value);
    } 
    
      const InsertRecord =async (event) =>{
        event.preventDefault();
        const data = await updateUser(state.userInfo);
        console.log(data.success);
        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            });         

            history.push("/Information_2");
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        } 
        }
   
    
        let successMsg = '';
        let errorMsg = '';
        if(state.errorMsg){
            errorMsg = <div className="error-msg">{state.errorMsg}</div>;
        }
        if(state.successMsg){
            successMsg = <div className="success-msg">{state.successMsg}</div>;
            history.push('/Login');
        }
        
    return (
        <ThemeProvider theme={theme}>
        <Paper className={classes.pageContent}>
            <Typography color="primary" className={classes.typographyStyles}>
          تعديــل المعلومات
        </Typography>
         <form className={classes.root}>

             <Grid container>
                 <Grid item xs={6}className={classes.table}>
                 <TableBody >
                       <TableRow  className={classes.table}>
                                    <TableCell className={classes.cell} >
                                        <div className={classes.div}>اســم الروضة</div>
                                     </TableCell>
                                    <TableCell className={classes.input} >
                                        <TextField  className={classes.textField} name="KinderName" defaultValue={state.userInfo.KinderName} onChange={onChangeValue}></TextField> 
                                    </TableCell>
                                    
                                    
                                </TableRow>
                                <TableRow  className={classes.table}>
                                    <TableCell className={classes.cell} >
                                        <div className={classes.div}>المدينــة</div>
                                     </TableCell>
                                    <TableCell className={classes.input} >
                                        <TextField className={classes.textField} name="City" defaultValue={state.userInfo.City} onChange={onChangeValue}></TextField> 
                                    </TableCell>
                                    
                                    
                                </TableRow>
                                <TableRow  className={classes.table}>
                                    <TableCell className={classes.cell} >
                                        <div className={classes.div}>العنــوان</div>
                                     </TableCell>
                                    <TableCell className={classes.input} >
                                        <TextField className={classes.textField} name="Address" defaultValue={state.userInfo.Address} onChange={onChangeValue}></TextField> 
                                    </TableCell>
                                    
                                    
                                </TableRow>
                                <TableRow  className={classes.table}>
                                    <TableCell className={classes.cell} >
                                        <div className={classes.div}>رقم الهاتــف</div>
                                     </TableCell>
                                    <TableCell className={classes.input} >
                                        <TextField className={classes.textField} name="KinderPhone" defaultValue={state.userInfo.KinderPhone} onChange={onChangeValue}></TextField> 
                                    </TableCell>
                                    
                                    
                                </TableRow>  
                                  <TableRow  className={classes.table}>
                                    <TableCell className={classes.cell} >
                                        <div className={classes.div}>جنس الأطفال</div>
                                     </TableCell>
                                     <TableCell className={classes.input} >
                                    <FormControl  >
                                        <RadioGroup className={classes.radio} defaultValue={state.userInfo.gender} name="gender"onChange={onChangeValue}style={{marginLeft:'6vw'}}   >
                                         <FormControlLabel control={<Radio />} value="ذكور فقط"  label="ذكور فقط" />  
                                            <FormControlLabel control={<Radio />}  label="إناث فقط" value="إناث فقط " />
                                                <FormControlLabel control={<Radio />} value="ذكور وإناث" label="ذكور وإناث"  />
                                            
                                        </RadioGroup> 
                                        </FormControl>
                                    </TableCell>
                                    
                                    
                                </TableRow>
                             {console.log(value)}
                    </TableBody>


                 </Grid>
                
                
             </Grid>
         </form>
         <Grid style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
         <Button className={classes.button} onClick={InsertRecord} style={{marginLeft:'5vw'}}> حفــظ التغييرات</Button>
         {successMsg}
         {errorMsg}
         <Button className={classes.button2} onClick={() => handleButtonClick("/Information_2")} style={{marginLeft:'5vw'}}>التــالي</Button>
      
       </Grid>
        </Paper>
      
        </ThemeProvider>
    );
}

export default Information;