import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';


const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#565EB3' 
    },
    container: {
      top: 100,
      flex: 1,
      backgroundColor: '#565EB3',
      alignItems: 'center',
      padding: verticalScale(40),
    },
    title: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
      marginBottom: verticalScale(20),
    },
    iconContainer: {
      flexDirection: 'row',
      gap: 55,
      alignItems: "center"
  
    },
    label: {
      fontSize: 16,
      color: 'white',
      alignSelf: 'flex-start',
      marginLeft: moderateScale(20),
      marginBottom: verticalScale(5),
    },
    input: {
      width: '90%',
      backgroundColor: 'white',
      borderRadius: moderateScale(5),
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
      marginTop: verticalScale(10),
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    orText: {
      color: 'white',
      fontSize: 16,
      marginVertical: verticalScale(15),
      top: 150
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    socialIcon: {
      width: 50,
      height: 50,
    },
    footer: {
      bottom: 14,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: verticalScale(190),
    },
    footerText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    },
    accountcreation:{
      top:150
    }
    
  });

export default styles;