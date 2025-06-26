import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '@/src/constants/IndividualCamera_styles/IndividualPhone_styles';

const Transport = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const handleCreateAccount = () => {
        console.log('Crear cuenta con: ', { phoneNumber });
        router.push('/IndividualLogic/IndividualCamera'); 
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

export default Transport;