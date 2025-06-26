import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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

export default styles;