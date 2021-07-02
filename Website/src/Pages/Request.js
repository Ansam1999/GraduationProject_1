import { makeStyles,Button,IconButton, Container, Paper,List,ListItem,ListItemText,
    Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField, Typography, Grid,Select,MenuItem, Box,TableBody,TableCell,TableRow,Radio,RadioGroup} from "@material-ui/core";
import React,{useState,useContext, Component} from 'react';
import {MyContext} from './Context';
import { withRouter } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import Draggable from 'react-draggable';
import { createMuiTheme } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import CheckIcon from '@material-ui/icons/Check';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Popup from './Popup';
import { render } from "@testing-library/react";
import FlatList from 'flatlist-react';
import { AppString } from "./Const";

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
        padding:theme.spacing(5) , 
        marginBottom:'15vh',
        justifyContent:'center',
        marginTop:'-95vh',
        width:'55vw',
        marginBottom:'52vh'
        
    },
    pageContent1: {
        margin: theme.spacing(5),
        padding:theme.spacing(0) , 
        marginBottom:'15vh',
        justifyContent:'center',
        height:'80vh',
        width:'15vw',
        marginLeft:'70vw',
        display:'block',
        overflow: 'hidden',        
    },
    b:{
     position: 'absolute', 
    // top: '65%', 
     //left: '46%',
     color:"#7840A7",
     fontWeight :"bold",
     fontSize : 25 ,
  marginTop:'39vh',
  marginLeft:'-42vw'
    },

      img:{
        position:'relative',
        height:'18vh',
        backgroundPositionX:'center',
        width:'12.5vw',
        borderRadius:10,
        resize:'cover',margin:'auto',
        marginLeft:'1.3vw',
        marginTop:'2vh'

      },
    h2:{
        color:"#7840A7",
        fontWeight :"bold",
        fontSize:22,
        width:'20vw',
        marginRight:'10vw'
    },
    h1:{
      color:"#7840A7",
      fontWeight :"bold",
      fontSize:'1.2vw',
      marginLeft:'0.8vw'
        },
        table:{
            textAlign:'right',
            direction:'rtl',
            width:'40vw',
          paddingLeft:'47vw',
          borderWidth:1,
          borderColor:'black'         
            
            },
            table1:{
              textAlign:'right',
              direction:'rtl',
              width:'40vw',
            paddingLeft:'47vw',
            },
            cell:{
            
            width:'4vw',
            paddingLeft:'10vw',
            textAlign:'right',
           paddingBottom:'5vh'
            },
            
            div:{
                width:'12vw',
                height:'5vh',
                fontSize:22,
                marginBottom:'-70px',
                fontWeight:'bold',
                marginRight:'4vw'
            },
            textField:{
            width:'8vw',
            textAlign:'center',
            height:'5vh',
            fontSize:'1.5vw',
            fontWeight:'bold',
            marginRight:'3vw',
            marginBottom:'-3vh',
            justifyContent:'space-around',
            backgroundColor:'#e5e5e5',
                    
       
            },
            text:{
                width:'10vw',
                textAlign:'center',
                fontSize:'1.5vw',
                fontWeight:'bold',
                marginRight:'5vw',
            paddingTop:'4vh',
            paddingBottom:'-4vh'
              
            },
            textButton:{
              width:'17vw',
              textAlign:'center',
              height:'5vh',
              fontSize:'1.5vw',
              fontWeight:'bold',
              marginBottom:'-3vh',
              justifyContent:'space-around',
              backgroundColor:'#7840A7',
              elevation:12,
              
            },
            button:{
                width:'10vw',
                borderColor:'#84d4a4',
                borderWidth:1,
                backgroundColor:'#84d4a4',
               marginTop:'8vh',
                fontWeight:'bold',
                fontSize:'1.3vw',
                position:'relative'
                },
    select:{
        width:'20vw',
        marginLeft:'26vw',
        marginTop:'3vh',
        textAlign:'right'
    },
    input:{
        textAlign : 'right',
        direction : 'rtl',
        paddingRight:'-3vw',
        paddingBottom:'5vh'
    },
    typographyStyles :{
        fontSize :'1.4vw' ,
        fontWeight :"bold",
      
        color:'#7840A7',

    },
    typography :{
        fontSize :'1.7vw' ,
        fontWeight :"bold",
        textAlign : 'right',
    paddingRight:'7vw',
        color:'#7840A7',
        paddingTop:'3vh',
        
    }
 
  }))
  
class Request extends Component {
  constructor(props){
    super(props);
  this.state = {
  
    dataSource: [],
    KinderEmail:""

 };  
}  
static contextType = MyContext;

fetchRequest(){
  var InsertAPIURL = "http://localhost/php-login-registration-api/forms.php";
    var headars ={
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
    };
var data= {
KinderEmail:this.state.KinderEmail
};

console.log(this.state.KinderEmail);

    fetch(InsertAPIURL,{
        method : 'POST' ,
        headers : headars ,
       body : JSON.stringify(data)
    })
    .then((response)=>response.json()) 
    .then((responseJson)=>{
        this.setState({dataSource: responseJson});
        
   
    })
    .catch((error)=>{
        alert("Error"+error);
    })
}

   componentDidMount(){
    this.fetchRequest();
}

  
    render() {
      //console.log(this.theUser.KinderEmail);
      const{rootState}=this.context;
      const{theUser}=rootState;
      this.state.KinderEmail=theUser.KinderEmail;
      console.log(theUser.KinderEmail);
      return (
        <div> 
            <Typography style={{marginRight:'5.5vw'}}>ههههااااس</Typography>
            {console.log("hey")} {console.log(this.state.dataSource)}
          {this.state.dataSource.map((item, index) => { {console.log(item.Name);}
                      return (
               
              <div key={index}>
                <div>{item.Name}</div>
              </div>
            );
          })}
        </div>
      );
    }
    
    }
    export default withRouter(Request);
    