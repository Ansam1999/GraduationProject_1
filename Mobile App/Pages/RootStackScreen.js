import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from "./context";
import { createDrawerNavigator } from '@react-navigation/drawer';


import SplashScreen from './SplashScreen';
import Login from './Login';
import ParentAccount from './ParentAccount';
import { DrawerContent } from './DrawerContent';
import MainTabScreen from './MainTabScreen';
import { Title } from 'react-native-paper';
import FormScreen from './FormScreen';

const RootStack = createStackNavigator();
const firstRootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerScreen = () =>(
<Drawer.Navigator drawerPosition="right" drawerContent = {props => <DrawerContent {...props}/>}>
  <Drawer.Screen name = 'HomeDrawer' component ={ MainTabScreen} ></Drawer.Screen>
</Drawer.Navigator>);

const FirstScreen = () =>(
<firstRootStack.Navigator headerMode='none'>
        <firstRootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <firstRootStack.Screen name="Login" component={Login}/>
        <firstRootStack.Screen name="ParentAccount" component={ParentAccount} />   
   

</firstRootStack.Navigator>
);

const RootStackScreen = ({ userToken }) => (
    <RootStack.Navigator >
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options ={{
            Title : '',
            headerShown: false
        }}
      />
      
      
    ) : (
      <RootStack.Screen
        name="First"
        component={FirstScreen}
        options ={{
            Title : '',
            headerShown: false
        }}
      />
      
    )}
  </RootStack.Navigator>
);

export default RootStackScreen;