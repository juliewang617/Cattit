import { Text, SafeAreaView, View, Pressable, StyleSheet, Image } from "react-native"; 
import * as ImagePicker from 'expo-image-picker'; 
import { useContext, useState } from 'react';
import UserContext from "../components/UserContext";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js"; 
import { FlatList } from "react-native";

export default function CatScreen(data){

    const { profile_uid, details, image, name, album } = data.route.params

    const { username, pfp, uid } = useContext(UserContext); 

    const [albumImages, setAlbumImages] = useState(album)

    handleUploadAlbumImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            quality: 1,
        })
        if (!result.canceled){ 
            setAlbumImages(arr => [...arr, result.assets[0].uri]); 
            // need to upload album images in firestore too
        }
    }

    handleDeleteCat = async () => {

    }

    handleEditCat = async () => {

    }

    return(
        <SafeAreaView style={catScreenStyles.container}>
            <View>
                <Text style={catScreenStyles.name}>{name}</Text>
                <View style={catScreenStyles.nameImageDetailsRow}>
                    <Image src={image} style={catScreenStyles.image}/> 
                    <View style={{width: 150}}>
                        <Text style={styles.text}>Details: {details}</Text>
                    </View>
                    
                </View>

                <View style={catScreenStyles.albumContainer}> 
                    <Text style={styles.text}>Album</Text>
                    <FlatList 
                    horizontal={true}
                    data={albumImages}
                    renderItem={({item}) => <Image src={item} style={catScreenStyles.albumImage}/>}
                    ListEmptyComponent={<Text>HELLO</Text>}
                    ItemSeparatorComponent={<View style={{width: 20}} />}/>

                {profile_uid == uid && 
                <Pressable style={styles.pinkButton}>
                            <Text onPress={handleUploadAlbumImage}>Upload album image</Text>
                    </Pressable>} 
                </View>

                {profile_uid == uid && 
                <View>
                    <Pressable style={styles.button} onPress={handleEditCat}>
                        <Text style={styles.buttonText}>Edit Info</Text>
                    </Pressable>

                    <Pressable onPress={handleDeleteCat}>
                        <Text style={[{alignSelf: 'center', marginTop: 15}, styles.text]}>Delete Cat</Text>
                    </Pressable>
                </View>
                }


            </View>
        </SafeAreaView>
    )
}

const catScreenStyles = StyleSheet.create({
    container: {
        justifyContent: 'top', 
        alignItems: 'center',
        width: '100%', 
        ...styles.container
      },
    name: {
        marginTop: 40, 
        marginBottom: 15, 
        fontSize: 20, 
        fontWeight: 'bold', 
        alignSelf: 'center'
    }, 
    image: {
        marginRight: 20, 
        width: 150, 
        height: 150, 
        borderRadius: 10,
        backgroundColor: 'gray', 
        alignSelf: 'center', 
    }, 
    albumContainer: {
        marginTop: 20, 
        marginBottom: 10, 
        width: 320,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFD7E7', 
    }, 
    albumImage: {
        marginTop: 10, 
        width: 100, 
        height: 100, 
        borderRadius: 10,
        backgroundColor: 'gray', 
        marginBottom: 20, 
    }, 
    nameImageDetailsRow: {
        display: 'flex',
        flexDirection: 'row', 
    }, 
});