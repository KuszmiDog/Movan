import imagePaths from '@/src/constants/imagePaths';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '@/src/constants/IndividualCamera_styles/InvidualCamera_styles';

const Transport = () => {

    const handleCreateAccount = () => {
        router.push('/SuccessAccount'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.text}>¡Agregue su foto para {'\n'} confirmar su identidad!
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
                    <Text style={styles.buttonText}>Siguiente</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>from mApache</Text>
            </View>
        </View>
    );
};

export default Transport;