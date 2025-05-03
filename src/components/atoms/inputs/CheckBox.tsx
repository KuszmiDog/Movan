import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const CheckBox = ({options, checkedvalues, OnChange, style}) => {
    let updateCheckedValues = [...checkedvalues];

    return ( <View style={[styles.container, style]}>
            {options.map((option) => {
                let active = updateCheckedValues.includes(option.value);
                
                return (
                    <TouchableOpacity 
                        style={active ? [styles.CheckBox, styles.activeCheckBox] : styles.CheckBox}
                        onPress={() => {
                            if(active) {
                                updateCheckedValues = updateCheckedValues.filter(
                                    (checkedvalues) => checkedvalues !== option.value
                                );
                                return OnChange(updateCheckedValues);
                            }

                            updateCheckedValues.push(option.value)
                            OnChange(updateCheckedValues);
                        }}
                        >
                            
                        <MaterialIcons 
                            name={active ? "check-box" : "check-box-outline-blank"} 
                            size={24} 
                            color={active ? "white" : "white"}
                            />
                        <Text style={active ? [styles.text] : styles.activeText}>{option.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    CheckBox: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        //backgroundColor: "#262E93"
    },

    activeCheckBox:{
        //backgroundColor: "#262E93"
    },

    text:{
        fontSize: 16,
        marginLeft: 15,
        color: "white"
    },

    activeText:{
        fontSize: 16,
        marginLeft: 15,
        color: "white"
    }
})

export default CheckBox;