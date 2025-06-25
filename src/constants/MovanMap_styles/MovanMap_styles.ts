import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';   
import { colors } from '../colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5A6BFF',
      justifyContent: 'center',
      alignItems: 'center',
      padding: verticalScale(20),
    },
    title: {
      fontSize: 28,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: verticalScale(30),
    },
    input: {
      backgroundColor: 'white',
      width: '80%',
      paddingVertical: verticalScale(10),
      paddingHorizontal: moderateScale(10),
      borderRadius: moderateScale(10),
      marginBottom: verticalScale(15),
      fontSize: 16,
      color: '#000',
    },
    menuContainer: {
      width: '100%',
      alignItems: 'center',
    },
    menuButton: {
      backgroundColor: '#262E93',
      width: '80%',
      paddingVertical: verticalScale(15),
      borderRadius: moderateScale(10),
      alignItems: 'center',
      marginBottom: verticalScale(15),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  export default styles;