import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    text: {
        color: '#535353'
    },
    coloredText: {
         color: "#6B26AF"
    },
    input: {
        padding: 10,
        borderColor: '#535353', 
        borderRadius: 5,
    },
    button: {
        borderRadius: 10, 
        height: 40, 
        width: 200, 
        padding: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#6B26AF', 
        alignSelf: 'center',
        marginTop: 10
    },
    pinkButton: {
        width: 150, 
        padding: 8, 
        alignItems: 'center', 
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#F6AFEB',
        borderRadius: 10, 
    },
    buttonText: {
        color: 'white'
    },
})