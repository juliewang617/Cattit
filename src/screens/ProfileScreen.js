import { useContext, useState, useEffect } from "react";
import { Text, SafeAreaView, View, Pressable, StyleSheet, Image, FlatList } from "react-native"
import { auth, db } from "../utilities/config"
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { signOut } from "firebase/auth";
import UserContext from "../components/UserContext";
import * as ImagePicker from 'expo-image-picker'; 
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js"; 
import { useNavigation } from '@react-navigation/native';
import CatNameAndPic from "../components/CatNameAndPic";

export default function ProfileScreen(){

    const { username, pfp, uid } = useContext(UserContext); 

    const navigation = useNavigation(); 

    const [catData, setCatData] = useState(); 

    [profilePic, setProfilePic] = useState(pfp); 

    useEffect(() => {
        const getCats = async () => {
            const docSnap = await getDocs(collection(db, "userinfo", uid, "cats")); 
            setCatData(
                docSnap.docs.map(docu => ({
                    ...docu.data(), 
                    nav: navigation, 
                    profile_uid: uid
                }))
            ); 
        }

        const isFocused = navigation.addListener('focus', () => {
            getCats(); 
        })
        
    }, [navigation]) 

    const handleLogout = async () => {
        try {
            await signOut(auth); 
        } catch (error) {
            console.log("Error"); 
        }
    }

    const handleChangePfp = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            quality: 1,
        })
        if (!result.canceled){ 
            const docRef = doc(db, "userinfo", uid); 
            await updateDoc(docRef, {
                pfp: result.assets[0].uri
             })
            setProfilePic(result.assets[0].uri); 
            console.log("pfp successfully changed to", result.assets[0].uri); 
        }
    }

    return(
        <SafeAreaView style={profileStyles.container}>
            <View style={profileStyles.pfpButtonsContainer}>
                <View>
                    <Text style={profileStyles.text}>@{username}</Text>
                    <Image src={profilePic} style={profileStyles.pfp}></Image>
                </View>
                <View style={{marginLeft: 20, alignSelf: 'center'}}>
                    <Pressable style={styles.button} onPress={handleChangePfp}> 
                        <Text style={styles.buttonText}>Change profile picture</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleLogout}> 
                        <Text style={styles.buttonText}>Logout</Text>
                    </Pressable>
                </View>
            </View>

            <View style={profileStyles.myCatsSection}>
                <Text style={profileStyles.myCatsTitle}>My Cats</Text>
                <FlatList 
                horizontal={true}
                data={catData}
                renderItem={CatNameAndPic}
                ListEmptyComponent={<Text>Add your cat!</Text>}
                ItemSeparatorComponent={<View style={{width: 20}} />}/>
                <Pressable style={profileStyles.addCatButton} onPress={() => navigation.navigate("Add a Cat")}>
                    <Text style={styles.buttonText}>Add a cat</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const profileStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      ...styles.container,
    },
    pfp: {
        width: 90, 
        height: 90, 
        marginBottom: 20, 
        alignSelf: 'center', 
        borderRadius: 10, 
        backgroundColor: '#FFD7E7', 
    },
    text: {
        color: 'black', 
        textAlign: 'center', 
        marginBottom: 10, 
        fontWeight: 'bold', 
        ...styles.coloredText
    }, 
    pfpButtonsContainer: {
        marginTop: 50, 
        display: 'flex',
        flexDirection: 'row',
    },
    myCatsSection: { 
        marginTop: 20,
        paddingTop: 20, 
        height: 300,
        paddingLeft: 50, 
        paddingRight: 50, 
        borderRadius: 20, 
        alignItems: 'center',
        backgroundColor: '#FFD7E7'
    },
    myCatsTitle: {
        fontWeight: 'bold',
        marginBottom: 20,
        ...styles.coloredText
    }, 
    addCatButton: {
        marginBottom: 40, 
        ...styles.button
    }
});