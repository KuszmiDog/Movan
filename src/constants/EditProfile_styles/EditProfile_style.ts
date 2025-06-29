import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  backButton: {
    marginRight: moderateScale(10),
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    padding: moderateScale(20),
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: verticalScale(5),
  },
  input: {
    backgroundColor: '#262E93',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  saveButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
