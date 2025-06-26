import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { UserService, User } from '../../utils/UserService';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const allUsers = await UserService.getUsers();
      const current = await UserService.getCurrentUser();
      setUsers(allUsers);
      setCurrentUser(current);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await UserService.logoutUser();
      setCurrentUser(null);
      Alert.alert('Éxito', 'Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  const handleClearUsers = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar todos los usuarios? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await UserService.clearAllUsers();
              setUsers([]);
              setCurrentUser(null);
              Alert.alert('Éxito', 'Todos los usuarios han sido eliminados');
            } catch (error) {
              console.error('Error eliminando usuarios:', error);
              Alert.alert('Error', 'No se pudieron eliminar los usuarios');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userDate}>
        Registrado: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      {currentUser?.id === item.id && (
        <Text style={styles.currentUserLabel}>Usuario Actual</Text>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      
      {currentUser && (
        <View style={styles.currentUserSection}>
          <Text style={styles.sectionTitle}>Usuario Actual:</Text>
          <Text style={styles.currentUserEmail}>{currentUser.email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.usersSection}>
        <Text style={styles.sectionTitle}>
          Usuarios Registrados ({users.length})
        </Text>
        
        {users.length === 0 ? (
          <Text style={styles.noUsers}>No hay usuarios registrados</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={renderUser}
            style={styles.usersList}
          />
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.refreshButton} onPress={loadUsers}>
          <Text style={styles.buttonText}>Actualizar Lista</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clearButton} onPress={handleClearUsers}>
          <Text style={styles.buttonText}>Eliminar Todos los Usuarios</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  loading: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  currentUserSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  currentUserEmail: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  usersSection: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  noUsers: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  usersList: {
    flex: 1,
  },
  userItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  userDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  currentUserLabel: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF5722',
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default UserManagement;
