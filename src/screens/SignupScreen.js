import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { db, auth } from "../utilities/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";

/**
 *  @returns {JSX.Element} The rendered Signup Screen.
 */
export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  /**
   * Handles signup
   */
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (result) => {
          setDoc(doc(db, "userinfo", result.user.uid), {
            email: email,
            username: username,
            pfp: "https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
          });
        }
      );

      const ref = doc(db, "users", result);
      setStatusMessage("Success!");
    } catch (error) {
      setStatusMessage("Error creating account");
    }
  };

  return (
    <SafeAreaView style={signupScreenStyles.container}>
      <View>
        <Text>Email</Text>
        <TextInput
          style={signupScreenStyles.input}
          onChangeText={setEmail}
          value={email}
        />

        <Text>Username</Text>
        <TextInput
          style={signupScreenStyles.input}
          onChangeText={setUsername}
          value={username}
        />

        <Text>Password</Text>
        <TextInput
          style={signupScreenStyles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry="true"
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>

        <Text>{statusMessage}</Text>
      </View>
    </SafeAreaView>
  );
}

/**
 * Styles
 */
const signupScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...styles.container,
  },
  input: {
    height: 40,
    width: 200,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
