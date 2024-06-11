import { Text, SafeAreaView, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useContext, useEffect, useState } from "react";
import { db } from "../utilities/config";
import {  addDoc, setDoc, doc, collection, updateDoc, getCountFromServer  } from "firebase/firestore";
import Comment from "./Comment";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js";

export default function Post(props){

    // isolating nav so it doesn't get passed to postScreen
    const {nav, ...rest} = props.item;  
    const {id, body, comments, date, image, op, pfp, title, upvotes} = rest

    // setCommentCount(getCommentCount()); 

    // console.log(commentCount); 

    return(
        <Pressable onPress={() => nav.navigate('Post', data=rest)}>
            <View>
                <View style={postStyles.pfpUserDateRow}>
                    <Image style={postStyles.pfp} src={pfp}/>
                    <View style={postStyles.userAndDate}>
                        <Text style={postStyles.username}>@{op}</Text>
                        <Text style={postStyles.date}>{date}</Text>
                    </View>
                </View>
                <Text numberOfLines={1} style={postStyles.title}>{title}</Text>

                {image && <Image src={image} style={postStyles.image}></Image>}
                
                <Text numberOfLines={1} style={postStyles.body}>{body}</Text>

                <View style={postStyles.upvotesAndComments}>
                    <Text style={postStyles.upvotes}><Icon name="arrow-alt-circle-up" size={20}/> {upvotes}</Text>
                    <Text><Icon name="comment-dots" size={20}/> {comments}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const postStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      ...styles.container
    },
    pfp: {
        height: 40,
        width: 40, 
        borderRadius: 100, 
        backgroundColor: 'lightgray',
        marginRight: 10, 
    },
    username: {
        fontWeight: 'bold', 
        marginBottom: 5, 
    },
    date: {
        color: 'gray',
    },
    pfpUserDateRow: {
        flexDirection: 'row', 
        marginBottom: 10, 
    }, 
    userAndDate: {
    },
    image: {
        width: '100%', 
        height: 200, 
        marginBottom: 10, 
        borderRadius: 10, 
        backgroundColor: 'lightgray', 
        objectFit: 'contain', 
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8, 
    }, 
    body: { 
        marginBottom: 10
    }, 
    upvotes: {
        marginRight: 20,
    },
    upvotesAndComments: {
        flexDirection: 'row',
    },
});