import { Text, SafeAreaView, View, Pressable, StyleSheet, TextInput, Image } from "react-native"; 
import * as ImagePicker from 'expo-image-picker'; 
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { useContext, useState } from 'react';
import { db } from "../utilities/config";
import UserContext from "../components/UserContext";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js"; 
import { FlatList } from "react-native";

export default function AddCatScreen({navigation}){

    const { username, pfp, uid } = useContext(UserContext); 

    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState("");
    const [statusMessage, setStatusMessage] = useState(""); 
    const [albumImages, setAlbumImages] = useState([]); 

    handleUploadProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            quality: 1,
        })
        if (!result.canceled){ 
            setImage(result.assets[0].uri); 
        }
    }

    handleUploadAlbumImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            quality: 1,
        })
        if (!result.canceled){ 
            setAlbumImages(arr => [...arr, result.assets[0].uri]); 
        }
        console.log(albumImages); 
    }
    

    handleAddCat = async () => {
        if (name == ""){
            setStatusMessage("Please make the name nonempty!")
        } else if (image == ""){
            setStatusMessage("Please give your cat an image!")
        }
        else {
            setStatusMessage("Adding...")
            const newCatRef = collection(db, "userinfo", uid, "cats");
            await addDoc(
                newCatRef,
                {
                    image: image,
                    name: name, 
                    details: details,
                    album: albumImages
                }
            )

            setDetails(""); 
            setName(""); 
            setImage(""); 
            setAlbumImages([])
            setStatusMessage("Success!")
            navigation.goBack(); 
        }

    }

    return(
        <SafeAreaView style={homeScreenStyles.container}>
            <View>
                <Image src={image} style={homeScreenStyles.image} />

                {albumImages.length != 0 && 
                <View style={homeScreenStyles.albumImagesSection}>
                    <FlatList 
                    horizontal={true}
                    data={albumImages}
                    renderItem={({item}) => (
                        <Image
                        src={item} 
                        style={{
                            width: 100,
                            height: 100}}/>
                    )}
                    ListEmptyComponent={<Text>Add album images!</Text>}
                    ItemSeparatorComponent={<View style={{width: 20}} />}/>
                </View>}

                <View style={homeScreenStyles.inputContainer}>
                    <Text>Name</Text>
                    <TextInput style={homeScreenStyles.nameInput}
                    onChangeText={setName}
                    value = {name} 
                    maxLength={50}
                    placeholder="Kiddo"/>

                    <Text>Details</Text>
                    <TextInput style={homeScreenStyles.detailsInput}
                    onChangeText={setDetails}
                    value={details}
                    maxLength={200}
                    placeholder="Age: 10, loves to eat grass" />
                </View>

                <View style={homeScreenStyles.inLineButtonRow}>
                    <Pressable style={homeScreenStyles.inLineButton} onPress={handleUploadProfileImage}> 
                        <Text style={homeScreenStyles.inLineButtonText}>Upload profile image</Text>
                    </Pressable>

                    <Pressable style={homeScreenStyles.inLineButton} onPress={handleUploadAlbumImage}> 
                        <Text style={homeScreenStyles.inLineButtonText}>Upload album image</Text>
                    </Pressable>
                </View>
                
                <Pressable style={styles.button} onPress={handleAddCat}> 
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>

                <Text style>{statusMessage}</Text>
            </View>
        </SafeAreaView>
    )
}

const homeScreenStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      ...styles.container
    },
    inputContainer: {
        width: 300,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    image: {
        width: 100, 
        height: 100, 
        marginBottom: 20, 
        alignSelf: 'center', 
        borderRadius: 10, 
        backgroundColor: 'lightgray', 
    },
    nameInput: {
        height: 40, 
        width: 'auto', 
        marginTop: 12, 
        marginBottom: 12,
        borderWidth: 1, 
        padding: 10
    },
    detailsInput: {
        height: 90, 
        width: 'auto', 
        marginTop: 12,
        borderWidth: 1, 
        padding: 10,
    },
    albumImagesSection: {
        width: 'full',
        height: 100,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 10
    },
    inLineButtonRow:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    inLineButton: {
        borderRadius: 10, 
        marginLeft: 10,
        marginRight: 10,
        width: 150, 
        padding: 5, 
        alignItems: 'center', 
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 10,
    },
    inLineButtonText:{
        color: 'black'
    }
});