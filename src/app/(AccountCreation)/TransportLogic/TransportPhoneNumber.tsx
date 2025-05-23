import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Transport = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const handleCreateAccount = () => {
        // Lógica para crear la cuenta
        console.log('Crear cuenta con: ', { phoneNumber });
        router.push('/TransportLogic/PrivateTransCamera'); // Navegar a RolSelection

    };


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.text}>¡Agrega tu número de teléfono!</Text>
                <Text style={styles.label}>Ingresa tu cod de área y tu número de teléfono</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número de teléfono"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>from mApache</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    input: {
        width: moderateScale(300),
        backgroundColor: 'white',
        borderRadius: moderateScale(5),
        padding: verticalScale(10),
        marginBottom: verticalScale(15),
        fontSize: 16,
    },
    body: {
        marginTop: verticalScale(100),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    text: {
        color: 'white',
        fontSize: 26,
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 4 },
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(30),
    },
    button: {
        backgroundColor: '#262E93',
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(50),
        borderRadius: moderateScale(5),
        marginTop: verticalScale(10),
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: moderateScale(20),
        marginBottom: verticalScale(5),
    },
    footerText: {
        color: 'white',
        fontSize: 14,
        marginTop: verticalScale(160),
        textAlign: 'center',
    }
});

export default Transport;