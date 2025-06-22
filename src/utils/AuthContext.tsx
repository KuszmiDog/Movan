import { View, Text } from 'react-native'
import React, { Children, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = React.createContext({
  user: null,
  signIn: async (username) => {},
  signOut: async () => {}
  })

// Desarrollo del provider de contexto

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);

    //busqueda del usuario en AsyncStorage al iniciar la aplicacion
    //si existe, se establece el estado del usuario
    //si no existe, el estado del usuario se mantiene como null
    //esto permite que el usuario permanezca autenticado incluso si la aplicacion se cierra
    //y se vuelve a abrir, siempre y cuando el usuario haya iniciado sesion previamente
    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUser(JSON.parse(user));
            }
        };
        getUser();
    }, []);

    

    //funcion para iniciar sesion, recibe el nombre de usuario
    //y establece el estado del usuario y lo guarda en AsyncStorage
    //esto permite que el usuario permanezca autenticado incluso si la aplicacion se cierra
    //y se vuelve a abrir, siempre y cuando el usuario haya iniciado sesion previamente
    //la funcion es asincrona para poder esperar a que se guarde el usuario en AsyncStorage
    //y evitar problemas de sincronizacion
    //la funcion se puede llamar desde cualquier componente que consuma el contexto de autenticacion
    //por ejemplo, desde un formulario de inicio de sesion
    const signIn = async (username) => {
        setUser({ username });
        await AsyncStorage.setItem('user', JSON.stringify({ username }));
    };



    //funcion para cerrar sesion, establece el estado del usuario como null
    //y elimina el usuario de AsyncStorage
    //esto permite que el usuario no permanezca autenticado si cierra sesion
    //la funcion es asincrona para poder esperar a que se elimine el usuario de AsyncStorage
    //y evitar problemas de sincronizacion
    //la funcion se puede llamar desde cualquier componente que consuma el contexto de autenticacion
    //por ejemplo, desde un boton de cerrar sesion
    const signOut = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext