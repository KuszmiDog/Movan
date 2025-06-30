import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
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
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  optionsContainer: {
    marginBottom: verticalScale(30),
  },
  option: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginLeft: moderateScale(15),
  }
});

export default styles;