import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    textAlign: 'center',
    padding: moderateScale(1),
  },
  header: {
    padding: verticalScale(20),
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: moderateScale(20),
  },
  section: {
    marginBottom: verticalScale(20),
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  sectionText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    opacity: 0.9,
  },
  footer: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(40),
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.7,
  },
});
export default styles;