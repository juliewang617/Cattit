import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserContext from './UserContext';
import { useContext } from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import AddCatScreen from '../screens/AddCatScreen';

const ProfileCatsStack = createStackNavigator();

export default function ProfileCatsNavigator(){

    // const { username, pfp, uid } = useContext(UserContext);  

    return(
        <ProfileCatsStack.Navigator
        screenOptions={{headerTitle: "", headerTransparent: true}}>
            <ProfileCatsStack.Screen name = "My Profile" component={ProfileScreen}/>
            <ProfileCatsStack.Screen name = "Add a Cat" component={AddCatScreen} />
        </ProfileCatsStack.Navigator>
    )
}