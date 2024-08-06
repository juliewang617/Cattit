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
import { collection, addDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../utilities/config";
import UserContext from "../components/contexts/UserContext";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";
import { FlatList } from "react-native";

/**
 *  @returns {JSX.Element} The rendered AddCat Screen.
 */
export default function AddCatScreen({ navigation }) {
  const { uid, ..._ } = useContext(UserContext);

  const [name, setName] = useState("");

  const [details, setDetails] = useState("");

  const [image, setImage] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  const [albumImages, setAlbumImages] = useState([]);

  /**
   * Handles uploading the profile image for the Cat
   */
  handleUploadProfileImage = async () => {
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
   * Handles uploading an album image for the cat
   */
  handleUploadAlbumImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setAlbumImages((arr) => [...arr, result.assets[0].uri]);
    }
    console.log(albumImages);
  };

  /**
   * Handles adding the Cat
   */
  handleAddCat = async () => {
    if (name == "") {
      setStatusMessage("Please make the name nonempty!");
    } else if (image == "") {
      setStatusMessage("Please give your cat an image!");
    } else {
      setStatusMessage("Adding...");
      const newCatRef = collection(db, "userinfo", uid, "cats");
      await addDoc(newCatRef, {
        image: image,
        name: name,
        details: details,
        album: albumImages,
      });

      setDetails("");
      setName("");
      setImage("");
      setAlbumImages([]);
      setStatusMessage("Success!");
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={addCatScreenStyles.container}>
      <View>
        <Image src={image} style={addCatScreenStyles.image} />

        {albumImages.length != 0 && (
          <View style={addCatScreenStyles.albumImagesSection}>
            <FlatList
              horizontal={true}
              data={albumImages}
              renderItem={({ item }) => (
                <Image
                  src={item}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              )}
              ListEmptyComponent={<Text>Add album images!</Text>}
              ItemSeparatorComponent={<View style={{ width: 20 }} />}
            />
          </View>
        )}

        <View style={addCatScreenStyles.inputContainer}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={addCatScreenStyles.nameInput}
            onChangeText={setName}
            value={name}
            maxLength={50}
            placeholder="Kiddo"
          />

          <Text style={styles.text}>Details</Text>
          <TextInput
            style={addCatScreenStyles.detailsInput}
            onChangeText={setDetails}
            value={details}
            maxLength={200}
            multiline={true}
            placeholder="Age: 10, loves to eat grass"
          />
        </View>

        <View style={addCatScreenStyles.inLineButtonRow}>
          <Pressable
            style={addCatScreenStyles.inLineButton}
            onPress={handleUploadProfileImage}
          >
            <Text style={styles.text}>Upload profile image</Text>
          </Pressable>

          <Pressable
            style={addCatScreenStyles.inLineButton}
            onPress={handleUploadAlbumImage}
          >
            <Text style={styles.text}>Upload album image</Text>
          </Pressable>
        </View>

        <Pressable style={styles.button} onPress={handleAddCat}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Text style>{statusMessage}</Text>
      </View>
    </SafeAreaView>
  );
}

/**
 * Styles
 */
const addCatScreenStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...styles.container,
  },
  inputContainer: {
    width: 300,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#FFD7E7",
  },
  nameInput: {
    height: 40,
    width: "auto",
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    ...styles.input,
  },
  detailsInput: {
    height: 90,
    width: "auto",
    marginTop: 12,
    borderWidth: 1,
    ...styles.input,
  },
  albumImagesSection: {
    width: "full",
    height: 100,
    backgroundColor: "#FFD7E7",
    padding: 10,
    borderRadius: 10,
  },
  inLineButtonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inLineButton: {
    marginLeft: 10,
    marginRight: 10,
    ...styles.pinkButton,
  },
});
