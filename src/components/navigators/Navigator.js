import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import SplashScreen from '../../screens/SplashScreen'; 
import MakePostScreen from '../../screens/MakePostScreen';
import UserContext from '../contexts/UserContext';
import HomePostNavigator from './HomePostNavigator';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../utilities/config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome6';
import ProfileCatsNavigator from './ProfileCatsNavigator';
import DailyCatFactScreen from '../../screens/DailyCatFactScreen';

const AuthStack = createStackNavigator();

const AppStack = createBottomTabNavigator();

export default function Navigator(){

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); 
  const [pfp, setPfp] = useState(""); 

  const getUserInfo = async (user) => {
    const docRef = doc(db, "userinfo", user.uid); 
    const docSnap = await getDoc(docRef); 
  
    if (docSnap.exists()) {
      setUsername(docSnap.get('username')); 
      setPfp(docSnap.get('pfp')); 
    } else {
      console.log("Couldn't find user");
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if (user){
        setUser(user.uid);
        getUserInfo(user); 
      } else {
        setUser(null);
        setUsername("");
        setPfp(""); 
      }}
    ); 
  }, [])


  if (user){
    return(
      <UserContext.Provider value={{username: username, pfp: pfp, uid: user}}>
        <NavigationContainer>
          <AppStack.Navigator
          screenOptions={({route}) => ({
            headerShown: false, 
            tabBarStyle: {
              backgroundColor: '#6B26AF', 
              height: 64,
              borderTopRightRadius: 20, 
              borderTopLeftRadius: 20,
              paddingBottom: 5, 
            },
            tabBarActiveTintColor: '#F6AFEB',
            tabBarInactiveTintColor: '#B16BCD'
          })}>
            <AppStack.Screen name = "Home" component={HomePostNavigator} 
            options={{tabBarIcon: ({color, size}) => (<Icon name="house" size={20} color='#F6AFEB' />)}}/>
            <AppStack.Screen name = "Post" component={MakePostScreen} 
            options={{tabBarIcon: ({color, size}) => (<Icon name="plus" size={20} color='#F6AFEB' />)}}/>
            <AppStack.Screen name = "Profile" component={ProfileCatsNavigator} 
            options={{tabBarIcon: ({color, size}) => (<Icon name="shield-cat" size={20} color='#F6AFEB' />)}}/>
            <AppStack.Screen name = "Daily Cat Fact" component={DailyCatFactScreen} 
            options={{tabBarIcon: ({color, size}) => (<Icon name="cat" size={20} color='#F6AFEB' />)}}/>
          </AppStack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    )
  } else {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
        screenOptions={{headerTitle: "", headerTransparent: true}}>
          <AuthStack.Screen name = "Splash" component={SplashScreen} />
          <AuthStack.Screen name = "Login" component={LoginScreen} />
          <AuthStack.Screen name = "Sign Up" component={SignupScreen}/>
        </AuthStack.Navigator>
      </NavigationContainer>

    )
  }
}