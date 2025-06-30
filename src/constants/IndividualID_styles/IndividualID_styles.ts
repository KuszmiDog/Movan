import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  form: {
    paddingHorizontal: moderateScale(20),
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    color: '#333333',
  },
  button: {
    backgroundColor: '#262E93',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  buttonDisabled: {
    backgroundColor: '#8A8FB0',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: verticalScale(30),
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: moderateScale(14),
  },
});
export default styles;