import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { setDoc, doc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../utilities/config";
import UserContext from "../components/contexts/UserContext";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";

/**
 *  @returns {JSX.Element} The rendered MakePost Screen.
 */
export default function MakePostScreen({ navigation }) {
  const { username, pfp, uid } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  /**
   * Handles uploading an image
   */
  handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /**
   * Handles creating the post on press
   */
  handleMakePost = async () => {
    if (title == "") {
      setStatusMessage("Please make your title nonempty!");
    } else if (body == "") {
      setStatusMessage("Please make your body nonempty!");
    } else {
      setStatusMessage("Posting...");
      const newPostRef = doc(collection(db, "posts"));
      // comments: collection(db, "posts", newPostRef, "comments"),
      await setDoc(newPostRef, {
        body: body,
        uid: uid,
        image: image,
        op: username,
        title: title,
        pfp: pfp,
        upvotes: 0,
        comments: 0,
        date: new Date().toLocaleTimeString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setBody("");
      setTitle("");
      setImage("");
      setStatusMessage("Success!");
    }
  };

  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <View>
        <Image src={image} style={homeScreenStyles.image} />

        <Text style={styles.text}>Title</Text>
        <TextInput
          style={homeScreenStyles.titleInput}
          onChangeText={setTitle}
          value={title}
          maxLength={50}
        />

        <Text style={styles.text}>Body</Text>
        <TextInput
          style={homeScreenStyles.bodyInput}
          onChangeText={setBody}
          value={body}
          multiline={true}
          maxLength={200}
        />

        <Pressable style={styles.pinkButton} onPress={handleUploadImage}>
          <Text style={styles.text}>Upload image</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleMakePost}>
          <Text style={styles.buttonText}>Make post</Text>
        </Pressable>

        <Text style>{statusMessage}</Text>
      </View>
    </SafeAreaView>
  );
}

/**
 * Styles
 */
const homeScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...styles.container,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#FFD7E7",
  },
  titleInput: {
    height: 40,
    width: 200,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#535353",
    borderRadius: 5,
  },
  bodyInput: {
    height: 100,
    width: 200,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    ...styles.input,
  },
});
