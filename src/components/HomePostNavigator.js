import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UserContext from './UserContext';
import { useContext } from 'react';
import PostScreen from '../screens/PostScreen';
import CommenterContext from './CommenterContext';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import CatScreen from '../screens/CatScreen';

const HomePostStack = createStackNavigator();

export default function HomePostNavigator(){

    const { username, pfp, uid } = useContext(UserContext);  

    return(
        <CommenterContext.Provider value={{commentUsername: username, commentPfp: pfp, commentUid: uid}}>
            <HomePostStack.Navigator
            screenOptions={{headerTitle: "", headerTransparent: true}}>
                <HomePostStack.Screen name = "Feed" component={HomeScreen}/>
                <HomePostStack.Screen name = "Post" component={PostScreen} />
                <HomePostStack.Screen name = "Other Profile" component={OtherProfileScreen} />
                <HomePostStack.Screen name = "Cat" component={CatScreen} />
            </HomePostStack.Navigator>
        </CommenterContext.Provider>
    )
}