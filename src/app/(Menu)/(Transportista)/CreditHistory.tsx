import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../../utils/AuthContext';
import { CreditTransaction } from '../../../utils/CreditService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function CreditHistory() {
  const { getCreditHistory, getUserCredits } = useAuth();
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCredits, setCurrentCredits] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    loadCreditHistory();
  }, []);

  const loadCreditHistory = async () => {
    try {
      setLoading(true);
      const [history, credits] = await Promise.all([
        getCreditHistory(),
        getUserCredits()
      ]);
      setTransactions(history);
      setCurrentCredits(credits);
    } catch (error) {
      console.error('Error cargando historial de créditos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: 'add' | 'deduct') => {
    return type === 'add' ? 'plus-circle' : 'minus-circle';
  };

  const getTransactionColor = (type: 'add' | 'deduct') => {
    return type === 'add' ? '#4CAF50' : '#F44336';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Cargando historial...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Historial de Créditos</Text>
      </View>

      <View style={styles.currentCreditsCard}>
        <MaterialCommunityIcons name="cash" size={32} color="#FFD700" />
        <View style={styles.currentCreditsInfo}>
          <Text style={styles.currentCreditsLabel}>Créditos Actuales</Text>
          <Text style={styles.currentCreditsAmount}>{currentCredits}</Text>
        </View>
      </View>

      <ScrollView style={styles.historyContainer}>
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="history" size={64} color="rgba(255,255,255,0.3)" />
            <Text style={styles.emptyText}>No hay transacciones</Text>
            <Text style={styles.emptySubtext}>Las transacciones de créditos aparecerán aquí</Text>
          </View>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <MaterialCommunityIcons 
                name={getTransactionIcon(transaction.type)} 
                size={28} 
                color={getTransactionColor(transaction.type)} 
              />
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionReason}>{transaction.reason}</Text>
                <Text style={styles.transactionDate}>
                  {formatDate(transaction.timestamp)}
                </Text>
                {transaction.orderId && (
                  <Text style={styles.transactionOrderId}>
                    Pedido: {transaction.orderId}
                  </Text>
                )}
              </View>
              <Text 
                style={[
                  styles.transactionAmount,
                  { color: getTransactionColor(transaction.type) }
                ]}
              >
                {transaction.type === 'add' ? '+' : '-'}{transaction.amount}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262E93',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  currentCreditsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#565EB3',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  currentCreditsInfo: {
    marginLeft: 15,
  },
  currentCreditsLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  currentCreditsAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptySubtext: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 5,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#565EB3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  transactionReason: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  transactionOrderId: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
