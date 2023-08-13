import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {logoGreen, spotifyGray} from "../colors";


const ToggledList = ({ buttons, onPress, clickedId }) => {

    const handleClick = (index: number) => {
        onPress(index)
    }

    return (
        <View style={styles.container}>
            {
                buttons.map((buttonLabel, index) => (
                    <TouchableOpacity
                        onPress={() => handleClick(index)}
                        key={index}
                        style={styles.buttonContainer}>
                        <Text style={index === clickedId ? styles.activeItem : styles.inactiveItem}>
                            { buttonLabel }
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 7,
        padding: 2,
        height: 35,
        gap: 2
    },
    buttonContainer: {
        flex: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    activeItem: {
        color: logoGreen,
        fontWeight: "700",
        fontSize: 15
    },
    inactiveItem: {
        color: spotifyGray,
        fontWeight: "700",
        fontSize: 15
    },
})

export default ToggledList