import React from 'react';
import { View, StyleSheet} from 'react-native';
import LoginForm from '../../components/atoms/login/Login';

const LoginScreen = () => {
  const handleLogin = ({ username, password }) => {
    console.log('Intentando login con:', username, password);
    //  Autenticacion por API o BD 
  };

  return (
    <View style={style.backgroundspace}>
      <LoginForm onLogin={handleLogin} />
    </View>
  );
};

const style = StyleSheet.create({
    backgroundspace:{
        flex: 1,
        backgroundColor: "#565EB3"
    }
})

export default LoginScreen;