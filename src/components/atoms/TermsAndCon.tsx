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
                En estos términos y condiciones usted le está entregando la cola a Movan, y por lo tanto a la empresa mApache. 
                De manera obvia, esto rotula un compromiso de esclavitud para usted y para toda su descendencia a partir de la 
                3ra generación hacia abajo de quien acepte los términos y condiciones. Los ingresos de su familia serán 
                recaudados periódicamente para fungir de inversión en Movan. Gracias.
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
        top: 190,
        width: 220,
        left: 40
      },

})


export default TermsAndCon;