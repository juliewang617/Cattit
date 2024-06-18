import { Text, SafeAreaView, View, StyleSheet } from "react-native"
import { query, getDocs, collection, orderBy} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../utilities/config";
import { FlatList } from "react-native";
import Post from "../components/Post";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js"; 

export default function HomeScreen({ navigation }){

    const [postData, setPostData] = useState([]); 

    useEffect(() => {

        const getPosts = async () => {
            const q = query(collection(db, "posts"), orderBy("upvotes", "desc"));
            const docSnap = await getDocs(q); 
            setPostData(
                docSnap.docs.map(docu => (
                    {
                        ...docu.data(), 
                        "id": docu.id, 
                        "nav": navigation
                    }
                    
                ))
            ); 
        }

        const isFocused = navigation.addListener('focus', () => {
            getPosts(); 
        })
        
    }, [navigation]) 
    
    return(
        <SafeAreaView style={homeScreenStyles.container}>
            <View>
                <FlatList 
                data={postData}
                renderItem={Post}
                ListEmptyComponent={<Text>Fetching posts...</Text>}
                style={homeScreenStyles.postList}
                ItemSeparatorComponent={<View style={homeScreenStyles.postDivider}/>}
                keyExtractor={(item) => item.id} />
            </View>
        </SafeAreaView>
    )
}

const homeScreenStyles = StyleSheet.create({
    container: {
      width: 'auto', 
      ...styles.container
    },
    postList: {
        margin: 20, 
    },
    postDivider: {
        borderBottomColor: '#4e5370',
        borderBottomWidth: 0.5,
        marginTop: 10, 
        marginBottom: 10, 
    }, 
});