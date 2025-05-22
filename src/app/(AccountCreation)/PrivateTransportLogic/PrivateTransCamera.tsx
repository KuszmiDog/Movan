import imagePaths from '@/src/constants/imagePaths';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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

const styles = StyleSheet.create({

    background:{
        flex: 1,
        backgroundColor: '#565EB3'
    },

    container: {
        top: 10,
        gap: 40,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    iconCamera: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: verticalScale(10),
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
        marginTop: verticalScale(120),
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
        fontSize: 20,
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

export default PrivateTransCamera;