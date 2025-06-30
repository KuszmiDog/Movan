import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../../utils/AuthContext';
import { UserService } from '../../../utils/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = () => {
    const { user, logout } = useAuth();
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [localUser, setLocalUser] = useState<any>(null);

    useEffect(() => {
        if (!user) {
            AsyncStorage.getItem('@movan_current_user').then(data => {
                if (data) setLocalUser(JSON.parse(data));
            });
        }
    }, [user]);

    const handleChange = async () => {
        if (!current || !newPass || !confirm) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }
        if (newPass !== confirm) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        // Usa el email de user o de localUser
        const emailToUse = user?.email || localUser?.email;
        if (!emailToUse) {
            Alert.alert('Error', 'Usuario no válido');
            return;
        }

        const result = await UserService.changePassword(emailToUse, current, newPass);
        if (result.success) {
            Alert.alert('Éxito', 'Contraseña cambiada');
            logout();
        } else {
            Alert.alert('Error', result.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#565EB3', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 30, marginBottom: 20, fontWeight: 'bold' }}>Cambiar Contraseña</Text>
            <Text style={{ color: 'white', fontSize: 14, marginBottom: 20 }}  >¡Recuerda guardar tu contraseña para no perderla!</Text>
            <TextInput
                placeholder="Contraseña actual"
                secureTextEntry
                value={current}
                onChangeText={setCurrent}
                style={{ backgroundColor: 'white', marginBottom: 20, borderRadius: 8, padding: 10, width: 300 }}
            />
            <TextInput
                placeholder="Nueva contraseña"
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
                style={{ backgroundColor: 'white', marginBottom: 10, borderRadius: 8, padding: 10, width: 300 }}
            />
            <TextInput
                placeholder="Confirmar nueva contraseña"
                secureTextEntry
                value={confirm}
                onChangeText={setConfirm}
                style={{ backgroundColor: 'white', marginBottom: 20, borderRadius: 8, padding: 10, width: 300 }}
            />
            <TouchableOpacity onPress={handleChange} style={{ backgroundColor: '#262E93', padding: 20, borderRadius: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChangePassword;