import { makeStyles, } from "@material-ui/core";
import React,{useContext} from "react";
import { withRouter } from "react-router-dom";
import { MyContext } from "./Context";


const useStyles = makeStyles(theme => ({
   h1:{
    position: 'absolute', 
    top: '55%', 
    left: '38%',
    color:"#7840A7"  
   },
 }))
const Home = (props) =>{
    const classes = useStyles();
    const {rootState,logoutUser} = useContext(MyContext);
    const {isAuth,theUser,showLogin} = rootState;
    return(
        <div>
        <h1 className={classes.h1}> أهلاً وسهلاً بكم في الصفحة الرئيسة </h1>    
        <h1>{theUser.KinderName}</h1>
        
        </div>
    );
}

export default withRouter(Home);