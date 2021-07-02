import React from 'react';
import MainTabScreen from './Pages/MainTabScreen';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme 
  } from 'react-native-paper';
import ParentAccount from './Pages/ParentAccount';
import { DrawerContent } from './Pages/DrawerContent';
import RootStackScreen from './Pages/RootStackScreen';
import kindergartenProfile from './Pages/kindergartenProfile';
import { AuthContext } from "./Pages/context";
import FilterScreen from './Pages/FilterScreen';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import FormScreen from './Pages/FormScreen';
import {AppString} from './Pages/User';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const authContext = React.useMemo(() => {
    return {
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      logIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
     //   localStorage.setItem(AppString.Username, Username);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
   
 
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      primary: '#84d4a4',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      primary: '#84d4a4',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <AuthContext.Provider theme={theme} value={authContext}>
    <NavigationContainer theme={theme}>
     {/*   <Drawer.Navigator  drawerContent = {props => <DrawerContent {...props}/>}>
        <Drawer.Screen name = 'HomeDrawer' component ={ FormScreen} ></Drawer.Screen>
  </Drawer.Navigator>*/}
   <RootStackScreen userToken={userToken}/>
    </NavigationContainer>
    </AuthContext.Provider>

  );
}


