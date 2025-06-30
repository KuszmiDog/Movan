import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
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
  logoutButton: {
    backgroundColor: '#FF4B4B', // Color rojo para el botón de cerrar sesión
    marginTop: verticalScale(20), // Espacio adicional arriba del botón
  },
});

export default styles;