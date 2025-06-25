import { StyleSheet } from "react-native";
import { colors } from "../colors";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-between"
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  animationContainer: {
    marginBottom: 100,
  },

  movanlogo: {
    justifyContent: "center",
    top: 70,
  },

  logoimage: {
    width: 220,
    height: 220,
    left: 8,
    top: 29
  },

  textLogo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },

  mApacheLogo: {
    justifyContent: "center",
    alignItems: "center",
    gap: 25
  },

  mApacheLogoImage: {
    width: 55,
    height: 40,
    top: 8
  },  

  mApacheFont: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
    bottom: 20,
    textShadowRadius: 10,
  },

  header: {
    alignItems: "center",
    gap: moderateScale(30)
  }
})

export default styles;