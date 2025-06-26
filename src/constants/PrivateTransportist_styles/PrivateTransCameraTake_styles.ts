import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';


const styles = StyleSheet.create({

    background:{
        flex: 1,
        backgroundColor: '#565EB3'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#565EB3',
    },
    
    body: {
        marginTop: verticalScale(25),
        marginBottom: verticalScale(25),
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
        top: 120
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

export default styles;