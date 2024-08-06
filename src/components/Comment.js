import { Text, View, StyleSheet } from "react-native";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";

/**
 *  @returns {JSX.Element} The rendered Comment Component.
 */
export default function Comment(props) {
  const { commentUsername, commentBody } = props.item;

  return (
    <View style={commentStyles.comment}>
      <Text style={commentStyles.commentUsername}>@{commentUsername}</Text>
      <Text style={commentStyles.commentBody}>{commentBody}</Text>
    </View>
  );
}

/**
 * Styles
 */
const commentStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...styles.container,
  },
  comment: {
    flexDirection: "row",
    marginTop: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    marginRight: 8,
  },
  commentBody: {},
});
