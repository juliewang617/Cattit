import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";

/**
 *  @returns {JSX.Element} The rendered Splash Screen.
 */
export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={splashStyles.container}>
      <View>
        <Text style={splashStyles.title}>Cattit</Text>

        <Image
          style={splashStyles.logo}
          src="/Users/juliewang/Desktop/projects/react-native/Cattit/assets/cattit-logo.png"
        />

        <Text style={splashStyles.caption}>For Cat Lovers</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/**
 * Styles
 */
const splashStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "top",
    ...styles.container,
  },
  title: {
    marginTop: 60,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 20,
    ...styles.text,
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  caption: {
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 20,
    ...styles.text,
  },
});
