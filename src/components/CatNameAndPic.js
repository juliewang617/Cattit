import { Text, SafeAreaView, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useContext, useState } from "react";
import { db } from "../utilities/config";
import {  addDoc, setDoc, doc, collection, updateDoc, getCountFromServer  } from "firebase/firestore";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js";

export default function CatNameAndPic(props){

    const {details, image, name} = props.item

    return(
        <View>
            <Text>{name}</Text>
            <Image src={image} style={catNameAndPicStyles.image}/>
        </View>
    )
}

    const catNameAndPicStyles = StyleSheet.create({
        image: {
            width: 100, 
            height: 100, 
            marginBottom: 20, 
            borderRadius: 10, 
            backgroundColor: 'lightgray', 
        },
        text: {
            color: 'black', 
            textAlign: 'center', 
            marginBottom: 10, 
            fontWeight: 'bold', 
        }, 
    });