import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const TransportID = () => {
    const [truckNumber, setTruckNumber] = useState('');
    const [fleeteName, setfleeteName] = useState('');
    const [directionFleete, setDirectionFleete] = useState('');


    const handleNext = () => {
        console.log('Datos ingresados:', {
            fleeteName,
            truckNumber,
            directionFleete,
        });
        router.push('/SuccessAccount'); // Navegar a la siguiente pantalla
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.text}>¡Rellene con información de {'\n'} su flota!</Text>
                <Text style={styles.label}>Ingrese el nombre de su empresa/flota</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la flota"
                    value={fleeteName}
                    onChangeText={setfleeteName}
                />
                <Text style={styles.label}>Seleccione la cantidad de camiones</Text>
                <Picker
                    selectedValue={truckNumber}
                    onValueChange={(itemValue) => setTruckNumber(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Seleccione cantidad" value="" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                </Picker>
                <Text style={styles.label}>Escriba la dirección de su empresa</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número de documento"
                    value={directionFleete}
                    onChangeText={setDirectionFleete}
                    keyboardType="default"
                />

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>from mApache</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#565EB3',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
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
    label: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: verticalScale(5),
    },
    input: {
        width: moderateScale(310),
        height: verticalScale(40),
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: verticalScale(10),
        marginBottom: verticalScale(15),
        fontSize: 16,
    },
    button: {
        backgroundColor: '#262E93',
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(50),
        borderRadius: moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(20),
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
    },
    footerText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default TransportID;