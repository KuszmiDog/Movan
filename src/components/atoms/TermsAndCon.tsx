import { View, Text, StyleSheet } from 'react-native'
import { Radio, CheckBox } from "./inputs"
import { moderateScale, verticalScale } from 'react-native-size-matters'
import React, { useState } from 'react'
import BottomComponents from '@/src/components/atoms/BottomComponents'


const TermsAndCon = () => {
    const [states, setState] = useState([])

    return (

        
        <View style={styles.container}>

            {states.length > 0 && (
                <View style={styles.buttonlocation}>
                    <BottomComponents tittle="Siguiente" navigateTo="AccountLogin" />
                </View>
            )}
            
            <Text style={styles.text}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem non aut mollitia dolorum, labore cum aperiam soluta quo, corporis eius, obcaecati et ullam. Aliquid, illum quod ratione quaerat quasi tenetur!
            </Text>

            <CheckBox  
                options={[
                    { label: "Acepto los términos y condiciones", value: "accepted" }
                ]}
                checkedvalues={states}
                OnChange={setState}
                style={{ marginBottom: 15 }}
            />

            
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 15,
        fontFamily: "Roboto"
    },
    container: {
        top: 110,
        margin: 18,
        padding: 18,
    },
    buttonlocation:{
        top: verticalScale(100),
        width: "100%",
        left: moderateScale(20),
        position: "absolute",
        zIndex: 1,
      },

})


export default TermsAndCon;