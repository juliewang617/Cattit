import { useContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, Pressable, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebaseConfig, app, db, auth } from "../utilities/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {  addDoc, deleteDoc, doc, collection, updateDoc, getDocs} from "firebase/firestore";
import UserContext from "../components/UserContext"
import CommenterContext from "../components/CommenterContext";
import Comment from "../components/Comment";
import { FlatList } from "react-native-gesture-handler";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js"; 

export default function PostScreen(data){
    
    // gets the current user, pfp, and their id (in case a comment is made)
    const {commentUsername, commentUid} = useContext(CommenterContext); 

    // get information about the post
    const {body, comments, id, image, op, pfp, title, date, upvotes} = data.route.params;  

    // if user posts a comment
    const [comment, setComment] = useState(""); 

    // stores all comments
    const [commentData, setCommentData] = useState([]); 

    // comment count 
    const [currCommentCount, setCurrCommentCount] = useState(comments); 

    // upvote count 
    const [currUpvoteCount, setCurrUpvoteCount] = useState(upvotes); 

    // get current navigation 
    const navigation = useNavigation(); 

    // handle upvote
    handleUpvote = async () => {
        await updateDoc(
            doc(db, "posts", id), 
            {
                upvotes: upvotes + 1
            }
        )

        setCurrUpvoteCount(curr => curr + 1); 
    }

    // handle delete post 
    handleDeletePost = async () => {
        await deleteDoc(doc(db, "posts", id)); 
        navigation.goBack(); 
    }

    // handle create comment
    handleMakeComment = async () => {
        if(comment != ""){
            await addDoc(
                collection(db, "posts", id, "comments"), 
                {
                    commentUsername: commentUsername, 
                    commentUid: commentUid, 
                    commentBody: comment, 
                }
            )

            await updateDoc(
                doc(db, "posts", id), 
                {
                    comments: comments + 1
                }
            )

            setCurrCommentCount(curr => curr + 1); 

            setComment(""); 
        }
    }

    // retrieve all commments 
    useEffect(() => {
        const getComments = async () => {
            const docSnap = await getDocs(collection(db, "posts", id, "comments")); 
            setCommentData(
                docSnap.docs.map(docu => (docu.data()))
            ); 
        }

        getComments();

    }, [currCommentCount])

    return(
        <SafeAreaView style={postScreenStyles.container}>
            <View style={postScreenStyles.postContainer}>
                <View style={postScreenStyles.pfpUserDateRow}>
                    <Image style={postScreenStyles.pfp} src={pfp}/>
                    <View style={postScreenStyles.userAndDate}>
                        <Text style={postScreenStyles.username}>@{op}</Text>
                        <Text style={postScreenStyles.date}>{date}</Text>
                    </View>
                    {commentUsername == op && 
                <Pressable style={postScreenStyles.deleteButton} onPress={handleDeletePost}> 
                    <Text style={postScreenStyles.deleteButtonText}>Delete post</Text>
                </Pressable>}
                </View>
                <Text numberOfLines={1} style={postScreenStyles.title}>{title}</Text>
                    
                {image && <Image src={image} style={postScreenStyles.image}></Image>}

                <Text numberOfLines={1} style={postScreenStyles.body}>{body}</Text>
        
                <View style={postScreenStyles.upvotesAndComments}>
                    <Pressable onPress={handleUpvote}>
                        <Text style={postScreenStyles.upvotes}><Icon name="arrow-alt-circle-up" size={20}/> {currUpvoteCount}</Text>
                    </Pressable>
                    <Text><Icon name="comment-dots" size={20}/> {currCommentCount}</Text>
                </View>

                {comments > 0 && 
                <FlatList
                data={commentData}
                renderItem={Comment}
                style={postScreenStyles.commentSection}
                />} 
    
                <TextInput style={postScreenStyles.input}
                onChangeText={setComment}
                value={comment}/>

                <Pressable style={styles.button} onPress={handleMakeComment}> 
                    <Text style={styles.buttonText}>Make comment</Text>
                </Pressable>

            </View>
                
        </SafeAreaView>
       )
}

const postScreenStyles = StyleSheet.create({
    container: {
        justifyContent: 'top', 
        ...styles.container
      },
    postContainer: {
        justifyContent: 'top',
        marginTop: 50, 
        marginLeft: 20, 
        marginRight: 20,
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
    input: {
        height: 40, 
        width: 'auto', 
        marginTop: 20, 
        marginBottom: 12,
        borderWidth: 1, 
        padding: 10, 
        borderColor: 'gray',
        borderRadius: 5, 
    },
    deleteButton: {
        marginLeft: 90
    }, 
    deleteButtonText: {
        color: 'gray', 
    }, 
    commentSection: {
        marginTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: 'gray'
    }
});

