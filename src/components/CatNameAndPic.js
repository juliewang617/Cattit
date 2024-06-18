import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";

export default function CatNameAndPic(props){

    const {nav, ...rest} = props.item
    const {uid, details, image, name, album} = rest

    return(
        <Pressable onPress={() => nav.navigate('Cat', data=rest)}>
            <View>
                <Text style={catNameAndPicStyles.text}>{name}</Text>
                <Image src={image} style={catNameAndPicStyles.image}/>
            </View>
        </Pressable>
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
            textAlign: 'center', 
            marginBottom: 5, 
            ...styles.text
        }, 
    });