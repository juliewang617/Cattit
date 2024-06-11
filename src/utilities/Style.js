import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    input: {
        height: 40, 
        width: 'auto', 
        marginTop: 20, 
        marginBottom: 12,
        borderWidth: 1, 
        padding: 10, 
        borderColor: 'gray',
        borderRadius: 5, 
    },
    button: {
        borderRadius: 10, 
        height: 40, 
        width: 200, 
        padding: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'black', 
        alignSelf: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white'
    },
})