import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import AddCatScreen from '../../screens/AddCatScreen';
import CatScreen from '../../screens/CatScreen';

const ProfileCatsStack = createStackNavigator();

export default function ProfileCatsNavigator(){

    return(
        <ProfileCatsStack.Navigator
        screenOptions={{headerTitle: "", headerTransparent: true}}>
            <ProfileCatsStack.Screen name = "My Profile" component={ProfileScreen}/>
            <ProfileCatsStack.Screen name = "Add a Cat" component={AddCatScreen} />
            <ProfileCatsStack.Screen name = "Cat" component={CatScreen} />
        </ProfileCatsStack.Navigator>
    )
}