import { colors } from "../colors";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "space-between"
    },
  
    movanlogo:{
      justifyContent: "center",
      top: 70,
    },
  
    logoimage:{
      width: 220,
      height: 220,
      left: 8,
      top: 29
    },
  
    textLogo: {
      fontSize: 20,
      color: colors.white,
      fontWeight: "600"
    },
  
    mApacheLogo: {
      justifyContent: "center",
      alignItems: "center",
      gap: 25
    },
  
    mApacheLogoImage: {
      width: 65,
      height: 40,
      
    },  
  
    mApacheFont: {
      fontSize: 15,
      color: colors.white,
      fontWeight: "500",
      bottom: 20
    },
  
    header:{
      alignItems: "center",
      gap: moderateScale(30)
    }
  
  });

export default styles;