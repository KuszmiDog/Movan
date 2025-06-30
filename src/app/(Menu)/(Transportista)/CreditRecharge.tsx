import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../utils/AuthContext';

export default function CreditRecharge() {
  const { simulateRecharge, getUserCredits } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const rechargeOptions = [
    { credits: 5, price: 5000, popular: false },
    { credits: 10, price: 9000, popular: true },
    { credits: 20, price: 16000, popular: false },
    { credits: 50, price: 35000, popular: false },
  ];

  const handleRecharge = async (credits: number, price: number) => {
    Alert.alert(
      'Confirmar Recarga',
      `¿Confirmas la compra de ${credits} créditos por $${price.toLocaleString('es-AR')}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              setLoading(true);
              const success = await simulateRecharge(credits);
              
              if (success) {
                Alert.alert(
                  '¡Recarga Exitosa!',
                  `Se han agregado ${credits} créditos a tu cuenta.`,
                  [
                    { 
                      text: 'Ver Historial',
                      onPress: () => router.push('/(Menu)/(Transportista)/CreditHistory')
                    },
                    { 
                      text: 'Continuar',
                      onPress: () => router.back()
                    }
                  ]
                );
              } else {
                Alert.alert('Error', 'No se pudo procesar la recarga. Intenta nuevamente.');
              }
            } catch (error) {
              console.error('Error en recarga:', error);
              Alert.alert('Error', 'Ocurrió un error durante la recarga.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Recargar Créditos</Text>
      </View>

      <View style={styles.infoCard}>
        <MaterialCommunityIcons name="information" size={32} color="#FFD700" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>¿Cómo funcionan los créditos?</Text>
          <Text style={styles.infoDescription}>
            Cada pedido que aceptes consume 1 crédito. Los créditos te permiten acceder a más oportunidades de trabajo.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Selecciona tu paquete:</Text>

      <View style={styles.optionsContainer}>
        {rechargeOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              option.popular && styles.popularCard
            ]}
            onPress={() => handleRecharge(option.credits, option.price)}
            disabled={loading}
          >
            {option.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MÁS POPULAR</Text>
              </View>
            )}
            
            <View style={styles.optionContent}>
              <MaterialCommunityIcons name="cash" size={40} color="#FFD700" />
              <View style={styles.optionInfo}>
                <Text style={styles.creditsAmount}>{option.credits} Créditos</Text>
                <Text style={styles.priceAmount}>${option.price.toLocaleString('es-AR')}</Text>
                <Text style={styles.pricePerCredit}>
                  ${(option.price / option.credits).toLocaleString('es-AR')} por crédito
                </Text>
              </View>
            </View>

            {option.credits >= 10 && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>
                  Ahorras ${((5 * 1000) - (option.price / option.credits * option.credits)).toFixed(0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#565EB3',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  optionCard: {
    backgroundColor: '#565EB3',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 100,
  },
  popularCard: {
    borderColor: '#FFD700',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -6,
    right: 15,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  popularText: {
    color: '#262E93',
    fontSize: 11,
    fontWeight: 'bold',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  creditsAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceAmount: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  pricePerCredit: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 2,
  },
  savingsBadge: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 5,
  },
  savingsText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
