import imagePaths from '@/src/constants/imagePaths';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const PrivateTransLicenseF = () => {

    const handleCreateAccount = () => {
            router.push('/PrivateTransportLogic/PrivateTransLicenseB'); 
        };

        
  return (
    <SafeAreaView style={styles.background}>

        <View style={styles.container}>

            <View style={styles.body}>
                <Image
                    source={imagePaths.iconLicense}
                    style={styles.iconCamera}
            />
                <Text style={styles.text}>Sube una foto del frente de tu licenciia de conducir
                </Text>
                <Text style={styles.label}>Estos datos son totalmente necesarios para comprobar el estado activo de los datos actualizados del vehiculo que usaras para trabajar en la aplicacion.
                </Text>

             <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Subir foto del frente de licencia</Text>
            </TouchableOpacity>
                </View>
                    <View style={styles.footer}>   
                        <Text style={styles.footerText}>from mApache</Text>
                    </View>
                </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    background:{
        flex: 1,
        backgroundColor: '#565EB3'
    },

    container: {
        top: 70,
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
        marginTop: verticalScale(80),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    footer: {
        top: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    text: {
        alignSelf: "center",
        color: 'white',
        margin: 18,
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 4 },
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(30),
    },
    button: {
        top: 10,
        backgroundColor: '#262E93',
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(30),
        borderRadius: moderateScale(5),
        marginTop: verticalScale(10),
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        margin: 15,
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

export default PrivateTransLicenseF