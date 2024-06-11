import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js"

export default function SplashScreen( {navigation} ){

    return (
        <SafeAreaView style={splashStyles.container}>
            <View>

                <Pressable style={styles.button} onPress={() =>
                    navigation.navigate('Login')}> 
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() =>
                    navigation.navigate('Sign Up')}> 
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                
            </View>
        </SafeAreaView>
    )

}

const splashStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      ...styles.container
    },
});

