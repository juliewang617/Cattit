import { Text, SafeAreaView, View, StyleSheet, Image } from "react-native"; 
import { useEffect, useState } from 'react';
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js"; 

export default function DailyCatFactScreen(){

    const [image, setImage] = useState(); 
    const [fact, setFact] = useState(); 

    useEffect(() => {

        const currentHour = new Date().getHours(); 

        const getCatImage = () => {
            
            return fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(json => { 
                setImage(json[0].url); 
            })
            .catch(error => {
                console.error(error)
            })
        }

        const getCatFact = () => {
            return fetch('https://meowfacts.herokuapp.com/')
            .then(response => response.json())
            .then(json => {
                setFact(json.data); 
            })
            .catch(error => {
                console.error(error)
            })
        }

        getCatImage(); 
        getCatFact(); 
        console.log("image", image);       
        console.log("fact", fact);  

    }, [])
    


    return(
        <SafeAreaView style={dailyCatFactScreenStyles.container}>
            <View style={dailyCatFactScreenStyles.factContainer}>
                <Image src={image} style={dailyCatFactScreenStyles.image}/>
                <Text style={dailyCatFactScreenStyles.title}>Daily Cat Fact</Text>
                <Text style={dailyCatFactScreenStyles.factText}>{fact}</Text>
            </View>
        </SafeAreaView>
    )
}

const dailyCatFactScreenStyles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        ...styles.container
      },
    image: {
        width: 200, 
        height: 200,
        borderRadius: 20, 
        marginBottom: 20, 
        marginTop: 20
    }, 
    factContainer: {
        alignItems: 'center', 
        marginLeft: 30, 
        marginRight: 30,
        marginBottom: 40,
    }, 
    title: {
        fontSize: 20,
        fontWeight: 'bold', 
        ...styles.coloredText,
        marginBottom: 20, 
    }, 
    factText: {
        fontSize: 16, 
        textAlign: 'center', 
        ...styles.text
    }
});