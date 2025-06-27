import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#565EB3' 
  },
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    alignItems: 'center',
    padding: verticalScale(40),
    paddingTop: verticalScale(140), 
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(5),
  },
  passwordDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(8),
    fontStyle: 'italic',
  },
  passwordStrengthContainer: {
    width: '90%',
    marginBottom: verticalScale(10),
    alignItems: 'flex-start',
    paddingLeft: moderateScale(20),
  },
  passwordStrengthBar: {
    height: 3,
    width: '30%',
    borderRadius: 2,
    marginBottom: verticalScale(5),
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: 'bold',
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
  buttonDisabled: {
    backgroundColor: '#8A8FB0',
    opacity: 0.7,
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
    paddingBottom: verticalScale(20),
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  
});

export default styles;