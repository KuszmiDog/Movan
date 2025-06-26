import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#565EB3',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
    },
    optionsContainer: {
      width: '100%',
      marginBottom: 30,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    roleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionText: {
      color: 'white',
      fontSize: 16,
      marginLeft: 10,
    },
    button: {
      backgroundColor: '#262E93',
      paddingVertical: 10,
      paddingHorizontal: 50,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonDisabled: {
      backgroundColor: '#8A8A8A',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    closeButton: {
      backgroundColor: '#262E93',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    footer: {
      bottom: 14,
      justifyContent: 'center',
      alignItems: 'center',
      top: 230,
    },
    footerText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    }
  });

  export default styles;