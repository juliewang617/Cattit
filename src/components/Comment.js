import { Text, SafeAreaView, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useContext, useState } from "react";
import { db } from "../utilities/config";
import {  addDoc, setDoc, doc, collection, updateDoc, getCountFromServer  } from "firebase/firestore";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js";

export default function Comment(props){

    const {commentUsername, commentBody} = props.item;  

    return (
        <View style={commentStyles.comment}>
            <Text style={commentStyles.commentUsername}>@{commentUsername}</Text>
            <Text style={commentStyles.commentBody}>{commentBody}</Text>
        </View>
    )
}

const commentStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        ...styles.container
      },
    comment: {
        flexDirection: 'row',
        marginTop: 10
    }, 
    commentUsername:{
        fontWeight: 'bold', 
        marginRight: 8,
    },
    commentBody: {
    }
});