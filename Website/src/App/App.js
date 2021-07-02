
import React,{useContext} from "react";
import MyContextProvider from "../Pages/Context";
import Routerr from '../Pages/Routerr'
function App() {
  return (
       <MyContextProvider>
       <Routerr />
       </MyContextProvider> 
  );
}

export default App;
