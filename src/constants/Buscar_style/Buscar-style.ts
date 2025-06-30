import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  controlPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#262E93',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoContainer: {
    marginBottom: verticalScale(15),
  },
  clienteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  estadoText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: verticalScale(5),
  },
  direccionText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  confirmarButton: {
    flex: 2,
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
    elevation: 3,
  },
  confirmarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: moderateScale(8),
  },
  cancelarButton: {
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
    elevation: 3,
  },
  cancelarButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: moderateScale(6),
  },
});

export default styles;