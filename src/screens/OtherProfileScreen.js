import { useState, useEffect } from "react";
import { Text, SafeAreaView, View, StyleSheet, Image, FlatList } from "react-native"
import { db } from "../utilities/config"
import { getDocs, collection } from "firebase/firestore";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js"; 
import { useNavigation } from '@react-navigation/native';
import CatNameAndPic from "../components/CatNameAndPic";

export default function OtherProfileScreen(data){

    const {uid, pfp, op} = data.route.params

    const [catData, setCatData] = useState([]); 

    const navigation = useNavigation(); 

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

    return(
        <SafeAreaView style={otherProfileStyles.container}>
            <Image src={pfp} style={otherProfileStyles.pfp}/>
            <Text style={styles.text}>@{op}</Text>

            <View style={otherProfileStyles.myCatsSection}>
                <Text style={otherProfileStyles.myCatsTitle}>@{op}'s Cats</Text>
                <FlatList 
                horizontal={true}
                data={catData}
                renderItem={CatNameAndPic}
                ListEmptyComponent={<Text>{op} does not have any cats!</Text>}
                ItemSeparatorComponent={<View style={{width: 20}} />}/>
            </View>
        </SafeAreaView>


    )
}

const otherProfileStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      ...styles.container
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
    }
});