import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#565EB3',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: verticalScale(20),
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: verticalScale(10),
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginBottom: verticalScale(20),
    },
    button: {
      backgroundColor: '#262E93',
      paddingVertical: verticalScale(10),
      paddingHorizontal: verticalScale(50),
      borderRadius: moderateScale(5),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: verticalScale(10), // Espaciado entre el subtítulo y el botón
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

export default styles;