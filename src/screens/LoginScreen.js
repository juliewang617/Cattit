import { useState } from "react";
import { View, Text, TextInput, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { auth } from "../utilities/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "/Users/juliewang/Desktop/projects/react-native-projects/Cattit/src/utilities/Style.js"; 

export default function LoginScreen(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("")

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then((result) => {
                setStatusMessage("Logging in...")
            })
        } catch (error) {
            setStatusMessage("Error logging in")
        }
    }

    return (
        <SafeAreaView style={loginScreenStyles.container}>
            <View>
                <Text>Email</Text>
                <TextInput style={loginScreenStyles.input}
                onChangeText={setEmail}
                value = {email} />

                <Text>Password</Text>
                <TextInput style={loginScreenStyles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry="true" />
                
                <Pressable style={styles.button} onPress={handleLogin}> 
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Text>{statusMessage}</Text>

            </View>
        </SafeAreaView>
    )

}

const loginScreenStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      ...styles.container
    },
    input: {
        height: 40, 
        width: 200, 
        marginTop: 12, 
        marginBottom: 12,
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 5
    },
});

