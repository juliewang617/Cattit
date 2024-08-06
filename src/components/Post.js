import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import styles from "/Users/juliewang/Desktop/projects/react-native/Cattit/src/utilities/Style.js";

/**
 *  @returns {JSX.Element} The rendered Post component.
 */
export default function Post(props) {
  const { nav, ...rest } = props.item;
  const { id, uid, body, comments, date, image, op, pfp, title, upvotes } =
    rest;

  return (
    <View>
      <Pressable
        onPress={() => nav.navigate("Other Profile", (data = { uid, pfp, op }))}
      >
        <View style={postStyles.pfpUserDateRow}>
          <Image style={postStyles.pfp} src={pfp} />
          <View style={postStyles.userAndDate}>
            <Text style={postStyles.username}>@{op}</Text>
            <Text style={postStyles.date}>{date}</Text>
          </View>
        </View>
      </Pressable>

      <Pressable onPress={() => nav.navigate("Post", (data = rest))}>
        <View>
          <Text numberOfLines={1} style={postStyles.title}>
            {title}
          </Text>

          {image && <Image src={image} style={postStyles.image}></Image>}

          <Text numberOfLines={1} style={postStyles.body}>
            {body}
          </Text>

          <View style={postStyles.upvotesAndComments}>
            <Text style={postStyles.upvotes}>
              <Icon name="arrow-alt-circle-up" size={20} color="#535353" />{" "}
              {upvotes}
            </Text>
            <Text style={postStyles.upvoteCommentNumText}>
              <Icon name="comment-dots" size={20} color="#535353" /> {comments}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

/**
 * Styles
 */
const postStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    ...styles.container,
  },
  pfp: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#FFD7E7",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
    ...styles.text,
  },
  date: {
    color: "#A0A0A0",
  },
  pfpUserDateRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userAndDate: {},
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFD7E7",
    objectFit: "contain",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    ...styles.text,
  },
  body: {
    marginBottom: 10,
    ...styles.text,
  },
  upvotes: {
    marginRight: 20,
    ...styles.text,
  },
  upvotesAndComments: {
    flexDirection: "row",
  },
  upvoteCommentNumText: {
    ...styles.text,
  },
});
