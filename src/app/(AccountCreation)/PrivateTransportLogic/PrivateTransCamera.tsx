import imagePaths from '@/src/constants/imagePaths';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '@/src/constants/PrivateTransportist_styles/PrivateTransCamer_styles';

const PrivateTransCamera = () => {

    const handleCreateAccount = () => {
        router.push('/PrivateTransportLogic/PrivateTransCameraTake'); 

    };
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.text}>¡Agregue una foto de su rostro para confirmar su identidad!
                </Text>
                <Text style={styles.label}>Esta foto estara disponible para los demas usuarios una vez completada
                    la creacion de la cuenta
                </Text>
                <View>
                    <Image
                        source={imagePaths.iconCamera}
                        style={styles.iconCamera}
                    />
                </View>

            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                    <Text style={styles.buttonText}>Tomar Foto</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>from mApache</Text>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default PrivateTransCamera;